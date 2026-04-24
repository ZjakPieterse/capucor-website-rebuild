'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MonoPrice } from '@/components/ui/MonoPrice';
import { cn } from '@/lib/utils';
import { bracketPrice } from '@/lib/pricing';
import { TIER_HIGHLIGHTS, TIER_CUMULATIVE_LABELS } from '@/config/tiers';
import type { TierHighlightItem } from '@/config/tiers';
import type { Bracket, Service, Tier, BracketValue } from '@/types';

interface Step3TiersProps {
  services: Service[];
  brackets: Bracket[];
  tiers: Tier[];
  selectedServices: Set<string>;
  selectedBrackets: Record<string, BracketValue>;
  selectedTier: string | null;
  onTierSelect: (slug: string) => void;
  onBack: () => void;
}

export function Step3Tiers({
  services,
  brackets,
  tiers,
  selectedServices,
  selectedBrackets,
  selectedTier,
  onTierSelect,
  onBack,
}: Step3TiersProps) {
  const sortedTiers = [...tiers].sort((a, b) => a.display_order - b.display_order);
  const activeServices = services.filter((s) => selectedServices.has(s.slug));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Choose your package</h2>
        <p className="text-sm text-muted-foreground">
          Select the tier that matches the level of service you need. All prices excl. VAT.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {sortedTiers.map((tier, i) => {
          const isSelected = selectedTier === tier.slug;
          const isMiddle = i === 1;

          // Compute per-service prices for this tier
          const priceLines = activeServices.map((svc) => {
            const sel = selectedBrackets[svc.slug];
            if (sel === 'enterprise' || sel === undefined) {
              return { name: svc.name, price: null, isEnterprise: true };
            }
            const b = brackets.find((x) => x.service_slug === svc.slug && x.ordinal === sel);
            const price = b ? bracketPrice(b, tier.slug) : 0;
            return { name: svc.name, price, isEnterprise: false };
          });

          const regularTotal = priceLines
            .filter((l) => !l.isEnterprise)
            .reduce((sum, l) => sum + (l.price ?? 0), 0);

          const hasEnterprise = priceLines.some((l) => l.isEnterprise);

          // Inclusions for this tier filtered to selected services,
          // always preceded by the cumulative label for pro/premium
          const filteredItems = (TIER_HIGHLIGHTS[tier.slug] ?? []).filter((item) =>
            item.services.some((s) => selectedServices.has(s))
          );
          const cumulativeLabel = TIER_CUMULATIVE_LABELS[tier.slug];
          const tierInclusions: TierHighlightItem[] = cumulativeLabel
            ? [{ text: cumulativeLabel, services: [], tooltip: '' }, ...filteredItems]
            : filteredItems;

          return (
            <button
              key={tier.slug}
              type="button"
              onClick={() => onTierSelect(tier.slug)}
              aria-pressed={isSelected}
              className={cn(
                'rounded-xl border-2 p-6 text-left transition-all duration-150 outline-none w-full',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isSelected
                  ? 'border-primary bg-primary/5'
                  : isMiddle
                  ? 'border-border/80 bg-card hover:border-primary/40'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-muted/20'
              )}
            >
              <div className="mb-4">
                <div className="font-semibold text-base">{tier.name}</div>
                {tier.tagline && (
                  <div className="text-xs text-muted-foreground mt-0.5">{tier.tagline}</div>
                )}
              </div>

              {/* Price display */}
              <div className="mb-4">
                {hasEnterprise && regularTotal === 0 ? (
                  <div className="text-2xl font-bold font-mono">Custom</div>
                ) : hasEnterprise ? (
                  <div>
                    <span className="text-xl font-bold font-mono">
                      From{' '}
                    </span>
                    <MonoPrice amount={regularTotal} size="lg" />
                    <div className="text-xs text-muted-foreground mt-0.5">+ custom pricing</div>
                  </div>
                ) : (
                  <div>
                    <MonoPrice amount={regularTotal} size="lg" />
                    <div className="text-xs text-muted-foreground mt-0.5">/month</div>
                  </div>
                )}
              </div>

              {/* Inclusions */}
              {tierInclusions.length > 0 && (
                <ul className="space-y-1.5 mb-4">
                  {tierInclusions.map((item) => (
                    <li key={item.text} className="flex items-start gap-2 text-xs">
                      <Check className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
                      <span className="text-muted-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              {isSelected && (
                <div className="text-xs font-semibold text-primary flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> Selected
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-start pt-2">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
      </div>
    </div>
  );
}
