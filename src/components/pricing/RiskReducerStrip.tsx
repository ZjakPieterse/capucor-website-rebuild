'use client';

import { Users, ShieldCheck, CalendarCheck } from 'lucide-react';

const ITEMS = [
  {
    icon: Users,
    text: 'Dedicated Finance Team',
  },
  {
    icon: ShieldCheck,
    text: 'SARS & CIPC Compliance',
  },
  {
    icon: CalendarCheck,
    text: 'Year-round Advisory',
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
