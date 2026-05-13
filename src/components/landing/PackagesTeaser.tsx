'use client';

import Link from 'next/link';
import { CalendarCheck, Check, Layers, Users, ArrowRight, Star } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  TIER_HIGHLIGHTS,
  TIER_CUMULATIVE_LABELS,
  PACKAGE_COMMON_ITEMS,
  TIER_BUYER_FIT,
} from '@/config/tiers';
import type { Service, Tier } from '@/types';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface PackagesTeaserProps {
  services: Service[];
  tiers: Tier[];
}

function getDisplayItems(tierSlug: string): { text: string; tooltip: string }[] {
  const items = (TIER_HIGHLIGHTS[tierSlug] ?? [])
    .filter((i) => !i.calculatorOnly)
    .map((i) => ({ text: i.text, tooltip: i.tooltip }));
  const label = TIER_CUMULATIVE_LABELS[tierSlug];
  if (label) return [{ text: label, tooltip: '' }, ...items];
  return items;
}

export function PackagesTeaser({ tiers }: PackagesTeaserProps) {
  const sortedTiers = [...tiers].sort((a, b) => a.display_order - b.display_order);

  return (
    <section id="packages" className="relative py-24 lg:py-40 bg-[#060a14] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16 lg:mb-24">
          <SectionHeading
            eyebrow="The Plans"
            title="Support that scales with your complexity"
            subtitle="Choose the depth of monthly involvement. You see the transparent monthly fee before any conversation, and your subscription grows as you do."
            align="left"
          />
        </div>

        {/* Global Inclusions Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-3xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                <Star className="w-6 h-6 fill-emerald-400/20" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-0.5">Every Subscription</div>
                <div className="text-lg font-bold text-white tracking-tight">Professional Standards Included</div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
              {PACKAGE_COMMON_ITEMS.map((item, idx) => {
                const Icon = idx === 0 ? Users : idx === 1 ? Layers : CalendarCheck;
                return (
                  <div key={item.text} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-sm font-medium text-white/70">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {sortedTiers.map((tier, i) => {
            const isFeatured = i === 1; // "Growth" is usually the middle one
            const displayItems = getDisplayItems(tier.slug);
            const accentColor = isFeatured ? 'var(--brand-emerald)' : 'var(--brand-cyan)';

            return (
              <motion.div
                key={tier.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={cn(
                  "group relative p-10 rounded-[40px] bg-[#070c1a]/80 backdrop-blur-3xl border transition-all duration-500 flex flex-col",
                  isFeatured 
                    ? "border-emerald-500/30 lg:scale-105 shadow-[0_40px_80px_rgba(0,0,0,0.4)] z-10" 
                    : "border-white/10 hover:border-white/20"
                )}
              >
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-emerald-500 text-[#060a14] text-[10px] font-bold uppercase tracking-widest shadow-xl">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{tier.name}</h3>
                  <p className="text-sm text-white/40 leading-relaxed min-h-[40px]">
                    {TIER_BUYER_FIT[tier.slug] || tier.tagline}
                  </p>
                </div>

                <div className="flex-1 space-y-4 mb-10">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-4">Service Depth</div>
                  {displayItems.map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
                      <span className="text-sm text-white/70 leading-relaxed">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/5">
                  <MagneticButton>
                    <Link
                      href="/pricing"
                      className={cn(
                        "flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-bold transition-all",
                        isFeatured 
                          ? "bg-emerald-500 text-[#060a14] hover:bg-emerald-400 shadow-[0_20px_40px_rgba(74,222,128,0.2)]" 
                          : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                      )}
                    >
                      Build your plan
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </MagneticButton>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 text-center text-xs text-white/30 font-medium max-w-lg mx-auto"
        >
          Every month-end is reviewed and signed off by a SAICA-registered AGA(SA) accountant. Professional oversight is built into every tier.
        </motion.p>
      </div>
    </section>
  );
}
