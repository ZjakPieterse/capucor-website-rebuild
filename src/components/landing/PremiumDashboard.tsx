'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  ChevronRight, DollarSign, PieChart, 
  BarChart3, Activity, Users, Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Types ────────────────────────────────────────────────────────────────────────

type SlideId = 'revenue' | 'expenses' | 'trend' | 'profit' | 'clients' | 'cashflow';

interface Slide {
  id: SlideId;
  title: string;
  subtitle: string;
  accent: string;
  badge: string;
  badgeBg: string;
  icon: React.ElementType;
}

// ── Data ─────────────────────────────────────────────────────────────────────────

const REV_DATA = [
  { month: 'Oct', revenue: 115200, vat: 14890, payroll: 48600, change: 8.2, bars: [30, 45, 35, 60, 48, 72, 58] },
  { month: 'Nov', revenue: 124500, vat: 16100, payroll: 50200, change: 8.1, bars: [35, 52, 40, 68, 55, 80, 65] },
  { month: 'Dec', revenue: 138900, vat: 17980, payroll: 52800, change: 11.6, bars: [40, 58, 45, 75, 62, 85, 70] },
  { month: 'Jan', revenue: 142800, vat: 18360, payroll: 54200, change: 12.4, bars: [38, 55, 42, 72, 58, 88, 70] },
  { month: 'Feb', revenue: 156400, vat: 20230, payroll: 56800, change: 9.5, bars: [45, 62, 50, 80, 68, 92, 75] },
  { month: 'Mar', revenue: 168200, vat: 21760, payroll: 59400, change: 7.6, bars: [50, 68, 55, 85, 72, 95, 80] },
];

const EXP_DATA = [
  { label: 'Salaries', pct: 42, color: '#4ade80' },
  { label: 'Rent', pct: 18, color: '#22d3ee' },
  { label: 'Marketing', pct: 14, color: '#f472b6' },
  { label: 'Tech', pct: 9, color: '#a78bfa' },
  { label: 'Fees', pct: 9, color: '#fb923c' },
  { label: 'Other', pct: 8, color: '#4b5563' },
];

const TREND_DATA = {
  months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  cur: [115200, 124500, 138900, 142800, 156400, 168200, 172400, 165800, 178200, 182600, 190400, 198200],
  prev: [98400, 104200, 112800, 118600, 126400, 134800, 140200, 138600, 148200, 154800, 162400, 172800],
};

const GP_DATA = {
  months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  rev: [115200, 124500, 138900, 142800, 156400, 168200],
  cogs: [72400, 78600, 84200, 88500, 94800, 100400],
};

const CLIENT_DATA = [
  { name: 'Acme Corp', rev: 48200, color: '#22d3ee' },
  { name: 'Globex Ltd', rev: 36800, color: '#4ade80' },
  { name: 'Initech SA', rev: 28400, color: '#a78bfa' },
  { name: 'Umbrella Co', rev: 21600, color: '#fb923c' },
  { name: 'Dunder Mifflin', rev: 15900, color: '#f472b6' },
];

const CF_DATA = {
  months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  vals: [48200, 52600, 61400, 55800, 69200, 73600, 68400, 71200, 82600, 79400, 88200, 94600],
};

const SLIDES: Slide[] = [
  { id: 'revenue', title: 'Monthly Revenue', subtitle: 'March 2025', accent: '#4ade80', badge: '✓ Filed on time', badgeBg: 'rgba(34,197,94,0.15)', icon: DollarSign },
  { id: 'expenses', title: 'Expense Breakdown', subtitle: 'Current Period · R 102k total', accent: '#f472b6', badge: '▼ 3.2% vs last mo', badgeBg: 'rgba(244,114,182,0.15)', icon: PieChart },
  { id: 'trend', title: 'Revenue Trend', subtitle: '12 Months · vs Prior Year', accent: '#22d3ee', badge: '↑ 14.2% YoY', badgeBg: 'rgba(34,211,238,0.15)', icon: BarChart3 },
  { id: 'profit', title: 'Gross Profit', subtitle: 'Revenue vs COGS · 6 Months', accent: '#4ade80', badge: 'Margin improving', badgeBg: 'rgba(74,222,128,0.14)', icon: Activity },
  { id: 'clients', title: 'Top Clients', subtitle: 'Revenue by Client · YTD', accent: '#fb923c', badge: '6 active clients', badgeBg: 'rgba(251,146,60,0.15)', icon: Users },
  { id: 'cashflow', title: 'Cash Flow', subtitle: '12-Month Operating Cash', accent: '#4ade80', badge: 'Positive trend', badgeBg: 'rgba(74,222,128,0.14)', icon: Wallet },
];

// ── Helpers ──────────────────────────────────────────────────────────────────────

const fmtR = (n: number) => 'R ' + Math.round(n).toLocaleString('en-ZA');
const fmtK = (n: number) => 'R ' + (n / 1000).toFixed(1) + 'k';

const smoothPath = (pts: [number, number][]): string => {
  if (!pts.length) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = (pts[i + 1][0] - pts[i][0]) * 0.4;
    d += ` C${pts[i][0] + dx},${pts[i][1]} ${pts[i + 1][0] - dx},${pts[i + 1][1]} ${pts[i + 1][0]},${pts[i + 1][1]}`;
  }
  return d;
};

// ── Slide Components ─────────────────────────────────────────────────────────────

function RevenueSlide() {
  const d = REV_DATA[5]; // Mar 2025
  return (
    <div className="space-y-6">
      <div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-mono font-bold tracking-tight text-white"
        >
          {fmtR(d.revenue)}
        </motion.div>
        <div className="flex items-center gap-1.5 mt-2 text-emerald-400 font-semibold text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>+{d.change}%</span>
          <span className="text-white/30 font-normal ml-1">vs last month</span>
        </div>
      </div>

      <div className="flex items-end gap-1.5 h-24">
        {d.bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex-1 rounded-sm bg-gradient-to-t from-emerald-600/50 to-emerald-400"
            style={{ opacity: 0.4 + (i * 0.1) }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">VAT Due</div>
          <div className="text-base font-mono font-bold">{fmtR(d.vat)}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Payroll</div>
          <div className="text-base font-mono font-bold">{fmtR(d.payroll)}</div>
        </div>
      </div>
    </div>
  );
}

function ExpensesSlide() {
  return (
    <div className="flex items-center gap-8 py-4">
      <div className="relative w-40 h-40 shrink-0">
        <svg viewBox="0 0 164 164" className="w-full h-full -rotate-90">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {(() => {
            const startAngles: number[] = [];
            let total = 0;
            EXP_DATA.forEach((e) => {
              startAngles.push(total);
              total += (e.pct / 100) * 360;
            });

            return EXP_DATA.map((e, i) => {
              const sweep = (e.pct / 100) * 360;
              const start = startAngles[i];
              
              const cx = 82, cy = 82, R = 68, ri = 46;
              const a1 = start + 1.2, a2 = start + sweep - 1.2;
              const rad1 = (a1 - 90) * Math.PI / 180;
              const rad2 = (a2 - 90) * Math.PI / 180;
              const rad3 = (a2 - 90) * Math.PI / 180;
              const rad4 = (a1 - 90) * Math.PI / 180;
              
              const x1 = cx + R * Math.cos(rad1), y1 = cy + R * Math.sin(rad1);
              const x2 = cx + R * Math.cos(rad2), y2 = cy + R * Math.sin(rad2);
              const x3 = cx + ri * Math.cos(rad3), y3 = cy + ri * Math.sin(rad3);
              const x4 = cx + ri * Math.cos(rad4), y4 = cy + ri * Math.sin(rad4);
              
              const lg = sweep > 180 ? 1 : 0;
              const d = `M${x1},${y1} A${R},${R},0,${lg},1,${x2},${y2} L${x3},${y3} A${ri},${ri},0,${lg},0,${x4},${y4} Z`;
              
              return (
                <motion.path
                  key={i}
                  d={d}
                  fill={e.color}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.9, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  filter={i < 2 ? "url(#glow)" : ""}
                />
              );
            });
          })()}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-sm font-mono font-bold text-white">R 102k</div>
          <div className="text-[9px] text-white/30 uppercase tracking-widest font-medium">Total</div>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        {EXP_DATA.map((e, i) => (
          <div key={i} className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
              <span className="text-white/60">{e.label}</span>
            </div>
            <span className="font-mono font-bold" style={{ color: e.color }}>{e.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendSlide() {
  const PL = 44, PR = 10, PT = 12, PB = 28, W = 394, H = 188;
  const cW = W - PL - PR, cH = H - PT - PB;
  const all = [...TREND_DATA.cur, ...TREND_DATA.prev];
  const mn = Math.min(...all) * 0.9, mx = Math.max(...all) * 1.05;
  const n = TREND_DATA.months.length;
  const sx = (i: number) => PL + (i / (n - 1)) * cW;
  const sy = (v: number) => PT + cH - ((v - mn) / (mx - mn)) * cH;

  const curPts = TREND_DATA.cur.map((v, i) => [sx(i), sy(v)] as [number, number]);
  const prvPts = TREND_DATA.prev.map((v, i) => [sx(i), sy(v)] as [number, number]);
  const areaD = smoothPath(curPts) + ` L${sx(n - 1)},${PT + cH} L${sx(0)},${PT + cH} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.02} />
          </linearGradient>
          <filter id="lineGlow" x="-5%" y="-25%" width="110%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Y Axis */}
        {[0, 0.5, 1].map((t, i) => {
          const v = mn + t * (mx - mn), y = sy(v);
          return (
            <g key={i}>
              <line x1={PL} x2={W - PR} y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
              <text x={PL - 8} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="monospace">
                {(v / 1000).toFixed(0)}k
              </text>
            </g>
          );
        })}

        {/* X Axis */}
        {TREND_DATA.months.map((m, i) => (
          i % 2 === 0 && (
            <text key={i} x={sx(i)} y={H - 6} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={9}>
              {m}
            </text>
          )
        ))}

        <motion.path
          d={areaD}
          fill="url(#areaGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d={smoothPath(prvPts)}
          fill="none"
          stroke="rgba(167,139,250,0.4)"
          strokeWidth={1.5}
          strokeDasharray="5,4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.path
          d={smoothPath(curPts)}
          fill="none"
          stroke="#22d3ee"
          strokeWidth={2.5}
          filter="url(#lineGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Legend */}
        <g transform={`translate(${PL}, ${H - 3})`}>
          <line x1={0} y1={0} x2={12} y2={0} stroke="#22d3ee" strokeWidth={2} />
          <text x={16} y={3} fill="rgba(255,255,255,0.4)" fontSize={9}>This Year</text>
          <line x1={80} y1={0} x2={92} y2={0} stroke="rgba(167,139,250,0.6)" strokeWidth={1.5} strokeDasharray="3,2" />
          <text x={96} y={3} fill="rgba(255,255,255,0.4)" fontSize={9}>Prior Year</text>
        </g>
      </svg>
    </div>
  );
}

function ProfitSlide() {
  const maxRev = Math.max(...GP_DATA.rev);
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between h-32 gap-3 pt-2">
        {GP_DATA.months.map((mo, i) => {
          const rev = GP_DATA.rev[i];
          const cogs = GP_DATA.cogs[i];
          const gp = rev - cogs;
          const revH = (rev / maxRev) * 100;
          const gpH = (gp / rev) * revH;
          const cogsH = revH - gpH;
          
          return (
            <div key={i} className="flex-1 flex flex-col items-center group">
              <div className="w-full flex flex-col justify-end h-32 relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${gpH}%` }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm shadow-[0_0_10px_rgba(74,222,128,0.2)]"
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${cogsH}%` }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="w-full bg-orange-500/40 border-t border-orange-500/20"
                />
              </div>
              <span className="text-[10px] text-white/30 mt-2 font-medium">{mo}</span>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-between text-[11px] pt-2">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white/50 font-medium">Profit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-orange-500/60" />
            <span className="text-white/50 font-medium">COGS</span>
          </div>
        </div>
        <div className="text-white/30 italic">Avg Margin: 38.5%</div>
      </div>
    </div>
  );
}

function ClientsSlide() {
  const max = CLIENT_DATA[0].rev;
  return (
    <div className="space-y-4 py-2">
      {CLIENT_DATA.map((c, i) => (
        <div key={i} className="space-y-1.5">
          <div className="flex justify-between text-[11px] px-1">
            <span className="text-white/60 font-medium">{c.name}</span>
            <span className="font-mono font-bold" style={{ color: c.color }}>{fmtK(c.rev)}</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(c.rev / max) * 100}%` }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(to right, ${c.color}66, ${c.color})`, boxShadow: `0 0 10px ${c.color}33` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CashFlowSlide() {
  const PL = 38, PR = 10, PT = 8, PB = 26, W = 394, H = 164;
  const cW = W - PL - PR, cH = H - PT - PB;
  const max = Math.max(...CF_DATA.vals) * 1.1;
  const n = CF_DATA.vals.length;
  const sx = (i: number) => PL + (i / (n - 1)) * cW;
  const sy = (v: number) => PT + cH - (v / max) * cH;

  const pts = CF_DATA.vals.map((v, i) => [sx(i), sy(v)] as [number, number]);
  const areaD = smoothPath(pts) + ` L${sx(n - 1)},${PT + cH} L${sx(0)},${PT + cH} Z`;

  return (
    <div className="space-y-4">
      <div className="flex justify-between px-2">
        <div className="text-center">
          <div className="text-sm font-mono font-bold text-emerald-400">{fmtK(CF_DATA.vals[11])}</div>
          <div className="text-[9px] text-white/30 uppercase tracking-widest font-medium">Current</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-mono font-bold text-white/70">{fmtK(71200)}</div>
          <div className="text-[9px] text-white/30 uppercase tracking-widest font-medium">Average</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-mono font-bold text-cyan-400">{fmtK(Math.max(...CF_DATA.vals))}</div>
          <div className="text-[9px] text-white/30 uppercase tracking-widest font-medium">Peak</div>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="cfGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#4ade80" stopOpacity={0.03} />
          </linearGradient>
        </defs>
        
        {[0, 0.5, 1].map((t, i) => {
          const y = PT + cH * (1 - t);
          return (
            <g key={i}>
              <line x1={PL} x2={W - PR} y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
              <text x={PL - 6} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.25)" fontSize={9} fontFamily="monospace">
                {((max * t) / 1000).toFixed(0)}k
              </text>
            </g>
          );
        })}

        <motion.path
          d={areaD}
          fill="url(#cfGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d={smoothPath(pts)}
          fill="none"
          stroke="#4ade80"
          strokeWidth={2.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2 }}
        />
        
        {/* Highlight points */}
        <circle cx={pts[0][0]} cy={pts[0][1]} r={5} fill="rgba(74,222,128,0.1)" stroke="#4ade80" strokeWidth={1} />
        <circle cx={pts[0][0]} cy={pts[0][1]} r={2.5} fill="#4ade80" />
        <circle cx={pts[n-1][0]} cy={pts[n-1][1]} r={5} fill="rgba(74,222,128,0.1)" stroke="#4ade80" strokeWidth={1} />
        <circle cx={pts[n-1][0]} cy={pts[n-1][1]} r={2.5} fill="#4ade80" />
      </svg>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────────

export function PremiumDashboard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const slide = SLIDES[activeIdx];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCycle = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
  };

  useEffect(() => {
    startCycle();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="relative group">
      {/* Background Glows (linked to active slide color) */}
      <div className="absolute inset-0 -z-10 opacity-30 blur-[80px] transition-all duration-1000 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full"
          style={{ backgroundColor: slide.accent }}
        />
      </div>

      <div className="w-full max-w-[480px] bg-[#070c1a]/80 backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] p-6 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: slide.accent, boxShadow: `0 0 8px ${slide.accent}` }}
            />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Live</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIdx(i);
                  startCycle();
                }}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === activeIdx ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "w-1.5 bg-white/10 hover:bg-white/20"
                )}
                style={i === activeIdx ? { backgroundColor: slide.accent, boxShadow: `0 0 8px ${slide.accent}` } : {}}
              />
            ))}
          </div>
        </div>

        {/* Slide Title */}
        <div className="flex items-start justify-between mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex-1"
            >
              <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
                {slide.title}
              </h3>
              <p className="text-xs text-white/30 mt-1 font-medium">
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-badge'}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="px-3 py-1 rounded-full text-[10px] font-bold"
              style={{ backgroundColor: slide.badgeBg, color: slide.accent }}
            >
              {slide.badge}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Viewport */}
        <div className="min-h-[220px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-viewport'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {slide.id === 'revenue' && <RevenueSlide />}
              {slide.id === 'expenses' && <ExpensesSlide />}
              {slide.id === 'trend' && <TrendSlide />}
              {slide.id === 'profit' && <ProfitSlide />}
              {slide.id === 'clients' && <ClientsSlide />}
              {slide.id === 'cashflow' && <CashFlowSlide />}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Footer info */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] text-white/20 font-semibold uppercase tracking-widest">
            <slide.icon className="w-3.5 h-3.5" style={{ color: slide.accent }} />
            <span>Capucor Command Centre</span>
          </div>
          <ChevronRight className="w-4 h-4 text-white/10" />
        </div>
      </div>
    </div>
  );
}
