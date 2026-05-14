"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  FileCheck2,
  FolderKanban,
  LayoutDashboard,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface WeekStop {
  week: string;
  label: string;
  title: string;
  eyebrow: string;
  body: string;
  before: string;
  after: string;
  icon: typeof FolderKanban;
  accent: string;
}

const WEEKS: WeekStop[] = [
  {
    week: "Week 1",
    label: "Clean up",
    title: "The Clean Up",
    eyebrow: "Messy inputs become an organised ledger",
    body: "Receipts, bank feeds and source documents are pulled into a single monthly workflow so the finance picture stops living across inboxes, WhatsApp and spreadsheets.",
    before: "Loose slips, duplicate entries and uncategorised bank lines.",
    after: "Matched documents, labelled transactions and a clean month file.",
    icon: FolderKanban,
    accent: "from-sky-400/24 via-cyan-400/14 to-primary/10",
  },
  {
    week: "Week 2",
    label: "Compliance",
    title: "Compliance Lockdown",
    eyebrow: "SARS, payroll and CIPC stay visible",
    body: "Deadline owners, review dates and evidence are locked into the cycle. The risky work gets surfaced early instead of becoming an expensive surprise.",
    before: "Unclear filing status and owner-memory deadline tracking.",
    after: "Protected compliance cards with confirmations logged in one place.",
    icon: ShieldCheck,
    accent: "from-brand-navy/22 via-primary/14 to-brand-cyan/16",
  },
  {
    week: "Week 3",
    label: "Intelligence",
    title: "Intelligence Phase",
    eyebrow: "Real-time numbers start telling a story",
    body: "Once the ledger is reconciled, we turn the month into useful signals: margin movement, cash pressure, debtors, creditors and the exceptions worth a conversation.",
    before: "Static spreadsheets with figures that do not agree.",
    after: "Live graph signals, reconciled balances and exception flags.",
    icon: BarChart3,
    accent: "from-cyan-400/18 via-brand-cyan/16 to-primary/20",
  },
  {
    week: "Week 4",
    label: "Command",
    title: "Financial Command",
    eyebrow: "A premium monthly dashboard is ready",
    body: "You finish the month with a reviewed report, clear next actions and the confidence to talk to your bank, SARS, funders or leadership team without scrambling.",
    before: "Reactive finance and late questions after the fact.",
    after: "A board-ready dashboard with decisions, risks and next steps.",
    icon: LayoutDashboard,
    accent: "from-primary/24 via-brand-cyan/16 to-brand-navy/18",
  },
];

const EASE_OUT_QUART = [0.16, 1, 0.3, 1] as const;

function ImpactVisual({ active }: { active: WeekStop }) {
  const Icon = active.icon;

  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-background/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_34%,rgba(45,212,255,0.08)_72%,transparent)]" />
      <div className="relative grid h-full gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-4">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-destructive/80">
            Before
          </p>
          <div className="space-y-3 opacity-70 blur-[0.2px]">
            <div className="h-12 rounded-2xl border border-white/10 bg-card/50" />
            <div className="h-12 w-10/12 rounded-2xl border border-white/10 bg-card/40" />
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="h-16 rounded-2xl border border-destructive/15 bg-destructive/10"
                />
              ))}
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {active.before}
          </p>
        </div>

        <div className="rounded-3xl border border-primary/25 bg-primary/10 p-4 shadow-[0_20px_70px_-44px_rgba(45,212,255,0.9)]">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-primary">
            After
          </p>
          <div className="relative rounded-2xl border border-primary/25 bg-card/70 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="h-2.5 w-24 rounded-full bg-primary/70" />
                  <div className="mt-2 h-2 w-16 rounded-full bg-white/15" />
                </div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div className="grid grid-cols-4 items-end gap-2 pt-6">
              {[42, 64, 54, 82].map((height, i) => (
                <motion.div
                  key={`${active.week}-${height}`}
                  initial={{ height: 16 }}
                  animate={{ height }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE_OUT_QUART }}
                  className="rounded-t-xl bg-gradient-to-t from-primary/50 to-brand-cyan/70"
                />
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-primary/20 bg-primary/10 p-2">
                <LockKeyhole className="mb-2 h-4 w-4 text-primary" />
                <div className="h-1.5 rounded-full bg-primary/55" />
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/10 p-2">
                <FileCheck2 className="mb-2 h-4 w-4 text-primary" />
                <div className="h-1.5 rounded-full bg-primary/55" />
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/10 p-2">
                <Sparkles className="mb-2 h-4 w-4 text-primary" />
                <div className="h-1.5 rounded-full bg-primary/55" />
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-foreground/85">
            {active.after}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-5 bottom-5 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/35 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-background/90 shadow-[0_0_36px_rgba(45,212,255,0.35)]">
        <Sparkles className="h-5 w-5 text-primary" />
      </div>
    </div>
  );
}

export function OutcomeStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = WEEKS[activeIndex];

  return (
    <section className="premium-section premium-section-muted border-t border-white/10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <ScrollReveal>
          <SectionHeading
            eyebrow="A month with Capucor"
            title="A four-week trajectory from messy finance to command"
            subtitle="Move through the month to see how raw admin becomes organised compliance, useful intelligence and a premium dashboard you can actually run the business from."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative mt-14 overflow-hidden rounded-[2.25rem] border border-white/10 bg-card/35 p-4 shadow-[0_34px_120px_-78px_rgba(45,212,255,0.75)] backdrop-blur-2xl sm:p-6 lg:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.week}
                className={cn("absolute inset-0 bg-gradient-to-br", active.accent)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT_QUART }}
                aria-hidden
              />
            </AnimatePresence>
            <div className="absolute -left-28 top-8 h-72 w-72 rounded-full bg-brand-cyan/12 blur-3xl" />
            <div className="absolute -right-24 bottom-4 h-80 w-80 rounded-full bg-primary/14 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
              <div>
                <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <CalendarDays className="h-4 w-4" />
                  Interactive impact timeline
                </div>

                <div className="relative space-y-3 before:absolute before:left-5 before:top-5 before:bottom-5 before:w-px before:bg-white/10">
                  {WEEKS.map((week, i) => {
                    const WeekIcon = week.icon;
                    const isActive = i === activeIndex;
                    const isPassed = i <= activeIndex;

                    return (
                      <button
                        key={week.week}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setActiveIndex(i)}
                        className={cn(
                          "feature-card group relative flex w-full items-center gap-4 rounded-3xl border p-4 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
                          isActive
                            ? "border-primary/45 bg-primary/12 shadow-[0_18px_52px_-34px_rgba(45,212,255,0.9)]"
                            : "border-white/10 bg-background/35 opacity-70 hover:border-primary/25 hover:bg-primary/5 hover:opacity-100",
                        )}
                      >
                        <div
                          className={cn(
                            "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105",
                            isActive
                              ? "border-primary/50 bg-primary text-primary-foreground shadow-[0_0_30px_rgba(45,212,255,0.45)]"
                              : isPassed
                                ? "border-primary/30 bg-primary/65 text-primary-foreground"
                                : "border-white/10 bg-muted text-muted-foreground",
                          )}
                        >
                          {isActive ? (
                            <span className="absolute inset-0 rounded-2xl bg-primary/35 animate-ping" />
                          ) : null}
                          <WeekIcon className="relative h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/85">
                            {week.week}
                          </p>
                          <p className="mt-1 text-base font-bold leading-tight text-foreground">
                            {week.title}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {week.label}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="min-w-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.week}
                    initial={{ opacity: 0, x: 34 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -34 }}
                    transition={{ duration: 0.5, ease: EASE_OUT_QUART }}
                  >
                    <div className="mb-6 rounded-3xl border border-white/10 bg-background/35 p-6 backdrop-blur-xl">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        {active.week} · {active.eyebrow}
                      </p>
                      <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        {active.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                        {active.body}
                      </p>
                    </div>
                    <ImpactVisual active={active} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
