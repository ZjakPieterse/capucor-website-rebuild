'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

export function MagneticButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 180, mass: 0.12 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const activationRadius = 50;

    const handlePointerMove = (event: PointerEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const nearestX = Math.max(rect.left, Math.min(event.clientX, rect.right));
      const nearestY = Math.max(rect.top, Math.min(event.clientY, rect.bottom));
      const edgeDistance = Math.hypot(event.clientX - nearestX, event.clientY - nearestY);

      if (edgeDistance <= activationRadius) {
        x.set((event.clientX - centerX) * 0.18);
        y.set((event.clientY - centerY) * 0.18);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handlePointerLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={cn('relative inline-flex will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
}
