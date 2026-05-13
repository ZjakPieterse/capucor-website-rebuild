'use client';

import { useEffect } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;
    const ease = 0.11;

    const tick = () => {
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.5) current = target;
      window.scrollTo(0, current);
      if (current !== target) raf = window.requestAnimationFrame(tick);
      else raf = 0;
    };

    const start = () => {
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(maxScroll, target + event.deltaY));
      start();
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const destination = document.querySelector(id);
      if (!destination) return;
      event.preventDefault();
      target = window.scrollY + destination.getBoundingClientRect().top - 84;
      start();
      window.history.pushState(null, '', id);
    };

    const sync = () => {
      if (!raf) {
        target = window.scrollY;
        current = window.scrollY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', sync, { passive: true });
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', sync);
      document.removeEventListener('click', handleAnchorClick);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
