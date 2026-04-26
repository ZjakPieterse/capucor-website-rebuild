'use client';

import { BookOpen, AlertCircle, Unplug, Clock, CheckCircle2, CalendarCheck, Link2, Zap, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const PROBLEMS = [
  {
    icon: BookOpen,
    title: 'Messy, outdated books',
    body: 'Your financials are weeks behind. When you need a number — for the bank, a funder, or yourself — no one can give you a straight answer.',
    solution: {
      icon: CheckCircle2,
      title: 'Real-time books. Always ready.',
      body: 'Reconciled weekly, automated, and live. Pull a clean P&L or balance sheet on demand — no waiting, no chasing, no surprises.',
    },
  },
  {
    icon: AlertCircle,
    title: 'Surprise tax bills',
    body: 'Provisional tax, EMP201s, VAT201s — SARS penalties don\'t care that you forgot. And your accountant is nowhere to be found when you need them.',
    solution: {
      icon: CalendarCheck,
      title: 'Every deadline. On time.',
      body: 'We track every VAT201, EMP201, and provisional tax date. Submissions go out before they\'re due — SARS penalties stay someone else\'s problem.',
    },
  },
  {
    icon: Unplug,
    title: 'Disconnected tools',
    body: 'Spreadsheets, emails, a bank statement — all in different places, none of them talking. Cash flow, debtors, and VAT liability are invisible until you dig.',
    solution: {
      icon: Link2,
      title: 'One live view. Everything connected.',
      body: 'Bank, invoices, and accounting synced in one place. Your cash flow, debtors, and VAT exposure visible the moment you need them.',
    },
  },
  {
    icon: Clock,
    title: 'No time for decisions',
    body: 'You are spending your week chasing debtor payments and sorting receipts instead of running the business.',
    solution: {
      icon: Zap,
      title: 'Finance handled. Focus reclaimed.',
      body: 'We own the admin, the follow-ups, and the filings — so your week is spent on strategy, not spreadsheets.',
    },
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
            <ScrollReveal key={problem.title} delay={i * 0.08} className="h-full">
              <div className="problem-card h-full rounded-xl border border-border">
                <div className="problem-card-inner">

                  {/* Front face — Problem */}
                  <div className="problem-card-face rounded-xl bg-card p-6 flex flex-col">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                      <problem.icon className="h-5 w-5 text-destructive" />
                    </div>
                    <h3 className="text-base font-semibold mb-2">{problem.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{problem.body}</p>
                  </div>

                  {/* Back face — Solution */}
                  <div className="problem-card-face problem-card-back rounded-xl bg-card p-6 flex flex-col justify-between">
                    <div>
                      <div className="mb-3 text-[10px] font-bold tracking-[0.2em] text-primary uppercase">The fix</div>
                      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <problem.solution.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-base font-semibold mb-2">{problem.solution.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{problem.solution.body}</p>
                    </div>
                    <div className="mt-4 text-xs font-medium text-primary flex items-center gap-1">
                      <span>Capucor takes care of this</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
