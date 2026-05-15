'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll progress (0..1) through a section: 0 when its top edge first touches
 * the viewport bottom, 1 when its bottom edge leaves the viewport top.
 * Honours prefers-reduced-motion by returning 1 with no listener attached.
 */
export function useSectionScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }

    let rafId = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const denom = rect.height + vh;
      const traveled = vh - rect.top;
      const p = Math.min(1, Math.max(0, traveled / denom));
      setProgress((prev) => (Math.abs(prev - p) < 0.002 ? prev : p));
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { ref, progress };
}
