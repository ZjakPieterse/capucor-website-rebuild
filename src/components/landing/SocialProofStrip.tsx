'use client';

import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { motion } from 'motion/react';

const METRICS = [
  { number: 175, suffix: '+', label: 'Businesses supported' },
  { number: 14, suffix: '+', label: 'Years in practice' },
  { number: 0, suffix: '', label: 'Late SARS filings in 2025' },
];

const PARTNERS = ['Xero', 'Dext', 'Syft', 'SimplePay', 'Karbon', 'Draftworx'];

const CREDENTIALS = [
  { name: 'SAICA', label: 'Member firm' },
  { name: 'Xero', label: 'Gold Partner' },
];

export function SocialProofStrip() {
  return (
    <section
      aria-label="Trust signals and partners"
      className="relative z-30 -mt-16 lg:-mt-20 mb-12 lg:mb-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[40px] bg-[#070c1a]/80 backdrop-blur-3xl border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.4)]"
        >
          {/* Internal Glows */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 bg-emerald-500/5 blur-3xl rounded-full" />
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/5 blur-3xl rounded-full" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_auto_1fr_auto_auto] items-center gap-10 lg:gap-12 px-8 py-10 lg:px-12 lg:py-10">

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 lg:gap-10">
              {METRICS.map((m) => (
                <div key={m.label} className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold font-mono tracking-tighter text-white">
                    <AnimatedNumber to={m.number} suffix={m.suffix} />
                  </div>
                  <div className="text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-white/30 mt-2 leading-none">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <div aria-hidden className="hidden lg:block h-16 w-px bg-white/5" />

            {/* Partners */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-center lg:text-left text-emerald-400">
                The Capucor Engine
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
                {PARTNERS.map((p) => (
                  <span
                    key={p}
                    className="text-sm font-bold text-white/40 hover:text-white/80 transition-colors"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div aria-hidden className="hidden lg:block h-16 w-px bg-white/5" />

            {/* Credentials */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-3">
              {CREDENTIALS.map((c) => (
                <div
                  key={c.name}
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-5 py-2.5 transition-all hover:bg-white/10"
                >
                  <span className="text-sm font-bold text-white">{c.name}</span>
                  <div className="w-px h-3 bg-white/10" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
