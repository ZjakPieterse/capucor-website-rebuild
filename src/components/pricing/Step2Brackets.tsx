'use client';

import { BarChart2, BookMarked, Users, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, formatZAR } from '@/lib/utils';
import { bracketPrice } from '@/lib/pricing';
import { useCursorGlow } from '@/hooks/useCursorGlow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import type { Bracket, BracketValue, Service } from '@/types';

const SERVICE_ICONS: Record<string, React.ElementType> = {
  accounting: BarChart2,
  bookkeeping: BookMarked,
  payroll: Users,
};

interface Step2BracketsProps {
  services: Service[];
  brackets: Bracket[];
  selectedServices: Set<string>;
  selectedBrackets: Record<string, BracketValue>;
  onBracketChange: (slug: string, value: BracketValue) => void;
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
}

export function Step2Brackets({
  services,
  brackets,
  selectedServices,
  selectedBrackets,
  onBracketChange,
  onBack,
  onNext,
  canProceed,
}: Step2BracketsProps) {
  const activeServices = services.filter((s) => selectedServices.has(s.slug));
  const containerRef = useCursorGlow<HTMLDivElement>();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">
            Choose the size bracket that matches the work we&apos;ll manage.
          </h2>
          <p className="text-sm text-muted-foreground">
            Each service is priced by workload. Pick the range that fits your business today.
          </p>
        </div>
        <details className="group shrink-0 relative">
          <summary
            className="list-none cursor-pointer inline-flex items-center gap-1 rounded-full border border-border bg-card/60 px-2.5 py-1 text-[11px] text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
            aria-label="Help on choosing a bracket"
          >
            <Info className="h-3 w-3" />
            Tips
          </summary>
          <div className="absolute right-0 mt-2 w-72 z-20 rounded-xl border border-border bg-popover p-3 text-xs text-muted-foreground leading-relaxed shadow-lg">
            Between brackets? Choose the higher one for now. We can adjust your subscription at the next billing cycle if the workload changes.
          </div>
        </details>
      </div>

      <div
        ref={containerRef}
        className="cursor-glow rounded-xl premium-glass border divide-y divide-border overflow-hidden"
      >
        {activeServices.map((svc) => {
          const Icon = SERVICE_ICONS[svc.slug] ?? BarChart2;
          const svcBrackets = brackets
            .filter((b) => b.service_slug === svc.slug && !b.is_enterprise)
            .sort((a, b) => a.display_order - b.display_order);
          const currentValue = selectedBrackets[svc.slug];
          const selectValue = currentValue !== undefined ? String(currentValue) : '';
          const isSet = currentValue !== undefined && typeof currentValue === 'number';

          const currentBracket = isSet
            ? brackets.find((b) => b.service_slug === svc.slug && b.ordinal === currentValue)
            : undefined;
          const fromPrice = currentBracket ? bracketPrice(currentBracket, 'basic') : 0;

          return (
            <div key={svc.slug} className={cn('step2-row', isSet && 'is-set')}>
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={cn(
                    'inline-flex h-9 w-9 items-center justify-center rounded-lg shrink-0 transition-colors duration-200',
                    isSet ? 'bg-primary/15' : 'bg-muted'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 transition-colors duration-200',
                      isSet ? 'text-primary' : 'text-muted-foreground'
                    )}
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm">{svc.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{svc.bracket_unit_label}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
                <Select
                  value={selectValue}
                  onValueChange={(val) => onBracketChange(svc.slug, Number(val) as BracketValue)}
                  items={Object.fromEntries(svcBrackets.map((b) => [String(b.ordinal), b.label]))}
                >
                  <SelectTrigger
                    size="default"
                    className="w-full sm:w-52 h-10 text-sm border-border bg-background/60"
                  >
                    <SelectValue placeholder={`Select ${svc.bracket_unit_label ?? 'size'} range…`} />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {svcBrackets.map((bracket) => (
                      <SelectItem key={bracket.id} value={String(bracket.ordinal)}>
                        {bracket.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span
                  className={cn('step2-price-chip', isSet && 'is-set')}
                  aria-live="polite"
                >
                  {isSet ? `From ${formatZAR(fromPrice)}` : '—'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-2">
        <MagneticButton>
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
        </MagneticButton>
        <MagneticButton>
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className={cn('gap-2', canProceed && 'cta-armed')}
          >
            Continue →
          </Button>
        </MagneticButton>
      </div>
    </div>
  );
}
