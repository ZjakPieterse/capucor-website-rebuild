'use client';

import { useEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'motion/react';
import { cn, formatZAR } from '@/lib/utils';

interface AnimatedPriceProps {
  amount: number;
  size?: 'lg' | 'base';
  className?: string;
  duration?: number;
}

export function AnimatedPrice({
  amount,
  size = 'base',
  className,
  duration = 0.5,
}: AnimatedPriceProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prevRef = useRef(amount);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const from = prevRef.current;
    const to = amount;
    prevRef.current = to;

    if (reduceMotion || from === to) {
      el.textContent = formatZAR(to);
      return;
    }

    const hasChanged = from !== to;
    let revealTimeout: ReturnType<typeof setTimeout> | null = null;

    if (hasChanged) {
      el.classList.remove('price-first-reveal');
      // force reflow so the animation re-triggers if it fires repeatedly
      void el.offsetWidth;
      el.classList.add('price-first-reveal');
      revealTimeout = setTimeout(() => {
        el.classList.remove('price-first-reveal');
      }, 900);
    }

    const controls = animate(from, to, {
      duration: (from === 0 && to > 0) ? 0.8 : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        el.textContent = formatZAR(Math.round(value));
      },
    });
    return () => {
      controls.stop();
      if (revealTimeout) clearTimeout(revealTimeout);
    };
  }, [amount, duration, reduceMotion]);

  return (
    <span
      ref={ref}
      className={cn(
        'font-mono whitespace-nowrap tabular-nums',
        size === 'lg' ? 'text-4xl font-bold' : 'text-base font-medium',
        className
      )}
    >
      {formatZAR(amount)}
    </span>
  );
}
