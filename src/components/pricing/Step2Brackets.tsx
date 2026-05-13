'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { motion } from 'motion/react';
import { BarChart2, BookMarked, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Bracket, BracketValue, Service } from '@/types';

const SERVICE_ICONS: Record<string, React.ElementType> = {
  accounting: BarChart2,
  bookkeeping: BookMarked,
  payroll: Users,
};

interface Step2BracketsProps {
  services: Service[];
  brackets: Bracket[];
  selectedServices: Set<string>;
  selectedBrackets: Record<string, BracketValue>;
  onBracketChange: (slug: string, value: BracketValue) => void;
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
}

export function Step2Brackets({
  services,
  brackets,
  selectedServices,
  selectedBrackets,
  onBracketChange,
  onBack,
  onNext,
  canProceed,
}: Step2BracketsProps) {
  const activeServices = services.filter((s) => selectedServices.has(s.slug));

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-3">Define your business scale</h2>
        <p className="text-white/40 text-sm leading-relaxed">
          Each function is priced based on the workload. Select the range that best reflects your current business stage to calibrate your subscription.
        </p>
      </div>

      <div className="space-y-6">
        {activeServices.map((svc, i) => {
          const Icon = SERVICE_ICONS[svc.slug] ?? BarChart2;
          const svcBrackets = brackets
            .filter((b) => b.service_slug === svc.slug && !b.is_enterprise)
            .sort((a, b) => a.display_order - b.display_order);
          const currentValue = selectedBrackets[svc.slug];
          const selectValue = currentValue !== undefined ? String(currentValue) : '';

          return (
            <motion.div
              key={svc.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-8 rounded-[32px] bg-white/5 border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                  <Icon className="w-6 h-6 text-white/40" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white tracking-tight">{svc.name}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">{svc.bracket_unit_label}</div>
                </div>
              </div>

              <div className="w-full sm:w-64">
                <Select
                  value={selectValue}
                  onValueChange={(val) => onBracketChange(svc.slug, Number(val) as BracketValue)}
                  items={Object.fromEntries(svcBrackets.map((b) => [String(b.ordinal), b.label]))}
                >
                  <SelectTrigger
                    className="w-full h-12 rounded-xl border-white/10 bg-white/5 text-white font-bold"
                  >
                    <SelectValue placeholder={`Select Range…`} />
                  </SelectTrigger>
                  <SelectContent align="end" className="bg-[#070c1a] border-white/10 text-white">
                    {svcBrackets.map((bracket) => (
                      <SelectItem key={bracket.id} value={String(bracket.ordinal)} className="focus:bg-white/10 focus:text-white">
                        {bracket.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          );
        })}
      </div>

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

        <MagneticButton>
          <button 
            onClick={onNext} 
            disabled={!canProceed}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-white text-[#060a14] font-bold text-sm disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/90 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </MagneticButton>
      </div>
    </div>
  );
}
