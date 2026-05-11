'use client';

import { useEffect, useState, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { hasEnterpriseService, monthlyTotal } from '@/lib/pricing';
import type { Bracket, BracketValue, Tier } from '@/types';

interface StickyConfigChipProps {
  selectedServices: Set<string>;
  selectedBrackets: Record<string, BracketValue>;
  selectedTierSlug: string | null;
  tiers: Tier[];
  brackets: Bracket[];
  observeElementId: string;
  scrollToId: string;
}

export function StickyConfigChip({
  selectedServices,
  selectedBrackets,
  selectedTierSlug,
  tiers,
  brackets,
  observeElementId,
  scrollToId,
}: StickyConfigChipProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById(observeElementId);
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0, rootMargin: '0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [observeElementId]);

  const scrollToCalculator = useCallback(() => {
    const el = document.getElementById(scrollToId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [scrollToId]);

  const activeSlugs = [...selectedServices];
  if (activeSlugs.length === 0) return null;

  const isEnterprise = hasEnterpriseService(activeSlugs, selectedBrackets);
  const tier = tiers.find((t) => t.slug === selectedTierSlug) ?? null;
  const total = tier
    ? monthlyTotal(activeSlugs, selectedBrackets, tier.slug, brackets)
    : 0;

  return (
    <button
      type="button"
      onClick={scrollToCalculator}
      aria-label="Return to calculator"
      className={cn(
        'hidden lg:inline-flex fixed bottom-6 right-6 z-30 items-center gap-3 rounded-full bg-card/95 backdrop-blur border border-border shadow-lg pl-4 pr-2 py-2 text-left',
        'transition-all duration-300 hover:border-primary/40 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      )}
    >
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
          {tier ? `${tier.name} plan` : `${activeSlugs.length} service${activeSlugs.length === 1 ? '' : 's'}`}
        </span>
        {isEnterprise && total === 0 ? (
          <span className="text-sm font-semibold">Custom quote</span>
        ) : isEnterprise ? (
          <span className="text-sm font-mono font-semibold">
            <span className="text-[10px] font-normal text-muted-foreground mr-0.5">From</span>
            <AnimatedPrice amount={total} className="text-sm font-semibold" />
          </span>
        ) : total > 0 ? (
          <span className="text-sm">
            <AnimatedPrice amount={total} className="text-sm font-bold" />
            <span className="text-[10px] font-normal text-muted-foreground ml-1">/mo</span>
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">
            {tier ? 'Configure' : 'Pick a tier'}
          </span>
        )}
      </div>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <ChevronUp className="h-4 w-4" />
      </span>
    </button>
  );
}
