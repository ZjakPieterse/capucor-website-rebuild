'use client';

import { ArrowRight, Check, ArrowLeft, Star } from 'lucide-react';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { TestimonialSpotlight } from './TestimonialSpotlight';
import { TierComparison } from './TierComparison';
import { RiskReducerStrip } from './RiskReducerStrip';
import { cn } from '@/lib/utils';
import { bracketPrice } from '@/lib/pricing';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { motion, AnimatePresence } from 'motion/react';
import { TIER_HIGHLIGHTS, TIER_CUMULATIVE_LABELS } from '@/config/tiers';
import type { TierHighlightItem } from '@/config/tiers';
import type { Bracket, Service, Tier, BracketValue, Testimonial } from '@/types';

interface Step3TiersProps {
  services: Service[];
  brackets: Bracket[];
  tiers: Tier[];
  selectedServices: Set<string>;
  selectedBrackets: Record<string, BracketValue>;
  selectedTier: string | null;
  onTierSelect: (slug: string) => void;
  onBack: () => void;
  onActivate: () => void;
  testimonial?: Testimonial | null;
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
  onActivate,
  testimonial,
}: Step3TiersProps) {
  const sortedTiers = [...tiers].sort((a, b) => a.display_order - b.display_order);
  const activeServices = services.filter((s) => selectedServices.has(s.slug));

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-3">Choose your depth of support</h2>
        <p className="text-white/40 text-sm leading-relaxed">
          Every plan includes your selected functions and a dedicated finance team. Higher tiers add more frequent processing and strategic advisory.
        </p>
      </div>

      <RiskReducerStrip />

      <div className="grid sm:grid-cols-3 gap-6">
        {sortedTiers.map((tier, i) => {
          const isSelected = selectedTier === tier.slug;
          const isFeatured = i === 1; // Growth is usually middle

          // Compute total
          const regularTotal = activeServices.reduce((sum, svc) => {
            const sel = selectedBrackets[svc.slug];
            if (typeof sel !== 'number') return sum;
            const b = brackets.find((x) => x.service_slug === svc.slug && x.ordinal === sel);
            return sum + (b ? bracketPrice(b, tier.slug) : 0);
          }, 0);

          const filteredItems = (TIER_HIGHLIGHTS[tier.slug] ?? []).filter((item) =>
            item.services.some((s) => selectedServices.has(s))
          );
          const cumulativeLabel = TIER_CUMULATIVE_LABELS[tier.slug];
          const tierInclusions: TierHighlightItem[] = cumulativeLabel
            ? [{ text: cumulativeLabel, services: [], tooltip: '' }, ...filteredItems]
            : filteredItems;

          const accentColor = isFeatured ? 'var(--brand-emerald)' : 'var(--brand-cyan)';

          return (
            <motion.div
              key={tier.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onTierSelect(tier.slug)}
              className={cn(
                "group relative p-8 rounded-[40px] border transition-all duration-500 cursor-pointer flex flex-col",
                isSelected 
                  ? "bg-white/10 border-white/30 shadow-[0_40px_80px_rgba(0,0,0,0.4)] z-10" 
                  : "bg-white/5 border-white/5 hover:border-white/10"
              )}
            >
               {isFeatured && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-emerald-500 text-[#060a14] text-[10px] font-bold uppercase tracking-widest shadow-xl">
                   Recommended
                 </div>
               )}

               <div className="mb-6">
                 <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{tier.name}</h3>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{tier.tagline}</p>
               </div>

               <div className="mb-8">
                 <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-bold text-white tracking-tighter">
                     <AnimatedPrice amount={regularTotal} size="lg" />
                   </span>
                   <span className="text-xs text-white/20 font-bold uppercase tracking-widest">/mo</span>
                 </div>
               </div>

               <div className="flex-1 space-y-4 mb-8">
                 {tierInclusions.map((item) => (
                   <div key={item.text} className="flex items-start gap-3">
                     <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: isSelected ? accentColor : 'rgba(255,255,255,0.2)' }} />
                     <span className="text-xs text-white/50 leading-relaxed">{item.text}</span>
                   </div>
                 ))}
               </div>

               {isSelected && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400"
                 >
                    <Check className="w-3 h-3" /> Selected Depth
                 </motion.div>
               )}
            </motion.div>
          );
        })}
      </div>

      <div className="pt-12">
        <TierComparison
          tiers={tiers}
          brackets={brackets}
          selectedServices={selectedServices}
          selectedBrackets={selectedBrackets}
        />
      </div>

      <AnimatePresence>
        {selectedTier && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 rounded-[40px] bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-3xl flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 text-emerald-400">
                  <Star className="w-7 h-7 fill-emerald-400/20" />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-white mb-1">Configuration Complete</h3>
                  <p className="text-white/40 text-sm">Your subscription is ready. Secure activation takes 60 seconds.</p>
               </div>
            </div>
            <MagneticButton>
              <button 
                onClick={onActivate} 
                className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-emerald-500 text-[#060a14] font-bold text-sm hover:bg-emerald-400 transition-all shadow-[0_20px_40px_rgba(74,222,128,0.2)]"
              >
                Activate Subscription
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5">
        <MagneticButton>
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/40 font-bold text-sm hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </MagneticButton>

        {testimonial && (
           <div className="max-w-md">
             <div className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-3">Client Feedback</div>
             <TestimonialSpotlight testimonial={testimonial} />
           </div>
        )}
      </div>
    </div>
  );
}
