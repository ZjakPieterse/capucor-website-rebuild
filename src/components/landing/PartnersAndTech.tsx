'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

const PARTNERS = [
  { name: 'Xero',              type: 'tool' },
  { name: 'Dext',              type: 'tool' },
  { name: 'Syft',              type: 'tool' },
  { name: 'SimplePay',         type: 'tool' },
  { name: 'Karbon',            type: 'tool' },
  { name: 'Draftworx',         type: 'tool' },
  { name: 'SAICA',             type: 'membership' },
  { name: 'Xero Gold Partner', type: 'membership' },
];

const MARQUEE_ROW = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

export function PartnersAndTech() {
  return (
    <section
      aria-label="Partners and tech we work with"
      className="relative -mt-12 lg:-mt-20 border-y border-border/40 bg-background/40 py-8 lg:py-10"
    >
      <ScrollReveal>
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70 mb-6">
          Trusted partners &amp; tools
        </p>
      </ScrollReveal>

      <div className="partners-marquee-mask relative overflow-hidden">
        <ul
          className="animate-marquee flex w-max items-center gap-x-12 lg:gap-x-16 px-6"
          role="list"
        >
          {MARQUEE_ROW.map((p, i) => (
            <li
              key={`${p.name}-${i}`}
              className="logo-placeholder shrink-0 text-lg font-medium tracking-wide text-muted-foreground/80 transition-colors hover:text-foreground"
            >
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
