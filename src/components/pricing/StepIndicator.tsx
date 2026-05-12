'use client';

import { cn } from '@/lib/utils';
import type { CalculatorStep } from '@/types';

interface StepIndicatorProps {
  currentStep: CalculatorStep;
}

const STEPS = [
  { number: 1, label: 'Select services' },
  { number: 2, label: 'Your business' },
  { number: 3, label: 'Choose package' },
  { number: 4, label: 'Activate' },
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Calculator progress" className="mb-8">
      <ol className="flex items-start gap-0">
        {STEPS.map((step, i) => {
          const isDone = step.number < currentStep;
          const isActive = step.number === currentStep;

          return (
            <li
              key={step.number}
              className={cn('flex items-start', i === STEPS.length - 1 ? '' : 'flex-1')}
            >
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={cn(
                    'relative h-8 w-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-200',
                    isDone
                      ? 'border-primary bg-primary text-primary-foreground'
                      : isActive
                      ? 'border-primary bg-primary/10 text-primary scale-110'
                      : 'border-border bg-background text-muted-foreground'
                  )}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full ring-4 ring-primary/15 animate-pulse"
                    />
                  )}
                  <span className="relative">{isDone ? '✓' : step.number}</span>
                </div>
                <span
                  className={cn(
                    'mt-2 text-[10px] sm:text-xs font-medium text-center max-w-[80px] leading-tight',
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mt-4 mx-2 sm:mx-3 bg-border relative overflow-hidden">
                  <div
                    className={cn(
                      'absolute inset-0 bg-primary origin-left transition-transform duration-500 ease-out',
                      isDone ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
