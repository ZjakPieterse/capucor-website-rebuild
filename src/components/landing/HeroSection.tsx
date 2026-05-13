'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  ArrowRight, Calendar, TrendingDown, CheckCircle2, Clock, AlertCircle,
  FileSpreadsheet, FileText, FileWarning, ScrollText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { MagneticButton } from '@/components/ui/MagneticButton';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// ── Date helpers ──────────────────────────────────────────────────────────────────
const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_FULL  = ['January','February','March','April','May','June','July','August','September','October','November','December'];

type DashboardDates = {
  vatDateStr: string;
  vatDays: number;
  closeMonth: string;
};

function computeDashboardDates(): DashboardDates {
  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const monthOffset = today.getDate() > 25 ? 1 : 0;
  const vatDue   = new Date(now.getFullYear(), now.getMonth() + monthOffset, 25);
  const msPerDay = 1000 * 60 * 60 * 24;
  const vatDays  = Math.max(0, Math.round((vatDue.getTime() - today.getTime()) / msPerDay));
  const vatDateStr = `25 ${MONTH_SHORT[vatDue.getMonth()]}`;
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const closeMonth = MONTH_FULL[prev.getMonth()];
  return { vatDateStr, vatDays, closeMonth };
}

// ── Carrier definitions ──────────────────────────────────────────────────────────
// Each carrier is a single element that morphs from chaos card → clean tile.
// Tile position is set via CSS inline styles below. Chaos transform values
// are pixel deltas applied by GSAP at cycle start.

type TileCarrier = {
  id: 'cash' | 'vat' | 'debtor' | 'close';
  tile: { left: string; top: string; width: string; height: string };
  chaos: { x: number; y: number; rot: number };
};

type StripCarrier = {
  id: 'prov-tax' | 'emp201' | 'cipc';
  tile: { left: string; top: string; width: string; height: string };
  chaos: { x: number; y: number; rot: number };
};

const TILE_CARRIERS: TileCarrier[] = [
  { id: 'cash',   tile: { left: '0%',  top: '0%',  width: '49%',  height: '39%' }, chaos: { x: -30, y: -20, rot: -8  } },
  { id: 'vat',    tile: { left: '51%', top: '0%',  width: '49%',  height: '39%' }, chaos: { x: -28, y: -32, rot:  9  } },
  { id: 'debtor', tile: { left: '0%',  top: '41%', width: '49%',  height: '39%' }, chaos: { x: -42, y: -58, rot: -12 } },
  { id: 'close',  tile: { left: '51%', top: '41%', width: '49%',  height: '39%' }, chaos: { x:  26, y: -24, rot:  11 } },
];

const STRIP_CARRIERS: StripCarrier[] = [
  { id: 'prov-tax', tile: { left: '0%',  top: '84%', width: '32%', height: '14%' }, chaos: { x:  60, y: -260, rot: -6  } },
  { id: 'emp201',   tile: { left: '34%', top: '84%', width: '32%', height: '14%' }, chaos: { x:  20, y: -130, rot:  14 } },
  { id: 'cipc',     tile: { left: '68%', top: '84%', width: '32%', height: '14%' }, chaos: { x: -30, y: -200, rot: -10 } },
];

// Decorative red/amber blobs that pulse during chaos and dissolve during converge.
const CHAOS_BLOBS = [
  { id: 'b1', left: '14%', top: '18%', size: 90,  color: 'rgba(239,68,68,0.22)' },
  { id: 'b2', left: '70%', top: '52%', size: 130, color: 'rgba(245,158,11,0.18)' },
  { id: 'b3', left: '42%', top: '70%', size: 80,  color: 'rgba(239,68,68,0.14)' },
];

// ── Finance Command Centre (dashboard + chaos layer combined) ────────────────────

function FinanceCommandCentre({ skipAnimation }: { skipAnimation: boolean }) {
  const dates = computeDashboardDates();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef     = useRef<HTMLDivElement>(null);
  const cashNumRef   = useRef<HTMLSpanElement>(null);
  const debtorNumRef = useRef<HTMLSpanElement>(null);
  const vatDaysRef   = useRef<HTMLSpanElement>(null);
  const runwayBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (skipAnimation) return;
    if (!stageRef.current) return;

    const stage = stageRef.current;

    // Query carriers + faces + ambient blobs scoped to this stage
    const tileCarriers   = gsap.utils.toArray<HTMLElement>(stage.querySelectorAll('[data-carrier="tile"]'));
    const stripCarriers  = gsap.utils.toArray<HTMLElement>(stage.querySelectorAll('[data-carrier="strip"]'));
    const allCarriers    = [...tileCarriers, ...stripCarriers];
    const chaosFaces     = stage.querySelectorAll('.chaos-face');
    const tileFaces      = stage.querySelectorAll('.tile-face');
    const ambient        = stage.querySelectorAll('.chaos-blob');
    const header         = stage.querySelector('.fcc-header');
    const stripWrap      = stage.querySelector('.fcc-strip-wrap');

    // Counter object for animated numbers
    const counter = { cash: 0, debtor: 0, vatDays: 0 };

    const setChaosState = () => {
      // Position carriers at scattered transforms; show chaos faces; hide tile faces & header
      allCarriers.forEach((el) => {
        const x = parseFloat(el.dataset.chaosX || '0');
        const y = parseFloat(el.dataset.chaosY || '0');
        const r = parseFloat(el.dataset.chaosRot || '0');
        gsap.set(el, { x, y, rotation: r, scale: 0.6, filter: 'blur(0px)' });
      });
      gsap.set(chaosFaces, { opacity: 1 });
      gsap.set(tileFaces, { opacity: 0 });
      gsap.set(ambient, { opacity: 1, scale: 1 });
      gsap.set(header, { opacity: 0, y: -8 });
      gsap.set(stripWrap, { opacity: 0 });
      counter.cash = 0;
      counter.debtor = 0;
      counter.vatDays = 0;
      if (cashNumRef.current) cashNumRef.current.textContent = '0.0';
      if (debtorNumRef.current) debtorNumRef.current.textContent = '0';
      if (vatDaysRef.current) vatDaysRef.current.textContent = '0';
      if (runwayBarRef.current) runwayBarRef.current.style.width = '0%';
    };

    setChaosState();

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });

    // ── 0.0–0.8s — chaos idle (gentle drift) ──────────────────────────────────
    // Add a small floating wobble to all carriers without losing their chaos pose
    allCarriers.forEach((el, i) => {
      const baseX = parseFloat(el.dataset.chaosX || '0');
      const baseY = parseFloat(el.dataset.chaosY || '0');
      const baseR = parseFloat(el.dataset.chaosRot || '0');
      tl.to(el, {
        x: baseX + (i % 2 ? 6 : -6),
        y: baseY + (i % 3 ? -5 : 5),
        rotation: baseR + (i % 2 ? 2 : -2),
        duration: 0.8,
        ease: 'sine.inOut',
      }, 0);
    });

    // Ambient blobs pulse
    tl.to(ambient, { opacity: 0.55, scale: 1.08, duration: 0.8, ease: 'sine.inOut' }, 0);

    // ── 0.8–2.0s — converge (carriers glide to tile positions, scale up, derotate) ──
    tl.to(allCarriers, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 1.2,
      ease: 'expo.inOut',
      stagger: { each: 0.04, from: 'random' },
    }, 0.8);

    // Brief motion blur peaking mid-converge
    tl.to(allCarriers, {
      filter: 'blur(2.5px)',
      duration: 0.5,
      ease: 'power1.out',
    }, 0.8);
    tl.to(allCarriers, {
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'power2.in',
    }, 1.5);

    // Ambient blobs dissolve
    tl.to(ambient, { opacity: 0, scale: 0.4, duration: 0.9, ease: 'power2.in' }, 0.9);

    // ── 2.0–3.0s — morph (crossfade faces, count numbers up) ──────────────────
    tl.to(chaosFaces, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.in',
      stagger: 0.03,
    }, 1.8);

    tl.to(tileFaces, {
      opacity: 1,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.04,
    }, 2.0);

    tl.to(counter, {
      cash: 4.2,
      debtor: 32,
      vatDays: dates.vatDays,
      duration: 0.9,
      ease: 'power2.out',
      onUpdate: () => {
        if (cashNumRef.current) cashNumRef.current.textContent = counter.cash.toFixed(1);
        if (debtorNumRef.current) debtorNumRef.current.textContent = Math.round(counter.debtor).toString();
        if (vatDaysRef.current) vatDaysRef.current.textContent = Math.round(counter.vatDays).toString();
      },
    }, 2.0);

    // Cash runway progress bar fills during morph
    tl.to(runwayBarRef.current, {
      width: '35%',
      duration: 0.9,
      ease: 'power2.out',
    }, 2.1);

    // Header fades in slightly before tiles settle
    tl.to(header, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, 2.4);

    // ── 3.0–3.5s — settle (cyan glow ripple, strip checkmarks pop) ────────────
    tl.to(tileCarriers, {
      boxShadow: '0 0 0 1px color-mix(in oklch, var(--brand-cyan) 35%, transparent), 0 10px 30px -10px color-mix(in oklch, var(--brand-cyan) 30%, transparent)',
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.08,
    }, 3.0);
    tl.to(tileCarriers, {
      boxShadow: '0 0 0 0px transparent, 0 0 0 0 transparent',
      duration: 0.6,
      ease: 'power2.in',
      stagger: 0.08,
    }, 3.3);

    tl.to(stripWrap, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 3.0);

    // ── 3.5–10.5s — hold ────────────────────────────────────────────────────────
    tl.to({}, { duration: 7 }, 3.5);

    // ── 10.5–11.5s — return to chaos ────────────────────────────────────────────
    tl.to(header, { opacity: 0, y: -8, duration: 0.5, ease: 'power2.in' }, 10.5);
    tl.to(stripWrap, { opacity: 0, duration: 0.5, ease: 'power2.in' }, 10.5);
    tl.to(tileFaces, { opacity: 0, duration: 0.6, ease: 'power2.in', stagger: 0.02 }, 10.6);
    tl.to(chaosFaces, { opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.02 }, 10.8);
    allCarriers.forEach((el) => {
      const x = parseFloat(el.dataset.chaosX || '0');
      const y = parseFloat(el.dataset.chaosY || '0');
      const r = parseFloat(el.dataset.chaosRot || '0');
      tl.to(el, {
        x, y, rotation: r, scale: 0.6,
        duration: 1.0,
        ease: 'power2.inOut',
      }, 10.6);
    });
    tl.to(ambient, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 10.8);

    // ── 11.5–12.0s — pre-loop chaos breath ──────────────────────────────────────
    tl.to({}, { duration: 0.5 }, 11.5);

    // ── IntersectionObserver: pause when off-screen, resume when on-screen ────
    const container = containerRef.current;
    let io: IntersectionObserver | null = null;
    if (container && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) tl.play();
          else tl.pause();
        }
      }, { threshold: 0.15 });
      io.observe(container);
    }

    // Pause when document is hidden
    const onVis = () => (document.hidden ? tl.pause() : tl.play());
    document.addEventListener('visibilitychange', onVis);

    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      tl.kill();
    };
  }, { scope: containerRef, dependencies: [skipAnimation] });

  return (
    <div
      ref={containerRef}
      className="fcc-container relative rounded-2xl border border-border bg-card shadow-2xl p-5 overflow-hidden"
    >
      {/* Ambient cyan/green wash to subtly tint the stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(circle at 30% 20%, color-mix(in oklch, var(--brand-cyan) 6%, transparent), transparent 55%), radial-gradient(circle at 80% 80%, color-mix(in oklch, var(--primary) 5%, transparent), transparent 60%)',
        }}
      />

      {/* Header */}
      <div className="fcc-header relative z-20 flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-semibold tracking-tight">Finance Command Centre</div>
          <div className="text-xs mt-0.5 text-muted-foreground" suppressHydrationWarning>
            {dates.closeMonth} close complete. All filings on track.
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
          style={{ background: 'color-mix(in oklch, var(--brand-cyan) 14%, transparent)', color: 'var(--brand-cyan)' }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--brand-cyan)', boxShadow: '0 0 6px var(--brand-cyan)' }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          Live
        </div>
      </div>

      {/* Stage: holds all carriers + ambient blobs, fixed aspect ratio for predictable animation */}
      <div
        ref={stageRef}
        className="fcc-stage relative z-10"
        style={{ aspectRatio: '1.18 / 1' }}
      >
        {/* Ambient chaos blobs (decorative, dissolve during morph) */}
        {CHAOS_BLOBS.map((b) => (
          <div
            key={b.id}
            className="chaos-blob absolute pointer-events-none rounded-full"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              background: b.color,
              filter: 'blur(28px)',
            }}
          />
        ))}

        {/* Tile carriers (4 hero metrics) */}
        {TILE_CARRIERS.map((c) => (
          <div
            key={c.id}
            data-carrier="tile"
            data-chaos-x={c.chaos.x}
            data-chaos-y={c.chaos.y}
            data-chaos-rot={c.chaos.rot}
            className="fcc-tile absolute"
            style={{
              left: c.tile.left,
              top: c.tile.top,
              width: c.tile.width,
              height: c.tile.height,
            }}
          >
            <TileFace
              id={c.id}
              dates={dates}
              cashNumRef={cashNumRef}
              debtorNumRef={debtorNumRef}
              vatDaysRef={vatDaysRef}
              runwayBarRef={runwayBarRef}
              skipAnimation={skipAnimation}
            />
            {!skipAnimation && <ChaosFaceTile id={c.id} />}
          </div>
        ))}

        {/* Strip carriers (3 compliance pills) */}
        {STRIP_CARRIERS.map((c) => (
          <div
            key={c.id}
            data-carrier="strip"
            data-chaos-x={c.chaos.x}
            data-chaos-y={c.chaos.y}
            data-chaos-rot={c.chaos.rot}
            className="fcc-strip-item absolute"
            style={{
              left: c.tile.left,
              top: c.tile.top,
              width: c.tile.width,
              height: c.tile.height,
            }}
          >
            <StripPillFace id={c.id} />
            {!skipAnimation && <ChaosFaceStrip id={c.id} />}
          </div>
        ))}

        {/* Strip wrapper for unified fade-in (visual grouping) */}
        <div className="fcc-strip-wrap pointer-events-none absolute inset-x-0 bottom-0 h-[14%]" aria-hidden />
      </div>
    </div>
  );
}

// ── Tile (order) faces ────────────────────────────────────────────────────────────

type TileFaceProps = {
  id: TileCarrier['id'];
  dates: DashboardDates;
  cashNumRef: React.RefObject<HTMLSpanElement | null>;
  debtorNumRef: React.RefObject<HTMLSpanElement | null>;
  vatDaysRef: React.RefObject<HTMLSpanElement | null>;
  runwayBarRef: React.RefObject<HTMLDivElement | null>;
  skipAnimation: boolean;
};

function TileFace({
  id,
  dates,
  cashNumRef,
  debtorNumRef,
  vatDaysRef,
  runwayBarRef,
  skipAnimation
}: TileFaceProps) {
  // When animation is skipped, render numbers at their final values
  return (
    <div className="tile-face absolute inset-0 rounded-xl border border-border bg-card/95 p-3 flex flex-col justify-between">
      {id === 'cash' && (
        <>
          <div className="tile-label">Cash Runway</div>
          <div className="flex items-baseline gap-1.5">
            <span ref={cashNumRef} className="font-mono font-semibold text-2xl leading-none tabular-nums" style={{ color: 'var(--brand-cyan)' }} suppressHydrationWarning>
              {skipAnimation ? '4.2' : '0.0'}
            </span>
            <span className="text-xs text-muted-foreground">months</span>
          </div>
          <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              ref={runwayBarRef}
              className="h-full rounded-full"
              style={{
                width: skipAnimation ? '35%' : '0%',
                background: 'linear-gradient(to right, var(--brand-cyan), var(--primary))',
              }}
            />
          </div>
          <div className="tile-foot">Watch · 6-month target</div>
        </>
      )}

      {id === 'vat' && (
        <>
          <div className="tile-label">VAT Due</div>
          <div className="font-mono font-semibold text-lg leading-none" suppressHydrationWarning>{dates.vatDateStr}</div>
          <div className="flex items-center gap-1.5">
            <AlertCircle className="h-3 w-3 shrink-0" style={{ color: 'var(--primary)' }} />
            <span className="text-[11px] font-medium" style={{ color: 'var(--primary)' }}>
              <span ref={vatDaysRef} className="tabular-nums" suppressHydrationWarning>
                {skipAnimation ? String(dates.vatDays) : '0'}
              </span> days · prepared
            </span>
          </div>
          <div className="tile-foot">Reviewed and ready</div>
        </>
      )}

      {id === 'debtor' && (
        <>
          <div className="tile-label">Debtor Days</div>
          <div className="flex items-baseline gap-1.5">
            <span ref={debtorNumRef} className="font-mono font-semibold text-2xl leading-none tabular-nums">
              {skipAnimation ? '32' : '0'}
            </span>
            <span className="text-xs text-muted-foreground">days</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingDown className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--primary)' }} />
            <span className="text-[11px] font-medium" style={{ color: 'var(--primary)' }}>
              −4 vs last month
            </span>
          </div>
          <div className="tile-foot">Collections improving</div>
        </>
      )}

      {id === 'close' && (
        <>
          <div className="tile-label">Monthly Close</div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: 'var(--primary)' }} />
            <span className="font-mono font-semibold text-lg leading-none" suppressHydrationWarning>
              {dates.closeMonth}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">Senior sign-off</span>
          </div>
          <div className="tile-foot">Books reconciled</div>
        </>
      )}
    </div>
  );
}

function StripPillFace({ id }: { id: StripCarrier['id'] }) {
  const label = id === 'prov-tax' ? 'Provisional Tax' : id === 'emp201' ? 'EMP201' : 'CIPC Annual Return';
  return (
    <div className="tile-face absolute inset-0 rounded-full border border-border bg-card/95 flex items-center justify-center gap-1.5 px-2">
      <CheckCircle2 className="h-3 w-3 shrink-0" style={{ color: 'var(--primary)' }} />
      <span className="text-[11px] font-medium truncate">{label}</span>
    </div>
  );
}

// ── Chaos faces ────────────────────────────────────────────────────────────────────

function ChaosFaceTile({ id }: { id: TileCarrier['id'] }) {
  const map = {
    cash:   { Icon: ScrollText,        title: 'Bank_Statement', detail: 'Unreconciled · R 412k', badge: 'PENDING',  color: '#f59e0b' },
    vat:    { Icon: FileSpreadsheet,   title: 'VAT201_draft',   detail: '3 errors · totals off', badge: 'FAILED',   color: '#ef4444' },
    debtor: { Icon: FileText,          title: 'AgedDebt_Apr',   detail: '6 overdue · R 28k',     badge: 'OVERDUE',  color: '#ef4444' },
    close:  { Icon: FileWarning,       title: 'GL_Journals',    detail: '8 unposted entries',    badge: 'BLOCKED',  color: '#ef4444' },
  } as const;
  const m = map[id];
  return (
    <div
      className="chaos-face absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-background/75 backdrop-blur-md rounded-lg px-2 py-1.5 shadow-xl"
      style={{
        width: 160,
        border: `1px solid ${m.color}55`,
      }}
    >
      <div className="p-1 rounded-md" style={{ background: `${m.color}1f`, color: m.color }}>
        <m.Icon className="w-3.5 h-3.5" />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[10px] font-semibold tracking-tight text-white/90 leading-tight truncate">
          {m.title}
        </span>
        <span className="text-[9px] text-white/55 leading-tight truncate">
          {m.detail}
        </span>
      </div>
      <span
        className="text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded shrink-0"
        style={{ background: `${m.color}25`, color: m.color }}
      >
        {m.badge}
      </span>
    </div>
  );
}

function ChaosFaceStrip({ id }: { id: StripCarrier['id'] }) {
  const map = {
    'prov-tax': { label: 'PROV TAX', status: 'DUE' },
    'emp201':   { label: 'EMP201',   status: 'LATE' },
    'cipc':     { label: 'CIPC',     status: 'UNFILED' },
  } as const;
  const m = map[id];
  return (
    <div
      className="chaos-face absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-background/75 backdrop-blur-md rounded-full px-2 py-1 shadow-xl"
      style={{
        width: 130,
        border: '1px solid rgba(239,68,68,0.4)',
      }}
    >
      <AlertCircle className="h-3 w-3 shrink-0" style={{ color: '#ef4444' }} />
      <span className="text-[9px] font-bold uppercase tracking-wider text-white/90 truncate flex-1">
        {m.label}
      </span>
      <span
        className="text-[8px] font-bold uppercase tracking-wider px-1 rounded shrink-0"
        style={{ background: 'rgba(239,68,68,0.22)', color: '#ef4444' }}
      >
        {m.status}
      </span>
    </div>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────────

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const headline = 'Make your finance function work harder';

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 639px)').matches;
    const shouldSkip = reducedMotion || isMobile;
    
    // Only update if different from default to avoid cascading render warning
    if (shouldSkip) {
      setTimeout(() => setSkipAnimation(true), 0);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-24 lg:pt-28 pb-28 lg:pb-40"
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
          </div>

          {/* Dashboard */}
          <div className="relative w-full max-w-[540px] mx-auto lg:mx-0 lg:ml-auto">
            <FinanceCommandCentre skipAnimation={skipAnimation} />
          </div>
        </div>
      </div>
    </section>
  );
}
