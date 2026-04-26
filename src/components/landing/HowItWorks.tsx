'use client';

import { Inbox, Cog, Eye, BarChart2, MessageSquare } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STEPS = [
  {
    icon: Inbox,
    number: '1',
    label: 'CAPTURE',
    title: 'Capture',
    body: 'Documents, receipts, and bank feeds are pulled in automatically via Xero and Dext. No chasing suppliers for invoices, no manual uploads.',
  },
  {
    icon: Cog,
    number: '2',
    label: 'PROCESS',
    title: 'Process',
    body: 'Transactions are coded, categorised, and reconciled against your bank feeds. Payroll, VAT registers, and debtors are kept current throughout the month.',
  },
  {
    icon: Eye,
    number: '3',
    label: 'REVIEW',
    title: 'Review',
    body: 'A senior accountant reviews your books each month and flags anything unusual — missed deductions, cost overruns, or transactions that need your attention.',
  },
  {
    icon: BarChart2,
    number: '4',
    label: 'REPORT',
    title: 'Report',
    body: 'Monthly management accounts are delivered by the 15th. Revenue, expenses, cash flow, and debtors — clear and actionable, every month.',
  },
  {
    icon: MessageSquare,
    number: '5',
    label: 'ADVISE',
    title: 'Advise',
    body: 'Your accountant raises issues before they become problems — tax structuring, cash-flow timing, B-BBEE certificates. Included in your subscription, not an extra call-out.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How the monthly finance system works"
            title="A system, not ad-hoc work."
            subtitle="Every month runs the same five-step cycle — so your numbers are always current, your filings are always on time, and your accountant is always ahead."
          />
        </ScrollReveal>

        {/* ── Desktop: horizontal timeline ─────────────────────────── */}
        <div className="mt-16 hidden lg:block">
          {/* gap-0 is required: the line positioning math assumes columns are flush.
              left: calc(50%+32px) = right edge of the icon (centered in column).
              right: calc(-50%+32px) = extends past the column boundary by exactly
              col_width/2 - 32px, landing at the left edge of the next icon. */}
          <div className="grid grid-cols-5 gap-0">
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.label} delay={i * 0.1}>
                <div className="relative flex flex-col items-center text-center px-3">
                  {i < STEPS.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute top-8 h-0.5 pointer-events-none"
                      style={{
                        left: 'calc(50% + 32px)',
                        right: 'calc(-50% + 32px)',
                        background:
                          'linear-gradient(to right, color-mix(in oklch, var(--primary) 60%, transparent), transparent)',
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/40">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="w-full border-t border-primary/20 pt-5">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                      {step.label}
                    </p>
                    <h3 className="text-base font-semibold mb-2 leading-snug">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical left-side timeline ──────────────────── */}
        <div className="mt-12 lg:hidden">
          {STEPS.map((step, i) => {
            const isLast = i === STEPS.length - 1;
            return (
              <ScrollReveal key={step.label} delay={i * 0.1}>
                <div className="relative flex gap-5 pb-10">
                  {/* Vertical line segment — hidden on last step */}
                  {!isLast && (
                    <div
                      aria-hidden
                      className="absolute left-6 top-12 bottom-0 w-[2px] pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 50%, transparent), color-mix(in oklch, var(--border) 20%, transparent))',
                      }}
                    />
                  )}

                  {/* Node */}
                  <div className="relative z-10 shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/40 ring-4 ring-background">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-0.5">
                      {step.label}
                    </p>
                    <h3 className="text-base font-semibold mb-1.5 leading-snug">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
