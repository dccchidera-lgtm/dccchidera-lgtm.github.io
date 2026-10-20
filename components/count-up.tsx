'use client';

import { useEffect, useRef } from 'react';

const DURATION = 1400;

// Scales every number in the label, keeping commas, leading zeros and any surrounding text.
function formatAt(value: string, progress: number) {
  return value.replace(/\d[\d,]*/g, (match) => {
    const current = Math.round(Number(match.replace(/,/g, '')) * progress);
    const text = match.includes(',') ? current.toLocaleString('en-GB') : String(current);
    return match.length > 1 && match.startsWith('0') ? text.padStart(match.length, '0') : text;
  });
}

/**
 * Counts a figure up when it scrolls into view. The real value always stays in the page for
 * screen readers and visitors without JavaScript; the moving copy is decorative and overlaid.
 */
export function CountUp({ value }: { value: string }) {
  const host = useRef<HTMLSpanElement>(null);
  const live = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = host.current;
    const overlay = live.current;
    if (!element || !overlay) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Figures already on screen at load keep their final value rather than jumping to zero.
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    let frame = 0;
    let observer: IntersectionObserver | null = null;
    overlay.textContent = formatAt(value, 0);
    element.classList.add('is-counting');

    const finish = () => {
      observer?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      element.classList.remove('is-counting');
    };

    observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer?.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / DURATION);
        overlay.textContent = formatAt(value, 1 - Math.pow(1 - progress, 3));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
        else finish();
      };
      frame = window.requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(element);
    window.addEventListener('beforeprint', finish);

    return () => {
      window.removeEventListener('beforeprint', finish);
      finish();
    };
  }, [value]);

  return (
    <span ref={host} className="count-up">
      <span className="count-up-value">{value}</span>
      <span ref={live} className="count-up-live" aria-hidden="true" />
    </span>
  );
}
