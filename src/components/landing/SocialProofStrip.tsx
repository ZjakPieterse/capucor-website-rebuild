'use client';

import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { Separator } from '@/components/ui/separator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const ITEMS = [
  { animate: true, number: 175, suffix: '+', label: 'SMEs served' },
  { animate: true, number: 14, suffix: '+', label: 'Years in practice' },
  { animate: false, text: 'SAICA', label: 'member' },
  { animate: false, text: 'Xero', label: 'Gold Partner' },
];

export function SocialProofStrip() {
  return (
    <section className="border-y border-border bg-muted/40 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
            {ITEMS.map((item, i) => (
              <div key={item.label} className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold font-mono" style={{ color: 'var(--brand-navy)' }}>
                    {item.animate ? (
                      <AnimatedNumber to={item.number!} suffix={item.suffix} />
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
                </div>
                {i < ITEMS.length - 1 && (
                  <Separator orientation="vertical" className="h-10 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
