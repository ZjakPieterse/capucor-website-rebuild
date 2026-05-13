'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Landmark, ReceiptText, ClipboardCheck, FileBarChart, ScrollText } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';

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
    title: 'Bank feeds pulled, transactions classified',
    body: 'Xero pulls the previous month’s bank activity overnight. By the time the new month starts, your bookkeeper is already categorising and reconciling. Nothing waits a quarter to be sorted out.',
  },
  {
    day: 7,
    icon: ReceiptText,
    title: 'Payroll, EMP201 and UIF handled',
    body: 'Payslips are generated and approved. EMP201 is calculated, submitted and paid. UIF and PAYE move on the dates SARS expects, not the dates you remembered.',
  },
  {
    day: 15,
    icon: ClipboardCheck,
    title: 'Senior review, then your management report',
    body: 'A SAICA-registered AGA(SA) accountant signs off on the month before anything reaches you. You receive a concise P&L, balance sheet and cash position, with the items worth a conversation flagged at the top.',
  },
  {
    day: 25,
    icon: FileBarChart,
    title: 'VAT201 prepared and submitted',
    body: 'VAT is calculated from the reconciled ledger, not from invoice piles. You see the figure before it is submitted, and the SARS confirmation gets logged in your file the same day.',
  },
  {
    day: 30,
    icon: ScrollText,
    title: 'Next month already on the schedule',
    body: 'Provisional tax, CIPC returns, IRP5 windows: everything that is approaching in the next 60 days is already on a workflow, with you and your bookkeeper assigned to it.',
  },
];

const STATS = [
  { value: 175, suffix: '+', label: 'Businesses kept current month after month' },
  { value: 0, suffix: '', label: 'Late SARS filings across our client base in 2025' },
  { value: 12, suffix: ' days', label: 'Average migration from another accountant to a live Capucor month' },
  { value: 15, suffix: 'th', label: 'Of the month is when your management report lands' },
];

export function OutcomeStories() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 65%', 'end 35%'],
  });

  // Vertical fill on the calendar line (0% → 100%)
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="premium-section border-t border-white/8 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="A month with Capucor"
            title="What actually happens between the 1st and the 30th"
            subtitle="Most accounting firms surface once a year, at audit time. We work to the month. Scroll through what that rhythm looks like in practice."
          />
        </ScrollReveal>

        {/* Stat ticker */}
        <ScrollReveal delay={0.1}>
          <div className="premium-panel mt-14 grid grid-cols-2 gap-6 rounded-[1.75rem] px-6 py-8 lg:grid-cols-4 lg:gap-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold font-mono text-primary leading-none">
                  <AnimatedNumber to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Scroll-driven timeline */}
        <div ref={timelineRef} className="relative mt-24 grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-20">

          {/* Left: sticky calendar */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                A typical month
              </p>
              <div className="relative pl-2">
                {/* Track */}
                <div
                  aria-hidden
                  className="absolute left-[26px] top-2 bottom-2 w-px bg-white/10"
                />
                {/* Fill */}
                <motion.div
                  aria-hidden
                  className="absolute left-[26px] top-2 w-px bg-primary origin-top"
                  style={prefersReducedMotion ? { height: '100%' } : { height: lineHeight }}
                />
                <ul className="space-y-9">
                  {DAY_STOPS.map((stop) => (
                    <li key={stop.day} className="relative flex items-center gap-5">
                      <div className="premium-icon relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-primary/25 bg-white/[0.045] backdrop-blur-md">
                        <stop.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Day
                        </p>
                        <p className="font-mono text-xl font-bold leading-none">
                          {stop.day}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: scrolling narrative */}
          <div className="space-y-24 lg:space-y-40">
            {DAY_STOPS.map((stop, i) => (
              <motion.div
                key={stop.day}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -25% 0px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                className="relative"
              >
                {/* Mobile day chip */}
                <div className="lg:hidden mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.06] px-3 py-1">
                  <stop.icon className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Day {stop.day}
                  </span>
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-3 hidden lg:block">
                  {String(i + 1).padStart(2, '0')} of {DAY_STOPS.length}
                </p>
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight mb-4">
                  {stop.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  {stop.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
