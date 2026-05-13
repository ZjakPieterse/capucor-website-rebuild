'use client';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { CalculatorStep } from '@/types';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: CalculatorStep;
}

const STEPS = [
  { number: 1, label: 'Services' },
  { number: 2, label: 'Business Size' },
  { number: 3, label: 'Support Level' },
  { number: 4, label: 'Finalize' },
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Calculator progress" className="max-w-2xl mx-auto">
      <div className="relative flex justify-between">
        {/* Connection Line */}
        <div className="absolute top-5 left-0 w-full h-px bg-white/10" />
        
        {STEPS.map((step, i) => {
          const isDone = step.number < currentStep;
          const isActive = step.number === currentStep;

          return (
            <div key={step.number} className="relative z-10 flex flex-col items-center group">
              {/* Node */}
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isDone ? '#4ade80' : isActive ? '#060a14' : '#060a14',
                  borderColor: isDone ? '#4ade80' : isActive ? '#4ade80' : 'rgba(255,255,255,0.1)',
                  scale: isActive ? 1.2 : 1,
                }}
                className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                  isActive && "shadow-[0_0_20px_rgba(74,222,128,0.4)]"
                )}
              >
                {isDone ? (
                  <Check className="w-5 h-5 text-[#060a14] stroke-[3]" />
                ) : (
                  <span className={cn(
                    "font-mono font-bold text-sm",
                    isActive ? "text-emerald-400" : "text-white/20"
                  )}>
                    {step.number}
                  </span>
                )}
                
                {isActive && (
                  <motion.div 
                    layoutId="nodeGlow"
                    className="absolute inset-0 rounded-full bg-emerald-400/20 blur-md"
                  />
                )}
              </motion.div>

              {/* Label */}
              <div className="mt-4 flex flex-col items-center">
                 <span className={cn(
                   "text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
                   isActive ? "text-emerald-400" : isDone ? "text-white/60" : "text-white/20"
                 )}>
                   {step.label}
                 </span>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
