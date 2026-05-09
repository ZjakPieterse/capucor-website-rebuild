'use client';

import { BookCheck, CalendarCheck, BarChart2, Lightbulb } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const OUTCOMES = [
  {
    icon: BookCheck,
    title: 'Clean, current books',
    body: 'Your Xero ledger is reconciled every month. Every transaction coded, every bank account matched. Ask us for any number at any time and you will get a straight answer.',
  },
  {
    icon: CalendarCheck,
    title: 'On-time compliance, every period',
    body: 'VAT201s, EMP201s, provisional tax, and CIPC annual returns — filed on the correct dates, every cycle. No penalties, no last-minute scrambling.',
  },
  {
    icon: BarChart2,
    title: 'Monthly management reports',
    body: 'A concise management account pack delivered by the 15th of each month. Revenue, expenses, cash flow, and debtors — in one place, every time.',
  },
  {
    icon: Lightbulb,
    title: 'Proactive advisory included',
    body: 'Your accountant reviews your numbers and raises issues before they become problems. Tax structuring, cash-flow timing, B-BBEE certificates — included, not billable.',
  },
];

export function WhyCapucor() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="What you get"
            title="Four outcomes, every month, without fail."
            subtitle="Your subscription delivers concrete results — not ad-hoc work when you happen to call."
          />
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {OUTCOMES.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <div className="outcome-card flex gap-5 rounded-xl border border-border bg-card p-6 h-full">
                <div className="shrink-0 mt-0.5 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
