'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

// ── Partners ────────────────────────────────────────────────────────────────────
const TOOLS = ['Xero', 'Dext', 'Syft', 'SimplePay', 'Karbon', 'Draftworx'];

// ── Dashboard data ──────────────────────────────────────────────────────────────
const REVENUE_ROWS = [
  { month: 'Oct 2024', revenue: 115200, vat: 14890, payroll: 48600, change: 8.2,  bars: [30,45,35,60,48,72,58] },
  { month: 'Nov 2024', revenue: 124500, vat: 16100, payroll: 50200, change: 8.1,  bars: [35,52,40,68,55,80,65] },
  { month: 'Dec 2024', revenue: 138900, vat: 17980, payroll: 52800, change: 11.6, bars: [40,58,45,75,62,85,70] },
  { month: 'Jan 2025', revenue: 142800, vat: 18360, payroll: 54200, change: 12.4, bars: [38,55,42,72,58,88,70] },
  { month: 'Feb 2025', revenue: 156400, vat: 20230, payroll: 56800, change: 9.5,  bars: [45,62,50,80,68,92,75] },
  { month: 'Mar 2025', revenue: 168200, vat: 21760, payroll: 59400, change: 7.6,  bars: [50,68,55,85,72,95,80] },
];

const EXPENSE_ROWS = [
  { label: 'Salaries & Wages',  pct: 42, color: '#4ade80' },
  { label: 'Rent & Utilities',  pct: 18, color: '#22d3ee' },
  { label: 'Marketing',         pct: 14, color: '#f472b6' },
  { label: 'Software & Tech',   pct: 9,  color: '#a78bfa' },
  { label: 'Professional Fees', pct: 9,  color: '#fb923c' },
  { label: 'Other',             pct: 8,  color: '#6b7280' },
];

const TREND = {
  months:  ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
  current: [115200,124500,138900,142800,156400,168200,172400,165800,178200,182600,190400,198200],
  prior:   [98400,104200,112800,118600,126400,134800,140200,138600,148200,154800,162400,172800],
};

const GP = {
  months: ['Oct','Nov','Dec','Jan','Feb','Mar'],
  rev:    [115200,124500,138900,142800,156400,168200],
  cogs:   [72400,78600,84200,88500,94800,100400],
};

const CLIENT_ROWS = [
  { name: 'Acme Corp',      rev: 48200, color: '#22d3ee' },
  { name: 'Globex Ltd',     rev: 36800, color: '#4ade80' },
  { name: 'Initech SA',     rev: 28400, color: '#a78bfa' },
  { name: 'Umbrella Co',    rev: 21600, color: '#fb923c' },
  { name: 'Dunder Mifflin', rev: 15900, color: '#f472b6' },
  { name: 'Vandelay Ind',   rev: 11200, color: '#2dd4bf' },
];

const CF = {
  months: ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
  vals:   [48200,52600,61400,55800,69200,73600,68400,71200,82600,79400,88200,94600],
};

const SLIDE_META = [
  { title: 'Monthly Revenue',   sub: 'Jan 2025',                   accent: '#4ade80', badge: '✓ Filed on time',   badgeBg: 'rgba(34,197,94,.15)'    },
  { title: 'Expense Breakdown', sub: 'Current Period · R 102,400', accent: '#f472b6', badge: '▼ 3.2% vs last mo', badgeBg: 'rgba(244,114,182,.15)'  },
  { title: 'Revenue Trend',     sub: '12 Months · vs Prior Year',  accent: '#22d3ee', badge: '↑ 14.2% YoY',       badgeBg: 'rgba(34,211,238,.15)'   },
  { title: 'Gross Profit',      sub: 'Revenue vs COGS · 6 Months', accent: '#4ade80', badge: 'Margin improving',  badgeBg: 'rgba(74,222,128,.14)'   },
  { title: 'Top Clients',       sub: 'Revenue by Client · YTD',    accent: '#fb923c', badge: '6 active clients',  badgeBg: 'rgba(251,146,60,.15)'   },
  { title: 'Cash Flow',         sub: '12-Month Operating Cash',    accent: '#4ade80', badge: 'Positive trend',    badgeBg: 'rgba(74,222,128,.14)'   },
];

// ── Utilities ───────────────────────────────────────────────────────────────────
function fmtZAR(n: number) {
  return 'R ' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function fmtK(n: number) { return 'R ' + (n / 1000).toFixed(1) + 'k'; }

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}
function donutArc(cx: number, cy: number, R: number, ri: number, a1: number, a2: number) {
  const [x1,y1] = polar(cx,cy,R,a1), [x2,y2] = polar(cx,cy,R,a2);
  const [x3,y3] = polar(cx,cy,ri,a2), [x4,y4] = polar(cx,cy,ri,a1);
  const lg = a2 - a1 > 180 ? 1 : 0;
  return `M${x1},${y1}A${R},${R},0,${lg},1,${x2},${y2}L${x3},${y3}A${ri},${ri},0,${lg},0,${x4},${y4}Z`;
}
function smoothPath(pts: [number, number][]): string {
  if (!pts.length) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = (pts[i + 1][0] - pts[i][0]) * 0.4;
    d += ` C${pts[i][0]+dx},${pts[i][1]} ${pts[i+1][0]-dx},${pts[i+1][1]} ${pts[i+1][0]},${pts[i+1][1]}`;
  }
  return d;
}

// ── Slide sub-components ────────────────────────────────────────────────────────
function ExpensesSlide() {
  const cx = 82, cy = 82, R = 68, ri = 46;
  const total = EXPENSE_ROWS.reduce((s, e) => s + e.pct, 0);
  const arcs = EXPENSE_ROWS.reduce<Array<(typeof EXPENSE_ROWS)[0] & { a1: number; a2: number }>>((out, e) => {
    const start = out.reduce((s, x) => s + (x.pct / total) * 360, 0);
    const sweep = (e.pct / total) * 360;
    return [...out, { ...e, a1: start + 1.2, a2: start + sweep - 1.2 }];
  }, []);
  return (
    <div className="flex items-center gap-4 py-1">
      <svg viewBox="0 0 164 164" width={164} height={164} style={{ flexShrink: 0 }}>
        <defs>
          <filter id="exp-g" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {arcs.map((e, i) => (
          <motion.path key={i} d={donutArc(cx, cy, R, ri, e.a1, e.a2)} fill={e.color}
            filter={i < 2 ? 'url(#exp-g)' : undefined}
            initial={{ opacity: 0 }} animate={{ opacity: 0.88 }}
            transition={{ delay: i * 0.18, duration: 1.6 }} />
        ))}
        <text x={cx} y={cy - 5} textAnchor="middle" fill="white" fontSize={13} fontWeight={800} fontFamily="monospace">R 102k</text>
        <text x={cx} y={cy + 11} textAnchor="middle" fill="rgba(255,255,255,.35)" fontSize={9}>TOTAL</text>
      </svg>
      <div className="flex-1 flex flex-col gap-2.5">
        {EXPENSE_ROWS.map((e, i) => (
          <motion.div key={i} className="flex items-center gap-2"
            initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.2, duration: 0.5 }}>
            <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: e.color }} />
            <span className="text-xs flex-1" style={{ color: 'rgba(255,255,255,.52)' }}>{e.label}</span>
            <span className="text-xs font-bold font-mono" style={{ color: e.color }}>{e.pct}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TrendSlide() {
  const PL = 40, PR = 8, PT = 10, PB = 44, W = 364, H = 210;
  const cW = W - PL - PR, cH = H - PT - PB;
  const allV = [...TREND.current, ...TREND.prior];
  const mn = Math.min(...allV) * 0.93, mx = Math.max(...allV) * 1.03;
  const n = TREND.months.length;
  const sx = (i: number) => PL + (i / (n - 1)) * cW;
  const sy = (v: number) => PT + cH - ((v - mn) / (mx - mn)) * cH;
  const bot = PT + cH;
  const curPts: [number,number][] = TREND.current.map((v, i) => [sx(i), sy(v)]);
  const prvPts: [number,number][] = TREND.prior.map((v, i) => [sx(i), sy(v)]);
  const areaD = smoothPath(curPts) + ` L${sx(n-1)},${bot} L${sx(0)},${bot}Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="tr-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.28}/>
          <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.02}/>
        </linearGradient>
        <filter id="tr-g" x="-5%" y="-25%" width="110%" height="150%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const v = mn + t * (mx - mn), y = sy(v);
        return (
          <g key={i}>
            <line x1={PL} x2={W - PR} y1={y} y2={y} stroke="rgba(255,255,255,.055)" strokeWidth={1}/>
            <text x={PL - 6} y={y + 4} textAnchor="end" fill="rgba(255,255,255,.28)" fontSize={9} fontFamily="monospace">
              {(v / 1000).toFixed(0)}k
            </text>
          </g>
        );
      })}
      {TREND.months.map((m, i) => i % 2 === 0 && (
        <text key={i} x={sx(i)} y={H - 22} textAnchor="middle" fill="rgba(255,255,255,.26)" fontSize={9}>{m}</text>
      ))}
      <motion.path d={areaD} fill="url(#tr-a)" stroke="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1.5 }}/>
      <motion.path d={smoothPath(prvPts)} fill="none" stroke="rgba(167,139,250,.5)" strokeWidth={1.5} strokeDasharray="5 4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1.2 }}/>
      <motion.path d={smoothPath(curPts)} fill="none" stroke="#22d3ee" strokeWidth={2} filter="url(#tr-g)"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}/>
      {[curPts[0], curPts[n - 1]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={5} fill="rgba(34,211,238,.15)" stroke="#22d3ee" strokeWidth={1.5}/>
          <circle cx={x} cy={y} r={2.5} fill="#22d3ee"/>
        </g>
      ))}
      {([['This Year', '#22d3ee', false], ['Prior Year', 'rgba(167,139,250,.65)', true]] as const).map(([lbl, col, dash], i) => (
        <g key={i} transform={`translate(${PL + i * 100},${H - 6})`}>
          <line x1={0} y1={0} x2={16} y2={0} stroke={col} strokeWidth={dash ? 1.5 : 2} strokeDasharray={dash ? '4 3' : undefined}/>
          <text x={20} y={4} fill="rgba(255,255,255,.38)" fontSize={9}>{lbl}</text>
        </g>
      ))}
    </svg>
  );
}

function GrossProfitSlide() {
  const maxRev = Math.max(...GP.rev);
  const MAX_PX = 152;
  return (
    <div>
      <div className="flex items-end gap-1.5 mb-2" style={{ height: MAX_PX + 20 }}>
        {GP.months.map((mo, i) => {
          const rev = GP.rev[i], cogs = GP.cogs[i], gp = rev - cogs;
          const revPx = (rev / maxRev) * MAX_PX;
          const gpPx  = revPx * (gp / rev);
          const coPx  = revPx - gpPx;
          return (
            <div key={i} className="flex-1 flex flex-col justify-end">
              <div className="flex flex-col justify-end gap-0.5" style={{ height: MAX_PX }}>
                <motion.div className="w-full rounded-t-sm"
                  style={{ background: 'linear-gradient(to top,#15803d,#4ade80)' }}
                  initial={{ height: 0 }} animate={{ height: gpPx }}
                  transition={{ delay: i * 0.14, duration: 1.3, ease: [0.34, 1.56, 0.64, 1] }}/>
                <motion.div className="w-full"
                  style={{ background: 'rgba(251,146,60,.5)' }}
                  initial={{ height: 0 }} animate={{ height: coPx }}
                  transition={{ delay: i * 0.14, duration: 1.3, ease: [0.34, 1.56, 0.64, 1] }}/>
              </div>
              <div className="text-center mt-1" style={{ fontSize: 9, color: 'rgba(255,255,255,.3)' }}>{mo}</div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-1 mb-1">
        {[['#4ade80','Gross Profit'],['rgba(251,146,60,.7)','COGS']].map(([c,lbl]) => (
          <div key={lbl} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm" style={{ background: c }}/>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.45)' }}>{lbl}</span>
          </div>
        ))}
      </div>
      <div className="text-right" style={{ fontSize: 10, color: 'rgba(255,255,255,.28)', marginTop: 4 }}>Avg gross margin: 38.5%</div>
    </div>
  );
}

function ClientsSlide() {
  const maxRev = CLIENT_ROWS[0].rev;
  return (
    <div className="flex flex-col gap-2.5 py-2">
      {CLIENT_ROWS.map((c, i) => (
        <motion.div key={i} className="flex items-center gap-2.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}>
          <div className="text-xs text-right flex-shrink-0" style={{ width: 100, color: 'rgba(255,255,255,.5)' }}>{c.name}</div>
          <div className="flex-1 rounded overflow-hidden" style={{ height: 6, background: 'rgba(255,255,255,.07)' }}>
            <motion.div className="h-full rounded"
              style={{ background: `linear-gradient(to right,${c.color}66,${c.color})` }}
              initial={{ width: '0%' }} animate={{ width: `${(c.rev / maxRev) * 100}%` }}
              transition={{ delay: 0.05 + i * 0.158, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}/>
          </div>
          <div className="text-xs font-bold font-mono flex-shrink-0" style={{ width: 56, textAlign: 'right', color: c.color }}>
            {c.rev.toLocaleString()}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CashFlowSlide() {
  const latest = CF.vals[CF.vals.length - 1];
  const avg    = Math.round(CF.vals.reduce((a, b) => a + b, 0) / CF.vals.length);
  const peak   = Math.max(...CF.vals);
  const PL = 36, PR = 8, PT = 8, PB = 24, W = 364, H = 148;
  const cW = W - PL - PR, cH = H - PT - PB;
  const mx = peak * 1.08;
  const n  = CF.vals.length;
  const sx = (i: number) => PL + (i / (n - 1)) * cW;
  const sy = (v: number) => PT + cH - (v / mx) * cH;
  const bot = PT + cH;
  const pts: [number,number][] = CF.vals.map((v, i) => [sx(i), sy(v)]);
  const areaD = smoothPath(pts) + ` L${sx(n-1)},${bot} L${sx(0)},${bot}Z`;

  return (
    <div>
      <div className="flex justify-between mb-3">
        {([['Current', fmtK(latest), '#4ade80'], ['Average', fmtK(avg), 'rgba(255,255,255,.6)'], ['Peak', fmtK(peak), '#22d3ee']] as const).map(([lbl, val, col]) => (
          <div key={lbl} className="text-center">
            <div className="text-sm font-bold font-mono" style={{ color: col }}>{val}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 2 }}>{lbl}</div>
          </div>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="cf-a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" stopOpacity={0.3}/>
            <stop offset="100%" stopColor="#4ade80" stopOpacity={0.02}/>
          </linearGradient>
          <filter id="cf-g" x="-5%" y="-25%" width="110%" height="150%">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {[0, 0.33, 0.67, 1].map((t, i) => (
          <g key={i}>
            <line x1={PL} x2={W-PR} y1={PT+cH*(1-t)} y2={PT+cH*(1-t)} stroke="rgba(255,255,255,.05)" strokeWidth={1}/>
            <text x={PL-5} y={PT+cH*(1-t)+4} textAnchor="end" fill="rgba(255,255,255,.26)" fontSize={9} fontFamily="monospace">
              {((mx * t) / 1000).toFixed(0)}k
            </text>
          </g>
        ))}
        {CF.months.map((m, i) => i % 2 === 0 && (
          <text key={i} x={sx(i)} y={H-4} textAnchor="middle" fill="rgba(255,255,255,.24)" fontSize={9}>{m}</text>
        ))}
        <motion.path d={areaD} fill="url(#cf-a)" stroke="none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1.5 }}/>
        <motion.path d={smoothPath(pts)} fill="none" stroke="#4ade80" strokeWidth={2} filter="url(#cf-g)"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}/>
        {[pts[0], pts[n-1]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={5} fill="rgba(74,222,128,.15)" stroke="#4ade80" strokeWidth={1.5}/>
            <circle cx={x} cy={y} r={2.5} fill="#4ade80"/>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── Main Dashboard ──────────────────────────────────────────────────────────────
function DashboardMockup() {
  const [slideIdx,    setSlideIdx]    = useState(0);
  const [badgeText,   setBadgeText]   = useState(SLIDE_META[0].badge);
  const [badgeFading, setBadgeFading] = useState(false);

  const slideIdxRef = useRef(0);

  // Main slide cycle (7 s)
  useEffect(() => {
    let inner: ReturnType<typeof setTimeout>;
    const iv = setInterval(() => {
      setBadgeFading(true);
      inner = setTimeout(() => {
        const next = (slideIdxRef.current + 1) % SLIDE_META.length;
        slideIdxRef.current = next;
        setSlideIdx(next);
        setBadgeText(SLIDE_META[next].badge);
        setBadgeFading(false);
      }, 320);
    }, 7000);
    return () => { clearInterval(iv); clearTimeout(inner); };
  }, []);

  const slide = SLIDE_META[slideIdx];
  const sub   = slideIdx === 0 ? REVENUE_ROWS[3].month : slide.sub;

  return (
    <div className="relative rounded-2xl border border-border bg-card shadow-2xl p-6 overflow-hidden">

      {/* LIVE dot + pagination dots */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: slide.accent, boxShadow: `0 0 5px ${slide.accent}` }}
            animate={{ opacity: [1, 0.18, 1], scale: [1, 0.72, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-bold uppercase tracking-widest" style={{ fontSize: 9, color: slide.accent }}>Live</span>
        </div>
        <div className="flex items-center gap-1">
          {SLIDE_META.map((_, i) => (
            <motion.div key={i} className="h-1 rounded-full"
              animate={{
                width: i === slideIdx ? 18 : 5,
                backgroundColor: i === slideIdx ? slide.accent : 'rgba(255,255,255,.15)',
              }}
              transition={{ duration: 0.35 }}
            />
          ))}
        </div>
      </div>

      {/* Slide title + sub + badge */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={slideIdx} className="text-base font-bold" style={{ letterSpacing: '-0.015em' }}
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.28 }}>
              {slide.title}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={slideIdx} className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,.32)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}>
              {sub}
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.div
          className="text-xs font-bold rounded-full ml-2 flex-shrink-0"
          style={{ padding: '4px 10px', background: slide.badgeBg, color: slide.accent, fontSize: 10 }}
          animate={{ opacity: badgeFading ? 0 : 1, scale: badgeFading ? 0.88 : 1 }}
          transition={{ duration: 0.28 }}>
          {badgeText}
        </motion.div>
      </div>

      {/* Chart viewport — fixed height prevents card resize between slides */}
      <div style={{ height: 252, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div key={slideIdx}
            style={{ position: 'absolute', inset: 0 }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.38, ease: 'easeInOut' }}>

            {slideIdx === 0 && (
              <div>
                <div style={{ fontSize: 30, fontWeight: 800, fontFamily: 'monospace', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6 }}>
                  {fmtZAR(REVENUE_ROWS[3].revenue)}
                </div>
                <div className="flex items-center gap-1 mb-4" style={{ color: '#4ade80', fontSize: 13, fontWeight: 600 }}>
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>+{REVENUE_ROWS[3].change}%</span>
                </div>
                <div className="flex items-end gap-1.5 mb-3" style={{ height: 92 }}>
                  {REVENUE_ROWS[3].bars.map((h, i) => (
                    <motion.div key={i}
                      style={{ flex: 1, borderRadius: 3, background: 'linear-gradient(to top,#15803d,#4ade80)', opacity: 0.3 + i * 0.1 }}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1.2, delay: i * 0.133, ease: 'easeOut' }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {([['VAT Due', fmtZAR(REVENUE_ROWS[3].vat)], ['Payroll', fmtZAR(REVENUE_ROWS[3].payroll)]] as const).map(([lbl, val]) => (
                    <div key={lbl} className="rounded-lg p-2.5"
                      style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)' }}>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,.38)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{lbl}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace' }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slideIdx === 1 && <ExpensesSlide />}
            {slideIdx === 2 && <TrendSlide />}
            {slideIdx === 3 && <GrossProfitSlide />}
            {slideIdx === 4 && <ClientsSlide />}
            {slideIdx === 5 && <CashFlowSlide />}
          </motion.div>
        </AnimatePresence>
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
            <DashboardMockup />
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
