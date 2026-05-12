'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface OutcomeCard {
  label: string;
  before: string;
  after: string;
  metricValue: string;
  metricLabel: string;
}

const OUTCOMES: OutcomeCard[] = [
  {
    label: 'Professional services business · 2 directors · VAT registered',
    before:
      'Books three months behind. VAT201 filed late once, triggering a SARS penalty. Accountant unreachable at year-end. Financial statements took six weeks to finalise.',
    after:
      'Monthly close completed by the 10th. Zero late filings across 12 months. Year-end took four days. The records were already clean.',
    metricValue: '12 months',
    metricLabel: 'Zero late filings',
  },
  {
    label: 'Retail business · 8 employees · monthly payroll',
    before:
      'Payroll calculated manually in spreadsheets each month. IRP5 certificates issued six weeks late. One SARS penalty for an EMP201 error that went unnoticed for two cycles.',
    after:
      'Payroll processed through SimplePay every month. IRP5s filed before the May deadline. When SARS queried the prior-year error, clean records meant it was resolved without escalation.',
    metricValue: 'First clean',
    metricLabel: 'Payroll year-end',
  },
  {
    label: 'Product business · R3–5M turnover · stock and VAT pressure',
    before:
      'No management accounts. Cash decisions made by checking the bank balance. Surprised by a R40,000 VAT liability the month before a planned equipment purchase.',
    after:
      'Monthly P&L and balance sheet delivered by the 15th. Cash runway tracked every month. Seasonal dips visible in the P&L two months before they hit the bank balance.',
    metricValue: 'Monthly P&L',
    metricLabel: 'Delivered by the 15th',
  },
];

export function OutcomeStories() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Client outcomes"
            title="What changes when finance works properly"
            subtitle="Anonymised examples of the type of finance problems SME owners bring to us, and what changes once there is a proper monthly rhythm in place."
          />
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OUTCOMES.map((card, i) => (
            <ScrollReveal key={card.label} delay={i * 0.1}>
              <div className="rounded-xl border border-border bg-card overflow-hidden h-full flex flex-col transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">

                {/* Client label */}
                <div className="px-6 pt-6 pb-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {card.label}
                  </p>
                </div>

                {/* Before */}
                <div className="mx-6 mb-4 rounded-lg bg-destructive/8 border border-destructive/15 p-4">
                  <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2">Before</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.before}</p>
                </div>

                {/* After */}
                <div className="mx-6 mb-6 rounded-lg bg-primary/8 border border-primary/15 p-4 flex-1">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">After</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.after}</p>
                </div>

                {/* Metric */}
                <div className="px-6 pb-6 border-t border-border pt-4">
                  <p className="text-2xl font-bold tracking-tight text-foreground leading-none">
                    {card.metricValue}
                  </p>
                  <p className="mt-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {card.metricLabel}
                  </p>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
