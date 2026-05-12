'use client';

import { BookCheck, CalendarCheck, BarChart2, Lightbulb } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const OUTCOMES = [
  {
    icon: BookCheck,
    title: 'Clean, current books',
    body: 'Your Xero ledger stays reconciled and decision-ready. When the bank, SARS, a funder or your own management team needs a number, you are not scrambling to catch up.',
  },
  {
    icon: CalendarCheck,
    title: 'Compliance under control',
    body: 'VAT201, EMP201, provisional tax, income tax and CIPC deadlines are tracked through a structured workflow, not memory, inboxes or last-minute panic.',
  },
  {
    icon: BarChart2,
    title: 'Monthly reports that explain what changed',
    body: 'You receive a concise monthly view of revenue, expenses, cash flow, debtors and anything unusual that deserves attention.',
  },
  {
    icon: Lightbulb,
    title: 'Advisory that starts with your numbers',
    body: 'We review what the numbers are saying and raise the risks, opportunities and planning points worth discussing, from tax timing to cash pressure.',
  },
];

export function WhyCapucor() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="What you get"
            title="Four outcomes you can rely on."
            subtitle="The point is not more reports. It is a finance rhythm where the books are current, deadlines are visible, reports are reviewed, and important issues are raised early."
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
