'use client';

import { useEffect, useRef } from 'react';
import type { Motif, MotifShape } from '@/lib/hero-motifs';

type Three = typeof import('three');

const NARROW = 640;

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    context?.getExtension('WEBGL_lose_context')?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

function prefersSavingData() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return connection?.saveData === true;
}

function token(styles: CSSStyleDeclaration, name: string, fallback: string) {
  return styles.getPropertyValue(name).trim() || fallback;
}

function createScene(T: Three, host: HTMLDivElement, shape: MotifShape, onLost: () => void) {
  const renderer = new T.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
  try {
    return buildField(T, renderer, host, shape, onLost);
  } catch (error) {
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    throw error;
  }
}

function buildField(T: Three, renderer: InstanceType<Three['WebGLRenderer']>, host: HTMLDivElement, shape: MotifShape, onLost: () => void) {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.tabIndex = -1;
  renderer.domElement.addEventListener('webglcontextlost', onLost);
  host.appendChild(renderer.domElement);

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(50, 1, 0.1, 60);
  camera.position.set(0, 0, 14);
  const group = new T.Group();
  scene.add(group);

  const toVectors = (points: MotifShape['points']) => points.map(([x, y, z]) => new T.Vector3(x, y, z));
  const baseGeometry = new T.BufferGeometry().setFromPoints(toVectors(shape.points));
  const highlightGeometry = new T.BufferGeometry().setFromPoints(toVectors(shape.highlights));
  const highlightColours = new Float32Array(shape.highlights.length * 3);
  highlightGeometry.setAttribute('color', new T.BufferAttribute(highlightColours, 3));
  const lineGeometry = new T.BufferGeometry().setFromPoints(toVectors(shape.segments));

  const spriteCanvas = document.createElement('canvas');
  spriteCanvas.width = 64;
  spriteCanvas.height = 64;
  const context = spriteCanvas.getContext('2d');
  if (context) {
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.35, 'rgba(255,255,255,0.85)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
  }
  const sprite = new T.CanvasTexture(spriteCanvas);
  sprite.colorSpace = T.SRGBColorSpace;

  const baseMaterial = new T.PointsMaterial({ size: 0.16, map: sprite, transparent: true, depthWrite: false });
  const highlightMaterial = new T.PointsMaterial({ size: shape.highlightSize, map: sprite, transparent: true, depthWrite: false, vertexColors: true });
  const lineMaterial = new T.LineBasicMaterial({ transparent: true, depthWrite: false });
  group.add(new T.LineSegments(lineGeometry, lineMaterial));
  group.add(new T.Points(baseGeometry, baseMaterial));
  group.add(new T.Points(highlightGeometry, highlightMaterial));

  const applyPalette = () => {
    const styles = getComputedStyle(document.documentElement);
    const background = new T.Color(token(styles, '--background', '#ffffff'));
    const dark = background.getHSL({ h: 0, s: 0, l: 0 }).l < 0.5;
    const accent = new T.Color(token(styles, '--accent', dark ? '#6f9fd8' : '#155eef'));
    const signal = new T.Color(token(styles, '--signal', '#cadb7a'));
    const cyan = new T.Color(token(styles, '--polish-cyan', '#87dedc'));
    const blending = dark ? T.AdditiveBlending : T.NormalBlending;
    [baseMaterial, highlightMaterial, lineMaterial].forEach((material) => {
      if (material.blending !== blending) {
        material.blending = blending;
        material.needsUpdate = true;
      }
    });
    baseMaterial.color.copy(accent);
    baseMaterial.opacity = dark ? 0.9 : 0.7;
    highlightMaterial.opacity = dark ? 1 : 0.85;
    lineMaterial.color.copy(accent);
    lineMaterial.opacity = dark ? 0.22 : 0.16;
    shape.highlights.forEach((_, index) => {
      const colour = (index % 2 ? cyan : signal).clone();
      if (!dark) colour.lerp(accent, 0.4);
      colour.toArray(highlightColours, index * 3);
    });
    highlightGeometry.attributes.color.needsUpdate = true;
  };

  const layout = (width: number, height: number) => {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const halfHeight = Math.tan(T.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const halfWidth = halfHeight * camera.aspect;
    // Each motif keeps to the upper right, away from the hero text in the lower left.
    const placement = width < NARROW ? shape.narrow : shape.wide;
    group.position.set(halfWidth * placement.x, halfHeight * placement.y, 0);
    group.scale.setScalar(placement.scale);
  };

  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let elapsed = 0;
  const render = (delta: number) => {
    elapsed += delta;
    pointer.x += (pointer.targetX - pointer.x) * 0.04;
    pointer.y += (pointer.targetY - pointer.y) * 0.04;
    if (shape.motion === 'spin') {
      group.rotation.y = 0.35 + elapsed * 0.035;
      group.rotation.x = Math.sin(elapsed * 0.1) * 0.08;
    } else {
      // Structured motifs sway rather than spin so their shape stays readable.
      group.rotation.y = -0.35 + Math.sin(elapsed * 0.12) * 0.3;
      group.rotation.x = 0.12 + Math.sin(elapsed * 0.09) * 0.05;
    }
    camera.position.x = pointer.x * 0.8;
    camera.position.y = -pointer.y * 0.5;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };

  const dispose = () => {
    // Detach first so our own forced context loss is not mistaken for a failure.
    renderer.domElement.removeEventListener('webglcontextlost', onLost);
    [baseGeometry, highlightGeometry, lineGeometry, baseMaterial, highlightMaterial, lineMaterial, sprite]
      .forEach((resource) => resource.dispose());
    const lost = renderer.getContext().isContextLost();
    renderer.dispose();
    if (!lost) renderer.forceContextLoss();
    renderer.domElement.remove();
  };

  applyPalette();
  return { pointer, applyPalette, layout, render, dispose };
}

type Field = ReturnType<typeof buildField>;

const fieldKind = (motif: Motif) => (motif === 'constellation' ? 'home' : motif === 'corner' ? 'corner' : 'motif');

export function HeroField({ motif = 'constellation' }: { motif?: Motif }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host || prefersSavingData()) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const colourScheme = window.matchMedia('(prefers-color-scheme: dark)');
    let disposed = false;
    let failed = false;
    let webgl: boolean | null = null;
    let idle = false;
    let inView = false;
    let loading = false;
    let field: Field | null = null;
    let frame = 0;
    let resizeFrame = 0;
    let lastTime = 0;

    const loop = (time: number) => {
      frame = 0;
      if (!field) return;
      field.render(lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0);
      lastTime = time;
      host.classList.add('is-ready');
      wake();
    };

    function wake() {
      if (frame || !field || !inView || document.hidden) {
        if (!inView || document.hidden) lastTime = 0;
        return;
      }
      frame = window.requestAnimationFrame(loop);
    }

    const teardown = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      host.classList.remove('is-ready');
      field?.dispose();
      field = null;
    };

    const resize = () => {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        if (field && host.clientWidth && host.clientHeight) field.layout(host.clientWidth, host.clientHeight);
      });
    };

    const start = async () => {
      if (disposed || failed || loading || field || !idle || !inView || motion.matches) return;
      webgl ??= supportsWebGL();
      if (!webgl) {
        failed = true;
        return;
      }
      loading = true;
      try {
        const [T, { buildMotif }] = await Promise.all([import('three'), import('@/lib/hero-motifs')]);
        if (disposed || motion.matches || !inView) return;
        field = createScene(T, host, buildMotif(motif, host.clientWidth < NARROW), () => {
          failed = true;
          teardown();
        });
        field.layout(host.clientWidth || 1, host.clientHeight || 1);
        wake();
      } catch {
        failed = true;
        teardown();
      } finally {
        loading = false;
      }
    };

    const visibility = new IntersectionObserver((entries) => {
      inView = entries[entries.length - 1].isIntersecting;
      if (field) wake();
      else void start();
    });
    visibility.observe(host);
    const sizing = new ResizeObserver(resize);
    sizing.observe(host);

    const markIdle = () => {
      idle = true;
      void start();
    };
    const hasIdle = typeof window.requestIdleCallback === 'function';
    const idleHandle = hasIdle
      ? window.requestIdleCallback(markIdle, { timeout: 1500 })
      : window.setTimeout(markIdle, 600);

    const updateMotion = () => {
      if (motion.matches) teardown();
      else void start();
    };
    const updatePalette = () => field?.applyPalette();
    const updateVisibility = () => wake();
    const updatePointer = (event: PointerEvent) => {
      if (!field || event.pointerType !== 'mouse') return;
      field.pointer.targetX = event.clientX / window.innerWidth - 0.5;
      field.pointer.targetY = event.clientY / window.innerHeight - 0.5;
    };
    const themeObserver = new MutationObserver(updatePalette);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    motion.addEventListener('change', updateMotion);
    colourScheme.addEventListener('change', updatePalette);
    document.addEventListener('visibilitychange', updateVisibility);
    window.addEventListener('pointermove', updatePointer, { passive: true });

    return () => {
      disposed = true;
      if (hasIdle) window.cancelIdleCallback(idleHandle);
      else window.clearTimeout(idleHandle);
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      visibility.disconnect();
      sizing.disconnect();
      themeObserver.disconnect();
      motion.removeEventListener('change', updateMotion);
      colourScheme.removeEventListener('change', updatePalette);
      document.removeEventListener('visibilitychange', updateVisibility);
      window.removeEventListener('pointermove', updatePointer);
      teardown();
    };
  }, [motif]);

  return <div ref={mount} className={`hero-field hero-field--${fieldKind(motif)}`} aria-hidden="true" />;
}
