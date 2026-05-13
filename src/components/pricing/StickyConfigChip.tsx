'use client';

import { useEffect, useState, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { monthlyTotal } from '@/lib/pricing';
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

  const tier = tiers.find((t) => t.slug === selectedTierSlug) ?? null;
  const total = tier
    ? monthlyTotal(activeSlugs, selectedBrackets, tier.slug, brackets)
    : 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          layout
          type="button"
          onClick={scrollToCalculator}
          aria-label="Return to calculator"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'hidden lg:inline-flex fixed bottom-10 right-10 z-30 items-center gap-6 rounded-full bg-white/10 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] pl-6 pr-2 py-2 text-left hover:border-emerald-500/30 transition-all group'
          )}
        >
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-1">
              {tier ? tier.name : 'Subscription'}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={total > 0 ? 'price' : 'empty'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-bold text-white font-mono"
              >
                {total > 0 ? (
                  <>
                    <AnimatedPrice amount={total} />
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-2">/mo</span>
                  </>
                ) : (
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    Build Config
                  </span>
                )}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-[#060a14] shadow-[0_10px_20px_rgba(74,222,128,0.2)] group-hover:bg-emerald-400 transition-colors">
            <ChevronUp className="w-5 h-5 stroke-[3]" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
