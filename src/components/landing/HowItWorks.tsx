'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Inbox, Cog, BarChart2, MessageSquare, ArrowRight, Calendar } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/config/site';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/ui/MagneticButton';

if (typeof window !== "undefined") {
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
    // We create a ScrollTrigger that pins the container
    // and scrubs through the steps.
    const steps = gsap.utils.toArray<HTMLElement>('.step-item');
    
    // Create a timeline that is scrubbed by scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center center', // Pin when section is in the middle of viewport
        end: `+=${steps.length * 80}%`, // Scroll distance based on number of steps
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          // Update active step based on progress
          const progress = self.progress;
          const currentStep = Math.min(
            steps.length - 1,
            Math.floor(progress * steps.length)
          );
          setActiveStep(currentStep);
        }
      }
    });

    // Animate the progress bar height
    tl.fromTo('.progress-fill', 
      { height: '0%' }, 
      { height: '100%', ease: 'none' }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="how-it-works" className="py-12 bg-background min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="mb-12">
          <SectionHeading
            eyebrow="How it works"
            title="A monthly rhythm that keeps you in control"
            subtitle="Great finance work needs a clear monthly rhythm. We process, review, report and advise so the month closes properly."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Left: The pinned progress visual */}
          <div className="lg:w-1/3 relative flex justify-center lg:justify-start">
            <div className="relative h-[350px] w-full flex justify-center lg:justify-start">
              {/* Vertical Track */}
              <div className="absolute top-0 bottom-0 w-1 bg-border rounded-full overflow-hidden left-1/2 lg:left-12 -translate-x-1/2">
                <div className="progress-fill w-full bg-primary origin-top" />
              </div>

              {/* Dynamic Icon/Node based on active step */}
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 lg:left-12 -translate-x-1/2 flex flex-col items-center">
                {STEPS.map((step, i) => {
                  const isActive = i === activeStep;
                  return (
                    <div 
                      key={step.title}
                      className={cn(
                        "absolute transition-all duration-500 ease-out flex items-center justify-center w-16 h-16 rounded-full border-4 border-background",
                        isActive ? "scale-100 opacity-100 bg-primary shadow-[0_0_30px_rgba(46,216,137,0.4)]" : "scale-50 opacity-0 bg-muted"
                      )}
                      style={{ zIndex: isActive ? 10 : 0 }}
                    >
                      <step.icon className={cn("w-7 h-7", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: The content that scrubs */}
          <div className="lg:w-2/3 relative h-[350px] flex items-center mt-8 lg:mt-0">
            {STEPS.map((step, i) => {
              const isActive = i === activeStep;
              const isPast = i < activeStep;
              
              return (
                <div 
                  key={step.title}
                  className={cn(
                    "step-item absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out px-4 lg:px-0 text-center lg:text-left",
                    isActive ? "opacity-100 translate-y-0" : 
                    isPast ? "opacity-0 -translate-y-16 pointer-events-none" : "opacity-0 translate-y-16 pointer-events-none"
                  )}
                >
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">
                    Step {step.number} of {STEPS.length}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                    {step.body}
                  </p>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 max-w-xl mx-auto lg:mx-0 text-left">
                    <span className="font-semibold uppercase tracking-wider text-[10px] text-primary mr-2">You get</span>
                    <span className="text-sm font-medium text-foreground/90">{step.deliverable}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center relative z-10">
          <p className="text-sm text-muted-foreground mb-6">Ready to put a proper monthly finance rhythm in place?</p>
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
