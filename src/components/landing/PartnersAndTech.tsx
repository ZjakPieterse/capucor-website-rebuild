'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

const PARTNERS = [
  { name: 'Xero',      href: 'https://www.xero.com/za/' },
  { name: 'Dext',      href: 'https://dext.com/za' },
  { name: 'SimplePay', href: 'https://www.simplepay.co.za/' },
  { name: 'Karbon',    href: 'https://karbonhq.com/' },
  { name: 'Draftworx', href: 'https://draftworx.com/' },
  { name: 'SAICA',     href: 'https://www.saica.org.za/' },
  { name: 'Intersect', href: 'https://intersectconnect.com/' },
  { name: 'Syft',      href: 'https://www.syftanalytics.com/' },
];

const MARQUEE_ROW = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

export function PartnersAndTech() {
  return (
    <section
      aria-label="Partners and tech we work with"
      className="relative -mt-12 lg:-mt-20 border-y border-border/40 bg-background py-8 lg:py-10"
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
            <li key={`${p.name}-${i}`} className="shrink-0">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="logo-placeholder text-lg font-medium tracking-wide text-muted-foreground/80 transition-colors hover:text-foreground"
              >
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
