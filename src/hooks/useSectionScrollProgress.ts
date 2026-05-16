'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll progress (0..1) anchored to viewport centre: 0 when the section's top
 * edge reaches the viewport centre, 1 when its bottom edge does. This keeps the
 * "tip" of a section-spanning progress element near vertical screen centre as
 * the user scrolls. Honours prefers-reduced-motion by returning 1 with no listener.
 */
export function useSectionScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let rafId = 0;
    const update = () => {
      if (reduceMotion) {
        setProgress((prev) => (prev === 1 ? prev : 1));
        return;
      }
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.height <= 0) return;
      const vh = window.innerHeight;
      const traveled = vh / 2 - rect.top;
      const p = Math.min(1, Math.max(0, traveled / rect.height));
      setProgress((prev) => (Math.abs(prev - p) < 0.002 ? prev : p));
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    update();
    if (!reduceMotion) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { ref, progress };
}
