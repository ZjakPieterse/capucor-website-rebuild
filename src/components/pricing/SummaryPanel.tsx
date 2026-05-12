'use client';

import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { Separator } from '@/components/ui/separator';
import { bracketPrice, hasEnterpriseService, monthlyTotal } from '@/lib/pricing';
import { siteConfig } from '@/config/site';
import type { Bracket, Service, Tier, BracketValue } from '@/types';

interface SummaryPanelProps {
  services: Service[];
  brackets: Bracket[];
  tiers: Tier[];
  selectedServices: Set<string>;
  selectedBrackets: Record<string, BracketValue>;
  selectedTierSlug: string | null;
  onGetQuote: (source: 'signup' | 'enterprise') => void;
}

export function SummaryPanel({
  services,
  brackets,
  tiers,
  selectedServices,
  selectedBrackets,
  selectedTierSlug,
  onGetQuote,
}: SummaryPanelProps) {
  const activeSlugs = [...selectedServices];
  const isEnterprise = hasEnterpriseService(activeSlugs, selectedBrackets);
  const tier = tiers.find((t) => t.slug === selectedTierSlug) ?? null;
  const activeServices = services.filter((s) => selectedServices.has(s.slug));

  const total = tier
    ? monthlyTotal(activeSlugs, selectedBrackets, tier.slug, brackets)
    : 0;

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-5 sticky top-24">
      <h3 className="font-semibold text-base">Your Quote</h3>

      {activeSlugs.length === 0 ? (
        <p className="text-sm text-muted-foreground">Select services above to see your pricing.</p>
      ) : (
        <>
          <div className="space-y-2">
            {activeServices.map((svc) => {
              const bracket = selectedBrackets[svc.slug];
              const isEnterpriseService = bracket === 'enterprise';
              const b =
                tier && bracket !== undefined && !isEnterpriseService
                  ? brackets.find((x) => x.service_slug === svc.slug && x.ordinal === (bracket as number))
                  : undefined;
              const price = b ? bracketPrice(b, tier!.slug) : null;

              return (
                <div key={svc.slug} className="flex items-start justify-between gap-4 text-sm">
                  <span className="text-muted-foreground leading-snug">{svc.name}</span>
                  <span className="font-mono font-medium whitespace-nowrap">
                    {isEnterpriseService ? (
                      <span className="text-warning font-semibold">Custom</span>
                    ) : price !== null ? (
                      <AnimatedPrice amount={price} />
                    ) : (
                      '—'
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <Separator />

          <div className="text-sm">
            {isEnterprise && total === 0 ? (
              <div className="font-semibold">Custom pricing</div>
            ) : isEnterprise ? (
              <div>
                <span className="text-muted-foreground">From </span>
                {total > 0 ? (
                  <AnimatedPrice amount={total} className="font-semibold" />
                ) : (
                  <span className="font-semibold font-mono">—</span>
                )}
                <span className="text-muted-foreground"> / month + custom</span>
              </div>
            ) : total > 0 ? (
              <div>
                <AnimatedPrice amount={total} size="lg" />
                <span className="text-muted-foreground text-sm ml-1">/ month</span>
              </div>
            ) : (
              <div className="text-muted-foreground text-xs">Choose a package in Step 3</div>
            )}
            {tier ? (
              <p className="text-xs text-muted-foreground mt-1">{tier.name} plan · excl. VAT</p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">excl. VAT</p>
            )}
          </div>

          {selectedTierSlug && (
            <div className="space-y-2 pt-1">
              <Button
                className="w-full"
                onClick={() => onGetQuote(isEnterprise ? 'enterprise' : 'signup')}
              >
                {isEnterprise ? 'Get a Custom Quote' : 'Sign Up'}
              </Button>
              <Button
                nativeButton={false}
                render={
                  <a
                    href={siteConfig.links.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                variant="outline"
                className="w-full gap-2"
              >
                <Calendar className="h-4 w-4" />
                Book a 15-minute fit call
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
