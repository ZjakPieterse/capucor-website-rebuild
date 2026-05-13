'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';

const EASE = [0.2, 0, 0, 1] as const;

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const pathOpacity = useTransform(scrollYProgress, [0, 0.04, 0.32], [0.35, 1, 0.18]);

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-[#050505] px-6 pt-32 pb-20 lg:pt-40">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(45,212,191,0.11),transparent_30%),linear-gradient(180deg,#050505_0%,#0a0a0b_100%)]" />
        <div className="absolute left-1/2 top-28 h-px w-[min(760px,80vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8 inline-flex items-center gap-2 border border-white/10 bg-white/[0.025] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/45"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#2DD4BF]" />
          Financial Zen for Founders
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.08, ease: EASE }}
          className="font-heading max-w-4xl text-balance text-5xl font-normal leading-[0.98] tracking-[-0.045em] text-white sm:text-7xl lg:text-[6.9rem]"
        >
          Sophisticated Finance for the Modern Founder.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
          className="mt-7 max-w-2xl text-sm leading-7 text-white/48 sm:text-base"
        >
          Books, tax, payroll, and founder reporting arranged into one calm operating cadence. Less financial noise. More operational clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.28, ease: EASE }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <MagneticButton activationRadius={30}>
            <Button
              nativeButton={false}
              render={<Link href="#pricing" />}
              size="lg"
              className="glow-button h-12 rounded-full bg-[#2DD4BF] px-7 text-[11px] font-black uppercase tracking-[0.18em] text-[#03100f] hover:bg-[#5eead4]"
            >
              Open Pricing Studio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </MagneticButton>
          <MagneticButton activationRadius={30}>
            <Button
              nativeButton={false}
              render={<Link href="#services" />}
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-white/10 bg-white/[0.02] px-7 text-[11px] font-black uppercase tracking-[0.18em] text-white/62 hover:border-white/18 hover:bg-white/[0.04] hover:text-white"
            >
              View Core Systems
            </Button>
          </MagneticButton>
        </motion.div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-64 max-w-5xl overflow-visible">
        <svg className="h-full w-full" viewBox="0 0 960 260" fill="none" preserveAspectRatio="none">
          <motion.path
            d="M40 216 C190 214 182 94 326 112 C461 129 440 196 572 170 C713 142 714 42 920 54"
            stroke="#2DD4BF"
            strokeWidth="1.4"
            strokeLinecap="round"
            style={{ pathLength, opacity: pathOpacity }}
          />
          <motion.path
            d="M40 216 C190 214 182 94 326 112 C461 129 440 196 572 170 C713 142 714 42 920 54"
            stroke="#2DD4BF"
            strokeWidth="14"
            strokeLinecap="round"
            style={{ pathLength, opacity: useTransform(pathOpacity, (value) => value * 0.04) }}
          />
        </svg>
      </div>
    </section>
  );
}
