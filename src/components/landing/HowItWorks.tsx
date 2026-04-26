'use client';

import { Phone, Calculator, Laptop, RefreshCw } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STEPS = [
  {
    icon: Phone,
    number: '1',
    label: '01',
    title: 'Discovery Call',
    body: 'A 30-minute call to understand your business, current setup, and what good looks like for your finances.',
  },
  {
    icon: Calculator,
    number: '2',
    label: '02',
    title: 'Scoping & Pricing',
    body: 'We scope exactly which services you need, confirm your bracket, and lock in a fixed monthly fee — no ambiguity.',
  },
  {
    icon: Laptop,
    number: '3',
    label: '03',
    title: 'Tech Stack Onboarding',
    body: 'We migrate your data into Xero and connect your tools. Most clients are fully onboarded within 14 days.',
  },
  {
    icon: RefreshCw,
    number: '4',
    label: '04',
    title: 'Monthly Cadence + Advisory',
    body: 'EMP201s, VAT201s, provisional tax — filed on the correct dates, every period. Monthly management accounts delivered by the 15th. Your accountant is accessible, not absent.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How it works"
            title="From first call to monthly cadence in under 14 days."
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
              <ScrollReveal key={step.label} delay={i * 0.12}>
                <div className="relative flex flex-col items-center text-center px-4">
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
                    <span className="text-xl font-bold text-primary leading-none">
                      {step.number}
                    </span>
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
                    <span className="text-base font-bold text-primary leading-none">
                      {step.number}
                    </span>
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
