'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { bracketPrice } from '@/lib/pricing';
import {
  TIER_HIGHLIGHTS,
  PACKAGE_COMMON_ITEMS,
  type TierHighlightItem,
} from '@/config/tiers';
import type { Bracket, Tier, BracketValue } from '@/types';
import { motion, AnimatePresence } from 'motion/react';

interface TierComparisonProps {
  tiers: Tier[];
  brackets: Bracket[];
  selectedServices: Set<string>;
  selectedBrackets: Record<string, BracketValue>;
}

type LowestTier = 'common' | 'basic' | 'pro' | 'premium';

interface MatrixRow {
  text: string;
  lowestTier: LowestTier;
}

export function TierComparison({
  tiers,
  brackets,
  selectedServices,
  selectedBrackets,
}: TierComparisonProps) {
  const [open, setOpen] = useState(false);

  const sortedTiers = useMemo(
    () => [...tiers].sort((a, b) => a.display_order - b.display_order),
    [tiers]
  );

  const rows = useMemo<MatrixRow[]>(() => {
    if (selectedServices.size === 0) return [];

    const result: MatrixRow[] = [];
    const seen = new Set<string>();

    for (const item of PACKAGE_COMMON_ITEMS) {
      if (seen.has(item.text)) continue;
      seen.add(item.text);
      result.push({ text: item.text, lowestTier: 'common' });
    }

    const tierOrder: LowestTier[] = ['basic', 'pro', 'premium'];
    for (const tierSlug of tierOrder) {
      const highlights: TierHighlightItem[] = TIER_HIGHLIGHTS[tierSlug] ?? [];
      for (const h of highlights) {
        if (h.services.length > 0 && !h.services.some((s) => selectedServices.has(s))) continue;
        if (seen.has(h.text)) continue;
        seen.add(h.text);
        result.push({ text: h.text, lowestTier: tierSlug });
      }
    }
    return result;
  }, [selectedServices]);

  const tierTotals = useMemo(() => {
    const out: Record<string, { total: number }> = {};
    for (const tier of sortedTiers) {
      let total = 0;
      for (const slug of selectedServices) {
        const bv = selectedBrackets[slug];
        if (typeof bv !== 'number') continue;
        const b = brackets.find((x) => x.service_slug === slug && x.ordinal === bv);
        if (b) total += bracketPrice(b, tier.slug);
      }
      out[tier.slug] = { total };
    }
    return out;
  }, [sortedTiers, selectedServices, selectedBrackets, brackets]);

  if (selectedServices.size === 0) return null;

  function isCovered(tierSlug: string, lowestTier: LowestTier): boolean {
    if (lowestTier === 'common') return true;
    const tierRank: Record<string, number> = { basic: 0, pro: 1, premium: 2 };
    return (tierRank[tierSlug] ?? 0) >= (tierRank[lowestTier] ?? 0);
  }

  return (
    <div className="rounded-[32px] border border-white/5 bg-white/5 overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-6 p-8 text-left hover:bg-white/5 transition-colors focus:outline-none"
      >
        <div>
          <h4 className="text-lg font-bold text-white mb-1">Full Support Matrix</h4>
          <p className="text-xs text-white/30">
            Compare inclusions across every plan depth for your configuration.
          </p>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
          <ChevronDown className={cn("w-5 h-5 text-white/40 transition-transform duration-500", open && "rotate-180")} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-x-auto border-t border-white/5"
          >
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left text-[10px] font-bold uppercase tracking-widest text-white/20 px-8 py-5">
                    Inclusion
                  </th>
                  {sortedTiers.map((t) => (
                    <th
                      key={t.slug}
                      className="text-center text-[10px] font-bold uppercase tracking-widest text-white/40 px-5 py-5"
                    >
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((row) => (
                  <tr key={row.text} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-4 text-xs font-medium text-white/60">{row.text}</td>
                    {sortedTiers.map((t) => (
                      <td key={t.slug} className="px-5 py-4 text-center">
                        {isCovered(t.slug, row.lowestTier) ? (
                          <div className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <Check className="h-3 w-3 text-emerald-400 stroke-[3]" />
                          </div>
                        ) : (
                          <Minus className="inline h-3.5 w-3.5 text-white/10" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-white/5 border-t-2 border-white/10">
                  <td className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
                    Calculated Monthly
                  </td>
                  {sortedTiers.map((t) => {
                    const { total } = tierTotals[t.slug] ?? { total: 0 };
                    return (
                      <td key={t.slug} className="px-5 py-6 text-center">
                        {total > 0 ? (
                          <div className="flex flex-col items-center">
                            <AnimatedPrice amount={total} className="text-sm font-bold text-white" />
                            <span className="text-[8px] text-white/20 uppercase tracking-widest mt-1">/mo</span>
                          </div>
                        ) : (
                          <span className="text-xs text-white/20">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
