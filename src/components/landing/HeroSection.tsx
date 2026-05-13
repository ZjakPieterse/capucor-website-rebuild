'use client';

import { useRef } from 'react';
import { useCursorGlow } from '@/hooks/useCursorGlow';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  ArrowRight, Calendar, TrendingDown, CheckCircle2, Clock, AlertCircle,
  Receipt, FileSpreadsheet, FileText, Calculator, Mail, FileWarning,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { MagneticButton } from '@/components/ui/MagneticButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Date helpers ──────────────────────────────────────────────────────────────────
const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_FULL  = ['January','February','March','April','May','June','July','August','September','October','November','December'];

type VatStatus = 'green' | 'amber' | 'red';

interface DashboardDates {
  vatDateStr: string;
  vatDays: number;
  vatStatus: VatStatus;
  closeMonth: string;
}

function computeDashboardDates(): DashboardDates {
  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const monthOffset = today.getDate() > 25 ? 1 : 0;
  const vatDue    = new Date(now.getFullYear(), now.getMonth() + monthOffset, 25);
  const msPerDay  = 1000 * 60 * 60 * 24;
  const vatDays   = Math.round((vatDue.getTime() - today.getTime()) / msPerDay);
  const vatDateStr = `25 ${MONTH_SHORT[vatDue.getMonth()]} ${vatDue.getFullYear()}`;
  const vatStatus: VatStatus = vatDays > 15 ? 'green' : vatDays > 7 ? 'amber' : 'red';

  const prev       = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const closeMonth = MONTH_FULL[prev.getMonth()];

  return { vatDateStr, vatDays, vatStatus, closeMonth };
}

const VAT_STATUS_STYLES: Record<VatStatus, { bg: string; color: string }> = {
  green: { bg: 'rgba(46,216,137,.15)',  color: '#2ED889' },
  amber: { bg: 'rgba(234,179,8,.15)',   color: '#eab308' },
  red:   { bg: 'rgba(239,68,68,.15)',   color: '#ef4444' },
};

// ── Chaos items (more variety, all looping via CSS) ──────────────────────────────
const CHAOS_ITEMS: Array<{
  floatClass: string;
  style: React.CSSProperties;
  Icon: typeof FileSpreadsheet;
  iconSize: string;
  color: string;
  label: string;
  labelColor: string;
}> = [
  { floatClass: 'chaos-float-a', style: { top: '6%',  left: '5%'   }, Icon: FileSpreadsheet, iconSize: 'w-10 h-10', color: 'text-destructive',      label: 'ERR_SYNC', labelColor: 'text-destructive/80' },
  { floatClass: 'chaos-float-b', style: { top: '72%', left: '10%'  }, Icon: Receipt,         iconSize: 'w-8 h-8',   color: 'text-yellow-500',       label: 'UNPAID',   labelColor: 'text-yellow-500/80' },
  { floatClass: 'chaos-float-c', style: { top: '24%', right: '6%'  }, Icon: Calculator,      iconSize: 'w-12 h-12', color: 'text-destructive',      label: 'R -45,210', labelColor: 'text-destructive/80' },
  { floatClass: 'chaos-float-d', style: { top: '74%', right: '14%' }, Icon: FileText,        iconSize: 'w-9 h-9',   color: 'text-muted-foreground', label: 'LATE',     labelColor: 'text-muted-foreground/80' },
  { floatClass: 'chaos-float-a', style: { top: '50%', left: '2%'   }, Icon: FileWarning,     iconSize: 'w-9 h-9',   color: 'text-destructive',      label: 'OVERDUE',  labelColor: 'text-destructive/80' },
  { floatClass: 'chaos-float-c', style: { top: '4%',  right: '40%' }, Icon: Mail,            iconSize: 'w-8 h-8',   color: 'text-yellow-500',       label: 'UNREAD',   labelColor: 'text-yellow-500/80' },
  { floatClass: 'chaos-float-b', style: { top: '44%', right: '3%'  }, Icon: Receipt,         iconSize: 'w-7 h-7',   color: 'text-muted-foreground', label: 'MISSING',  labelColor: 'text-muted-foreground/80' },
  { floatClass: 'chaos-float-d', style: { top: '86%', left: '42%'  }, Icon: FileSpreadsheet, iconSize: 'w-8 h-8',   color: 'text-destructive',      label: 'CONFLICT', labelColor: 'text-destructive/80' },
];

// ── Finance Command Centre ────────────────────────────────────────────────────────

function FinanceCommandCentre() {
  const dates    = computeDashboardDates();
  const vatStyle = VAT_STATUS_STYLES[dates.vatStatus];
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 65%',
        end: '+=50%',
        scrub: 0.6,
      },
    });

    // Chaos items fade out, get pulled toward centre
    tl.to('.chaos-item', {
      opacity: 0,
      scale: 0.15,
      duration: 1,
      stagger: 0.05,
      ease: 'power2.in',
    }, 0);

    // Glowing core flares then collapses
    tl.to('.chaos-core', {
      scale: 1.8,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, 0.4);

    // Tiles pop in
    tl.fromTo('.fcc-tile',
      { opacity: 0, scale: 0.92, y: 14 },
      { opacity: 1, scale: 1, y: 0, duration: 1, stagger: 0.05, ease: 'power2.out' },
      0.55,
    );

    // Header fades in
    tl.fromTo('.fcc-header',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      0.55,
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fcc-container relative rounded-2xl border border-border bg-card shadow-2xl p-5 overflow-hidden min-h-[370px]"
    >
      {/* ── Chaos State Overlay ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="chaos-core absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/40 blur-2xl" />
        {CHAOS_ITEMS.map((item, i) => (
          <div
            key={i}
            className={`chaos-item absolute ${item.floatClass}`}
            style={item.style}
          >
            <div className={`flex flex-col items-center ${item.color}`}>
              <item.Icon className={`${item.iconSize} mb-1 opacity-70`} />
              <span className={`text-[10px] font-mono font-bold tracking-tighter ${item.labelColor}`}>
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="fcc-header opacity-0 flex items-center justify-between mb-4 relative z-20">
        <div>
          <div className="text-sm font-bold tracking-tight">Finance Command Centre</div>
          <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,.55)' }} suppressHydrationWarning>
            {dates.closeMonth} close complete. Three items flagged for review.
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{ background: 'rgba(34,211,238,.12)', color: '#22d3ee' }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#22d3ee', boxShadow: '0 0 5px #22d3ee' }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Live
        </div>
      </div>

      {/* Tile grid */}
      <div className="fcc-grid grid grid-cols-1 sm:grid-cols-3 gap-2.5 relative z-20">

        {/* Cash Runway */}
        <div className="fcc-tile opacity-0 rounded-xl border border-border bg-background/40 p-3.5">
          <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Cash Runway
          </div>
          <div className="font-mono font-bold text-xl leading-none" style={{ color: '#22d3ee' }}>
            4.2
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">months</div>
          <div
            className="mt-2.5 h-1.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,.08)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(to right, #22d3ee, #2ED889)' }}
              initial={{ width: 0 }}
              animate={{ width: '35%' }}
              transition={{ delay: 1.4, duration: 0.9, ease: 'easeOut' }}
            />
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">of 12 months</div>
          <div className="text-[10px] mt-1 font-medium" style={{ color: '#eab308' }}>
            Watch: below 6-month target
          </div>
        </div>

        {/* Debtor Days */}
        <div className="fcc-tile opacity-0 rounded-xl border border-border bg-background/40 p-3.5">
          <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Debtor Days
          </div>
          <div className="font-mono font-bold text-xl leading-none">32</div>
          <div className="text-xs text-muted-foreground mt-0.5">days</div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown className="h-3.5 w-3.5 shrink-0" style={{ color: '#2ED889' }} />
            <span className="text-[11px] font-medium" style={{ color: '#2ED889' }}>
              −4 vs last month
            </span>
          </div>
        </div>

        {/* VAT Due Date */}
        <div className="fcc-tile opacity-0 rounded-xl border border-border bg-background/40 p-3.5">
          <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
            VAT Due
          </div>
          <div className="font-mono font-bold text-sm leading-tight" suppressHydrationWarning>
            {dates.vatDateStr}
          </div>
          <div className="mt-2">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
              style={{ background: vatStyle.bg, color: vatStyle.color }}
              suppressHydrationWarning
            >
              <AlertCircle className="h-3 w-3" />
              {dates.vatDays} days
            </span>
          </div>
          <div className="text-[10px] text-muted-foreground mt-1.5">Prepared before deadline</div>
        </div>

        {/* Monthly Close */}
        <div className="fcc-tile opacity-0 rounded-xl border border-border bg-background/40 p-3.5">
          <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Monthly Close
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: '#2ED889' }} />
            <span className="text-xs font-semibold" suppressHydrationWarning>
              {dates.closeMonth}: reviewed
            </span>
          </div>
          <div className="text-[10px] text-muted-foreground mt-1.5">Senior accountant sign-off</div>
        </div>

        {/* Payroll */}
        <div className="fcc-tile opacity-0 rounded-xl border border-border bg-background/40 p-3.5">
          <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Payroll
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: '#2ED889' }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-semibold" style={{ color: '#2ED889' }}>
              EMP201 submitted
            </span>
          </div>
          <div className="text-[10px] text-muted-foreground mt-1.5">Payslips delivered</div>
        </div>

        {/* Management Report */}
        <div className="fcc-tile opacity-0 rounded-xl border border-border bg-background/40 p-3.5">
          <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Management Report
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0" style={{ color: '#22d3ee' }} />
            <span className="text-[11px] font-semibold" style={{ color: '#22d3ee' }}>
              Ready for review
            </span>
          </div>
          <div className="text-[10px] text-muted-foreground mt-1.5">3 insights flagged</div>
        </div>

        {/* SARS / CIPC Compliance — full width */}
        <div
          className="fcc-tile opacity-0 col-span-1 sm:col-span-3 rounded-xl p-3.5"
          style={{ border: '1px solid rgba(46,216,137,.2)', background: 'rgba(46,216,137,.05)' }}
        >
          <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2.5">
            SARS / CIPC Compliance
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            {['Provisional Tax', 'EMP201', 'CIPC Annual Return'].map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + i * 0.1, duration: 0.3 }}
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: '#2ED889' }} />
                <span className="text-xs font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────────
export function HeroSection() {
  const sectionRef = useCursorGlow<HTMLElement>();
  const headline = 'Make your finance function work harder';

  return (
    <section
      ref={sectionRef}
      className="cursor-glow relative overflow-hidden py-24 lg:py-32 pb-32 lg:pb-44"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-[8%] h-[260px] w-[260px] rounded-full blur-3xl"
          style={{ background: 'color-mix(in oklch, var(--brand-cyan) 18%, transparent)' }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Copy */}
          <div>
            <motion.p
              className="text-sm font-medium uppercase tracking-widest mb-4"
              style={{ color: 'var(--brand-navy)' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            >
              Outsourced finance team for your growing business
            </motion.p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 flex flex-wrap gap-[0.25em]">
              {headline.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}
            >
              Monthly accounting, payroll, tax, and reporting handled by real accountants. Clean numbers, clear deadlines, and practical advice built into one fixed monthly subscription.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 }}
            >
              <MagneticButton>
                <Button nativeButton={false} render={<Link href="/pricing" />} size="lg" className="gap-2 w-full sm:w-auto hover:bg-primary/90 transition-colors">
                  Build your subscription <ArrowRight className="h-4 w-4" />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  nativeButton={false}
                  render={<a href={siteConfig.links.booking} target="_blank" rel="noopener noreferrer" />}
                  variant="outline" size="lg" className="gap-2 w-full sm:w-auto"
                >
                  <Calendar className="h-4 w-4" /> Book a 15-minute fit call
                </Button>
              </MagneticButton>
            </motion.div>

            <motion.p
              className="mt-6 text-xs text-muted-foreground"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1 }}
            >
              Scroll to see the chaos become a controlled month.
            </motion.p>
          </div>

          {/* Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          >
            <FinanceCommandCentre />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
