'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { monthlyTotal } from '@/lib/pricing';
import type { Bracket, Tier, Service } from '@/types';

interface PricingStudioProps {
  services: Service[];
  brackets: Bracket[];
  tiers: Tier[];
}

export function PricingStudio({ brackets, tiers }: Omit<PricingStudioProps, 'services'>) {
  const [revenue, setRevenue] = useState(2500000); // 2.5M
  const [transactions, setTransactions] = useState(75);
  const [employees, setEmployees] = useState(8);
  const [activeTier, setActiveTier] = useState<string>('pro');

  // Mapping slider values to ordinals
  const ordinals = useMemo(() => {
    // Accounting (Revenue)
    let accOrd = 1;
    if (revenue >= 20000000) accOrd = 5;
    else if (revenue >= 10000000) accOrd = 4;
    else if (revenue >= 5000000) accOrd = 3;
    else if (revenue >= 1000000) accOrd = 2;

    // Bookkeeping (Transactions)
    let bookOrd = 1;
    if (transactions > 250) bookOrd = 4;
    else if (transactions > 100) bookOrd = 3;
    else if (transactions > 50) bookOrd = 2;

    // Payroll (Employees)
    let payOrd = 1;
    if (employees > 30) payOrd = 4;
    else if (employees > 15) payOrd = 3;
    else if (employees > 5) payOrd = 2;

    return {
      accounting: accOrd,
      bookkeeping: bookOrd,
      payroll: payOrd
    };
  }, [revenue, transactions, employees]);

  const totalPrice = useMemo(() => {
    return monthlyTotal(
      ['accounting', 'bookkeeping', 'payroll'],
      ordinals,
      activeTier,
      brackets
    );
  }, [ordinals, activeTier, brackets]);

  const isPriority = revenue >= 10000000;

  return (
    <section id="pricing" className="relative py-24 lg:py-40 bg-background overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-6"
          >
            <Zap className="w-3 h-3" />
            Pricing Studio
          </motion.div>
          <h2 className="text-4xl lg:text-7xl font-heading font-bold tracking-tighter mb-6">
            Configure your <span className="text-white/20 italic">ideal</span> team.
          </h2>
          <p className="text-lg lg:text-xl text-white/40 max-w-2xl mx-auto font-thin-heading">
            No rigid packages. Move the sliders to match your scale. Instant transparency, board-ready results.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Controls Area */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Revenue Slider */}
            <SliderGroup 
              label="Annual Revenue" 
              value={revenue} 
              onChange={setRevenue} 
              min={0} 
              max={30000000} 
              step={500000}
              format={(v: number) => `R ${(v / 1000000).toFixed(1)}M`}
              icon={TrendingUp}
              accent="#22d3ee"
            />

            {/* Transactions Slider */}
            <SliderGroup 
              label="Monthly Transactions" 
              value={transactions} 
              onChange={setTransactions} 
              min={0} 
              max={500} 
              step={10}
              format={(v: number) => `${v} lines`}
              icon={ShieldCheck}
              accent="#4ade80"
            />

            {/* Employees Slider */}
            <SliderGroup 
              label="Employee Count" 
              value={employees} 
              onChange={setEmployees} 
              min={0} 
              max={50} 
              step={1}
              format={(v: number) => `${v} staff`}
              icon={Users}
              accent="#6366f1"
            />

            {/* Tier Selection */}
            <div className="pt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs font-bold uppercase tracking-widest text-white/30">Service Depth</div>
                <div className="h-px flex-1 mx-4 bg-white/5" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {tiers.map((tier) => (
                  <button
                    key={tier.slug}
                    onClick={() => setActiveTier(tier.slug)}
                    className={cn(
                      "relative p-4 rounded-2xl border transition-all duration-500 text-left overflow-hidden",
                      activeTier === tier.slug 
                        ? "bg-white border-white text-black" 
                        : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"
                    )}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">{tier.name}</div>
                    <div className="text-sm font-bold truncate">{tier.tagline || 'Standard'}</div>
                    {activeTier === tier.slug && (
                      <motion.div 
                        layoutId="activeTier"
                        className="absolute inset-0 border-2 border-black/10 rounded-2xl"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Value Summary Card */}
          <div className="lg:col-span-5 sticky top-24">
            <motion.div 
              className="glass-panel p-8 lg:p-10 rounded-[48px] relative overflow-hidden"
              animate={{
                borderColor: isPriority ? 'rgba(74, 222, 128, 0.3)' : 'rgba(255, 255, 255, 0.1)'
              }}
            >
              {isPriority && (
                <div className="absolute top-0 right-0 p-6">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500 text-[#020617] text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-emerald-500/20"
                  >
                    <Star className="w-3 h-3 fill-current" />
                    Priority Partner
                  </motion.div>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-8 tracking-tight">Value Summary</h3>
              
              <div className="space-y-6 mb-10">
                <SummaryRow label="Finance Stack" value="Xero + Dext Included" />
                <SummaryRow label="Compliance" value="SARS & CIPC Handled" />
                <SummaryRow label="Team" value="Dedicated Accountant" />
                <SummaryRow label="Notice" value="30-Day Rolling" />
              </div>

              <div className="pt-10 border-t border-white/5">
                <div className="text-xs font-bold uppercase tracking-widest text-white/20 mb-2">Total Monthly Fee</div>
                <div className="flex items-baseline gap-2">
                  <AnimatedPrice amount={totalPrice} size="lg" className="text-5xl lg:text-6xl text-white font-mono" />
                  <span className="text-sm font-bold text-white/20 uppercase tracking-widest">/ month</span>
                </div>
                <p className="text-[10px] text-white/30 mt-4">Excludes VAT @ 15%. All tools included in fee.</p>
              </div>

              <div className="mt-10">
                <MagneticButton>
                  <button className="w-full py-5 rounded-2xl bg-emerald-500 text-[#020617] font-bold text-lg flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all shadow-[0_20px_40px_rgba(74,222,128,0.2)]">
                    Secure this rate
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </MagneticButton>
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
  icon: React.ElementType;
  accent: string;
}

function SliderGroup({ label, value, onChange, min, max, step, format, icon: Icon, accent }: SliderGroupProps) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/5">
            <Icon className="w-4 h-4 text-white/40" />
          </div>
          <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">{label}</span>
        </div>
        <span className="text-xl font-mono font-bold" style={{ color: accent }}>{format(value)}</span>
      </div>
      
      <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ 
            backgroundColor: accent,
            width: `${((value - min) / (max - min)) * 100}%`,
            boxShadow: `0 0 20px ${accent}44`
          }}
        />
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/30">{label}</span>
      <span className="text-white/80 font-medium flex items-center gap-2">
        {value}
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
      </span>
    </div>
  );
}
