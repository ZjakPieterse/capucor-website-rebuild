'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Inbox, Cog, BarChart2, MessageSquare, ArrowRight, Calendar } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/config/site';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/ui/MagneticButton';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    icon: Inbox,
    number: '1',
    title: 'Collect & Collaborate',
    body: 'You know exactly what to send, where to send it, and by when. We make the monthly admin clear and repeatable, so both sides can deliver properly.',
    deliverable: 'VAT201, EMP201, provisional tax and CIPC deadlines tracked through a structured workflow, not memory or last-minute panic.',
  },
  {
    icon: Cog,
    number: '2',
    title: 'Process & Reconcile',
    body: 'We capture, code and reconcile the month’s activity in Xero, including bank feeds, supplier invoices, payroll entries and key control accounts.',
    deliverable: 'Your Xero ledger stays reconciled and decision-ready. When the bank, SARS or a funder needs a number, you are not scrambling to catch up.',
  },
  {
    icon: BarChart2,
    number: '3',
    title: 'Review & Report',
    body: 'A senior accountant checks the numbers before they reach you. You receive a clear monthly report showing performance, cash flow, debtors and anything that needs attention.',
    deliverable: 'A concise monthly view of revenue, expenses, cash flow, debtors and anything unusual that deserves attention.',
  },
  {
    icon: MessageSquare,
    number: '4',
    title: 'Advise & Plan',
    body: 'We turn the report into useful business conversation: tax timing, cash pressure, margin movement, compliance risks and practical next steps.',
    deliverable: 'Risks, opportunities and planning points raised early, while there is still time to act on them.',
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center center',
        end: `+=${STEPS.length * 45}%`,
        pin: true,
        scrub: 0.4,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentStep = Math.min(
            STEPS.length - 1,
            Math.floor(progress * STEPS.length),
          );
          setActiveStep(currentStep);
        },
      },
    });

    tl.fromTo('.progress-fill',
      { width: '0%' },
      { width: '100%', ease: 'none' },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="py-12 bg-background min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-6 w-full">
        <SectionHeading
          eyebrow="How it works"
          title="A monthly rhythm that keeps you in control"
          subtitle="Great finance work needs a clear monthly rhythm. We process, review, report and advise so the month closes properly."
        />

        {/* Horizontal step indicator */}
        <div className="relative mt-14 mb-12">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border" aria-hidden />
          <div
            className="progress-fill absolute left-0 top-1/2 -translate-y-1/2 h-[2px]"
            style={{
              background: 'linear-gradient(to right, var(--primary), color-mix(in oklch, var(--primary) 70%, var(--brand-cyan)))',
              width: '0%',
              boxShadow: '0 0 14px color-mix(in oklch, var(--primary) 60%, transparent)',
            }}
            aria-hidden
          />
          <div className="relative flex items-center justify-between">
            {STEPS.map((step, i) => {
              const isActive = i === activeStep;
              const isPassed = i <= activeStep;
              return (
                <div key={step.title} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      'flex items-center justify-center rounded-full border-4 border-background transition-all duration-500 ease-out',
                      isActive
                        ? 'w-14 h-14 bg-primary shadow-[0_0_28px_rgba(46,216,137,0.45)] scale-110'
                        : isPassed
                          ? 'w-10 h-10 bg-primary/80'
                          : 'w-10 h-10 bg-muted',
                    )}
                  >
                    <step.icon
                      className={cn(
                        'transition-all duration-500',
                        isActive ? 'h-6 w-6 text-primary-foreground' : isPassed ? 'h-4 w-4 text-primary-foreground' : 'h-4 w-4 text-muted-foreground',
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      'text-[10px] font-bold uppercase tracking-widest transition-colors duration-300',
                      isActive ? 'text-primary' : 'text-muted-foreground/70',
                    )}
                  >
                    Step {step.number}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Centered active content */}
        <div className="relative min-h-[280px]">
          {STEPS.map((step, i) => {
            const isActive = i === activeStep;
            const isPast = i < activeStep;
            return (
              <div
                key={step.title}
                className={cn(
                  'absolute inset-0 text-center transition-all duration-700 ease-in-out',
                  isActive
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : isPast
                      ? 'opacity-0 -translate-y-6 pointer-events-none'
                      : 'opacity-0 translate-y-6 pointer-events-none',
                )}
              >
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                  {step.title}
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
                  {step.body}
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 max-w-xl mx-auto text-left">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-primary mr-2">
                    You get
                  </span>
                  <span className="text-sm font-medium text-foreground/90">
                    {step.deliverable}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center relative z-10">
          <p className="text-sm text-muted-foreground mb-6">
            Ready to put a proper monthly finance rhythm in place?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <MagneticButton>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
              >
                Build your subscription
                <ArrowRight className="h-4 w-4" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a
                href={siteConfig.links.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-muted transition-colors w-full sm:w-auto justify-center"
              >
                <Calendar className="h-4 w-4" />
                Book a 15-minute fit call
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
