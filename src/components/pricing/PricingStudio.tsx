'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  WalletCards,
} from 'lucide-react';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';
import { monthlyTotal } from '@/lib/pricing';
import type { Bracket, Service, Tier } from '@/types';

interface PricingStudioProps {
  services: Service[];
  brackets: Bracket[];
  tiers: Tier[];
}

const VOLUME_OPTIONS = [
  { key: 'low', label: 'Low', value: 40, note: '< 50 lines' },
  { key: 'medium', label: 'Medium', value: 140, note: '50–250 lines' },
  { key: 'high', label: 'High', value: 320, note: '250+ lines' },
] as const;

const fallbackTiers: Pick<Tier, 'slug' | 'name' | 'tagline'>[] = [
  { slug: 'basic', name: 'Basic', tagline: 'Core controls' },
  { slug: 'pro', name: 'Pro', tagline: 'Operator rhythm' },
  { slug: 'premium', name: 'Premium', tagline: 'Board-grade' },
];

export function PricingStudio({ brackets, tiers }: Omit<PricingStudioProps, 'services'>) {
  const displayTiers = tiers.length > 0 ? tiers : fallbackTiers;
  const [revenue, setRevenue] = useState(2_500_000);
  const [volume, setVolume] = useState<(typeof VOLUME_OPTIONS)[number]['key']>('medium');
  const [employees, setEmployees] = useState(8);
  const [activeTier, setActiveTier] = useState<string>('pro');

  const transactionCount = VOLUME_OPTIONS.find((item) => item.key === volume)?.value ?? 140;

  const ordinals = useMemo(() => {
    let accounting = 1;
    if (revenue >= 20_000_000) accounting = 5;
    else if (revenue >= 10_000_000) accounting = 4;
    else if (revenue >= 5_000_000) accounting = 3;
    else if (revenue >= 1_000_000) accounting = 2;

    let bookkeeping = 1;
    if (transactionCount > 250) bookkeeping = 4;
    else if (transactionCount > 100) bookkeeping = 3;
    else if (transactionCount > 50) bookkeeping = 2;

    let payroll = 1;
    if (employees > 30) payroll = 4;
    else if (employees > 15) payroll = 3;
    else if (employees > 5) payroll = 2;

    return { accounting, bookkeeping, payroll };
  }, [employees, revenue, transactionCount]);

  const totalPrice = useMemo(
    () => monthlyTotal(['accounting', 'bookkeeping', 'payroll'], ordinals, activeTier, brackets),
    [activeTier, brackets, ordinals]
  );

  const dedicatedPartner = revenue >= 10_000_000 || employees >= 25 || volume === 'high';
  const closeVelocity = volume === 'high' ? 'Weekly pulse' : volume === 'medium' ? 'Fortnightly pulse' : 'Monthly pulse';
  const selectedTierName = displayTiers.find((tier) => tier.slug === activeTier)?.name ?? 'Pro';

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#07111f] py-24 lg:py-40">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_80%_40%,rgba(45,212,191,0.13),transparent_28%),linear-gradient(180deg,#07111f_0%,#0A192F_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-100/65 backdrop-blur-xl"
          >
            <WalletCards className="h-3.5 w-3.5 text-teal-200" />
            Interactive Pricing Studio
          </motion.div>
          <h2 className="mx-auto max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            Build the finance layer before you book the call.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/45">
            Tune revenue, workload, and headcount. Watch the operating model and monthly fee move in real time.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="glass-tile space-y-9 rounded-[2.5rem] p-6 sm:p-8 lg:col-span-7 lg:p-10">
            <SliderGroup
              label="Annual Revenue"
              value={revenue}
              onChange={setRevenue}
              min={0}
              max={30_000_000}
              step={250_000}
              format={(value) => `R ${(value / 1_000_000).toFixed(1)}M`}
              accent="#22d3ee"
            />

            <div>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-black text-white/70">Transaction Volume</div>
                  <div className="mt-1 text-xs text-white/35">Monthly bookkeeping line items</div>
                </div>
                <ShieldCheck className="h-5 w-5 text-teal-200" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {VOLUME_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setVolume(option.key)}
                    className={cn(
                      'rounded-2xl border p-4 text-left transition-all duration-500',
                      volume === option.key
                        ? 'border-cyan-200/70 bg-cyan-200 text-[#06111f] shadow-[0_18px_50px_rgba(34,211,238,0.18)]'
                        : 'border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:bg-white/[0.06]'
                    )}
                  >
                    <div className="text-sm font-black">{option.label}</div>
                    <div className="mt-1 text-xs opacity-70">{option.note}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-black text-white/70">Employee Count</div>
                  <div className="mt-1 text-xs text-white/35">Payroll load for the month</div>
                </div>
                <Users className="h-5 w-5 text-emerald-200" />
              </div>
              <div className="flex items-center justify-between rounded-[2rem] border border-white/10 bg-white/[0.03] p-3">
                <button
                  type="button"
                  onClick={() => setEmployees((value) => Math.max(0, value - 1))}
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] text-white/70 transition hover:bg-white/10"
                  aria-label="Decrease employee count"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="text-center">
                  <motion.div
                    key={employees}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="font-mono text-5xl font-black text-white"
                  >
                    {employees}
                  </motion.div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Staff</div>
                </div>
                <button
                  type="button"
                  onClick={() => setEmployees((value) => Math.min(80, value + 1))}
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] text-white/70 transition hover:bg-white/10"
                  aria-label="Increase employee count"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="text-xs font-black uppercase tracking-[0.24em] text-white/30">Service Depth</div>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {displayTiers.map((tier) => (
                  <button
                    key={tier.slug}
                    type="button"
                    onClick={() => setActiveTier(tier.slug)}
                    className={cn(
                      'relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-500',
                      activeTier === tier.slug
                        ? 'border-white bg-white text-[#06111f]'
                        : 'border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:bg-white/[0.06]'
                    )}
                  >
                    {activeTier === tier.slug && (
                      <motion.div layoutId="active-pricing-tier" className="absolute inset-0 rounded-2xl ring-2 ring-cyan-300/40" />
                    )}
                    <div className="relative text-[10px] font-black uppercase tracking-widest opacity-60">{tier.name}</div>
                    <div className="relative mt-1 truncate text-sm font-black">{tier.tagline || 'Operator support'}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <motion.div
              className="glass-tile relative overflow-hidden rounded-[2.5rem] p-6 sm:p-8 lg:p-10"
              animate={{ borderColor: dedicatedPartner ? 'rgba(45, 212, 191, 0.38)' : 'rgba(255,255,255,0.10)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.16),transparent_42%)]" />
              <div className="relative z-10">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-white/30">Value Summary</p>
                    <h3 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white">{selectedTierName} operating plan</h3>
                  </div>
                  {dedicatedPartner && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, y: -12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="flex shrink-0 items-center gap-2 rounded-full bg-teal-200 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-[#06111f] shadow-[0_0_50px_rgba(45,212,191,0.28)]"
                    >
                      <Star className="h-3.5 w-3.5 fill-current" />
                      Dedicated Partner
                    </motion.div>
                  )}
                </div>

                <div className="space-y-4">
                  <SummaryRow label="Close cadence" value={closeVelocity} />
                  <SummaryRow label="Tax control" value="SARS + CIPC tracked" />
                  <SummaryRow label="Bookkeeping" value={`${transactionCount} lines modeled`} />
                  <SummaryRow label="Payroll" value={`${employees} staff covered`} />
                </div>

                <div className="my-9 h-px bg-white/10" />

                <div>
                  <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-white/25">Estimated Monthly Fee</div>
                  <div className="flex flex-wrap items-end gap-3">
                    <AnimatedPrice amount={totalPrice} size="lg" className="text-5xl font-black tracking-[-0.06em] text-white lg:text-7xl" duration={0.7} />
                    <span className="pb-2 text-xs font-black uppercase tracking-widest text-white/25">/ month</span>
                  </div>
                  <p className="mt-4 text-xs leading-5 text-white/35">Rolling digit estimate. Excludes VAT at 15%.</p>
                </div>

                <div className="mt-9 grid gap-3 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-3 text-sm text-white/65">
                    <Sparkles className="h-4 w-4 text-cyan-200" />
                    Tooling, monthly controls, and accountant review included.
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/65">
                    <TrendingUp className="h-4 w-4 text-teal-200" />
                    Upgrade or trim scope as the company changes shape.
                  </div>
                </div>

                <div className="mt-9">
                  <MagneticButton className="w-full">
                    <button className="glow-button flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-200 px-8 py-5 text-base font-black text-[#06111f] transition hover:bg-white">
                      Secure this rate
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SliderGroupProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step: number;
  format: (val: number) => string;
  accent: string;
}

function SliderGroup({ label, value, onChange, min, max, step, format, accent }: SliderGroupProps) {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-black text-white/70">{label}</div>
          <div className="mt-1 text-xs text-white/35">Smooth revenue tier slider</div>
        </div>
        <span className="font-mono text-xl font-black" style={{ color: accent }}>{format(value)}</span>
      </div>
      <div className="relative h-4 rounded-full bg-white/[0.06] p-1">
        <motion.div
          className="h-full rounded-full"
          style={{ width: `${progress}%`, backgroundColor: accent, boxShadow: `0 0 34px ${accent}55` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
      <div className="mt-3 flex justify-between text-[10px] font-black uppercase tracking-widest text-white/25">
        <span>Pre-revenue</span>
        <span>R30M+</span>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-white/35">{label}</span>
      <span className="flex items-center gap-2 text-right font-bold text-white/80">
        {value}
        <CheckCircle2 className="h-3.5 w-3.5 text-teal-300" />
      </span>
    </div>
  );
}
