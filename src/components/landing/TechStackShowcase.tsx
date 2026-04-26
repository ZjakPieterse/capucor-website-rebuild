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
      'Financial clarity on demand. Revenue, expenses, and cash position in one place — no waiting for a scheduled report.',
  },
  {
    name: 'Karbon',
    tagline: 'Structured workflows',
    benefit:
      'VAT deadlines, EMP201s, CIPC returns — every submission tracked, assigned, and completed. Nothing falls through the cracks.',
  },
  {
    name: 'SimplePay',
    tagline: 'Compliant payroll',
    benefit:
      'Accurate payslips, PAYE and UIF submissions, and IRP5 certificates — processed on time, every pay run, with full SARS compliance.',
  },
  {
    name: 'Draftworx',
    tagline: 'Professional financials',
    benefit:
      'Annual financial statements drafted and reviewed to the standard required by SARS, your bank, and potential funders.',
  },
];

export function TechStackShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our tech stack"
            title="Best-in-class cloud tools, so your data is always accurate."
            subtitle="We use purpose-built software at every step — so your numbers are accessible, secure, and ready when you need them."
          />
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool, i) => (
            <ScrollReveal key={tool.name} delay={i * 0.07}>
              <div className="rounded-xl border border-border bg-card p-6 h-full transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
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
