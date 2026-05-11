'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Bracket, BracketValue, Service } from '@/types';

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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">How big is your business?</h2>
        <p className="text-sm text-muted-foreground">
          Each service has flexible packages priced to match your business size and monthly workload. Select the range that fits your current operation and your monthly fee is calculated from there.
        </p>
      </div>

      <div className="space-y-4">
        {activeServices.map((svc) => {
          const svcBrackets = brackets
            .filter((b) => b.service_slug === svc.slug && !b.is_enterprise)
            .sort((a, b) => a.display_order - b.display_order);
          const currentValue = selectedBrackets[svc.slug];
          const selectValue = currentValue !== undefined ? String(currentValue) : '';

          return (
            <div
              key={svc.slug}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6 rounded-xl border border-border bg-card px-5 py-4"
            >
              <div className="min-w-0">
                <p className="font-semibold text-sm">{svc.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{svc.bracket_unit_label}</p>
              </div>

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
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={onNext} disabled={!canProceed} className="gap-2">
          Continue →
        </Button>
      </div>
    </div>
  );
}
