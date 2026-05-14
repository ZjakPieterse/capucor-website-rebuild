'use client';

import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
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
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="trust-banner relative overflow-hidden rounded-2xl"
          >
            {/* Glass surface */}
            <div className="trust-banner-glow pointer-events-none absolute inset-0" aria-hidden />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_auto_1fr_auto_auto] items-center gap-8 lg:gap-10 px-6 py-7 lg:px-10 lg:py-8">

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-5 lg:gap-7">
                {METRICS.map((m) => (
                  <div key={m.label} className="text-center lg:text-left">
                    <div className="text-2xl lg:text-3xl font-bold font-mono leading-none text-primary">
                      <AnimatedNumber to={m.number} suffix={m.suffix} />
                    </div>
                    <div className="text-[11px] lg:text-xs text-muted-foreground mt-1.5 leading-snug">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div aria-hidden className="hidden lg:block h-12 w-px bg-border" />

              {/* Partners */}
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-3 text-center lg:text-left"
                  style={{ color: 'var(--brand-cyan)' }}
                >
                  Tools we run on
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2">
                  {PARTNERS.map((p) => (
                    <span
                      key={p}
                      className="text-sm font-medium text-muted-foreground"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div aria-hidden className="hidden lg:block h-12 w-px bg-border" />

              {/* Credentials */}
              <div className="flex flex-wrap justify-center lg:justify-end gap-2.5">
                {CREDENTIALS.map((c) => (
                  <div
                    key={c.name}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3.5 py-1.5 backdrop-blur-sm"
                  >
                    <span className="text-sm font-semibold">{c.name}</span>
                    <span className="text-xs text-muted-foreground">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
