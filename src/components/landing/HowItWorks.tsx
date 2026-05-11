'use client';

import { Inbox, Cog, BarChart2, MessageSquare } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STEPS = [
  {
    icon: Inbox,
    number: '1',
    title: 'Collect & Collaborate',
    body: 'We start with a clear monthly information flow between your team and ours. You upload documents, share key updates, and respond to requests on time so we have what we need to keep your finance function moving. When information flows properly, we can deliver accurate, timely work.',
  },
  {
    icon: Cog,
    number: '2',
    title: 'Process & Reconcile',
    body: 'Your books are closed, reconciled, and up to date by the time the month ends. Every bank feed, supplier invoice, and payroll entry is captured and coded correctly.',
  },
  {
    icon: BarChart2,
    number: '3',
    title: 'Review & Report',
    body: 'You receive a management report that tells you exactly where the business stands. Before it lands, every number has been checked and anything worth your attention is flagged.',
  },
  {
    icon: MessageSquare,
    number: '4',
    title: 'Advise & Plan',
    body: 'You leave each month clear on what the numbers mean and what needs to happen next. We use your financials to surface opportunities, flag risks, and help you make better decisions.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How the monthly finance system works"
            title="A monthly rhythm that keeps you in control."
            subtitle="Our FinTeam solution works best when there is clear collaboration between your business and our team. You provide the information we need, and we turn that into accurate records, useful reports, and practical advice you can use to make better decisions."
          />
        </ScrollReveal>

        {/* ── Desktop: horizontal timeline ─────────────────────────── */}
        <div className="mt-16 hidden lg:block">
          {/* gap-0 is required: the line positioning math assumes columns are flush.
              left: calc(50%+32px) = right edge of the icon (centered in column).
              right: calc(-50%+32px) = extends past the column boundary by exactly
              col_width/2 - 32px, landing at the left edge of the next icon. */}
          <div className="grid grid-cols-4 gap-0">
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.1}>
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
              <ScrollReveal key={step.title} delay={i * 0.1}>
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
