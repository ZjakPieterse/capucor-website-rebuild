'use client';

import { useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { hasEnterpriseService, monthlyTotal } from '@/lib/pricing';
import type { Bracket, BracketValue, Tier } from '@/types';

interface MobileTotalBarProps {
  selectedServices: Set<string>;
  selectedBrackets: Record<string, BracketValue>;
  selectedTierSlug: string | null;
  tiers: Tier[];
  brackets: Bracket[];
  summaryAnchorId: string;
  onGetQuote: (source: 'signup' | 'enterprise') => void;
}

export function MobileTotalBar({
  selectedServices,
  selectedBrackets,
  selectedTierSlug,
  tiers,
  brackets,
  summaryAnchorId,
  onGetQuote,
}: MobileTotalBarProps) {
  const activeSlugs = [...selectedServices];
  const isEnterprise = hasEnterpriseService(activeSlugs, selectedBrackets);
  const tier = tiers.find((t) => t.slug === selectedTierSlug) ?? null;
  const total = tier
    ? monthlyTotal(activeSlugs, selectedBrackets, tier.slug, brackets)
    : 0;

  const scrollToSummary = useCallback(() => {
    const el = document.getElementById(summaryAnchorId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [summaryAnchorId]);

  if (activeSlugs.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Subscription total"
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-border bg-background/95 backdrop-blur-md shadow-[0_-6px_24px_-6px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            {tier ? `${tier.name} plan · excl. VAT` : 'Running total · excl. VAT'}
          </p>
          {isEnterprise && total === 0 ? (
            <p className="font-semibold text-base">Custom quote</p>
          ) : isEnterprise ? (
            <p className="font-mono font-bold text-base">
              <span className="text-xs font-normal text-muted-foreground mr-0.5">From</span>
              <AnimatedPrice amount={total} className="text-base font-bold" />
              <span className="text-xs font-normal text-muted-foreground ml-1">+ custom</span>
            </p>
          ) : total > 0 ? (
            <p className="font-mono font-bold text-lg leading-tight">
              <AnimatedPrice amount={total} className="text-lg font-bold" />
              <span className="text-xs font-normal text-muted-foreground ml-1">/mo</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Pick a tier to see the total</p>
          )}
        </div>

        {selectedTierSlug ? (
          <Button
            size="sm"
            onClick={() => onGetQuote(isEnterprise ? 'enterprise' : 'signup')}
            className="shrink-0"
          >
            {isEnterprise ? 'Get quote' : 'Sign up'}
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={scrollToSummary}
            className="shrink-0 gap-1"
          >
            <ChevronUp className="h-4 w-4" />
            View summary
          </Button>
        )}
      </div>
    </div>
  );
}
