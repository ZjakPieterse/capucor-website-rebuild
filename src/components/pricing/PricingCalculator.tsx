'use client';

import { Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BadgeCheck, Clock, ShieldCheck } from 'lucide-react';
import { usePricingState } from '@/hooks/usePricingState';
import { PACKAGE_COMMON_ITEMS } from '@/config/tiers';
import { StepIndicator } from './StepIndicator';
import { Step1Services } from './Step1Services';
import { Step2Brackets } from './Step2Brackets';
import { Step3Tiers } from './Step3Tiers';
import { Step4Activate } from './Step4Activate';
import { MobileTotalBar } from './MobileTotalBar';
import { StickyConfigChip } from './StickyConfigChip';
import type { PricingData, Testimonial } from '@/types';
import { cn } from '@/lib/utils';

interface PricingCalculatorProps {
  data: PricingData;
  testimonials?: Testimonial[];
}

const TRUST_ITEMS = [
  'SARS Registered',
  'Fixed Monthly Pricing',
  'No Lock-in Contracts',
  'Dedicated Finance Team',
  "Cancel with 30 Days’ Notice",
];



function PricingCalculatorInner({ data, testimonials = [] }: PricingCalculatorProps) {
  const { services, brackets, tiers } = data;
  const spotlightTestimonial = testimonials[0] ?? null;

  const {
    state,
    setStep,
    toggleService,
    setBracket,
    setTier,
    canProceedStep1,
    canProceedStep2,
    canProceedStep3,
  } = usePricingState();

  const advanceToActivate = () => {
    if (canProceedStep3) setStep(4);
  };

  return (
    <div className="bg-[#060a14] min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-emerald-500/5 to-transparent" />
          <motion.div
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-8"
          >
            <Clock className="w-3 h-3" />
            2-Minute Configuration
          </motion.div>

          <h1 className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tighter leading-[1.1] max-w-4xl mx-auto">
            Build your <span className="text-white/40 italic">exact</span> finance subscription.
          </h1>
          
          <p className="text-lg lg:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Pick your services, business size, and support level. The configuration engine shows your transparent monthly fee immediately.
          </p>
        </div>
      </section>

      {/* Main Configuration Hub */}
      <div className="max-w-7xl mx-auto px-6 pb-40">
        <div className="relative glass-panel rounded-[48px] p-8 lg:p-12 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
          <div id="pricing-summary">
            <StepIndicator currentStep={state.step} />

            <div className="mt-12 min-h-[500px]">
              <AnimatePresence mode="wait">
                {state.step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Step1Services
                      services={services}
                      selected={state.selectedServices}
                      onToggle={toggleService}
                      onNext={() => { if (canProceedStep1) setStep(2); }}
                    />
                  </motion.div>
                )}

                {state.step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Step2Brackets
                      services={services}
                      brackets={brackets}
                      selectedServices={state.selectedServices}
                      selectedBrackets={state.selectedBrackets}
                      onBracketChange={setBracket}
                      onBack={() => setStep(1)}
                      onNext={() => { if (canProceedStep2) setStep(3); }}
                      canProceed={canProceedStep2}
                    />
                  </motion.div>
                )}

                {state.step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Step3Tiers
                      services={services}
                      brackets={brackets}
                      tiers={tiers}
                      selectedServices={state.selectedServices}
                      selectedBrackets={state.selectedBrackets}
                      selectedTier={state.selectedTier}
                      onTierSelect={setTier}
                      onBack={() => setStep(2)}
                      onActivate={advanceToActivate}
                      testimonial={spotlightTestimonial}
                    />
                  </motion.div>
                )}

                {state.step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Step4Activate
                      services={services}
                      brackets={brackets}
                      tiers={tiers}
                      selectedServices={state.selectedServices}
                      selectedBrackets={state.selectedBrackets}
                      selectedTier={state.selectedTier}
                      onBack={() => setStep(3)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Global Inclusions & Comparison */}
        <div className="mt-24 grid lg:grid-cols-2 gap-12">
           <div className="p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Always Included</h3>
              </div>
              <div className="grid gap-6">
                 {PACKAGE_COMMON_ITEMS.map((item, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                       <div>
                          <div className="text-white font-bold text-sm mb-1">{item.text}</div>
                          <div className="text-white/40 text-xs leading-relaxed">{item.tooltip}</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-3xl">
              <h3 className="text-2xl font-bold text-white mb-2">Cost Perspective</h3>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">
                Why a subscription finance team makes sense before hiring in-house.
              </p>
              <div className="space-y-4">
                 <PriceCompareRow label="In-house Bookkeeper" price="R 15,000+" sub="per month + benefits" />
                 <PriceCompareRow label="Year-end Accountant" price="R 20,000+" sub="once-off submission" />
                 <PriceCompareRow label="Capucor Solution" price="From R 1,575" sub="monthly / all-inclusive" highlighted />
              </div>
           </div>
        </div>

        {/* Trust Signals Footer */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
           {TRUST_ITEMS.map(item => (
             <div key={item} className="flex items-center gap-2">
               <BadgeCheck className="w-4 h-4 text-emerald-500/40" />
               {item}
             </div>
           ))}
        </div>
      </div>

      <MobileTotalBar
        selectedServices={state.selectedServices}
        selectedBrackets={state.selectedBrackets}
        selectedTierSlug={state.selectedTier}
        tiers={tiers}
        brackets={brackets}
        summaryAnchorId="pricing-summary"
        onActivate={advanceToActivate}
        currentStep={state.step}
      />

      <StickyConfigChip
        selectedServices={state.selectedServices}
        selectedBrackets={state.selectedBrackets}
        selectedTierSlug={state.selectedTier}
        tiers={tiers}
        brackets={brackets}
        observeElementId="pricing-summary"
        scrollToId="pricing-summary"
      />
    </div>
  );
}

function PriceCompareRow({ label, price, sub, highlighted = false }: { label: string; price: string; sub: string; highlighted?: boolean }) {
  return (
    <div className={cn(
      "flex items-center justify-between p-5 rounded-2xl border transition-all",
      highlighted ? "bg-emerald-500/10 border-emerald-500/30" : "bg-white/5 border-white/5"
    )}>
      <div>
        <div className={cn("text-xs font-bold uppercase tracking-widest mb-1", highlighted ? "text-emerald-400" : "text-white/40")}>{label}</div>
        <div className="text-[10px] text-white/20">{sub}</div>
      </div>
      <div className={cn("text-xl font-bold font-mono", highlighted ? "text-white" : "text-white/40")}>{price}</div>
    </div>
  );
}

export function PricingCalculator({ data, testimonials }: PricingCalculatorProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#060a14] flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
        </div>
      }
    >
      <PricingCalculatorInner data={data} testimonials={testimonials} />
    </Suspense>
  );
}
