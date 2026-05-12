'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Calendar, TrendingDown, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

// ── Partners ─────────────────────────────────────────────────────────────────────
const TOOLS = ['Xero', 'Dext', 'Syft', 'SimplePay', 'Karbon', 'Draftworx'];

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

  // VAT due: 25th of the current month, or 25th of next month if already past the 25th
  const monthOffset = today.getDate() > 25 ? 1 : 0;
  const vatDue    = new Date(now.getFullYear(), now.getMonth() + monthOffset, 25);
  const msPerDay  = 1000 * 60 * 60 * 24;
  const vatDays   = Math.round((vatDue.getTime() - today.getTime()) / msPerDay);
  const vatDateStr = `25 ${MONTH_SHORT[vatDue.getMonth()]} ${vatDue.getFullYear()}`;
  const vatStatus: VatStatus = vatDays > 15 ? 'green' : vatDays > 7 ? 'amber' : 'red';

  // Monthly close: previous calendar month = latest fully complete month
  const prev       = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const closeMonth = MONTH_FULL[prev.getMonth()];

  return { vatDateStr, vatDays, vatStatus, closeMonth };
}

const VAT_STATUS_STYLES: Record<VatStatus, { bg: string; color: string }> = {
  green: { bg: 'rgba(46,216,137,.15)',  color: '#2ED889' },
  amber: { bg: 'rgba(234,179,8,.15)',   color: '#eab308' },
  red:   { bg: 'rgba(239,68,68,.15)',   color: '#ef4444' },
};

// ── Finance Command Centre ────────────────────────────────────────────────────────
const tileVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.35 },
  }),
};

function FinanceCommandCentre() {
  const dates    = computeDashboardDates();
  const vatStyle = VAT_STATUS_STYLES[dates.vatStatus];

  return (
    <div className="relative rounded-2xl border border-border bg-card shadow-2xl p-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">

        {/* Cash Runway */}
        <motion.div
          custom={0} variants={tileVariants} initial="hidden" animate="visible"
          className="rounded-xl border border-border bg-background/40 p-3.5"
        >
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
              transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
            />
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">of 12 months</div>
          <div className="text-[10px] mt-1 font-medium" style={{ color: '#eab308' }}>
            Watch: below 6-month target
          </div>
        </motion.div>

        {/* Debtor Days */}
        <motion.div
          custom={1} variants={tileVariants} initial="hidden" animate="visible"
          className="rounded-xl border border-border bg-background/40 p-3.5"
        >
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
        </motion.div>

        {/* VAT Due Date */}
        <motion.div
          custom={2} variants={tileVariants} initial="hidden" animate="visible"
          className="rounded-xl border border-border bg-background/40 p-3.5"
        >
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
        </motion.div>

        {/* Monthly Close */}
        <motion.div
          custom={3} variants={tileVariants} initial="hidden" animate="visible"
          className="rounded-xl border border-border bg-background/40 p-3.5"
        >
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
        </motion.div>

        {/* Payroll */}
        <motion.div
          custom={4} variants={tileVariants} initial="hidden" animate="visible"
          className="rounded-xl border border-border bg-background/40 p-3.5"
        >
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
        </motion.div>

        {/* Management Report */}
        <motion.div
          custom={5} variants={tileVariants} initial="hidden" animate="visible"
          className="rounded-xl border border-border bg-background/40 p-3.5"
        >
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
        </motion.div>

        {/* SARS / CIPC Compliance — full width */}
        <motion.div
          custom={6} variants={tileVariants} initial="hidden" animate="visible"
          className="col-span-1 sm:col-span-3 rounded-xl p-3.5"
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
                transition={{ delay: 0.65 + i * 0.1, duration: 0.3 }}
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: '#2ED889' }} />
                <span className="text-xs font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
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
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            >
              Make your finance function work harder
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            >
              Monthly accounting, payroll, tax, and reporting handled by real accountants. Clean numbers, clear deadlines, and practical advice built into one fixed monthly subscription.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Button nativeButton={false} render={<Link href="/pricing" />} size="lg" className="gap-2">
                Build your subscription <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                nativeButton={false}
                render={<a href={siteConfig.links.booking} target="_blank" rel="noopener noreferrer" />}
                variant="outline" size="lg" className="gap-2"
              >
                <Calendar className="h-4 w-4" /> Book a 15-minute fit call
              </Button>
            </motion.div>
          </div>

          {/* Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          >
            <FinanceCommandCentre />
          </motion.div>
        </div>

        {/* Partners carousel */}
        <motion.div
          className="mt-16 pt-8 border-t border-border"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p
            className="text-xs font-medium uppercase tracking-widest text-center mb-5"
            style={{ color: 'var(--brand-cyan)' }}
          >
            Partners
          </p>
          <div
            className="overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            }}
          >
            <div className="flex gap-8 animate-marquee w-max">
              {[...TOOLS, ...TOOLS, ...TOOLS, ...TOOLS].map((tool, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap text-sm font-medium text-muted-foreground border border-border rounded-md px-5 py-2 bg-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
