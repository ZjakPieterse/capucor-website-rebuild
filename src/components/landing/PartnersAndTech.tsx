'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { motion } from 'motion/react';

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

export function PartnersAndTech() {
  return (
    <section
      aria-label="Partners and tech we work with"
      className="relative border-y border-border/40 bg-background/40 py-10 lg:py-12"
    >
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p
            className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70 mb-6"
          >
            Trusted partners &amp; tools
          </p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 lg:gap-x-14"
          >
            {PARTNERS.map((p) => (
              <span
                key={p.name}
                className="logo-placeholder text-sm font-medium tracking-wide text-muted-foreground/80 transition-colors hover:text-foreground"
              >
                {p.name}
              </span>
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
