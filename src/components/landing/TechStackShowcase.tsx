'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const TOOLS = [
  {
    name: 'Xero',
    tagline: 'Real-time ledger',
    benefit:
      'Your numbers are current, not a month behind. Every transaction categorised and reconciled — so your management accounts are ready when you need them.',
  },
  {
    name: 'Dext',
    tagline: 'Auto-captured receipts',
    benefit:
      'Snap a photo; the receipt is processed and matched automatically. No more shoebox accounting at year-end.',
  },
  {
    name: 'Syft',
    tagline: 'Live dashboards',
    benefit:
      'Financial clarity on demand. Revenue, expenses, and cash position in one place — no waiting for a report.',
  },
  {
    name: 'Karbon',
    tagline: 'Structured workflows',
    benefit:
      'VAT deadlines, EMP201s, CIPC returns — every submission tracked and assigned. Nothing falls through the cracks.',
  },
];

export function TechStackShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our tech stack"
            title="The tools your finances deserve."
            subtitle="South African SMEs are still running their books on spreadsheets. We moved past that years ago."
          />
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS.map((tool, i) => (
            <ScrollReveal key={tool.name} delay={i * 0.08}>
              <div className="rounded-xl border border-border bg-card p-6 h-full">
                {/* Tool name badge */}
                <div className="mb-4 inline-flex items-center rounded-lg border border-primary/30 bg-primary/8 px-3 py-1.5">
                  {/* [EDITABLE] swap text with SVG logo from public/logos/tools/ */}
                  <span className="text-sm font-semibold text-primary">{tool.name}</span>
                </div>

                <p className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                  {tool.tagline}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.benefit}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
