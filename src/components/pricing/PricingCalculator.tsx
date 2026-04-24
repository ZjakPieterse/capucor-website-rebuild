'use client';

import { Suspense, useState } from 'react';
import { usePricingState } from '@/hooks/usePricingState';
import { hasEnterpriseService } from '@/lib/pricing';
import { StepIndicator } from './StepIndicator';
import { Step1Services } from './Step1Services';
import { Step2Brackets } from './Step2Brackets';
import { Step3Tiers } from './Step3Tiers';
import { SummaryPanel } from './SummaryPanel';
import { GetQuoteModal } from './GetQuoteModal';
import type { PricingData } from '@/types';

interface PricingCalculatorProps {
  data: PricingData;
}

function PricingCalculatorInner({ data }: PricingCalculatorProps) {
  const { services, brackets, tiers } = data;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<'signup' | 'enterprise'>('signup');

  const {
    state,
    setStep,
    toggleService,
    setBracket,
    setTier,
    canProceedStep1,
    canProceedStep2,
  } = usePricingState();

  const activeSlugs = [...state.selectedServices];
  const isEnterprise = hasEnterpriseService(activeSlugs, state.selectedBrackets);

  function openModal(source: 'signup' | 'enterprise') {
    setModalSource(source);
    setModalOpen(true);
  }

  const modalConfig = {
    services: activeSlugs,
    brackets: state.selectedBrackets,
    tier: state.selectedTier,
    hasEnterprise: isEnterprise,
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Pricing Calculator</h1>
        <p className="text-muted-foreground">
          Build your exact subscription in three steps. All prices excl. VAT.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Left: Steps */}
        <div className="min-w-0">
          <StepIndicator currentStep={state.step} />

          {state.step === 1 && (
            <Step1Services
              services={services}
              selected={state.selectedServices}
              onToggle={toggleService}
              onNext={() => {
                if (canProceedStep1) setStep(2);
              }}
            />
          )}

          {state.step === 2 && (
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
          )}

          {state.step === 3 && (
            <Step3Tiers
              services={services}
              brackets={brackets}
              tiers={tiers}
              selectedServices={state.selectedServices}
              selectedBrackets={state.selectedBrackets}
              selectedTier={state.selectedTier}
              onTierSelect={setTier}
              onBack={() => setStep(2)}
            />
          )}
        </div>

        {/* Right: Summary */}
        <SummaryPanel
          services={services}
          brackets={brackets}
          tiers={tiers}
          selectedServices={state.selectedServices}
          selectedBrackets={state.selectedBrackets}
          selectedTierSlug={state.selectedTier}
          onGetQuote={openModal}
        />
      </div>

      <GetQuoteModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        source={modalSource}
        config={modalConfig}
      />
    </div>
  );
}

// Wrap in Suspense for useSearchParams
export function PricingCalculator({ data }: PricingCalculatorProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="h-8 w-64 rounded-md bg-muted animate-pulse mb-8" />
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            <div className="space-y-4">
              <div className="h-4 w-40 rounded bg-muted animate-pulse" />
              <div className="grid sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-36 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            </div>
            <div className="h-64 rounded-xl bg-muted animate-pulse" />
          </div>
        </div>
      }
    >
      <PricingCalculatorInner data={data} />
    </Suspense>
  );
}
