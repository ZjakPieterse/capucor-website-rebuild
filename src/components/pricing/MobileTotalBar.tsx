'use client';

import { useCallback } from 'react';
import { ChevronUp, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { monthlyTotal } from '@/lib/pricing';
import { cn } from '@/lib/utils';
import type { Bracket, BracketValue, CalculatorStep, Tier } from '@/types';

interface MobileTotalBarProps {
  selectedServices: Set<string>;
  selectedBrackets: Record<string, BracketValue>;
  selectedTierSlug: string | null;
  tiers: Tier[];
  brackets: Bracket[];
  summaryAnchorId: string;
  onActivate: () => void;
  currentStep: CalculatorStep;
}

export function MobileTotalBar({
  selectedServices,
  selectedBrackets,
  selectedTierSlug,
  tiers,
  brackets,
  summaryAnchorId,
  onActivate,
  currentStep,
}: MobileTotalBarProps) {
  const activeSlugs = [...selectedServices];
  const tier = tiers.find((t) => t.slug === selectedTierSlug) ?? null;
  const total = tier
    ? monthlyTotal(activeSlugs, selectedBrackets, tier.slug, brackets)
    : 0;

  const scrollToSummary = useCallback(() => {
    const el = document.getElementById(summaryAnchorId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [summaryAnchorId]);

  if (activeSlugs.length === 0) return null;
  if (currentStep === 4) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden bg-[#060a14]/80 backdrop-blur-3xl border-t border-white/5"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-1">
            {tier ? tier.name : 'Running Total'}
          </p>
          {total > 0 ? (
            <div className="flex items-baseline gap-2">
               <span className="text-xl font-bold text-white font-mono">
                 <AnimatedPrice amount={total} />
               </span>
               <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">/mo</span>
            </div>
          ) : (
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Choose Depth</p>
          )}
        </div>

        {selectedTierSlug ? (
          <MagneticButton>
            <button 
              onClick={onActivate} 
              className="px-6 py-3 rounded-xl bg-emerald-500 text-[#060a14] font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_10px_20px_rgba(74,222,128,0.2)]"
            >
              Activate
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticButton>
        ) : (
          <button
            onClick={scrollToSummary}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400"
          >
            Summary
            <ChevronUp className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
