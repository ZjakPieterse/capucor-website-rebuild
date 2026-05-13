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

// ── Chaos items (More realistic mini-docs) ──────────────────────────────────────
const CHAOS_ITEMS = [
  { id: 1, type: 'invoice',  label: 'INV-2024-001', detail: 'R 45,210.00', status: 'OVERDUE',  color: '#ef4444', icon: FileText,        x: '10%', y: '15%', rot: -15, float: 'chaos-float-a' },
  { id: 2, type: 'receipt',  label: 'Lunch Expense', detail: 'Missing Tax',   status: 'FLAGGED',  color: '#f59e0b', icon: Receipt,         x: '65%', y: '10%', rot: 12,  float: 'chaos-float-b' },
  { id: 3, type: 'sheet',    label: 'Payroll_Draft', detail: 'Formula Err',   status: 'CONFLICT', color: '#ef4444', icon: FileSpreadsheet, x: '82%', y: '40%', rot: -8,  float: 'chaos-float-c' },
  { id: 4, type: 'alert',    label: 'SARS Notice',   detail: 'Action Req',    status: 'URGENT',   color: '#ef4444', icon: FileWarning,     x: '15%', y: '75%', rot: 10,  float: 'chaos-float-d' },
  { id: 5, type: 'receipt',  label: 'Uber Trip',     detail: 'Uncategorized', status: 'MISSING',  color: '#71717a', icon: Receipt,         x: '45%', y: '60%', rot: -20, float: 'chaos-float-a' },
  { id: 6, type: 'invoice',  label: 'Supplier X',    detail: 'Duplicate',     status: 'REVIEW',   color: '#f59e0b', icon: FileText,        x: '75%', y: '80%', rot: 5,   float: 'chaos-float-b' },
  { id: 7, type: 'sheet',    label: 'Bank_Rec_Final',detail: 'Out of Bal',    status: 'ERROR',    color: '#ef4444', icon: FileSpreadsheet, x: '5%',  y: '45%', rot: 18,  float: 'chaos-float-c' },
  { id: 8, type: 'alert',    label: 'Bank Sync',     detail: 'Conn Lost',     status: 'DISCONN',  color: '#ef4444', icon: Calculator,      x: '35%', y: '5%',  rot: -5,  float: 'chaos-float-d' },
  { id: 9, type: 'receipt',  label: 'Hardware Store',detail: 'R 1,250.00',    status: 'UNPAID',   color: '#f59e0b', icon: Receipt,         x: '85%', y: '12%', rot: 25,  float: 'chaos-float-a' },
  { id: 10,type: 'invoice',  label: 'Rent April',    detail: 'Pending',       status: 'WAITING',  color: '#71717a', icon: FileText,        x: '55%', y: '85%', rot: -12, float: 'chaos-float-b' },
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
        start: 'top 20%',
        end: '+=100%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // 1. CHAOS PHASE (already active at start)

    // 2. SORTING PHASE - Items move to a grid and align
    tl.to('.chaos-item', {
      x: (i) => `${(i % 5) * 20 + 10}%`,
      y: (i) => `${Math.floor(i / 5) * 35 + 25}%`,
      rotation: 0,
      scale: 0.95,
      duration: 1,
      ease: 'power2.inOut',
    }, 0.2);

    // 3. CONVERSION PHASE - Items disappear as dashboard appears
    tl.to('.chaos-item', {
      opacity: 0,
      scale: 0.5,
      y: (i) => Math.floor(i / 5) * 35 + 50, // drop down
      duration: 0.8,
      stagger: {
        each: 0.05,
        from: 'center'
      },
      ease: 'back.in(2)',
    }, 1.2);

    // Glowing core flares then collapses
    tl.to('.chaos-core', {
      scale: 3,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    }, 1.2);

    // Tiles pop in
    tl.fromTo('.fcc-tile',
      { opacity: 0, scale: 0.8, y: 30, filter: 'blur(10px)' },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
        onComplete: () => {
          gsap.set('.fcc-tile', { className: 'fcc-tile rounded-xl border border-border bg-background/40 p-3.5 fcc-breathe' });
        },
      },
      1.4,
    );

    // Header fades in
    tl.fromTo('.fcc-header',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      1.4,
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
        <div className="chaos-core absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary/20 blur-[100px]" />
        {CHAOS_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`chaos-item absolute ${item.float}`}
            style={{
              left: item.x,
              top: item.y,
              rotate: `${item.rot}deg`,
            }}
          >
            <div className="flex items-center gap-3 bg-background/60 backdrop-blur-md border border-white/10 rounded-lg p-2.5 shadow-xl min-w-[140px]">
              <div className="p-2 rounded-md bg-white/5" style={{ color: item.color }}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-tight text-white/90 leading-none mb-1">
                  {item.label}
                </span>
                <span className="text-[9px] font-medium text-white/50 leading-none">
                  {item.detail}
                </span>
              </div>
              <div
                className="ml-auto px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter"
                style={{ backgroundColor: `${item.color}20`, color: item.color }}
              >
                {item.status}
              </div>
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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Copy */}
          <div className="lg:pt-10">
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
            className="relative lg:min-h-[600px] flex items-start"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="w-full sticky top-32">
              <FinanceCommandCentre />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
