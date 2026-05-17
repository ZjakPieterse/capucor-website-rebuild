'use client';

import { Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BadgeCheck } from 'lucide-react';
import { usePricingState } from '@/hooks/usePricingState';
import { siteConfig } from '@/config/site';
import { StepIndicator } from './StepIndicator';
import { Step1Services } from './Step1Services';
import { Step2Brackets } from './Step2Brackets';
import { Step3Tiers } from './Step3Tiers';
import { Step4Activate } from './Step4Activate';
import { MobileTotalBar } from './MobileTotalBar';
import { StickyConfigChip } from './StickyConfigChip';
import type { PricingData, Testimonial } from '@/types';

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

function TrustBar() {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
      {TRUST_ITEMS.map((item) => (
        <div key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />
          {item}
        </div>
      ))}
    </div>
  );
}

function BottomCTA() {
  return (
    <section className="py-16 border-t border-border text-center">
      <p className="text-lg font-semibold mb-1">Not ready to commit?</p>
      <p className="text-sm text-muted-foreground mb-6">
        Book a 15-minute fit call and we&rsquo;ll walk you through which services fit your business.
      </p>
      <a
        href={siteConfig.links.booking}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium hover:border-primary/60 hover:bg-muted/40 transition-colors"
      >
        Book a 15-minute fit call →
      </a>
    </section>
  );
}

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
    <div className="max-w-7xl mx-auto px-6 pb-24 lg:pb-0">
      {/* Entry block — premium frame around StepIndicator */}
      <section
        id="pricing-summary"
        className="relative max-w-4xl mx-auto pt-10 sm:pt-14 pb-6 overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 pointer-events-none"
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[320px] w-[420px] rounded-full bg-primary/8 blur-[90px]"
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -top-6 right-[8%] h-[200px] w-[200px] rounded-full blur-[70px]"
            style={{ background: 'color-mix(in oklch, var(--brand-cyan) 14%, transparent)' }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        <div className="premium-divider w-full h-px mb-6" />
        <p className="text-xs font-medium uppercase tracking-widest text-primary mb-6 text-center">
          3 steps to your monthly price
        </p>
        <StepIndicator currentStep={state.step} />
        <div className="premium-divider w-full h-px mt-6" />
      </section>

      {/* Step content */}
      <div className="max-w-4xl mx-auto px-1 sm:px-0 pb-8">
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {state.step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Step1Services
                  services={services}
                  selected={state.selectedServices}
                  onToggle={toggleService}
                  onNext={() => {
                    if (canProceedStep1) setStep(2);
                  }}
                />
              </motion.div>
            )}

            {state.step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Step2Brackets
                  services={services}
                  brackets={brackets}
                  selectedServices={state.selectedServices}
                  selectedBrackets={state.selectedBrackets}
                  onBracketChange={setBracket}
                  onBack={() => setStep(1)}
                  onNext={() => {
                    if (canProceedStep2) setStep(3);
                  }}
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
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Trust signals near commitment, not in the warm-up */}
      <section className="py-8 border-t border-border">
        <TrustBar />
      </section>

      <BottomCTA />

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

// Wrap in Suspense for useSearchParams
export function PricingCalculator({ data, testimonials }: PricingCalculatorProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="h-8 w-64 rounded-md bg-muted animate-pulse mb-8 mx-auto" />
          <div className="space-y-4">
            <div className="h-4 w-40 rounded bg-muted animate-pulse" />
            <div className="grid sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-36 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <PricingCalculatorInner data={data} testimonials={testimonials} />
    </Suspense>
  );
}
