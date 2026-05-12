'use client';

import Link from 'next/link';
import { Inbox, Cog, BarChart2, MessageSquare, ArrowRight, Calendar } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/config/site';

const STEPS = [
  {
    icon: Inbox,
    number: '1',
    title: 'Collect & Collaborate',
    body: 'You know exactly what to send, where to send it, and by when. We make the monthly admin clear and repeatable, so both sides can deliver properly.',
  },
  {
    icon: Cog,
    number: '2',
    title: 'Process & Reconcile',
    body: 'We capture, code and reconcile the month’s activity in Xero, including bank feeds, supplier invoices, payroll entries and key control accounts.',
  },
  {
    icon: BarChart2,
    number: '3',
    title: 'Review & Report',
    body: 'A senior accountant checks the numbers before they reach you. You receive a clear monthly report showing performance, cash flow, debtors and anything that needs attention.',
  },
  {
    icon: MessageSquare,
    number: '4',
    title: 'Advise & Plan',
    body: 'We turn the report into useful business conversation: tax timing, cash pressure, margin movement, compliance risks and practical next steps.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How it works"
            title="A monthly rhythm that keeps your business in control."
            subtitle="Great finance work needs a clear monthly rhythm. You provide the documents, approvals and answers we need. We process, review, report and advise from there. So the month closes properly and your business stays in control."
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

      {/* Bottom CTA */}
      <ScrollReveal delay={0.4}>
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">Ready to put a proper monthly finance rhythm in place?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-input bg-input/30 px-5 py-2.5 text-sm font-semibold hover:bg-input/50 transition-all hover:scale-[1.03]"
            >
              Build your subscription
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={siteConfig.links.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Calendar className="h-4 w-4" />
              Book a 15-minute fit call
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
