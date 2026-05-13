'use client';

import { useRef, type MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, BarChart3, CircleDollarSign, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';

const driftShapes = [
  { label: 'VAT', className: 'left-[8%] top-[18%] h-24 w-24', delay: 0 },
  { label: 'PAYE', className: 'right-[10%] top-[22%] h-28 w-28', delay: 1.6 },
  { label: 'RUNWAY', className: 'left-[15%] bottom-[18%] h-32 w-32', delay: 0.7 },
  { label: 'CASH', className: 'right-[18%] bottom-[16%] h-20 w-20', delay: 2.2 },
];

export function HeroSection() {
  const paneRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 18, mass: 0.2 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 18, mass: 0.2 });
  const paneTransform = useMotionTemplate`perspective(1200px) rotateX(${springX}deg) rotateY(${springY}deg)`;

  const handlePaneMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!paneRef.current) return;
    const rect = paneRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -12);
    rotateY.set(px * 14);
  };

  const resetPane = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0A192F] pt-28 pb-24 lg:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.20),transparent_34%),radial-gradient(circle_at_82%_28%,rgba(20,184,166,0.18),transparent_28%),linear-gradient(135deg,#0A192F_0%,#112240_55%,#07111f_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        {driftShapes.map((shape) => (
          <motion.div
            key={shape.label}
            className={`absolute rounded-[2rem] border border-cyan-300/10 bg-white/[0.03] backdrop-blur-md ${shape.className}`}
            animate={{ y: [0, -22, 0], rotate: [0, 8, -4, 0], opacity: [0.28, 0.55, 0.28] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: shape.delay }}
          >
            <span className="absolute inset-0 grid place-items-center text-[10px] font-bold tracking-[0.3em] text-cyan-100/35">
              {shape.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-white/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-100/70 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur-xl"
        >
          <Sparkles className="h-3.5 w-3.5 text-teal-300" />
          Financial Zen for Operators
        </motion.div>

        <motion.div
          ref={paneRef}
          onMouseMove={handlePaneMove}
          onMouseLeave={resetPane}
          style={{ transform: paneTransform }}
          initial={{ opacity: 0, y: 34, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="glass-hero-pane relative w-full max-w-6xl overflow-hidden rounded-[2.5rem] p-6 text-left shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:p-10 lg:p-14"
        >
          <div className="absolute right-8 top-8 hidden items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/55 lg:flex">
            <span className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_16px_rgba(45,212,191,0.9)]" />
            Live finance cockpit
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-teal-200/70">
                Accounting, Reimagined
              </p>
              <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl xl:text-9xl">
                Accounting, Reimagined for the Forward-Thinking Founder.
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-7 text-slate-300/70 sm:text-lg">
                A calm operating layer for books, tax, payroll, reporting, and decisions. Less chasing. More control.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <MagneticButton>
                  <Button
                    nativeButton={false}
                    render={<Link href="#pricing" />}
                    size="lg"
                    className="glow-button h-14 rounded-2xl bg-cyan-200 px-8 text-sm font-black text-[#06111f] hover:bg-white"
                  >
                    Calculate Your Growth
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button
                    nativeButton={false}
                    render={<Link href="#services" />}
                    variant="outline"
                    size="lg"
                    className="h-14 rounded-2xl border-white/10 bg-white/[0.03] px-8 text-sm font-bold text-white/75 hover:bg-white/[0.08]"
                  >
                    View the stack
                  </Button>
                </MagneticButton>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#07111f]/55 p-5 backdrop-blur-2xl">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-white/35">Clarity Index</span>
                <span className="text-sm font-black text-teal-200">94%</span>
              </div>
              <div className="space-y-4">
                {[
                  ['Tax exposure', 'Contained', '86%'],
                  ['Payroll cycle', 'Locked', '74%'],
                  ['Runway read', '12.4 mo', '64%'],
                ].map(([label, value, width]) => (
                  <div key={label}>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-white/45">{label}</span>
                      <span className="font-bold text-white/80">{value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-teal-300"
                        initial={{ width: 0 }}
                        animate={{ width }}
                        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <CircleDollarSign className="mb-4 h-5 w-5 text-cyan-200" />
                  <div className="text-2xl font-black text-white">R0</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/35">Surprise fees</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <BarChart3 className="mb-4 h-5 w-5 text-teal-200" />
                  <div className="text-2xl font-black text-white">24h</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/35">Decision data</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
