'use client';

import { useEffect, useRef } from 'react';

/**
 * Tracks pointer position over the attached element and writes it to
 * --cursor-x / --cursor-y CSS variables. Toggles --cursor-glow-opacity on
 * enter/leave. Pair with the .cursor-glow class in globals.css.
 *
 * Respects prefers-reduced-motion (no-op when set).
 */
export function useCursorGlow<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    function onMove(e: PointerEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--cursor-x', `${x}px`);
        el.style.setProperty('--cursor-y', `${y}px`);
      });
    }
    function onEnter() {
      el?.style.setProperty('--cursor-glow-opacity', '1');
    }
    function onLeave() {
      el?.style.setProperty('--cursor-glow-opacity', '0');
    }

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return ref;
}
