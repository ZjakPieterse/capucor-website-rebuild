'use client';

import { useEffect } from 'react';

export function ScrollToTopOnMount() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.history.scrollRestoration = 'manual';
    } catch {
      /* ignore — older browsers */
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
