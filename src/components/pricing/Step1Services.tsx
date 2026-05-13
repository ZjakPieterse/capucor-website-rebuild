'use client';

import { useState } from 'react';
import { BarChart2, BookMarked, Users, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { motion, AnimatePresence } from 'motion/react';
import type { Service } from '@/types';

const SERVICE_ICONS: Record<string, React.ElementType> = {
  accounting: BarChart2,
  bookkeeping: BookMarked,
  payroll: Users,
};

const SERVICE_DELIVERABLES: Record<string, string[]> = {
  accounting: ['Annual financials', 'VAT & Tax', 'CIPC'],
  bookkeeping: ['Reconciliation', 'Xero Included', 'Suppliers'],
  payroll: ['Payslips & EMP201', 'UIF Compliance', 'COIDA'],
};

const SERVICE_FULL_SCOPE: Record<
  string,
  { title: string; description: string }[]
> = {
  accounting: [
    {
      title: 'Annual financial statements',
      description: 'Compiled by a professional accountant. Ready for SARS, banks, or investors.',
    },
    {
      title: 'Income tax & provisional tax',
      description: 'Returns filed on time for both the August and February cycles. No late penalties.',
    },
    {
      title: 'VAT201 reporting & submission',
      description: 'Returns prepared and submitted every cycle, monthly or bi-monthly.',
    },
    {
      title: 'CIPC annual returns',
      description: 'Filed before the due date every year. No deregistration risk.',
    },
  ],
  bookkeeping: [
    {
      title: 'Xero subscription included',
      description: 'Cloud accounting software set up correctly from day one. No separate bill.',
    },
    {
      title: 'Transaction processing',
      description: 'Every bank feed captured and coded to the right account each cycle.',
    },
    {
      title: 'Bank reconciliations',
      description: 'Every account reconciled against actual statements each month.',
    },
    {
      title: 'Monthly management accounts',
      description: 'A real P&L and balance sheet in your inbox every month.',
    },
  ],
  payroll: [
    {
      title: 'Payroll processing & payslips',
      description: 'Gross-to-net calculated correctly. Payslips issued before pay day.',
    },
    {
      title: 'PAYE & UIF submissions',
      description: 'EMP201 prepared and submitted to SARS before the 7th each month.',
    },
    {
      title: 'COIDA compliance',
      description: 'Return of Earnings filed with the Compensation Fund every year.',
    },
    {
      title: 'IRP5 certificates',
      description: 'Year-end IRP5s and EMP501 reconciliation submitted before the May deadline.',
    },
  ],
};

interface Step1ServicesProps {
  services: Service[];
  selected: Set<string>;
  onToggle: (slug: string) => void;
  onNext: () => void;
}

export function Step1Services({ services, selected, onToggle, onNext }: Step1ServicesProps) {
  const [expandedScope, setExpandedScope] = useState<Set<string>>(new Set());

  function toggleScope(slug: string) {
    setExpandedScope((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-3">What should we take off your plate?</h2>
        <p className="text-white/40 text-sm leading-relaxed">
          Choose the functions you want Capucor to manage. Each service is priced separately, then combined into one fixed monthly subscription.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {services.map((svc, i) => {
          const Icon = SERVICE_ICONS[svc.slug] ?? BarChart2;
          const isSelected = selected.has(svc.slug);
          const deliverables = SERVICE_DELIVERABLES[svc.slug] ?? [];
          const fullScope = SERVICE_FULL_SCOPE[svc.slug] ?? [];
          const isExpanded = expandedScope.has(svc.slug);

          return (
            <motion.div
              key={svc.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onToggle(svc.slug)}
              className={cn(
                "group relative p-8 rounded-[32px] border transition-all duration-500 cursor-pointer overflow-hidden",
                isSelected 
                  ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_20px_40px_rgba(74,222,128,0.1)]" 
                  : "bg-white/5 border-white/5 hover:border-white/10"
              )}
            >
              {/* Selection Badge */}
              <AnimatePresence>
                {isSelected && (
                   <motion.div 
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0, opacity: 0 }}
                     className="absolute top-6 right-6 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20"
                   >
                      <Check className="w-4 h-4 text-[#060a14] stroke-[3]" />
                   </motion.div>
                )}
              </AnimatePresence>

              <div 
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500",
                  isSelected ? "bg-emerald-500/20 border border-emerald-500/30" : "bg-white/5 border border-white/5"
                )}
              >
                <Icon className={cn("w-6 h-6", isSelected ? "text-emerald-400" : "text-white/20")} />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{svc.name}</h3>
              <p className="text-xs text-white/40 leading-relaxed mb-6">{svc.description}</p>

              <ul className="space-y-3 mb-8">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-xs text-white/60">
                    <div className={cn("w-1 h-1 rounded-full", isSelected ? "bg-emerald-400" : "bg-white/20")} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-white/5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleScope(svc.slug);
                  }}
                  className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2 hover:opacity-80"
                >
                  {isExpanded ? 'Hide Details' : 'Full Scope'}
                  <ChevronDown className={cn("w-3 h-3 transition-transform", isExpanded && "rotate-180")} />
                </button>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 space-y-4">
                       {fullScope.map((item) => (
                         <div key={item.title}>
                            <div className="text-[10px] font-bold text-white mb-1">{item.title}</div>
                            <div className="text-[10px] text-white/30 leading-relaxed">{item.description}</div>
                         </div>
                       ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5">
        <p className="text-xs text-white/20 font-medium">
          Need a custom setup?{' '}
          <a
            href={siteConfig.links.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline"
          >
            Book a fit call
          </a>
        </p>

        <MagneticButton>
          <button 
            onClick={onNext} 
            disabled={selected.size === 0}
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
