'use client';

import { CalendarClock, ArrowRightLeft, ShieldCheck } from 'lucide-react';

const ITEMS = [
  {
    icon: CalendarClock,
    text: 'Month-to-month. 30 days notice to cancel.',
  },
  {
    icon: ArrowRightLeft,
    text: 'We migrate your books from any platform during onboarding.',
  },
  {
    icon: ShieldCheck,
    text: 'If SARS queries something, we handle it with you.',
  },
];

export function RiskReducerStrip() {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/[0.04] px-4 py-3">
      <div className="grid sm:grid-cols-3 gap-x-6 gap-y-2.5">
        {ITEMS.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-start gap-2.5">
            <Icon className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-foreground/85">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
