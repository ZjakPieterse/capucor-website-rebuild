'use client';

import { useInView, animate, useReducedMotion } from 'motion/react';
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
  const reduceMotion = useReducedMotion();
  const inViewAtMount = useRef<boolean | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    if (inViewAtMount.current === null) {
      inViewAtMount.current = inView;
    }

    if (reduceMotion || inViewAtMount.current || hasAnimated.current) {
      return;
    }

    if (!inView) return;

    hasAnimated.current = true;
    const el = ref.current;
    el.textContent = prefix + '0' + suffix;
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        el.textContent = prefix + Math.round(value).toLocaleString('en-US') + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
