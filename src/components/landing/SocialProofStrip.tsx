'use client';

import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { Separator } from '@/components/ui/separator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const STATS = [
  { label: 'Years in practice', value: 14, suffix: '+' },
  { label: 'SMEs served', value: 175, suffix: '+' },
];

const BADGES = [
  { label: 'SAICA member' },
  { label: 'Xero partner' },
  { label: 'POPIA compliant' },
  { label: 'Fixed monthly pricing' },
];

export function SocialProofStrip() {
  return (
    <section className="border-y border-border bg-muted/40 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold font-mono" style={{ color: 'var(--brand-navy)' }}>
                  <AnimatedNumber to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
              {i < STATS.length - 1 && (
                <Separator orientation="vertical" className="h-10 hidden sm:block" />
              )}
            </div>
          ))}

          <Separator orientation="vertical" className="h-10 hidden sm:block" />

          {BADGES.map((badge, i) => (
            <div key={badge.label} className="flex items-center gap-8">
              <div className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5">
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
              {i < BADGES.length - 1 && (
                <Separator orientation="vertical" className="h-6 hidden lg:block" />
              )}
            </div>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
