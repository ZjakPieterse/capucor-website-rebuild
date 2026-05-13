'use client';

import { useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart3, Landmark, LineChart, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

const SERVICES = [
  {
    icon: ShieldCheck,
    title: 'Tax Compliance',
    pitch: 'VAT, income tax, payroll tax, and filings tracked against a live control calendar.',
    metric: 'Deadline risk down',
    accent: '#22d3ee',
    className: 'lg:col-span-5 lg:min-h-[360px]',
    visual: 'shield',
  },
  {
    icon: Users,
    title: 'Payroll',
    pitch: 'Payslips, PAYE, UIF, IRP5s, and employee changes handled with a locked monthly cadence.',
    metric: 'Payroll locked',
    accent: '#2dd4bf',
    className: 'lg:col-span-3 lg:min-h-[360px]',
    visual: 'people',
  },
  {
    icon: LineChart,
    title: 'Strategic Advisory',
    pitch: 'Cash runway, margin pressure, hiring plans, and capex decisions translated into operator math.',
    metric: 'Growth signal live',
    accent: '#4ade80',
    className: 'lg:col-span-4 lg:row-span-2',
    visual: 'growth',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Reporting',
    pitch: 'One reporting layer for revenue, costs, receivables, tax exposure, and monthly close status.',
    metric: '24h decision data',
    accent: '#38bdf8',
    className: 'lg:col-span-8 lg:min-h-[330px]',
    visual: 'reporting',
  },
];

export function ServicePillars() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#07111f] py-24 lg:py-40">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_90%_60%,rgba(45,212,191,0.12),transparent_28%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl lg:mb-24">
          <SectionHeading
            eyebrow="The Solution"
            title="Four operating systems. One finance brain."
            subtitle="No bloated retainers. No generic checklist. Just the functions founders need to stay ahead of the numbers."
            align="left"
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-12 lg:auto-rows-fr">
          {SERVICES.map((svc, index) => (
            <BentoTile key={svc.title} svc={svc} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <div className="h-px w-24 bg-white/10" />
          <p className="text-sm font-medium text-white/35">Price the exact finance layer your company needs.</p>
          <MagneticButton>
            <Link
              href="#pricing"
              className="glow-button inline-flex items-center gap-2 rounded-2xl bg-cyan-200 px-8 py-4 text-sm font-black text-[#06111f] transition-all hover:bg-white"
            >
              Open pricing studio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

function BentoTile({ svc, index }: { svc: (typeof SERVICES)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group glass-tile relative overflow-hidden rounded-[2rem] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 sm:p-9',
        svc.className
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        animate={{
          background: `radial-gradient(520px circle at ${mousePos.x}px ${mousePos.y}px, ${svc.accent}24, transparent 42%)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between gap-10">
        <div>
          <div className="mb-8 flex items-start justify-between gap-6">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <svc.icon className="h-7 w-7" style={{ color: svc.accent }} />
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/35">
              {svc.metric}
            </span>
          </div>
          <h3 className="text-3xl font-black tracking-[-0.05em] text-white lg:text-4xl">{svc.title}</h3>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/45 sm:text-base">{svc.pitch}</p>
        </div>

        <TileVisual type={svc.visual} accent={svc.accent} />
      </div>
    </motion.div>
  );
}

function TileVisual({ type, accent }: { type: string; accent: string }) {
  if (type === 'shield') {
    return (
      <div className="relative h-28 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <motion.div
          className="absolute left-6 top-6 grid h-16 w-16 place-items-center rounded-2xl border bg-white/[0.04]"
          style={{ borderColor: `${accent}33` }}
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          <ShieldCheck className="h-8 w-8" style={{ color: accent }} />
        </motion.div>
        <motion.div className="absolute bottom-8 left-28 right-8 h-2 rounded-full bg-white/5" whileHover={{ scaleX: 1.04 }}>
          <motion.div className="h-full rounded-full" style={{ width: '78%', backgroundColor: accent }} />
        </motion.div>
      </div>
    );
  }

  if (type === 'growth') {
    return (
      <div className="relative h-48 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="absolute inset-x-5 bottom-5 flex h-28 items-end gap-3">
          {[35, 48, 42, 70, 84].map((height, index) => (
            <motion.div
              key={height}
              className="flex-1 rounded-t-xl bg-gradient-to-t from-emerald-500/25 to-emerald-300"
              initial={{ height: 18 }}
              whileInView={{ height }}
              whileHover={{ height: height + 10 }}
              transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
        <motion.div
          className="absolute right-6 top-6 h-4 w-4 rounded-full bg-emerald-300"
          animate={{ scale: [1, 1.8, 1], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  if (type === 'reporting') {
    return (
      <div className="grid grid-cols-3 gap-3">
        {['Revenue', 'Costs', 'Runway'].map((label, index) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-5 text-[10px] font-black uppercase tracking-widest text-white/30">{label}</div>
            <motion.div
              className="h-2 rounded-full"
              style={{ backgroundColor: accent }}
              initial={{ width: '30%' }}
              whileInView={{ width: `${62 + index * 11}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      {[0, 1, 2].map((item) => (
        <motion.div
          key={item}
          className="h-10 w-10 rounded-full border border-white/10 bg-white/[0.04]"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      <Landmark className="ml-auto h-7 w-7" style={{ color: accent }} />
    </div>
  );
}
