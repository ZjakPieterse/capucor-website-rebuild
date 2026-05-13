'use client';

import { useRef, useState } from 'react';
import { BarChart2, BookMarked, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/ui/MagneticButton';
import Link from 'next/link';

const SERVICES = [
  {
    icon: BarChart2,
    title: 'Tax & Compliance',
    pitch: 'Precision filing and strategic tax planning to keep you clean with SARS.',
    metric: '99.9% Compliance Rating',
    bullets: [
      'Corporate Income Tax',
      'VAT201 & EMP201 Submissions',
      'Provisional Tax Planning',
      'CIPC Annual Returns',
    ],
    accent: '#22d3ee',
    className: 'lg:col-span-2',
  },
  {
    icon: Users,
    title: 'Payroll',
    pitch: 'Accurate, confidential payroll that runs like clockwork.',
    metric: 'Zero Deadline Failures',
    bullets: [
      'Monthly Payslips',
      'UIF & PAYE Submissions',
      'COIDA Compliance',
      'IRP5 Generation',
    ],
    accent: '#4ade80',
    className: 'lg:col-span-1',
  },
  {
    icon: BookMarked,
    title: 'Strategic Advisory',
    pitch: 'Real-time management accounts and CFO-level insights for growth.',
    metric: 'Board-Ready Reporting',
    bullets: [
      'Xero Ledger Management',
      'Monthly Management Packs',
      'Cash Flow Forecasting',
      'Financial Strategy fit calls',
    ],
    accent: '#6366f1',
    className: 'lg:col-span-3',
  },
];

export function ServicePillars() {
  return (
    <section id="services" className="relative py-24 lg:py-40 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16 lg:mb-24">
          <SectionHeading
            eyebrow="The Capucor Flow"
            title="Sovereign Control. Minimal Input."
            subtitle="We've engineered the back-office complexity out of your business."
            align="left"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((svc, i) => (
            <BentoCard key={svc.title} svc={svc} index={i} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <div className="h-px w-24 bg-white/10" />
          <p className="text-white/30 text-sm font-medium">Ready to simplify your finance function?</p>
          <MagneticButton>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-black hover:bg-white/90 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
            >
              Build your subscription
              <ArrowRight className="h-4 w-4" />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

function BentoCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={cn(
        "group relative p-8 lg:p-10 rounded-[40px] bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20",
        svc.className
      )}
    >
      {/* Spotlight Effect */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${svc.accent}15, transparent 40%)`
        }}
      />

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-12">
          <div className="flex-1">
            <div 
              className="mb-6 w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
              style={{ backgroundColor: `${svc.accent}10`, borderColor: `${svc.accent}20` }}
            >
              <svc.icon className="w-7 h-7" style={{ color: svc.accent }} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3 tracking-tighter">{svc.title}</h3>
            <p className="text-white/50 text-base leading-relaxed max-w-md">{svc.pitch}</p>
          </div>

          <div className="shrink-0">
            <div 
              className="px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-white"
              style={{ color: svc.accent, borderColor: `${svc.accent}30` }}
            >
              {svc.metric}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4 mb-12">
          {svc.bullets.map((b) => (
            <div key={b} className="flex items-center gap-3 text-sm text-white/40 group-hover:text-white/70 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: svc.accent }} />
              {b}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
