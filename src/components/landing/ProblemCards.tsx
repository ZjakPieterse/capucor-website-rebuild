'use client';

import { BookOpen, AlertCircle, Unplug, Clock } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const PROBLEMS = [
  {
    icon: BookOpen,
    title: 'Messy, outdated books',
    body: 'Your financials are weeks behind. When you need a number — for the bank, a funder, or yourself — no one can give you a straight answer.',
  },
  {
    icon: AlertCircle,
    title: 'Surprise tax bills',
    body: 'Provisional tax, EMP201s, VAT201s — SARS penalties don\'t care that you forgot. And your accountant is nowhere to be found when you need them.',
  },
  {
    icon: Unplug,
    title: 'Disconnected tools',
    body: 'Spreadsheets, emails, a bank statement — all in different places, none of them talking. Cash flow, debtors, and VAT liability are invisible until you dig.',
  },
  {
    icon: Clock,
    title: 'No time for decisions',
    body: 'You are spending your week chasing debtor payments and sorting receipts instead of running the business.',
  },
];

export function ProblemCards() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="The problem"
            title="Your business is moving faster than your finance function."
            subtitle="Late submissions, unclear numbers, reactive accounting. While you focus on growth, the books fall behind — and by the time you notice, the damage is done."
          />
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROBLEMS.map((problem, i) => (
            <ScrollReveal key={problem.title} delay={i * 0.08}>
              <div className="rounded-xl border border-border bg-card p-6 h-full transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-lg hover:border-muted-foreground/20">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                  <problem.icon className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="text-base font-semibold mb-2">{problem.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{problem.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
