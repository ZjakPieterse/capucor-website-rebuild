'use client';

import { CalendarClock, ArrowRightLeft, ShieldCheck } from 'lucide-react';

const ITEMS = [
  {
    icon: CalendarClock,
    text: 'Month-to-month. 30 days notice to cancel.',
  },
  {
    icon: ArrowRightLeft,
    text: 'We migrate your books during onboarding.',
  },
  {
    icon: ShieldCheck,
    text: 'If SARS queries, we handle it with you.',
  },
];

export function RiskReducerStrip() {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {ITEMS.map(({ icon: Icon, text }) => (
        <div 
          key={text} 
          className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-3xl"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <Icon className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed">{text}</p>
        </div>
      ))}
    </div>
  );
}
