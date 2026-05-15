'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Pins the section and maps scroll progress to a discrete active step index.
 * Skips pinning entirely when prefers-reduced-motion is set — caller should
 * fall back to rendering every card as active in that case.
 */
export function useHowItWorksScroll(totalSteps: number) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setActiveStep(totalSteps - 1);
        return;
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const raw = self.progress * totalSteps;
          const idx = Math.min(totalSteps - 1, Math.max(0, Math.floor(raw)));
          setActiveStep((prev) => (prev === idx ? prev : idx));
        },
      });
    },
    { scope: sectionRef, dependencies: [totalSteps] }
  );

  return { activeStep, sectionRef };
}
