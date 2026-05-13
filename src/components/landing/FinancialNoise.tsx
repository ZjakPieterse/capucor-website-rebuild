'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CheckCircle2, FileText, ShieldCheck } from 'lucide-react';

const NOISE_LABELS = [
  { text: 'Manual Data Entry', top: '18%', left: '8%', rotate: -10, x: '-52vw', y: '-12vh' },
  { text: 'Tax Stress', top: '34%', left: '72%', rotate: 8, x: '48vw', y: '-20vh' },
  { text: 'Hidden Fees', top: '62%', left: '10%', rotate: 7, x: '-48vw', y: '18vh' },
  { text: 'Late Filings', top: '74%', left: '66%', rotate: -7, x: '42vw', y: '22vh' },
  { text: 'Payroll Drift', top: '48%', left: '44%', rotate: 4, x: '18vw', y: '-36vh' },
];

export function FinancialNoise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const lightOpacity = useTransform(scrollYProgress, [0.15, 0.72], [0, 1]);
  const darkOpacity = useTransform(scrollYProgress, [0.05, 0.65], [1, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const interfaceY = useTransform(scrollYProgress, [0.38, 0.82], ['70%', '0%']);
  const interfaceScale = useTransform(scrollYProgress, [0.38, 0.82], [0.88, 1]);

  return (
    <section ref={containerRef} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden
          style={{ opacity: darkOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,0.16),transparent_34%),linear-gradient(135deg,#0A192F,#112240_55%,#07111f)]"
        />
        <motion.div
          aria-hidden
          style={{ opacity: lightOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.16),transparent_32%),linear-gradient(180deg,#f8fbff_0%,#eef7f9_100%)]"
        />

        <motion.div style={{ opacity: headlineOpacity }} className="relative z-10 px-6 text-center">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-cyan-100/45">
            The old operating model
          </p>
          <h2 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            Financial noise keeps founders in reaction mode.
          </h2>
        </motion.div>

        {NOISE_LABELS.map((label) => (
          <NoiseToken key={label.text} label={label} scrollYProgress={scrollYProgress} />
        ))}

        <motion.div
          style={{ y: interfaceY, scale: interfaceScale }}
          className="absolute bottom-[-1px] z-30 w-[min(1120px,calc(100%-32px))] rounded-t-[2.5rem] border border-slate-200/80 bg-white p-4 shadow-[0_-40px_120px_rgba(15,23,42,0.18)] sm:p-6 lg:p-8"
        >
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">Capucor interface</p>
              <h3 className="mt-2 text-3xl font-black tracking-[-0.05em] text-slate-950 lg:text-5xl">
                Operational clarity, rising.
              </h3>
            </div>
            <div className="hidden rounded-2xl bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-widest text-white sm:block">
              Clean books
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">Founder dashboard</span>
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-black text-teal-700">Verified</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['VAT position', 'Ready'],
                  ['Payroll', 'Approved'],
                  ['Cash runway', '12.4 mo'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <CheckCircle2 className="mb-5 h-5 w-5 text-teal-500" />
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</div>
                    <div className="mt-2 text-2xl font-black text-slate-950">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#0A192F] p-5 text-white">
              <ShieldCheck className="mb-6 h-9 w-9 text-cyan-200" />
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-100/45">Noise removed</p>
              <h4 className="mt-3 text-3xl font-black tracking-[-0.05em]">One source of financial truth.</h4>
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <FileText className="h-5 w-5 text-teal-200" />
                <span className="text-sm text-white/65">Monthly pack drafted before the meeting.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


type NoiseLabel = (typeof NOISE_LABELS)[number];

function NoiseToken({
  label,
  scrollYProgress,
}: {
  label: NoiseLabel;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const x = useTransform(scrollYProgress, [0.22, 0.67], ['0vw', label.x]);
  const y = useTransform(scrollYProgress, [0.22, 0.67], ['0vh', label.y]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.62], [0.78, 0.78, 0]);
  const scale = useTransform(scrollYProgress, [0.22, 0.67], [1, 0.72]);

  return (
    <motion.div
      style={{ top: label.top, left: label.left, x, y, opacity, scale, rotate: label.rotate }}
      className="absolute z-20 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-lg font-black tracking-[-0.04em] text-white/65 shadow-2xl backdrop-blur-xl sm:text-3xl"
    >
      {label.text}
    </motion.div>
  );
}
