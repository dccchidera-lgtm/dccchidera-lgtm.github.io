'use client';

import { useEffect } from 'react';

export function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const updateProgress = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        const progress = available > 0 ? Math.min(1, window.scrollY / available) : 0;
        root.style.setProperty('--scroll-progress', String(progress));
        root.toggleAttribute('data-scrolled', window.scrollY > 24);
        frame = 0;
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    const updatePointer = (event: PointerEvent) => {
      if (motionPreference.matches || event.pointerType !== 'mouse') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        root.style.setProperty('--pointer-x', `${pointerX}px`);
        root.style.setProperty('--pointer-y', `${pointerY}px`);
        pointerFrame = 0;
      });
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });

    const registered = new WeakSet<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    const register = (scope: ParentNode) => {
      if (motionPreference.matches) return;
      const candidates = Array.from(scope.querySelectorAll<HTMLElement>('[data-reveal]'));
      candidates.forEach((element) => {
        if (registered.has(element)) return;
        registered.add(element);
        if (element.getBoundingClientRect().top > window.innerHeight * 0.88) {
          element.classList.add('reveal-pending');
          observer.observe(element);
        }
      });
    };

    register(document);
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches('[data-reveal]')) register(node.parentElement ?? document);
            else register(node);
          }
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const updateMotion = () => {
      if (!motionPreference.matches) return;
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      observer.disconnect();
      document.querySelectorAll<HTMLElement>('.reveal-pending').forEach((element) => {
        element.classList.add('is-revealed');
      });
    };
    motionPreference.addEventListener('change', updateMotion);

    return () => {
      observer.disconnect();
      motionPreference.removeEventListener('change', updateMotion);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      mutationObserver.disconnect();
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      window.removeEventListener('pointermove', updatePointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="cursor-spotlight" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true">
        <span />
      </div>
    </>
  );
}
