'use client';

import { Suspense } from 'react';
import { BadgeCheck, Users2, Shield, MessageSquare, ChevronDown, Clock } from 'lucide-react';
import { usePricingState } from '@/hooks/usePricingState';
import { PACKAGE_COMMON_ITEMS } from '@/config/tiers';
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

const INCLUDED_ICONS: React.ElementType[] = [Users2, Shield, MessageSquare];

const FAQ_GROUPS: { label: string; items: { q: string; a: string }[] }[] = [
  {
    label: 'Contract & flexibility',
    items: [
      {
        q: 'Do you require a long-term contract?',
        a: 'No lock-in. Our subscriptions run month-to-month and can be cancelled with 30 days’ written notice.',
      },
      {
        q: 'Can I change my plan after signing up?',
        a: 'Yes. You can upgrade or downgrade your tier, or add and remove services, at any time. Changes take effect from the start of the next billing month.',
      },
      {
        q: 'What happens if my business grows?',
        a: 'We adjust your bracket when your business grows. If you move into a higher size range mid-year, we’ll update your subscription at the next billing date. No penalty, no back-billing.',
      },
    ],
  },
  {
    label: 'Pricing',
    items: [
      {
        q: 'How is my monthly price calculated?',
        a: 'Your price is based on the services you select and the size of your business. Each service has its own size brackets: number of employees for payroll, monthly transactions for bookkeeping, turnover for accounting. Pick your bracket in Step 2 and your price calculates immediately.',
      },
      {
        q: 'Are prices inclusive of VAT?',
        a: 'No. All prices shown on this calculator exclude VAT (15%). VAT is added to your monthly invoice.',
      },
      {
        q: 'What is enterprise pricing?',
        a: 'Enterprise pricing is for businesses outside our standard brackets: high transaction volumes, multiple entities, or unusual structures. We’ll put together a price that fits what you actually need.',
      },
    ],
  },
  {
    label: 'What’s included',
    items: [
      {
        q: 'What is the difference between accounting and bookkeeping?',
        a: 'Bookkeeping keeps your records current: reconciling transactions, processing invoices, and maintaining your Xero ledger. Accounting uses those records to produce financial statements, file your taxes with SARS, and report on how the business is tracking. Most clients take both.',
      },
    ],
  },
  {
    label: 'Getting started',
    items: [
      {
        q: 'How do I get started after choosing a plan?',
        a: 'Fill in the form at the end of Step 3. We’ll be in touch within one business day to confirm your services, answer any questions, and get you set up.',
      },
    ],
  },
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

function InHouseComparison() {
  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            For perspective
          </p>
          <h2 className="text-xl font-bold tracking-tight">
            Why a subscription finance team can make sense before hiring in-house.
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              Bookkeeper on staff
            </p>
            <p className="font-mono text-xl font-bold mt-1">R 15&ndash;25k</p>
            <p className="text-xs text-muted-foreground mt-1 leading-snug">
              per month plus benefits, software, leave cover
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              Year-end accountant
            </p>
            <p className="font-mono text-xl font-bold mt-1">R 18&ndash;30k</p>
            <p className="text-xs text-muted-foreground mt-1 leading-snug">
              once-off for AFS and tax submissions
            </p>
          </div>
          <div className="rounded-xl border-2 border-primary/40 bg-primary/[0.03] p-5">
            <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">
              With Capucor
            </p>
            <p className="font-mono text-xl font-bold mt-1">From R 1,575</p>
            <p className="text-xs text-muted-foreground mt-1 leading-snug">
              per month, both included, Xero included
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-5 max-w-xl mx-auto leading-relaxed">
          Hiring in-house can make sense later. Our role is to give you structure, reporting and compliance cover before that fixed overhead is justified.
        </p>
        <p className="text-[11px] text-muted-foreground/70 text-center mt-2 max-w-md mx-auto leading-relaxed">
          Indicative South African market figures. Your actual hire costs vary by experience, sector, and benefits.
        </p>
      </div>
    </section>
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
      <div className="max-w-2xl mx-auto space-y-8">
        {FAQ_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-1">
              {group.label}
            </p>
            <div className="divide-y divide-border rounded-xl border border-border bg-card/40">
              {group.items.map(({ q, a }) => (
                <details key={q} className="group p-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 list-none text-sm font-medium select-none">
                    {q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
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
      {/* Hero */}
      <section className="relative pt-10 sm:pt-14 pb-8 text-center">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
        >
          <div className="h-64 w-[28rem] max-w-[80%] rounded-full bg-primary/[0.05] blur-3xl" />
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 mb-5">
          <Clock className="h-3 w-3 text-primary" />
          <span className="text-xs font-medium text-foreground">
            About 2 minutes to a final price
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 max-w-2xl mx-auto">
          Know your monthly finance cost before you sign anything.
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Pick your services, choose your business size and select the level of support you need. The calculator shows your monthly subscription immediately, before any sales conversation.
        </p>
      </section>

      {/* Calculator */}
      <div
        id="pricing-summary"
        className="max-w-4xl mx-auto py-8 border-t border-border"
      >
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
            onActivate={advanceToActivate}
            testimonial={spotlightTestimonial}
          />
        )}

        {state.step === 4 && (
          <Step4Activate
            services={services}
            brackets={brackets}
            tiers={tiers}
            selectedServices={state.selectedServices}
            selectedBrackets={state.selectedBrackets}
            selectedTier={state.selectedTier}
            onBack={() => setStep(3)}
          />
        )}
      </div>

      {/* Trust signals near commitment, not in the warm-up */}
      <section className="py-8 border-t border-border">
        <TrustBar />
      </section>

      {/* Post-calculator sections */}
      <InHouseComparison />
      <IncludedInEveryPlan />
      <FAQSection />
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
