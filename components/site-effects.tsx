'use client';

import { useEffect } from 'react';

export function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

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
      root.style.setProperty('--pointer-x', `${event.clientX}px`);
      root.style.setProperty('--pointer-y', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });

    if (reducedMotion) {
      return () => {
        window.removeEventListener('scroll', updateProgress);
        window.removeEventListener('resize', updateProgress);
        window.removeEventListener('pointermove', updatePointer);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }

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

    return () => {
      observer.disconnect();
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

