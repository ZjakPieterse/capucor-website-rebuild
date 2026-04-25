'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

// ── Partners ────────────────────────────────────────────────────────────────────
const TOOLS = ['Xero', 'Dext', 'Syft', 'SimplePay', 'Karbon', 'Draftworx'];

// ── Dashboard data ──────────────────────────────────────────────────────────────
const FULL_TREND = [
  { month: 'Oct 23', current: 115200, prior:  98400 },
  { month: 'Nov 23', current: 122800, prior: 104200 },
  { month: 'Dec 23', current: 141600, prior: 110600 },
  { month: 'Jan 24', current: 134200, prior: 118600 },
  { month: 'Feb 24', current: 148900, prior: 112400 },
  { month: 'Mar 24', current: 162400, prior: 131800 },
  { month: 'Apr 24', current: 155700, prior: 140200 },
  { month: 'May 24', current: 171300, prior: 129600 },
  { month: 'Jun 24', current: 164800, prior: 148200 },
  { month: 'Jul 24', current: 188400, prior: 157400 },
  { month: 'Aug 24', current: 193800, prior: 162400 },
  { month: 'Sep 24', current: 203600, prior: 155800 },
  { month: 'Oct 24', current: 192400, prior: 178600 },
  { month: 'Nov 24', current: 218900, prior: 184200 },
  { month: 'Dec 24', current: 226400, prior: 196400 },
  { month: 'Jan 25', current: 231200, prior: 188600 },
  { month: 'Feb 25', current: 224800, prior: 206200 },
];

// ── Utilities ───────────────────────────────────────────────────────────────────

function smoothPath(pts: [number, number][]): string {
  if (!pts.length) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = (pts[i + 1][0] - pts[i][0]) * 0.4;
    d += ` C${pts[i][0]+dx},${pts[i][1]} ${pts[i+1][0]-dx},${pts[i+1][1]} ${pts[i+1][0]},${pts[i+1][1]}`;
  }
  return d;
}

// ── Main Dashboard ──────────────────────────────────────────────────────────────
function AnimatedRevenueChart() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 12); // Loops 0 to 11
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const windowData = FULL_TREND.slice(step, step + 6);
  // Current month is the latest month visible in the 6-month window
  const currentMonthData = windowData[5]; 

  const PL = 48, PR = 16, PT = 24, PB = 36, W = 460, H = 280;
  const cW = W - PL - PR, cH = H - PT - PB;
  
  const allV = FULL_TREND.flatMap(d => [d.current, d.prior]);
  const mn = Math.min(...allV) * 0.9;
  const mx = Math.max(...allV) * 1.05;

  const n = 6;
  const stepWidth = cW / (n - 1);
  const sx = (i: number) => PL + i * stepWidth;
  const sy = (v: number) => PT + cH - ((v - mn) / (mx - mn)) * cH;
  const bot = PT + cH;

  const curPts: [number,number][] = FULL_TREND.map((d, i) => [sx(i), sy(d.current)]);
  const prvPts: [number,number][] = FULL_TREND.map((d, i) => [sx(i), sy(d.prior)]);
  const areaD = smoothPath(curPts) + ` L${sx(FULL_TREND.length - 1)},${bot} L${sx(0)},${bot}Z`;

  return (
    <div className="relative rounded-2xl border border-border bg-card shadow-2xl p-6 overflow-hidden">
      {/* Header section */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-lg font-bold" style={{ letterSpacing: '-0.015em' }}>
            Revenue Trend
          </div>
          <div className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,.32)' }}>
            Rolling 6 Months · vs Prior Year
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(34,211,238,.15)', color: '#22d3ee' }}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#22d3ee', boxShadow: `0 0 5px #22d3ee` }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px] font-bold uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="mb-6 flex gap-8">
        <div>
          <div className="text-3xl font-bold font-mono tracking-tight" style={{ color: '#22d3ee' }}>
            <AnimatePresence mode="wait">
              <motion.div key={currentMonthData.current}
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}>
                {(currentMonthData.current / 1000).toFixed(1)}k
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            This Year (<AnimatePresence mode="wait"><motion.span key={currentMonthData.month} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>{currentMonthData.month}</motion.span></AnimatePresence>)
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold font-mono tracking-tight mt-1" style={{ color: 'rgba(167,139,250,.8)' }}>
            <AnimatePresence mode="wait">
              <motion.div key={currentMonthData.prior}
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}>
                {(currentMonthData.prior / 1000).toFixed(1)}k
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Prior Year</div>
        </div>
      </div>

      <div style={{ position: 'relative', margin: '0 -12px' }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="tr-a" x1="0" y1={PT} x2="0" y2={bot} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.28}/>
              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.02}/>
            </linearGradient>
            <filter id="tr-g" x="-5%" y="-25%" width="110%" height="150%">
              <feGaussianBlur stdDeviation="2.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <clipPath id="chart-clip">
              <rect x={PL} y={0} width={cW} height={H} />
            </clipPath>
          </defs>
          
          {/* Y Axis Grid lines & Labels */}
          {[0, 0.333, 0.667, 1].map((t, i) => {
            const v = mn + t * (mx - mn), y = sy(v);
            return (
              <g key={i}>
                <line x1={PL} x2={W} y1={y} y2={y} stroke="rgba(255,255,255,.055)" strokeWidth={1}/>
                <text x={PL - 8} y={y + 4} textAnchor="end" fill="rgba(255,255,255,.28)" fontSize={11} fontFamily="monospace">
                  {(v / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          {/* Legend */}
          {([['This Year', '#22d3ee', false], ['Prior Year', 'rgba(167,139,250,.65)', true]] as const).map(([lbl, col, dash], i) => (
            <g key={i} transform={`translate(${PL + i * 110},${H - 6})`}>
              <line x1={0} y1={0} x2={16} y2={0} stroke={col} strokeWidth={dash ? 1.5 : 2} strokeDasharray={dash ? '4 3' : undefined}/>
              <text x={22} y={4} fill="rgba(255,255,255,.38)" fontSize={10}>{lbl}</text>
            </g>
          ))}

          {/* Panning Group */}
          <g clipPath="url(#chart-clip)">
            <motion.g 
              animate={{ x: -step * stepWidth }} 
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <path d={areaD} fill="url(#tr-a)" stroke="none" />
              <path d={smoothPath(prvPts)} fill="none" stroke="rgba(167,139,250,.5)" strokeWidth={2} strokeDasharray="5 4" />
              <path d={smoothPath(curPts)} fill="none" stroke="#22d3ee" strokeWidth={2.5} filter="url(#tr-g)" />

              {/* X Axis Labels */}
              {FULL_TREND.map((d, i) => (
                <text key={d.month} x={sx(i)} y={H - 24} textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize={10}>
                  {d.month}
                </text>
              ))}

              {/* Points */}
              {curPts.map(([x, y], i) => (
                <g key={`cur-${i}`}>
                  <circle cx={x} cy={y} r={5} fill="rgba(34,211,238,.2)" stroke="#22d3ee" strokeWidth={1.5}/>
                  <circle cx={x} cy={y} r={2.5} fill="#22d3ee"/>
                </g>
              ))}
              {prvPts.map(([x, y], i) => (
                <g key={`prv-${i}`}>
                  <circle cx={x} cy={y} r={3} fill="rgba(167,139,250,.8)"/>
                </g>
              ))}
            </motion.g>
          </g>

        </svg>
      </div>
    </div>
  );
}

// ── Hero Section ────────────────────────────────────────────────────────────────
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
            <motion.p className="text-sm font-medium uppercase tracking-widest mb-4"
              style={{ color: 'var(--brand-navy)' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              Outsourced finance for growing SMEs
            </motion.p>
            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              Finance operations built for SMEs that move fast.
            </motion.h1>
            <motion.p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              Capucor gives growing South African businesses a dedicated finance
              team — accounting, bookkeeping, and payroll — on a predictable
              monthly subscription. No hourly billing. No surprises.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <Button nativeButton={false} render={<Link href="/pricing" />} size="lg" className="gap-2">
                See Pricing <ArrowRight className="h-4 w-4" />
              </Button>
              <Button nativeButton={false}
                render={<a href={siteConfig.links.booking} target="_blank" rel="noopener noreferrer" />}
                variant="outline" size="lg" className="gap-2">
                <Calendar className="h-4 w-4" /> Book a Call
              </Button>
            </motion.div>
          </div>

          {/* Dashboard */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
            <AnimatedRevenueChart />
          </motion.div>
        </div>

        {/* Partners carousel */}
        <motion.div className="mt-16 pt-8 border-t border-border"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <p className="text-xs font-medium uppercase tracking-widest text-center mb-5" style={{ color: 'var(--brand-cyan)' }}>
            Partners
          </p>
          <div className="overflow-hidden" style={{
            maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}>
            <div className="flex gap-8 animate-marquee w-max">
              {[...TOOLS, ...TOOLS, ...TOOLS, ...TOOLS].map((tool, i) => (
                <span key={i} className="whitespace-nowrap text-sm font-medium text-muted-foreground border border-border rounded-md px-5 py-2 bg-muted">
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
