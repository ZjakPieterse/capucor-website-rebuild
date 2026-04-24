'use client';

import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

const STEPS = [
  { number: 1, label: 'Select services' },
  { number: 2, label: 'Your business' },
  { number: 3, label: 'Choose package' },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Calculator progress" className="mb-8">
      <ol className="flex items-center gap-0">
        {STEPS.map((step, i) => {
          const isDone = step.number < currentStep;
          const isActive = step.number === currentStep;

          return (
            <li key={step.number} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'h-8 w-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-colors',
                    isDone
                      ? 'border-primary bg-primary text-primary-foreground'
                      : isActive
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-background text-muted-foreground'
                  )}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isDone ? '✓' : step.number}
                </div>
                <span
                  className={cn(
                    'mt-1.5 text-xs font-medium hidden sm:block',
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-px mx-3 -mt-5',
                    isDone ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
