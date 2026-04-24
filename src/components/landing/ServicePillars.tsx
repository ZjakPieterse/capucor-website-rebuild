'use client';

import { BarChart2, BookMarked, Users } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const SERVICES = [
  {
    icon: BarChart2,
    title: 'Accounting',
    pitch: 'Compliance and financial reporting, done properly.',
    bullets: [
      'Annual financials',
      'Tax preparation',
      'VAT submission',
      'CIPC compliance',
    ],
    href: '/pricing',
  },
  {
    icon: BookMarked,
    title: 'Bookkeeping',
    pitch: 'Real-time books, reconciled and ready to act on.',
    bullets: [
      'Xero business software',
      'Transaction processing',
      'Monthly recons',
      'Monthly reports',
    ],
    href: '/pricing',
    featured: true,
  },
  {
    icon: Users,
    title: 'Payroll',
    pitch: 'Accurate, compliant payroll for teams of any size.',
    bullets: [
      'Payroll processing and payslips',
      'PAYE and UIF submission',
      'COIDA compliance',
      'IRP5 certificates',
    ],
    href: '/pricing',
  },
];

export function ServicePillars() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="What we do"
            title="One firm. Three disciplines."
            subtitle="Accounting, bookkeeping, and payroll on a single subscription."
          />
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => (
            <ScrollReveal key={svc.title} delay={i * 0.1}>
              <div
                className={cn(
                  'group rounded-xl border bg-card p-8 h-full transition-all duration-200',
                  'hover:-translate-y-0.5 hover:shadow-lg',
                  svc.featured
                    ? 'border-primary/40 shadow-md shadow-primary/10'
                    : 'border-border hover:border-primary/30'
                )}
              >
                <div
                  className={cn(
                    'mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg',
                    svc.featured ? 'bg-primary/15' : 'bg-muted'
                  )}
                >
                  <svc.icon
                    className={cn('h-5 w-5', svc.featured ? 'text-primary' : 'text-foreground')}
                  />
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
