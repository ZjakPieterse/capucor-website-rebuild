'use client';

import { Suspense, useState } from 'react';
import { BadgeCheck, Users2, Shield, MessageSquare, ChevronDown } from 'lucide-react';
import { usePricingState } from '@/hooks/usePricingState';
import { hasEnterpriseService } from '@/lib/pricing';
import { PACKAGE_COMMON_ITEMS } from '@/config/tiers';
import { siteConfig } from '@/config/site';
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

const TRUST_ITEMS = [
  'SARS Registered',
  'Fixed Monthly Pricing',
  'No Lock-in Contracts',
  'Dedicated Consultant',
  "Cancel with 30 Days’ Notice",
];

const INCLUDED_ICONS: React.ElementType[] = [Users2, Shield, MessageSquare];

const FAQ_ITEMS = [
  {
    q: 'How is my monthly price calculated?',
    a: 'Your price is based on the services you select and the size of your business. Each service has size brackets — for example, the number of employees for payroll or monthly transactions for bookkeeping. Select your bracket in Step 2 and your price is calculated immediately.',
  },
  {
    q: 'Are prices inclusive of VAT?',
    a: 'No. All prices shown on this calculator exclude VAT (15%). VAT will be added to your monthly invoice.',
  },
  {
    q: 'Can I change my plan after signing up?',
    a: 'Yes. You can upgrade or downgrade your tier, or add and remove services, at any time. Changes take effect from the start of the next billing month.',
  },
  {
    q: 'What is enterprise pricing?',
    a: 'Enterprise pricing is for businesses outside our standard brackets — typically high transaction volumes, multiple entities, or unusual structures. We\'ll put together a price that fits what you actually need.',
  },
  {
    q: 'What is the difference between accounting and bookkeeping?',
    a: 'Bookkeeping keeps your records current: reconciling transactions, processing invoices, and maintaining your Xero ledger. Accounting uses those records to produce financial statements, file your taxes with SARS, and report on how the business is tracking. Most clients take both.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: 'No lock-in. Our subscriptions run month-to-month and can be cancelled with 30 days’ written notice.',
  },
  {
    q: 'What happens if my business grows?',
    a: 'We adjust your bracket when your business grows. If you move into a higher size range mid-year, we\'ll update your subscription at the next billing date. There\'s no penalty and no back-billing.',
  },
  {
    q: 'How do I get started after choosing a plan?',
    a: 'Fill in the form at the end of Step 3. We\'ll be in touch within one business day to confirm your services, answer any questions, and get you set up.',
  },
];

function TrustBar() {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
      {TRUST_ITEMS.map((item) => (
        <div key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />
          {item}
        </div>
      ))}
    </div>
  );
}

function IncludedInEveryPlan() {
  return (
    <section className="py-16 border-t border-border">
      <div className="text-center mb-10">
        <p className="text-xs font-medium uppercase tracking-widest text-primary mb-2">Every Plan</p>
        <h2 className="text-2xl font-bold tracking-tight">What&rsquo;s included across all tiers</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
          Every plan includes these three things, regardless of price.
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {PACKAGE_COMMON_ITEMS.map((item, i) => {
          const Icon = INCLUDED_ICONS[i] ?? Shield;
          return (
            <div
              key={item.text}
              className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{item.text}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.tooltip}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-16 border-t border-border">
      <div className="text-center mb-10">
        <p className="text-xs font-medium uppercase tracking-widest text-primary mb-2">FAQ</p>
        <h2 className="text-2xl font-bold tracking-tight">Common questions</h2>
      </div>
      <div className="max-w-2xl mx-auto divide-y divide-border">
        {FAQ_ITEMS.map(({ q, a }) => (
          <details key={q} className="group py-4">
            <summary className="flex cursor-pointer items-center justify-between gap-4 list-none text-sm font-medium select-none">
              {q}
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className="py-16 border-t border-border text-center">
      <p className="text-lg font-semibold mb-1">Not ready to commit?</p>
      <p className="text-sm text-muted-foreground mb-6">
        Book a free 15-minute call and we&rsquo;ll walk you through which services fit your business.
      </p>
      <a
        href={siteConfig.links.booking}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium hover:border-primary/60 hover:bg-muted/40 transition-colors"
      >
        Book a free call →
      </a>
    </section>
  );
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
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero */}
      <section className="pt-16 pb-12 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">
          Transparent Pricing
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Know your numbers before you sign anything.
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Select your services, set your size bracket, and you&apos;ll see an exact monthly price in under two minutes. Accounting, bookkeeping, and payroll are each priced by the scope of work your business requires. It all combines into a single fixed monthly subscription, with a dedicated finance team included.
        </p>
        <TrustBar />
      </section>

      {/* Calculator */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start py-8 border-t border-border">
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
              onGetQuote={openModal}
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

      {/* Post-calculator sections */}
      <IncludedInEveryPlan />
      <FAQSection />
      <BottomCTA />

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
