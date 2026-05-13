'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Inbox, Cog, BarChart2, MessageSquare, ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/config/site';
import { MagneticButton } from '@/components/ui/MagneticButton';
import Link from 'next/link';

const STEPS = [
  {
    icon: Inbox,
    number: '01',
    title: 'Collect & Collaborate',
    body: 'We make the monthly admin clear and repeatable. No more missing invoices or last-minute scrambles. Everything has a home and a deadline.',
    deliverable: 'VAT201, EMP201, and provisional tax deadlines tracked through a structured digital workflow.',
    accent: '#22d3ee',
  },
  {
    icon: Cog,
    number: '02',
    title: 'Process & Reconcile',
    body: 'We capture, code, and reconcile every transaction in Xero. Bank feeds, supplier invoices, and payroll are aligned daily to ensure decision-ready data.',
    deliverable: 'A clean, reconciled Xero ledger that is always audit-ready and funder-compliant.',
    accent: '#4ade80',
  },
  {
    icon: BarChart2,
    number: '03',
    title: 'Review & Report',
    body: 'Senior oversight is built-in. You receive a clear monthly report showing performance, cash flow, and debtors before we even talk.',
    deliverable: 'A premium PDF reporting pack showing revenue, expenses, cash flow, and key business health metrics.',
    accent: '#a78bfa',
  },
  {
    icon: MessageSquare,
    number: '04',
    title: 'Advise & Plan',
    body: 'We turn the reports into useful business conversation. We talk about tax timing, cash pressure, and practical next steps to grow your business.',
    deliverable: 'A scheduled monthly strategy session to act on risks and opportunities while they still matter.',
    accent: '#fb923c',
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative py-24 lg:py-40 bg-[#060a14] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20 lg:mb-32">
          <SectionHeading
            eyebrow="The Monthly Rhythm"
            title="Finance work that finally feels organized"
            subtitle="Great finance work is a process, not a project. We provide the rhythm so you can provide the vision."
            align="left"
          />
        </div>

        <div className="relative grid lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-24">
          {/* Left Side: Decorative imagery/status */}
          <div className="hidden lg:block relative">
             <div className="sticky top-1/3">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-3xl"
                >
                   <div className="text-emerald-400 font-mono text-sm mb-4 uppercase tracking-widest">Status Update</div>
                   <h4 className="text-xl font-bold text-white mb-2">Systems Operational</h4>
                   <p className="text-white/40 text-sm leading-relaxed">
                     Your finance function is now running on a set monthly cadence. Deadlines are met automatically, and data is flowing into your dashboard in real-time.
                   </p>
                   <div className="mt-6 flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-[#060a14] bg-emerald-500/20" />
                        ))}
                      </div>
                      <span className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">Verified by Senior Accountants</span>
                   </div>
                </motion.div>
             </div>
          </div>

          {/* Center Line (The Laser Line) */}
          <div className="relative flex flex-col items-center">
            <div className="absolute top-0 bottom-0 w-px bg-white/10" />
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-emerald-400 to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            />
            <div className="flex flex-col gap-[30vh] lg:gap-[40vh] py-12">
              {STEPS.map((step, i) => (
                <StepNode key={i} step={step} index={i} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>

          {/* Right Side: Step Content */}
          <div className="flex flex-col gap-[30vh] lg:gap-[40vh] py-12">
            {STEPS.map((step, i) => (
              <StepContent key={i} step={step} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* Final CTA Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 lg:mt-48 p-12 rounded-[40px] bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-white/10 backdrop-blur-2xl text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Ready to put this rhythm to work?</h3>
          <p className="text-white/50 mb-10 max-w-xl mx-auto">
            Take the first step toward a professional finance team. Build your monthly subscription or book a call with us today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-8 py-4 text-sm font-bold hover:bg-white/90 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
              >
                Build your subscription
                <ArrowRight className="h-4 w-4" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a
                href={siteConfig.links.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white hover:bg-white/10 transition-all"
              >
                <Calendar className="h-4 w-4" />
                Book a fit call
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StepNode({ step, index, scrollYProgress }: { step: any; index: number; scrollYProgress: any }) {
  const threshold = index / (STEPS.length - 1);
  const isActive = useTransform(scrollYProgress, [threshold - 0.1, threshold, threshold + 0.1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [threshold - 0.1, threshold, threshold + 0.1], [0.8, 1.2, 0.8]);
  
  return (
    <motion.div
      style={{ opacity: isActive, scale }}
      className="relative z-20 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#060a14] border-2 border-white/20 flex items-center justify-center shadow-2xl"
    >
      <div 
        className="absolute inset-0 rounded-full blur-md opacity-50"
        style={{ backgroundColor: step.accent }}
      />
      <step.icon className="w-5 h-5 lg:w-7 lg:h-7 text-white relative z-10" />
      <div className="absolute -left-12 lg:-left-16 text-white/20 font-mono font-bold text-sm lg:text-base">
        {step.number}
      </div>
    </motion.div>
  );
}

function StepContent({ step, index, scrollYProgress }: { step: any; index: number; scrollYProgress: any }) {
  const threshold = index / (STEPS.length - 1);
  const opacity = useTransform(scrollYProgress, [threshold - 0.15, threshold, threshold + 0.15], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [threshold - 0.15, threshold, threshold + 0.15], [20, 0, -20]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="max-w-md"
    >
      <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4 lg:mb-6 tracking-tight">
        {step.title}
      </h3>
      <p className="text-white/50 text-base lg:text-lg leading-relaxed mb-8">
        {step.body}
      </p>
      
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
        <div 
          className="absolute top-0 left-0 w-1 h-full"
          style={{ backgroundColor: step.accent }}
        />
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: step.accent }} />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Monthly Outcome</div>
            <p className="text-sm lg:text-base text-white/80 font-medium">
              {step.deliverable}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
