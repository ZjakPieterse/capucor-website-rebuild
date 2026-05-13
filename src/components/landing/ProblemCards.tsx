'use client';

import { useState, useRef } from 'react';
import { 
  BookOpen, AlertCircle, Unplug, Clock, CheckCircle2, 
  CalendarCheck, Link2, Zap, ArrowRight 
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const PROBLEMS = [
  {
    icon: BookOpen,
    title: 'Messy, outdated books',
    body: "It's the 15th. The bank wants management accounts for a review. You're categorising 400 bank lines by hand. The weekend is gone.",
    solution: {
      icon: CheckCircle2,
      title: 'Current books. Clear answers.',
      body: 'By day 7 the month is closed. When the bank asks for numbers, you pull a clean reconciled report in 30 seconds. The weekend stays yours.',
      color: '#4ade80'
    },
    color: '#ef4444'
  },
  {
    icon: AlertCircle,
    title: 'Deadline pressure',
    body: "A SARS penalty letter arrives for a missed EMP201. You thought it was filed. It wasn't. Now you're paying for a mistake that wasn't yours.",
    solution: {
      icon: CalendarCheck,
      title: 'Deadlines that don’t fail.',
      body: 'EMP201, VAT and CIPC sit on a workflow with named owners and review dates. Filed on time, every cycle. No more penalty letters.',
      color: '#22d3ee'
    },
    color: '#f59e0b'
  },
  {
    icon: Unplug,
    title: 'Disconnected tools',
    body: "You check the bank for cash, a spreadsheet for payroll, and email for invoices. None of it agrees. You can't get a straight answer.",
    solution: {
      icon: Link2,
      title: 'One source of truth.',
      body: 'Receipts flow into Xero automatically. Payroll connects through. You see one true cash position, not three approximations.',
      color: '#a78bfa'
    },
    color: '#ef4444'
  },
  {
    icon: Clock,
    title: 'Too much owner input',
    body: "You spend 15 hours a month chasing slips and answering basic finance questions. The work doesn't stop. The growth does.",
    solution: {
      icon: Zap,
      title: 'A rhythm that runs without you.',
      body: 'You upload what we ask for. We run the month. You only focus on the decisions that actually need an owner in the seat.',
      color: '#fb923c'
    },
    color: '#f59e0b'
  },
];

export function ProblemCards() {
  const [isResolved, setIsResolved] = useState(false);

  return (
    <section className="relative py-24 lg:py-40 bg-[#060a14] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[160px] rounded-full transition-all duration-1000",
            isResolved ? "bg-emerald-500/10" : "bg-red-500/5"
          )}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <SectionHeading
            eyebrow="The Reality"
            title={isResolved ? "Transforming Chaos into Control" : "The cost of a reactive finance function"}
            subtitle="Most businesses outgrow their accounting early. We help you move from reactive scrambling to proactive growth."
            align="left"
          />
        </div>

        {/* Tactile Toggle */}
        <div className="flex justify-start mb-16">
          <div className="inline-flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setIsResolved(false)}
              className={cn(
                "relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-500",
                !isResolved ? "text-white" : "text-white/40 hover:text-white/60"
              )}
            >
              {!isResolved && (
                <motion.div 
                  layoutId="activeToggle"
                  className="absolute inset-0 bg-red-500/20 border border-red-500/30 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Without Capucor</span>
            </button>
            <button
              onClick={() => setIsResolved(true)}
              className={cn(
                "relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-500",
                isResolved ? "text-white" : "text-white/40 hover:text-white/60"
              )}
            >
              {isResolved && (
                <motion.div 
                  layoutId="activeToggle"
                  className="absolute inset-0 bg-emerald-500/20 border border-emerald-500/30 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">With Capucor</span>
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROBLEMS.map((item, i) => (
            <TiltCard 
              key={i} 
              item={item} 
              isResolved={isResolved} 
              index={i} 
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex justify-center lg:justify-start"
        >
          <Link
            href="#how-it-works"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-all"
          >
            See how the monthly system works
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TiltCard({ item, isResolved, index }: { item: (typeof PROBLEMS)[0]; isResolved: boolean; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(0);
  const [glowY, setGlowY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotX);
    setRotateY(rotY);
    setGlowX(x);
    setGlowY(y);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transition: "rotate 0.1s ease-out",
      }}
      className="relative group h-full"
    >
      <div 
        className={cn(
          "h-full p-8 rounded-[32px] border transition-all duration-700 bg-[#070c1a]/80 backdrop-blur-3xl flex flex-col overflow-hidden",
          isResolved ? "border-white/10 group-hover:border-emerald-500/30" : "border-white/10 group-hover:border-red-500/30"
        )}
      >
        {/* Cursor tracking glow */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowX}px ${glowY}px, ${isResolved ? 'rgba(74, 222, 128, 0.08)' : 'rgba(239, 68, 68, 0.05)'} 0%, transparent 70%)`
          }}
        />

        <AnimatePresence mode="wait">
          {!isResolved ? (
            <motion.div
              key="problem"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col h-full"
            >
              <div className="mb-6 flex items-center justify-between">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-500/10 border border-red-500/20"
                >
                  <item.icon className="w-6 h-6 text-red-500 animate-pulse" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-red-500/60">Reality</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed leading-6">{item.body}</p>
            </motion.div>
          ) : (
            <motion.div
              key="solution"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col h-full"
            >
              <div className="mb-6 flex items-center justify-between">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${item.solution.color}15`, border: `1px solid ${item.solution.color}33` }}
                >
                  <item.solution.icon className="w-6 h-6" style={{ color: item.solution.color }} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: item.solution.color }}>Solution</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{item.solution.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed leading-6">{item.solution.body}</p>
              
              <div className="mt-auto pt-6">
                <div 
                  className="h-1 rounded-full w-full"
                  style={{ backgroundColor: `${item.solution.color}10` }}
                >
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.solution.color }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
