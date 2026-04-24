'use client';

import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { Separator } from '@/components/ui/separator';

const STATS = [
  { label: 'Years in practice', value: 14, suffix: '+' },
  { label: 'SMEs served', value: 175, suffix: '+' },
];

export function SocialProofStrip() {
  return (
    <section className="border-y border-border bg-muted/40 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-8">
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

          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: 'var(--brand-cyan)' }}>SAICA</div>
            <div className="text-sm text-muted-foreground mt-1">Accredited</div>
          </div>
        </div>

      </div>
    </section>
  );
}
