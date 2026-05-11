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

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        el.textContent = formatZAR(Math.round(value));
      },
    });
    return () => controls.stop();
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
