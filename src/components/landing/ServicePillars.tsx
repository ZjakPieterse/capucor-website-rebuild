'use client';

import { BarChart2, BookMarked, Users } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const SERVICES = [
  {
    icon: BarChart2,
    title: 'Accounting',
    pitch: 'Annual financials, tax returns, and SARS and CIPC compliance. Done properly, on time.',
    bullets: [
      'Annual financial statements',
      'Income tax and provisional tax',
      'VAT201 submissions, every cycle',
      'CIPC annual return filings',
    ],
    href: '/pricing',
  },
  {
    icon: BookMarked,
    title: 'Bookkeeping',
    pitch: 'Real-time books, reconciled monthly and ready to make decisions from.',
    bullets: [
      'Xero business software included',
      'Transaction processing and categorisation',
      'Monthly bank reconciliations',
      'Monthly management accounts',
    ],
    href: '/pricing',
    featured: true,
  },
  {
    icon: Users,
    title: 'Payroll',
    pitch: 'Accurate, compliant payroll for South African teams of any size.',
    bullets: [
      'Payroll processing and payslips',
      'PAYE and UIF submission via SimplePay',
      'COIDA compliance',
      'IRP5 certificates',
    ],
    href: '/pricing',
  },
];

export function ServicePillars() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="What we do"
            title="Three disciplines. One subscription."
            subtitle="Accounting, bookkeeping, and payroll. All on one flat monthly subscription."
          />
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => (
            <ScrollReveal key={svc.title} delay={i * 0.1}>
              <div
                className="feature-card group rounded-xl border border-border bg-card p-8 h-full"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                  <svc.icon className="h-5 w-5 text-foreground" />
                </div>

                <h3 className="text-xl font-semibold mb-2">{svc.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{svc.pitch}</p>

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
                  See pricing →
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
