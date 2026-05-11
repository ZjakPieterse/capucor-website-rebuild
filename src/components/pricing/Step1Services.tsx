'use client';

import { BarChart2, BookMarked, Users } from 'lucide-react';
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

interface Step1ServicesProps {
  services: Service[];
  selected: Set<string>;
  onToggle: (slug: string) => void;
  onNext: () => void;
}

export function Step1Services({ services, selected, onToggle, onNext }: Step1ServicesProps) {
  const canContinue = selected.size > 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Which services does your business need?</h2>
        <p className="text-sm text-muted-foreground">
          Select one or more — combine any services into a single monthly subscription.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {services.map((svc) => {
          const Icon = SERVICE_ICONS[svc.slug] ?? BarChart2;
          const isSelected = selected.has(svc.slug);
          const deliverables = SERVICE_DELIVERABLES[svc.slug] ?? [];

          return (
            <button
              key={svc.slug}
              type="button"
              onClick={() => onToggle(svc.slug)}
              aria-pressed={isSelected}
              className={cn(
                'rounded-xl border-2 p-6 text-left transition-all duration-150 outline-none',
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
            </button>
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
          Book a free 15-min call →
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
