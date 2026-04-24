'use client';

import { useInView, useMotionValue, useSpring, animate } from 'motion/react';
import { useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedNumber({
  to,
  prefix = '',
  suffix = '',
  duration = 1.5,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        el.textContent = prefix + Math.round(value).toLocaleString('en-US') + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
