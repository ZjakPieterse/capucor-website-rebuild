"use client";

import { useState } from "react";
import { Inbox, Cog, BarChart2, MessageSquare } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
const STEPS = [
  {
    icon: Inbox,
    number: "1",
    title: "Collect & Collaborate",
    body: "You know exactly what to send, where to send it, and by when. We make the monthly admin clear and repeatable, so both sides can deliver properly.",
    deliverable:
      "VAT201, EMP201, provisional tax and CIPC deadlines tracked through a structured workflow, not memory or last-minute panic.",
  },
  {
    icon: Cog,
    number: "2",
    title: "Process & Reconcile",
    body: "We capture, code and reconcile the month’s activity in Xero, including bank feeds, supplier invoices, payroll entries and key control accounts.",
    deliverable:
      "Your Xero ledger stays reconciled and decision-ready. When the bank, SARS or a funder needs a number, you are not scrambling to catch up.",
  },
  {
    icon: BarChart2,
    number: "3",
    title: "Review & Report",
    body: "A senior accountant checks the numbers before they reach you. You receive a clear monthly report showing performance, cash flow, debtors and anything that needs attention.",
    deliverable:
      "A concise monthly view of revenue, expenses, cash flow, debtors and anything unusual that deserves attention.",
  },
  {
    icon: MessageSquare,
    number: "4",
    title: "Advise & Plan",
    body: "We turn the report into useful business conversation: tax timing, cash pressure, margin movement, compliance risks and practical next steps.",
    deliverable:
      "Risks, opportunities and planning points raised early, while there is still time to act on them.",
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const progressWidth = `${(activeStep / (STEPS.length - 1)) * 100}%`;

  return (
    <section
      id="how-it-works"
      className="premium-section py-16 bg-background overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-6 w-full">
        <SectionHeading
          eyebrow="How it works"
          title="A monthly rhythm that keeps you in control"
          subtitle="Great finance work needs a clear monthly rhythm. We process, review, report and advise so the month closes properly."
        />

        {/* Horizontal step indicator */}
        <div className="relative mt-14 mb-12">
          <div
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border"
            aria-hidden
          />
          <div
            className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 transition-[width] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              background:
                "linear-gradient(to right, var(--primary), color-mix(in oklch, var(--primary) 70%, var(--brand-cyan)))",
              width: progressWidth,
              boxShadow:
                "0 0 14px color-mix(in oklch, var(--primary) 60%, transparent)",
            }}
            aria-hidden
          />
          <div
            className="relative flex items-center justify-between"
            role="tablist"
            aria-label="How it works steps"
          >
            {STEPS.map((step, i) => {
              const isActive = i === activeStep;
              const isPassed = i <= activeStep;
              return (
                <button
                  key={step.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`how-step-panel-${step.number}`}
                  id={`how-step-tab-${step.number}`}
                  onClick={() => setActiveStep(i)}
                  className="group flex flex-col items-center gap-2 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full border-4 border-background transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105",
                      isActive
                        ? "w-14 h-14 bg-primary shadow-[0_0_28px_rgba(46,216,137,0.45)] scale-110"
                        : isPassed
                          ? "w-10 h-10 bg-primary/80"
                          : "w-10 h-10 bg-muted",
                    )}
                  >
                    <step.icon
                      className={cn(
                        "transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive
                          ? "h-6 w-6 text-primary-foreground"
                          : isPassed
                            ? "h-4 w-4 text-primary-foreground"
                            : "h-4 w-4 text-muted-foreground",
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-widest transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive ? "text-primary" : "text-muted-foreground/70",
                    )}
                  >
                    Step {step.number}
                  </span>
                </button>
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
                id={`how-step-panel-${step.number}`}
                role="tabpanel"
                aria-labelledby={`how-step-tab-${step.number}`}
                className={cn(
                  "absolute inset-0 text-center transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : isPast
                      ? "opacity-0 -translate-y-6 pointer-events-none"
                      : "opacity-0 translate-y-6 pointer-events-none",
                )}
              >
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                  {step.title}
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
                  {step.body}
                </p>
                <div className="premium-glass bg-primary/5 border-[0.5px] border-primary/20 rounded-2xl p-5 max-w-xl mx-auto text-left">
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
      </div>
    </section>
  );
}
