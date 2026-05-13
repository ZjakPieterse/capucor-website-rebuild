'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Gauge, ReceiptText, Users, WalletCards } from 'lucide-react';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { formatZAR } from '@/lib/utils';
import { monthlyTotal } from '@/lib/pricing';
import type { Bracket, Service, Tier } from '@/types';

interface PricingStudioProps {
  services: Service[];
  brackets: Bracket[];
  tiers: Tier[];
}

const EASE = [0.2, 0, 0, 1] as const;

const fallbackTiers: Pick<Tier, 'slug' | 'name' | 'tagline'>[] = [
  { slug: 'basic', name: 'Control', tagline: 'Essential finance layer' },
  { slug: 'pro', name: 'Operator', tagline: 'Monthly operating rhythm' },
  { slug: 'premium', name: 'Partner', tagline: 'Decision-grade cadence' },
];

export function PricingStudio({ brackets, tiers }: Omit<PricingStudioProps, 'services'>) {
  const displayTiers = tiers.length > 0 ? tiers : fallbackTiers;
  const [revenue, setRevenue] = useState(2_500_000);
  const [transactionCount, setTransactionCount] = useState(140);
  const [employees, setEmployees] = useState(8);

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

  const planSlug = useMemo(() => {
    const complexity = revenue / 8_000_000 + transactionCount / 180 + employees / 18;
    if (complexity >= 4.2) return 'premium';
    if (complexity >= 1.7) return 'pro';
    return 'basic';
  }, [employees, revenue, transactionCount]);

  const modeledPrice = useMemo(
    () => monthlyTotal(['accounting', 'bookkeeping', 'payroll'], ordinals, planSlug, brackets),
    [brackets, ordinals, planSlug]
  );

  const fallbackPrice = Math.round(4200 + revenue * 0.00022 + transactionCount * 18 + employees * 165);
  const totalPrice = modeledPrice > 0 ? modeledPrice : fallbackPrice;
  const selectedTier = displayTiers.find((tier) => tier.slug === planSlug) ?? fallbackTiers.find((tier) => tier.slug === planSlug) ?? fallbackTiers[1];
  const cadence = transactionCount > 250 || revenue >= 10_000_000 ? 'Weekly pulse' : transactionCount > 90 ? 'Fortnightly pulse' : 'Monthly pulse';
  const reviewLoad = Math.max(6, Math.round(transactionCount / 18 + employees * 0.7));

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#050505] py-20 lg:py-28">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(45,212,191,0.10),transparent_30%),linear-gradient(180deg,#0a0a0b_0%,#050505_100%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE }}
            className="mb-5 inline-flex items-center gap-2 border border-white/10 bg-white/[0.025] px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/42"
          >
            <WalletCards className="h-3.5 w-3.5 text-[#2DD4BF]" />
            Zen Pricing Studio
          </motion.div>
          <h2 className="font-heading max-w-3xl text-balance text-5xl font-normal leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            Configure the finance layer. Read the value statement live.
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Three inputs model the monthly workload. The quote updates as the company changes shape.
          </p>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.72, ease: EASE }}
            className="rounded-[1.65rem] border border-white/[0.07] bg-white/[0.025] p-6 sm:p-7 lg:col-span-7"
          >
            <div className="mb-8 flex items-center justify-between gap-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/28">Configurator</p>
                <h3 className="mt-2 font-heading text-3xl font-normal tracking-[-0.035em] text-white">Founder inputs</h3>
              </div>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="space-y-9">
              <SliderGroup
                icon={<Gauge className="h-4 w-4" />}
                label="Annual Revenue"
                value={revenue}
                onChange={setRevenue}
                min={0}
                max={30_000_000}
                step={250_000}
                format={(value) => `R ${(value / 1_000_000).toFixed(1)}M`}
                minLabel="Pre-revenue"
                maxLabel="R30M+"
              />
              <SliderGroup
                icon={<ReceiptText className="h-4 w-4" />}
                label="Monthly Transaction Count"
                value={transactionCount}
                onChange={setTransactionCount}
                min={10}
                max={500}
                step={10}
                format={(value) => `${value} lines`}
                minLabel="10"
                maxLabel="500"
              />
              <SliderGroup
                icon={<Users className="h-4 w-4" />}
                label="Employee Count"
                value={employees}
                onChange={setEmployees}
                min={0}
                max={80}
                step={1}
                format={(value) => `${value} staff`}
                minLabel="0"
                maxLabel="80"
              />
            </div>
          </motion.div>

          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              animate={{ borderColor: planSlug === 'premium' ? 'rgba(45,212,191,0.42)' : 'rgba(255,255,255,0.07)' }}
              transition={{ duration: 0.72, ease: EASE }}
              className="relative overflow-hidden rounded-[1.65rem] border bg-white/[0.025] p-6 sm:p-7"
            >
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.12),transparent_45%)]" />
              <div className="relative z-10">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/28">Statement of Value</p>
                    <h3 className="mt-2 font-heading text-3xl font-normal tracking-[-0.035em] text-white">{selectedTier.name} plan</h3>
                    <p className="mt-2 text-xs leading-5 text-white/38">{selectedTier.tagline || 'Monthly operating rhythm'}</p>
                  </div>
                  <span className="rounded-full border border-[#2DD4BF]/25 bg-[#2DD4BF]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#8ff5e9]">Live Quote</span>
                </div>

                <div className="space-y-3">
                  <SummaryRow label="Close cadence" value={cadence} />
                  <SummaryRow label="Compliance control" value="SARS + CIPC watch" />
                  <SummaryRow label="Review load" value={`${reviewLoad} checks / month`} />
                  <SummaryRow label="Modeled scope" value={`${transactionCount} lines · ${employees} staff`} />
                </div>

                <div className="my-8 h-px bg-white/[0.08]" />

                <div>
                  <div className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-white/28">Estimated Monthly Fee</div>
                  <div className="flex flex-wrap items-end gap-3">
                    <AnimatedPrice amount={totalPrice} size="lg" className="text-5xl font-black tracking-[-0.055em] text-white lg:text-6xl" duration={0.7} />
                    <span className="pb-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/28">/ month</span>
                  </div>
                  <p className="mt-4 text-xs leading-5 text-white/36">Rolling digit estimate. Excludes VAT at 15%. Current model: {formatZAR(totalPrice)}.</p>
                </div>

                <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-xs leading-6 text-white/46">
                  The quote prioritizes recurring controls, month-end review, payroll movement, and founder-ready reporting.
                </div>

                <div className="mt-8">
                  <MagneticButton className="w-full" activationRadius={30}>
                    <button className="glow-button flex w-full items-center justify-center gap-2 rounded-full bg-[#2DD4BF] px-7 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-[#03100f] transition hover:bg-[#5eead4]">
                      Finalize Partnership
                      <ArrowRight className="h-4 w-4" />
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
  icon: ReactNode;
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step: number;
  format: (val: number) => string;
  minLabel: string;
  maxLabel: string;
}

function SliderGroup({ icon, label, value, onChange, min, max, step, format, minLabel, maxLabel }: SliderGroupProps) {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.025] text-[#2DD4BF]">{icon}</span>
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/52">{label}</div>
            <div className="mt-1 text-xs text-white/30">Thin teal control line</div>
          </div>
        </div>
        <span className="font-mono text-sm font-black tabular-nums text-[#8ff5e9] sm:text-lg">{format(value)}</span>
      </div>
      <div className="relative h-7">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/[0.09]" />
        <motion.div
          className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-[#2DD4BF] shadow-[0_0_22px_rgba(45,212,191,0.45)]"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-[#2DD4BF] bg-[#050505] shadow-[0_0_20px_rgba(45,212,191,0.5)]" style={{ left: `calc(${progress}% - 6px)` }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={label}
        />
      </div>
      <div className="mt-2 flex justify-between text-[10px] font-black uppercase tracking-[0.18em] text-white/24">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-white/34">{label}</span>
      <span className="flex items-center gap-2 text-right font-bold text-white/78">
        {value}
        <CheckCircle2 className="h-3.5 w-3.5 text-[#2DD4BF]" />
      </span>
    </div>
  );
}
