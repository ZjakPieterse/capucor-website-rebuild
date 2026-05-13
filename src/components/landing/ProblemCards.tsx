'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, AlertCircle, Unplug, Clock, CheckCircle2, CalendarCheck, Link2, Zap, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const PROBLEMS = [
  {
    icon: BookOpen,
    title: 'Messy, outdated books',
    body: "It's the 15th. The bank wants management accounts for a facility review. You're categorising 400 bank lines by hand, guessing what half the receipts are for. The weekend is gone.",
    solution: {
      icon: CheckCircle2,
      title: 'Current books. Clear answers.',
      body: 'By day 7 the month is closed. When the bank asks for numbers, you pull a clean reconciled report in under 30 seconds. The weekend stays yours.',
    },
  },
  {
    icon: AlertCircle,
    title: 'Deadline pressure',
    body: "SARS sends a penalty for a missed EMP201. You thought it was being filed. It wasn't. Now you're paying for a mistake that should never have reached your desk.",
    solution: {
      icon: CalendarCheck,
      title: 'Deadlines that don’t depend on memory.',
      body: 'EMP201, VAT201, provisional tax and CIPC sit on a workflow with named owners and review dates. Filed on time, every cycle. No penalty letters.',
    },
  },
  {
    icon: Unplug,
    title: 'Disconnected tools',
    body: "You check the bank app for cash, a spreadsheet for payroll, email threads for invoices. None of it agrees. You can't get a straight answer about your own business.",
    solution: {
      icon: Link2,
      title: 'One ledger, one source of truth.',
      body: 'Receipts flow into Xero automatically. Payroll connects through. You see one true cash position, not three approximations.',
    },
  },
  {
    icon: Clock,
    title: 'Too much owner involvement',
    body: "You spend 15 hours a month chasing slips, approving small payments, answering basic finance questions. The work doesn't stop. The growth does.",
    solution: {
      icon: Zap,
      title: 'A finance rhythm that runs without you.',
      body: 'You upload what we ask for. We run the month. You only see the decisions that need an owner in the seat.',
    },
  },
];

export function ProblemCards() {
  const [isResolved, setIsResolved] = useState(false);

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="The reality"
            title="Your business has outgrown its finance function"
            subtitle="Late submissions, unclear numbers, reactive accounting. While you focus on growth, the books fall behind."
          />
        </ScrollReveal>

        {/* The Toggle */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center mt-8 mb-12">
            <div className="inline-flex items-center p-1.5 rounded-full bg-input/20 border border-border">
              <button
                onClick={() => setIsResolved(false)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                  !isResolved ? "bg-destructive text-destructive-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Without Capucor
              </button>
              <button
                onClick={() => setIsResolved(true)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                  isResolved ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                )}
              >
                With Capucor
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[280px]">
          {PROBLEMS.map((item, i) => (
            <div key={item.title} className="h-full" style={{ perspective: '1000px' }}>
              <ScrollReveal delay={i * 0.08} className="h-full">
                <div 
                  className={cn(
                    "problem-card h-full rounded-xl border p-6 flex flex-col transition-colors duration-500",
                    isResolved ? "border-primary/30 bg-card shadow-[0_0_20px_rgba(46,216,137,0.05)]" : "border-destructive/30 bg-destructive/5"
                  )}
                >
                <AnimatePresence mode="wait">
                  {!isResolved ? (
                    <motion.div
                      key="problem"
                      initial={{ opacity: 0, rotateX: 90 }}
                      animate={{ opacity: 1, rotateX: 0 }}
                      exit={{ opacity: 0, rotateX: -90 }}
                      transition={{ duration: 0.4, ease: "backOut" }}
                      className="flex-1 origin-center"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                          <item.icon className="h-5 w-5 text-destructive animate-pulse" />
                        </div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-destructive/80">
                          The Problem
                        </div>
                      </div>
                      <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="solution"
                      initial={{ opacity: 0, rotateX: 90 }}
                      animate={{ opacity: 1, rotateX: 0 }}
                      exit={{ opacity: 0, rotateX: -90 }}
                      transition={{ duration: 0.4, ease: "backOut" }}
                      className="flex-1 origin-center"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <item.solution.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                          Capucor Solution
                        </div>
                      </div>
                      <h3 className="text-base font-semibold mb-2">{item.solution.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.solution.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              See how the monthly system works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
