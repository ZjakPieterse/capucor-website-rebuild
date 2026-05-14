'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCursorGlow } from '@/hooks/useCursorGlow';
import { MagneticButton } from '@/components/ui/MagneticButton';
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
  const containerRef = useCursorGlow<HTMLDivElement>();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">Choose the size bracket that matches the work we&apos;ll manage.</h2>
        <p className="text-sm text-muted-foreground">
          Each service is priced according to the workload behind it. Select the range that best reflects your current business, and your monthly fee will update from there.
        </p>
      </div>

      <div ref={containerRef} className="cursor-glow space-y-4">
        {activeServices.map((svc) => {
          const svcBrackets = brackets
            .filter((b) => b.service_slug === svc.slug && !b.is_enterprise)
            .sort((a, b) => a.display_order - b.display_order);
          const currentValue = selectedBrackets[svc.slug];
          const selectValue = currentValue !== undefined ? String(currentValue) : '';

          return (
            <div
              key={svc.slug}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6 rounded-xl border border-border bg-card/40 backdrop-blur-md px-5 py-4"
            >
              <div className="min-w-0">
                <p className="font-semibold text-sm">{svc.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{svc.bracket_unit_label}</p>
              </div>

              <div className="flex flex-col gap-1.5 sm:items-end">
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
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground -mt-2">
        Between brackets? Choose the higher one for now. We can adjust your subscription at the next billing cycle if the workload changes.
      </p>

      <div className="flex justify-between pt-2">
        <MagneticButton>
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
        </MagneticButton>
        <MagneticButton>
          <Button onClick={onNext} disabled={!canProceed} className="gap-2">
            Continue →
          </Button>
        </MagneticButton>
      </div>
    </div>
  );
}
