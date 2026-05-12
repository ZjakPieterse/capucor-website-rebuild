'use client';

import { useState } from 'react';
import { BarChart2, BookMarked, Users, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import type { Service } from '@/types';

const SERVICE_ICONS: Record<string, React.ElementType> = {
  accounting: BarChart2,
  bookkeeping: BookMarked,
  payroll: Users,
};

const SERVICE_DELIVERABLES: Record<string, string[]> = {
  accounting: ['Annual financial statements', 'VAT & income tax returns', 'CIPC compliance'],
  bookkeeping: ['Monthly reconciliation', 'Xero software included', 'Supplier processing'],
  payroll: ['Payslips & EMP201 submissions', 'Leave & deduction management', 'UIF compliance'],
};

const SERVICE_FULL_SCOPE: Record<
  string,
  { title: string; description: string }[]
> = {
  accounting: [
    {
      title: 'Annual financial statements',
      description:
        'Compiled by a professional accountant each year. Ready for SARS, your bank, or an investor.',
    },
    {
      title: 'Income tax & provisional tax',
      description:
        'Returns filed on time for both the August and February cycles. No late penalties.',
    },
    {
      title: 'VAT201 reporting & submission',
      description:
        'Returns prepared and submitted every cycle, monthly or bi-monthly, reconciled before lodging.',
    },
    {
      title: 'CIPC annual returns',
      description:
        'Filed before the due date every year. No deregistration risk, no director liability.',
    },
  ],
  bookkeeping: [
    {
      title: 'Xero subscription included',
      description:
        'Cloud accounting software set up correctly for your business from day one. No separate bill.',
    },
    {
      title: 'Transaction processing',
      description:
        'Every bank feed captured and coded to the right account each cycle.',
    },
    {
      title: 'Bank reconciliations',
      description:
        'Every account and credit card reconciled against actual statements each month.',
    },
    {
      title: 'Monthly management accounts',
      description:
        'A real P&L and balance sheet in your inbox every month. Pull them any time.',
    },
  ],
  payroll: [
    {
      title: 'Payroll processing & payslips',
      description:
        'Gross-to-net calculated correctly. Payslips issued to every employee before pay day.',
    },
    {
      title: 'PAYE & UIF submissions',
      description:
        'EMP201 prepared and submitted to SARS before the 7th each month, payment reconciled.',
    },
    {
      title: 'COIDA compliance',
      description:
        'Return of Earnings filed with the Compensation Fund every year before the March deadline.',
    },
    {
      title: 'IRP5 certificates',
      description:
        'Year-end IRP5s and EMP501 reconciliation submitted before the May deadline.',
    },
  ],
};

interface Step1ServicesProps {
  services: Service[];
  selected: Set<string>;
  onToggle: (slug: string) => void;
  onNext: () => void;
}

export function Step1Services({ services, selected, onToggle, onNext }: Step1ServicesProps) {
  const canContinue = selected.size > 0;
  const [expandedScope, setExpandedScope] = useState<Set<string>>(new Set());

  function toggleScope(slug: string) {
    setExpandedScope((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">What should our finance team take off your plate?</h2>
        <p className="text-sm text-muted-foreground">
          Choose the services you want Capucor to manage. Each service is priced separately, then combined into one fixed monthly subscription.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {services.map((svc) => {
          const Icon = SERVICE_ICONS[svc.slug] ?? BarChart2;
          const isSelected = selected.has(svc.slug);
          const deliverables = SERVICE_DELIVERABLES[svc.slug] ?? [];
          const fullScope = SERVICE_FULL_SCOPE[svc.slug] ?? [];
          const isExpanded = expandedScope.has(svc.slug);

          return (
            <div
              key={svc.slug}
              role="button"
              tabIndex={0}
              onClick={() => onToggle(svc.slug)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggle(svc.slug);
                }
              }}
              aria-pressed={isSelected}
              className={cn(
                'rounded-xl border-2 p-6 text-left transition-all duration-150 outline-none cursor-pointer',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-muted/40'
              )}
            >
              <div
                className={cn(
                  'mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg',
                  isSelected ? 'bg-primary/15' : 'bg-muted'
                )}
              >
                <Icon
                  className={cn('h-5 w-5', isSelected ? 'text-primary' : 'text-muted-foreground')}
                />
              </div>
              <div className="font-semibold mb-1">{svc.name}</div>
              {svc.description && (
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{svc.description}</p>
              )}
              {deliverables.length > 0 && (
                <ul className="space-y-1">
                  {deliverables.map((item) => (
                    <li key={item} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className={cn('h-1 w-1 rounded-full shrink-0', isSelected ? 'bg-primary' : 'bg-muted-foreground/50')} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {fullScope.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/60">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleScope(svc.slug);
                    }}
                    aria-expanded={isExpanded}
                    aria-controls={`scope-${svc.slug}`}
                    className="text-xs font-medium text-primary inline-flex items-center gap-1 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {isExpanded ? 'Show less' : 'See full scope'}
                    <ChevronDown
                      className={cn(
                        'h-3 w-3 transition-transform',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </button>
                  {isExpanded && (
                    <ul
                      id={`scope-${svc.slug}`}
                      className="mt-3 space-y-2.5"
                    >
                      {fullScope.map((item) => (
                        <li key={item.title} className="text-xs">
                          <p className="font-semibold text-foreground">{item.title}</p>
                          <p className="text-muted-foreground leading-relaxed mt-0.5">
                            {item.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Not sure which services apply to your business?{' '}
        <a
          href={siteConfig.links.booking}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:no-underline"
        >
          Book a 15-minute fit call →
        </a>
      </p>

      <div className="flex justify-end pt-2">
        <Button onClick={onNext} disabled={!canContinue} className="gap-2">
          Continue →
        </Button>
      </div>
    </div>
  );
}
