'use client';

import Link from 'next/link';
import { BookOpen, AlertCircle, Unplug, Clock, CheckCircle2, CalendarCheck, Link2, Zap, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const PROBLEMS = [
  {
    icon: BookOpen,
    title: 'Messy, outdated books',
    body: 'Your financials are weeks behind. When the bank, a funder, SARS or your own management team needs a number, the answer takes too long.',
    solution: {
      icon: CheckCircle2,
      title: 'Current books. Clear answers.',
      body: 'We keep your Xero ledger reconciled and decision-ready, so important numbers are not buried in bank feeds, inboxes or spreadsheets.',
    },
  },
  {
    icon: AlertCircle,
    title: 'Deadline pressure',
    body: 'VAT, EMP201, provisional tax, CIPC and payroll dates create constant background pressure. SARS penalties don\'t wait for admin to catch up.',
    solution: {
      icon: CalendarCheck,
      title: 'Deadlines tracked properly.',
      body: 'Your compliance dates are managed through a structured workflow with clear ownership, review points and filing status.',
    },
  },
  {
    icon: Unplug,
    title: 'Disconnected tools',
    body: 'Receipts, invoices, payroll, bank transactions and reports sit in different places, making cash flow and VAT exposure harder to see.',
    solution: {
      icon: Link2,
      title: 'One connected finance workflow.',
      body: 'We connect the tools properly so capture, processing, reconciliation and reporting work as one monthly system.',
    },
  },
  {
    icon: Clock,
    title: 'Too much owner involvement',
    body: 'You spend time chasing slips, checking payments, answering finance questions and trying to make sense of reports instead of running the business.',
    solution: {
      icon: Zap,
      title: 'A finance rhythm you can rely on.',
      body: 'You know what to provide, when to provide it, and what you will receive back each month, with Capucor owning the finance process from there.',
    },
  },
];

export function ProblemCards() {
  return (
    <section className="premium-section py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="The problem"
            title="Your business has outgrown its finance function"
            subtitle="Late submissions, unclear numbers, reactive accounting. While you focus on growth, the books fall behind. By the time you notice, the damage is done."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((problem, i) => (
            <ScrollReveal key={problem.title} delay={i * 0.08} className="h-full">
              <div className="premium-card problem-card flex h-full flex-col rounded-[1.5rem] p-6">

                {/* Problem */}
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="premium-icon inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-destructive/15 bg-destructive/10">
                      <problem.icon className="h-5 w-5 text-destructive" />
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-destructive/80">
                      Problem
                    </div>
                  </div>
                  <h3 className="text-base font-semibold mb-2">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{problem.body}</p>
                </div>

                {/* Divider */}
                <div className="my-5 border-t border-white/8" aria-hidden />

                {/* Fix */}
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="premium-icon inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/10">
                      <problem.solution.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                      Capucor fixes this
                    </div>
                  </div>
                  <h3 className="text-base font-semibold mb-2">{problem.solution.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{problem.solution.body}</p>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              See how the monthly system works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
