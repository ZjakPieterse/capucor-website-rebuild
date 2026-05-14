"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Landmark,
  ReceiptText,
  ClipboardCheck,
  FileBarChart,
  ScrollText,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface DayStop {
  day: number;
  icon: typeof Landmark;
  title: string;
  body: string;
}

const DAY_STOPS: DayStop[] = [
  {
    day: 1,
    icon: Landmark,
    title: "Bank feeds pulled, transactions classified",
    body: "Xero pulls the previous month’s bank activity overnight. By the time the new month starts, your bookkeeper is already categorising and reconciling. Nothing waits a quarter to be sorted out.",
  },
  {
    day: 7,
    icon: ReceiptText,
    title: "Payroll, EMP201 and UIF handled",
    body: "Payslips are generated and approved. EMP201 is calculated, submitted and paid. UIF and PAYE move on the dates SARS expects, not the dates you remembered.",
  },
  {
    day: 15,
    icon: ClipboardCheck,
    title: "Senior review, then your management report",
    body: "A SAICA-registered AGA(SA) accountant signs off on the month before anything reaches you. You receive a concise P&L, balance sheet and cash position, with the items worth a conversation flagged at the top.",
  },
  {
    day: 25,
    icon: FileBarChart,
    title: "VAT201 prepared and submitted",
    body: "VAT is calculated from the reconciled ledger, not from invoice piles. You see the figure before it is submitted, and the SARS confirmation gets logged in your file the same day.",
  },
  {
    day: 30,
    icon: ScrollText,
    title: "Next month already on the schedule",
    body: "Provisional tax, CIPC returns, IRP5 windows: everything that is approaching in the next 60 days is already on a workflow, with you and your bookkeeper assigned to it.",
  },
];

export function OutcomeStories() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const dayRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlight, setHighlight] = useState({
    left: 0,
    width: 0,
    ready: false,
  });

  useEffect(() => {
    const update = () => {
      const node = dayRefs.current[activeIndex];
      const container = calendarRef.current;
      if (!node || !container) return;
      const cRect = container.getBoundingClientRect();
      const nRect = node.getBoundingClientRect();
      setHighlight({
        left: nRect.left - cRect.left,
        width: nRect.width,
        ready: true,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeIndex]);

  const active = DAY_STOPS[activeIndex];

  return (
    <section className="premium-section premium-section-muted border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <ScrollReveal>
          <SectionHeading
            eyebrow="A month with Capucor"
            title="What actually happens between the 1st and the 30th"
            subtitle="Most accounting firms surface once a year, at audit time. We work to the month. Choose a day to see what that rhythm looks like in practice."
          />
        </ScrollReveal>
      </div>

      {/* Calendar UI */}
      <div className="pb-24 lg:pb-32">
        <div className="max-w-5xl mx-auto px-6 w-full">
          <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            A typical Capucor month
          </p>

          {/* Calendar (horizontal pills with gliding highlight) */}
          <div ref={calendarRef} className="relative">
            {/* Track */}
            <div
              aria-hidden
              className="absolute left-[6%] right-[6%] top-1/2 -translate-y-1/2 h-px bg-border"
            />
            {/* Gliding highlight */}
            <motion.div
              aria-hidden
              className="calendar-highlight absolute top-1/2 -translate-y-1/2 rounded-full"
              initial={false}
              animate={{
                left: highlight.left,
                width: highlight.width,
                opacity: highlight.ready ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
              style={{ height: "calc(100% + 4px)" }}
            />
            {/* Day pills */}
            <div className="relative flex justify-between items-center gap-2">
              {DAY_STOPS.map((stop, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={stop.day}
                    ref={(el) => {
                      dayRefs.current[i] = el;
                    }}
                    type="button"
                    data-active={isActive}
                    aria-pressed={isActive}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "day-pill premium-glass relative z-10 inline-flex flex-col items-center justify-center rounded-full border bg-card/75 px-4 py-3 sm:px-6 sm:py-4 min-w-[78px] sm:min-w-[110px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
                      isActive
                        ? "border-transparent text-primary-foreground"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest leading-none mb-1">
                      Day
                    </span>
                    <span className="font-mono text-xl sm:text-2xl font-bold leading-none">
                      {stop.day}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Glassmorphic panel with active day narrative */}
          <div className="calendar-panel premium-card mt-10 lg:mt-12 rounded-2xl p-8 lg:p-10 min-h-[260px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.day}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-6 sm:gap-8"
              >
                <div className="flex-shrink-0">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30">
                    <active.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-2">
                    {String(activeIndex + 1).padStart(2, "0")} of{" "}
                    {DAY_STOPS.length} · Day {active.day}
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3 leading-tight">
                    {active.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {active.body}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
