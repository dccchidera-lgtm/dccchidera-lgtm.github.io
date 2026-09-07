"use client";

import { useEffect, useRef, useState } from "react";
import { NativeLink } from "@/components/native-link";

type Mode = "trust" | "network";
type Controls = {
  rotate: (amount: number) => void;
  reset: () => void;
  play: (value: boolean) => void;
};

export function ModelExplorer({
  initialMode = "trust",
  compact = false,
}: {
  initialMode?: Mode;
  compact?: boolean;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">(
    "loading",
  );
  const [playing, setPlaying] = useState(false);
  const mount = useRef<HTMLDivElement>(null);
  const controls = useRef<Controls | null>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    let started = false;
    let inView = false;
    let wake: (() => void) | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        wake?.();
        if (!inView || started) return;
        started = true;
        void initialize();
      },
      { rootMargin: "100px" },
    );
    observer.observe(host);

    async function initialize() {
      try {
        const T = await import("three");
        if (disposed || !host) return;
        const renderer = new T.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        const resources: Array<{ dispose: () => void }> = [];
        const keep = <D extends { dispose: () => void }>(resource: D): D => {
          resources.push(resource);
          return resource;
        };
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x0b1420, 0);
        renderer.outputColorSpace = T.SRGBColorSpace;
        renderer.domElement.setAttribute("aria-hidden", "true");
        host.appendChild(renderer.domElement);
        const scene = new T.Scene();
        const camera = new T.PerspectiveCamera(38, 1, 0.1, 60);
        camera.position.set(0, 1, 10);
        camera.lookAt(0, 0, 0);
        scene.add(new T.HemisphereLight(0xd8ffff, 0x132239, 2.8));
        const key = new T.DirectionalLight(0xffffff, 4);
        key.position.set(-3, 5, 4);
        scene.add(key);
        const fill = new T.DirectionalLight(0x73dfed, 3);
        fill.position.set(4, 1, -2);
        scene.add(fill);
        const model = new T.Group();
        model.rotation.set(0.06, -0.18, 0);
        scene.add(model);
        const colours = [0x9fd5ee, 0xc8f582, 0xa9a5ff];
        const sphere = keep(new T.SphereGeometry(1, 32, 20));
        const materials = colours.map((color) =>
          keep(
            new T.MeshStandardMaterial({
              color,
              metalness: 0.48,
              roughness: 0.23,
            }),
          ),
        );
        const connectorMaterial = keep(
          new T.MeshStandardMaterial({
            color: 0x7193a5,
            metalness: 0.3,
            roughness: 0.5,
          }),
        );
        function node(
          x: number,
          y: number,
          z: number,
          radius: number,
          colour: number,
        ) {
          const mesh = new T.Mesh(sphere, materials[colour]);
          mesh.position.set(x, y, z);
          mesh.scale.setScalar(radius);
          model.add(mesh);
          return mesh.position.clone();
        }
        function link(
          a: InstanceType<typeof T.Vector3>,
          b: InstanceType<typeof T.Vector3>,
          radius: number,
          arrows = false,
        ) {
          const delta = b.clone().sub(a);
          const length = delta.length();
          const direction = delta.clone().normalize();
          const cylinder = new T.Mesh(
            keep(new T.CylinderGeometry(radius, radius, length, 8)),
            connectorMaterial,
          );
          cylinder.position.copy(a).add(b).multiplyScalar(0.5);
          cylinder.quaternion.setFromUnitVectors(
            new T.Vector3(0, 1, 0),
            direction,
          );
          model.add(cylinder);
          if (arrows) {
            const arrow = new T.Mesh(
              keep(new T.ConeGeometry(0.1, 0.24, 12)),
              connectorMaterial,
            );
            arrow.position.copy(a).lerp(b, 0.7);
            arrow.quaternion.copy(cylinder.quaternion);
            model.add(arrow);
          }
        }
        function label(text: string, x: number, y: number, z: number) {
          const canvas = document.createElement("canvas");
          canvas.width = 768;
          canvas.height = 96;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          ctx.font = "500 38px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#eef5fa";
          ctx.fillText(text, 384, 48);
          const texture = keep(new T.CanvasTexture(canvas));
          texture.colorSpace = T.SRGBColorSpace;
          const sprite = new T.Sprite(
            keep(
              new T.SpriteMaterial({
                map: texture,
                depthTest: false,
                transparent: true,
              }),
            ),
          );
          sprite.position.set(x, y, z);
          sprite.scale.set(3.5, 0.4375, 1);
          model.add(sprite);
        }
        if (mode === "trust") {
          const a = node(-2, -0.6, 0.3, 0.43, 0);
          const b = node(0, 1.1, -0.2, 0.6, 1);
          const c = node(2, -0.6, 0.3, 0.43, 2);
          link(a, b, 0.035, true);
          link(b, c, 0.035, true);
          link(a, c, 0.015, true);
          label("Personalisation", -2, -1.42, 0.3);
          label("Trust", 0, 2.05, -0.2);
          label("Loyalty", 2, -1.42, 0.3);
          label("B = .575", -1.35, 0.55, 0.3);
          label("B = .526", 1.35, 0.55, 0.3);
        } else {
          const counts = [4, 5, 1];
          const layers = counts.map((count, layer) =>
            Array.from({ length: count }, (_, i) =>
              node(
                (layer - 1) * 2.1,
                (i - (count - 1) / 2) * 0.65,
                i % 2 ? 0.35 : -0.35,
                layer === 2 ? 0.43 : 0.23,
                layer,
              ),
            ),
          );
          for (let layer = 0; layer < 2; layer++)
            layers[layer].forEach((a) =>
              layers[layer + 1].forEach((b) => link(a, b, 0.012)),
            );
          label("Customer attributes", -2.1, -2, 0);
          label("Hidden layer", 0, -2, 0);
          label("Churn score", 2.1, -2, 0);
        }
        const grid = new T.GridHelper(8, 16, 0x29434e, 0x1a2b39);
        grid.position.y = -2.55;
        scene.add(grid);
        keep(grid.geometry);
        (Array.isArray(grid.material)
          ? grid.material
          : [grid.material]
        ).forEach(keep);
        let frame = 0;
        let auto = false;
        let last = 0;
        const motionPreference = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );
        function render(time = 0) {
          frame = 0;
          if (disposed || document.hidden || !inView) {
            last = 0;
            return;
          }
          if (auto && !motionPreference.matches)
            model.rotation.y += Math.min((time - last) / 1000 || 0, 0.05) * 0.2;
          last = time;
          renderer.render(scene, camera);
          if (auto && !motionPreference.matches)
            frame = requestAnimationFrame(render);
        }
        const requestRender = () => {
          if (!frame && !disposed) frame = requestAnimationFrame(render);
        };
        wake = requestRender;
        const resize = new ResizeObserver(() => {
          const width = host.clientWidth;
          const height = host.clientHeight;
          if (!width || !height) return;
          camera.aspect = width / height;
          // Fit the full model and labels in narrow chapter columns.
          camera.position.z = Math.max(9.5, 8.8 / Math.max(camera.aspect, 0.4));
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          requestRender();
        });
        resize.observe(host);
        let pointer: { id: number; x: number; y: number } | null = null;
        const down = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
          host.setPointerCapture(event.pointerId);
        };
        const move = (event: PointerEvent) => {
          if (!pointer || pointer.id !== event.pointerId) return;
          model.rotation.y += (event.clientX - pointer.x) * 0.006;
          model.rotation.x = Math.max(
            -0.5,
            Math.min(
              0.5,
              model.rotation.x + (event.clientY - pointer.y) * 0.004,
            ),
          );
          pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
          requestRender();
        };
        const up = () => {
          pointer = null;
        };
        const lost = (event: Event) => {
          event.preventDefault();
          auto = false;
          setPlaying(false);
          setStatus("fallback");
        };
        host.addEventListener("pointerdown", down);
        host.addEventListener("pointermove", move);
        host.addEventListener("pointerup", up);
        host.addEventListener("lostpointercapture", up);
        renderer.domElement.addEventListener("webglcontextlost", lost);
        document.addEventListener("visibilitychange", requestRender);
        const reduce = () => {
          if (motionPreference.matches) {
            auto = false;
            setPlaying(false);
          }
          requestRender();
        };
        motionPreference.addEventListener("change", reduce);
        controls.current = {
          rotate: (amount) => {
            model.rotation.y += amount;
            requestRender();
          },
          reset: () => {
            model.rotation.set(0.06, -0.18, 0);
            requestRender();
          },
          play: (value) => {
            auto = value;
            requestRender();
          },
        };
        cleanup = () => {
          cancelAnimationFrame(frame);
          resize.disconnect();
          host.removeEventListener("pointerdown", down);
          host.removeEventListener("pointermove", move);
          host.removeEventListener("pointerup", up);
          host.removeEventListener("lostpointercapture", up);
          renderer.domElement.removeEventListener("webglcontextlost", lost);
          document.removeEventListener("visibilitychange", requestRender);
          motionPreference.removeEventListener("change", reduce);
          resources.forEach((resource) => resource.dispose());
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
          controls.current = null;
        };
        setStatus("ready");
        requestRender();
      } catch {
        if (!disposed) setStatus("fallback");
      }
    }
    return () => {
      disposed = true;
      observer.disconnect();
      cleanup?.();
    };
  }, [mode]);

  function changeMode(next: Mode) {
    if (mode === next) return;
    setMode(next);
    setStatus("loading");
    setPlaying(false);
  }
  return (
    <section
      className={`model-explorer${compact ? ' model-explorer--compact' : ''}`}
      aria-label="Interactive analytical models"
    >
      <div className="model-heading">
        <span>Analytical model</span>
        <span>Interactive 3D</span>
      </div>
      {!compact && <div className="model-modes" aria-label="Choose a model">
        <button
          type="button"
          aria-pressed={mode === "trust"}
          onClick={() => changeMode("trust")}
        >
          01 / Trust & loyalty
        </button>
        <button
          type="button"
          aria-pressed={mode === "network"}
          onClick={() => changeMode("network")}
        >
          02 / Neural network
        </button>
      </div>}
      <div className="model-viewport" ref={mount}>
        {status !== "ready" && (
          <div className="model-fallback">
            <p>
              {mode === "trust"
                ? "Personalisation → Trust → Loyalty"
                : "Customer attributes → Hidden layer → Churn score"}
            </p>
            <small>
              {status === "loading"
                ? "Preparing 3D view. The findings are available below."
                : "Text view is available on this device."}
            </small>
          </div>
        )}
      </div>
      <div className="model-controls" aria-label="3D view controls">
        <span>Drag to explore</span>
        <div>
          <button
            disabled={status !== "ready"}
            type="button"
            aria-label="Rotate model left"
            onClick={() => controls.current?.rotate(-0.25)}
          >
            ↶
          </button>
          <button
            disabled={status !== "ready"}
            type="button"
            aria-label="Rotate model right"
            onClick={() => controls.current?.rotate(0.25)}
          >
            ↷
          </button>
          <button
            disabled={status !== "ready"}
            type="button"
            onClick={() => controls.current?.reset()}
          >
            Reset
          </button>
          <button
            className="auto-rotate"
            disabled={status !== "ready"}
            type="button"
            aria-pressed={playing}
            onClick={() => {
              const next = !playing;
              setPlaying(next);
              controls.current?.play(next);
            }}
          >
            {playing ? "Pause" : "Auto rotate"}
          </button>
        </div>
      </div>
      <div className="model-note" aria-live="polite">
        <strong>
          {mode === "trust"
            ? "Trust is the connecting variable."
            : "From customer data to a churn score."}
        </strong>
        <p hidden={compact}>
          {mode === "trust"
            ? "Personalisation → trust: B = .575. Trust → loyalty: B = .526. This is a statistical model, not proof of causation. Node sizes and positions do not encode effect size."
            : "Conceptual architecture only. The displayed node count and connections are illustrative; the exact trained network and weights were not retained in the project evidence."}
        </p>
        {compact && <p>{mode === 'trust' ? 'Statistical paths, not proof of causation. Geometry does not encode effect size.' : 'Illustrative architecture, not the exact trained network.'}</p>}
        <NativeLink
          href={
            mode === "trust"
              ? "/work/customer-intelligence#evidence"
              : "/work/predictive-analytics#evidence"
          }
        >
          Read the supporting case ↗
        </NativeLink>
      </div>
    </section>
  );
}
