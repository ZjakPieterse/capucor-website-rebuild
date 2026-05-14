"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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

const EASE_OUT_QUART = [0.16, 1, 0.3, 1] as const;

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const active = STEPS[activeStep];
  const ActiveIcon = active.icon;

  return (
    <section
      id="how-it-works"
      className="premium-section bg-background overflow-hidden py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <SectionHeading
          eyebrow="How it works"
          title="A monthly rhythm that keeps you in control"
          subtitle="Great finance work needs a clear monthly rhythm. We process, review, report and advise so the month closes properly. Tap a step to see the handoff."
        />

        <div className="relative mt-14 rounded-[2rem] border border-white/10 bg-card/35 p-4 shadow-[0_24px_80px_-52px_rgba(45,212,255,0.65)] backdrop-blur-xl sm:p-6">
          <div className="absolute left-8 right-8 top-[4.65rem] hidden h-px bg-border sm:block" />
          <div
            className="absolute left-8 top-[4.65rem] hidden h-[2px] origin-left -translate-y-px rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:block"
            style={{
              width: `calc((100% - 4rem) * ${activeStep / (STEPS.length - 1)})`,
              background:
                "linear-gradient(90deg, var(--primary), color-mix(in oklch, var(--primary) 68%, var(--brand-cyan)))",
              boxShadow:
                "0 0 18px color-mix(in oklch, var(--primary) 46%, transparent)",
            }}
            aria-hidden
          />

          <div
            className="grid gap-3 sm:grid-cols-4"
            role="tablist"
            aria-label="How it works steps"
          >
            {STEPS.map((step, i) => {
              const isActive = i === activeStep;
              const isPassed = i <= activeStep;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`how-step-panel-${step.number}`}
                  id={`how-step-tab-${step.number}`}
                  onClick={() => setActiveStep(i)}
                  className={cn(
                    "feature-card group relative rounded-3xl border p-4 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
                    isActive
                      ? "border-primary/45 bg-primary/10 shadow-[0_18px_46px_-30px_rgba(45,212,255,0.75)]"
                      : "border-white/10 bg-background/30 opacity-70 hover:opacity-100 hover:border-primary/25 hover:bg-primary/5",
                  )}
                >
                  <div className="flex items-center gap-3 sm:block">
                    <div
                      className={cn(
                        "relative mb-0 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:mb-4 group-hover:-translate-y-1 group-hover:scale-105",
                        isActive
                          ? "border-primary/50 bg-primary text-primary-foreground shadow-[0_0_34px_rgba(45,212,255,0.45)]"
                          : isPassed
                            ? "border-primary/30 bg-primary/70 text-primary-foreground"
                            : "border-white/10 bg-muted text-muted-foreground",
                      )}
                    >
                      {isActive ? (
                        <span className="absolute inset-0 rounded-2xl bg-primary/35 animate-ping" />
                      ) : null}
                      <StepIcon className="relative h-5 w-5" />
                    </div>
                    <div>
                      <p
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        Step {step.number}
                      </p>
                      <p
                        className={cn(
                          "mt-1 text-sm font-bold leading-tight transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isActive ? "text-foreground" : "text-foreground/70",
                        )}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center gap-2 px-1 sm:hidden" aria-hidden>
            {STEPS.map((step, i) => (
              <span
                key={step.number}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  i <= activeStep ? "bg-primary" : "bg-muted",
                )}
              />
            ))}
          </div>
        </div>

        <div className="relative mt-10 min-h-[390px] overflow-hidden rounded-[2rem] border border-primary/15 bg-card/45 shadow-[0_32px_100px_-68px_rgba(34,211,238,0.75)] backdrop-blur-xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.number}
              id={`how-step-panel-${active.number}`}
              role="tabpanel"
              aria-labelledby={`how-step-tab-${active.number}`}
              initial={{ opacity: 0, x: 42 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -42 }}
              transition={{ duration: 0.5, ease: EASE_OUT_QUART }}
              className="absolute inset-0 grid gap-8 p-7 sm:p-9 lg:grid-cols-[0.8fr_1.2fr] lg:p-10"
            >
              <div className="flex items-center justify-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-[2rem] border border-primary/25 bg-primary/10">
                  <div className="absolute inset-5 rounded-[1.5rem] border border-white/10" />
                  <div className="absolute -inset-10 rounded-full bg-primary/10 blur-3xl" />
                  <ActiveIcon className="relative h-20 w-20 text-primary drop-shadow-[0_0_24px_rgba(45,212,255,0.34)]" />
                </div>
              </div>
              <div className="flex flex-col justify-center text-center lg:text-left">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-primary">
                  Step {active.number} · Monthly finance operating system
                </p>
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {active.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {active.body}
                </p>
                <div className="mt-7 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    You get
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/90">
                    {active.deliverable}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
