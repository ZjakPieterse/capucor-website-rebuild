'use client';

import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { Separator } from '@/components/ui/separator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const METRICS = [
  { number: 175, suffix: '+', label: 'Businesses supported' },
  { number: 14, suffix: '+', label: 'Years in practice' },
];

const CREDENTIALS = [
  { name: 'SAICA', label: 'Member' },
  { name: 'Xero', label: 'Gold Partner' },
];

export function SocialProofStrip() {
  return (
    <section className="border-y border-border bg-muted/40 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {/* Metrics */}
            <div className="flex items-center gap-10">
              {METRICS.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-3xl font-bold font-mono" style={{ color: 'var(--brand-navy)' }}>
                    <AnimatedNumber to={m.number} suffix={m.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            <Separator orientation="vertical" className="h-12 hidden md:block" />

            {/* Credentials */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {CREDENTIALS.map((c) => (
                <div
                  key={c.name}
                  className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3"
                >
                  <span className="text-lg font-semibold">{c.name}</span>
                  <span className="text-base text-muted-foreground">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
