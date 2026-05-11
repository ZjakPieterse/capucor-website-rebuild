'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MonoPrice } from '@/components/ui/MonoPrice';
import { cn } from '@/lib/utils';
import { bracketPrice, hasEnterpriseService } from '@/lib/pricing';
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
  onGetQuote?: (source: 'signup' | 'enterprise') => void;
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
  onGetQuote,
}: Step3TiersProps) {
  const sortedTiers = [...tiers].sort((a, b) => a.display_order - b.display_order);
  const activeServices = services.filter((s) => selectedServices.has(s.slug));
  const activeSlugs = [...selectedServices];
  const isEnterprise = hasEnterpriseService(activeSlugs, selectedBrackets);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Choose your plan</h2>
        <p className="text-sm text-muted-foreground">
          All plans include a dedicated finance team, SARS &amp; CIPC compliance, and core monthly financial services. Upgrade or downgrade at any time.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {sortedTiers.map((tier) => {
          const isSelected = selectedTier === tier.slug;

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
                'rounded-xl border-2 p-6 text-left transition-all duration-150 outline-none w-full relative',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isSelected
                  ? 'border-primary bg-primary/5'
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
                    <span className="text-xl font-bold font-mono">From </span>
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

      {selectedTier && onGetQuote && (
        <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-sm">Your quote is set.</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              See the full breakdown in the summary panel on the right.
            </p>
          </div>
          <Button
            onClick={() => onGetQuote(isEnterprise ? 'enterprise' : 'signup')}
            className="shrink-0"
          >
            {isEnterprise ? 'Get a Custom Quote →' : 'Get Started →'}
          </Button>
        </div>
      )}

      <div className="flex justify-start pt-2">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
      </div>
    </div>
  );
}
