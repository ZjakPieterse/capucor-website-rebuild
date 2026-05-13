'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { Landmark, ReceiptText, ClipboardCheck, FileBarChart, ScrollText } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const DAY_STOPS = [
  {
    day: 1,
    icon: Landmark,
    title: 'Bank Reconciliation',
    body: 'The month starts with a clean slate. Bank feeds are pulled, transactions are classified, and your ledger is aligned. No backlog, no guessing.',
    accent: '#22d3ee',
  },
  {
    day: 7,
    icon: ReceiptText,
    title: 'Compliance Filing',
    body: 'Payroll is closed and approved. EMP201 is calculated, submitted, and paid. We handle the SARS deadline so you don\'t have to remember it.',
    accent: '#4ade80',
  },
  {
    day: 15,
    icon: ClipboardCheck,
    title: 'Senior Sign-off',
    body: 'A SAICA-registered AGA(SA) accountant reviews your books. You receive a management pack showing performance, cash flow, and debtors.',
    accent: '#a78bfa',
  },
  {
    day: 25,
    icon: FileBarChart,
    title: 'VAT Submission',
    body: 'VAT is calculated directly from your reconciled ledger. No piles of slips. You see the final figure, we file the confirmation.',
    accent: '#fb923c',
  },
  {
    day: 30,
    icon: ScrollText,
    title: 'Strategic Close',
    body: 'The month closes with a conversation. We discuss planning points, tax timing, and risks for the next 60 days. You stay in control.',
    accent: '#f472b6',
  },
];

export function OutcomeStories() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate active index based on scroll
  scrollYProgress.on('change', (v) => {
    const idx = Math.min(DAY_STOPS.length - 1, Math.floor(v * DAY_STOPS.length));
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  return (
    <section ref={containerRef} className="relative bg-[#060a14] min-h-[400vh]">
      {/* Sticky Content */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] blur-[160px] opacity-20 transition-all duration-1000"
            style={{ backgroundColor: DAY_STOPS[activeIndex].accent }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left: The Narrative */}
            <div>
              <SectionHeading
                eyebrow="Rhythm of the month"
                title="When the month closes, you stay in control"
                subtitle="Most accountants surface once a year. We work to the month, every month."
                align="left"
              />

              <div className="mt-12 space-y-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div 
                      className="inline-flex h-16 w-16 items-center justify-center rounded-3xl mb-8 bg-white/5 border border-white/10 shadow-2xl"
                      style={{ color: DAY_STOPS[activeIndex].accent }}
                    >
                      {(() => {
                        const Icon = DAY_STOPS[activeIndex].icon;
                        return <Icon className="w-8 h-8" />;
                      })()}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-5xl font-bold text-white/10">Day {DAY_STOPS[activeIndex].day}</span>
                      <div className="h-px flex-1 bg-white/5" />
                    </div>
                    
                    <h3 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                      {DAY_STOPS[activeIndex].title}
                    </h3>
                    <p className="text-white/50 text-lg lg:text-xl leading-relaxed max-w-lg">
                      {DAY_STOPS[activeIndex].body}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-2">
                  {DAY_STOPS.map((_, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        i === activeIndex ? "w-12 bg-white" : "w-2 bg-white/10"
                      )}
                      style={i === activeIndex ? { backgroundColor: DAY_STOPS[i].accent } : {}}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: The High-Fidelity Calendar Visual */}
            <div className="relative">
               <motion.div 
                 className="relative aspect-square max-w-[500px] mx-auto bg-[#070c1a]/50 backdrop-blur-3xl rounded-[48px] border border-white/10 p-8 shadow-2xl overflow-hidden"
                 initial={{ rotateY: 10, rotateX: 10 }}
                 animate={{ rotateY: 0, rotateX: 0 }}
                 transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
               >
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-3 h-full">
                    {Array.from({ length: 30 }).map((_, i) => {
                      const dayNum = i + 1;
                      const stop = DAY_STOPS.find(s => s.day === dayNum);
                      const isCurrentStop = stop && DAY_STOPS.indexOf(stop) === activeIndex;
                      const isPastStop = stop && DAY_STOPS.indexOf(stop) < activeIndex;
                      
                      return (
                        <div 
                          key={i}
                          className={cn(
                            "relative aspect-square rounded-xl border flex items-center justify-center text-[10px] font-mono transition-all duration-700",
                            isCurrentStop 
                              ? "bg-white border-white scale-110 shadow-[0_0_30px_rgba(255,255,255,0.3)] z-20" 
                              : isPastStop
                                ? "bg-white/20 border-white/20 text-white/40"
                                : "bg-white/5 border-white/5 text-white/10"
                          )}
                          style={isCurrentStop ? { backgroundColor: stop.accent, borderColor: stop.accent, color: '#060a14' } : {}}
                        >
                           {dayNum}
                           {stop && !isCurrentStop && (
                             <div 
                               className="absolute -top-1 -right-1 w-2 h-2 rounded-full" 
                               style={{ backgroundColor: stop.accent }}
                             />
                           )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Glass overlays */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070c1a] via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Metric Card */}
                  <AnimatePresence>
                     <motion.div 
                       key={activeIndex}
                       initial={{ opacity: 0, y: 40, scale: 0.9 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: -40, scale: 0.9 }}
                       className="absolute bottom-10 left-10 right-10 p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-3xl shadow-2xl"
                     >
                        <div className="flex items-center gap-4">
                           <div 
                             className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10"
                             style={{ color: DAY_STOPS[activeIndex].accent }}
                           >
                              {(() => {
                                const Icon = DAY_STOPS[activeIndex].icon;
                                return <Icon className="w-5 h-5" />;
                              })()}
                           </div>
                           <div>
                              <div className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-0.5">Live Outcome</div>
                              <div className="text-sm font-bold text-white tracking-tight">{DAY_STOPS[activeIndex].title}</div>
                           </div>
                           <div className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-[9px] font-bold text-emerald-400">
                             <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                             FILED
                           </div>
                        </div>
                     </motion.div>
                  </AnimatePresence>
               </motion.div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
           <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">The Monthly Timeline</div>
           <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
