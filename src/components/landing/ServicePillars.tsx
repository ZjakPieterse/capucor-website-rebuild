'use client';

import { BarChart2, BookMarked, Users } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const SERVICES = [
  {
    icon: BarChart2,
    title: 'Accounting',
    pitch: 'Annual financials, tax and statutory compliance handled properly and on time.',
    bestFor: 'Companies that need AFS, income tax, VAT and CIPC responsibilities managed by professionals.',
    bullets: [
      'Annual financial statements',
      'Income tax and provisional tax',
      'VAT201 reporting and submission',
      'CIPC annual return filings',
    ],
    href: '/accounting',
    ctaLabel: 'View accounting support',
  },
  {
    icon: BookMarked,
    title: 'Bookkeeping',
    pitch: 'Current Xero records and monthly management accounts you can actually use.',
    bestFor: 'Businesses that want their ledger processed, reconciled and ready for decisions every month.',
    bullets: [
      'Xero business software included',
      'Transaction processing and categorisation',
      'Monthly bank reconciliations',
      'Monthly management accounts',
    ],
    href: '/bookkeeping',
    ctaLabel: 'View bookkeeping support',
    featured: true,
  },
  {
    icon: Users,
    title: 'Payroll',
    pitch: 'Accurate payroll, payslips and SARS/UIF compliance without spreadsheet risk.',
    bestFor: 'Employers that want payroll handled correctly, confidentially and on time.',
    bullets: [
      'Payroll processing and payslips',
      'PAYE and UIF submissions',
      'COIDA compliance',
      'IRP5 certificates',
    ],
    href: '/payroll',
    ctaLabel: 'View payroll support',
  },
];

export function ServicePillars() {
  return (
    <section id="services" className="premium-section py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="What we do"
            title="Three disciplines. One subscription."
            subtitle="Accounting, bookkeeping, and payroll. All on one flat monthly subscription."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc, i) => (
            <ScrollReveal key={svc.title} delay={i * 0.1}>
              <div
                className="premium-card feature-card group h-full rounded-[1.75rem] p-8"
              >
                <div className="premium-icon mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <svc.icon className="h-5 w-5 text-foreground" />
                </div>

                <h3 className="text-xl font-semibold mb-2">{svc.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{svc.pitch}</p>

                <p className="text-xs leading-relaxed mb-5">
                  <span className="font-semibold text-foreground">Best for: </span>
                  <span className="text-muted-foreground">{svc.bestFor}</span>
                </p>

                <ul className="space-y-2 mb-6">
                  {svc.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href={svc.href}
                  className="text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  {svc.ctaLabel} →
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <a
              href="/pricing"
              className="premium-button inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-primary/95"
            >
              Build your subscription →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
