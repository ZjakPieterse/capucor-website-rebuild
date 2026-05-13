'use client';

import { useMemo, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, FileText, FolderCheck, Landmark, LineChart, ReceiptText, Users } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

const EASE = [0.2, 0, 0, 1] as const;

const SERVICES = [
  {
    icon: ReceiptText,
    title: 'Clear Compliance',
    pitch: 'Tax dates, SARS actions, CIPC status, and filing risk kept visible before they become founder drag.',
    metric: 'Tax',
    accent: '#2DD4BF',
    className: 'lg:col-span-6',
  },
  {
    icon: Users,
    title: 'Scale-Ready Payroll',
    pitch: 'PAYE, UIF, payslips, IRP5s, and employee changes locked into a clean monthly rhythm.',
    metric: 'Payroll',
    accent: '#2DD4BF',
    className: 'lg:col-span-6',
  },
  {
    icon: LineChart,
    title: 'Founder Advisory',
    pitch: 'Runway, margin, hiring, and capex translated into decision-grade operator math.',
    metric: 'Advisory',
    accent: '#2DD4BF',
    className: 'lg:col-span-6',
  },
  {
    icon: Landmark,
    title: 'Transaction Control',
    pitch: 'Monthly line items, reconciliations, receivables, and close status arranged for fast review.',
    metric: 'Transactions',
    accent: '#2DD4BF',
    className: 'lg:col-span-6',
  },
];

export function ServicePillars() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#050505] py-20 lg:py-28">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(45,212,191,0.08),transparent_28%),linear-gradient(180deg,#050505_0%,#0a0a0b_100%)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl lg:mb-14">
          <SectionHeading
            eyebrow="The Core"
            title="Four finance systems filed into order."
            subtitle="Compact, controlled, and built for founders who need precise numbers without another layer of noise."
            align="left"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {SERVICES.map((svc, index) => (
            <BentoTile key={svc.title} svc={svc} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md text-xs uppercase leading-6 tracking-[0.22em] text-white/32">
            Move from financial noise to operational clarity, then configure the correct monthly layer.
          </p>
          <MagneticButton activationRadius={30}>
            <Link
              href="#pricing"
              className="glow-button inline-flex items-center gap-2 rounded-full bg-[#2DD4BF] px-7 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-[#03100f] transition-all hover:bg-[#5eead4]"
            >
              Open Studio
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
  const x = useMotionValue(120);
  const y = useMotionValue(120);
  const springX = useSpring(x, { stiffness: 150, damping: 22, mass: 0.22 });
  const springY = useSpring(y, { stiffness: 150, damping: 22, mass: 0.22 });
  const [active, setActive] = useState(false);
  const [snapped, setSnapped] = useState(false);

  const target = useMemo(() => ({ x: 82, y: 78 }), []);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    const targetX = rect.width - target.x;
    const targetY = rect.height - target.y;
    const distance = Math.hypot(localX - targetX, localY - targetY);

    if (distance < 72) {
      setSnapped(true);
      x.set(targetX - 18);
      y.set(targetY - 24);
    } else {
      setSnapped(false);
      x.set(localX - 18);
      y.set(localY - 24);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setActive(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setActive(false);
        setSnapped(false);
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.09, duration: 0.72, ease: EASE }}
      className={cn(
        'group relative min-h-[290px] overflow-hidden rounded-[1.65rem] border border-white/[0.07] bg-white/[0.025] p-6 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-white/[0.14] sm:p-7',
        svc.className,
        snapped && 'shadow-[0_0_55px_rgba(45,212,191,0.16)]'
      )}
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.045),transparent_45%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-20 grid h-12 w-9 place-items-center rounded-[0.35rem] border border-white/15 bg-white/16 text-white/70 shadow-[0_16px_44px_rgba(0,0,0,0.28)] backdrop-blur-md"
        style={{ x: springX, y: springY }}
        initial={false}
        animate={{ opacity: active ? 1 : 0, rotate: snapped ? 0 : -7, scale: snapped ? 0.82 : 1 }}
        transition={{ duration: 0.28, ease: EASE }}
      >
        <FileText className="h-5 w-5" />
        <span className="absolute top-2 h-px w-4 bg-white/35" />
        <span className="absolute top-5 h-px w-5 bg-white/25" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-between gap-10">
        <div>
          <div className="mb-8 flex items-start justify-between gap-5">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.035]">
              <svc.icon className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/28">{svc.metric}</span>
          </div>
          <h3 className="font-heading text-3xl font-normal tracking-[-0.035em] text-white lg:text-4xl">{svc.title}</h3>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/43">{svc.pitch}</p>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
          <motion.div
            className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl border bg-white/[0.03]"
            animate={{
              borderColor: snapped ? 'rgba(45,212,191,0.75)' : 'rgba(255,255,255,0.10)',
              boxShadow: snapped ? '0 0 34px rgba(45,212,191,0.25)' : '0 0 0 rgba(45,212,191,0)',
            }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {snapped ? <Check className="h-6 w-6 text-[#2DD4BF]" /> : <FolderCheck className="h-6 w-6 text-white/35" />}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
