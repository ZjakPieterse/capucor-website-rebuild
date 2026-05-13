'use client';

import { BarChart2, BookMarked, Users, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/ui/MagneticButton';
import Link from 'next/link';

const SERVICES = [
  {
    icon: BarChart2,
    title: 'Accounting',
    pitch: 'Annual financials and statutory compliance handled properly and on time.',
    bestFor: 'Companies that need AFS, income tax, VAT and CIPC managed by professionals.',
    bullets: [
      'Annual financial statements',
      'Income tax & provisional tax',
      'VAT201 reporting',
      'CIPC annual return filings',
    ],
    accent: 'var(--brand-purple)',
    href: '/accounting',
  },
  {
    icon: BookMarked,
    title: 'Bookkeeping',
    pitch: 'Current Xero records and monthly management accounts you can actually use.',
    bestFor: 'Businesses that want their ledger processed, reconciled and ready for decisions.',
    bullets: [
      'Xero business software included',
      'Transaction categorisation',
      'Monthly bank reconciliations',
      'Management accounts',
    ],
    accent: 'var(--brand-emerald)',
    href: '/bookkeeping',
    featured: true,
  },
  {
    icon: Users,
    title: 'Payroll',
    pitch: 'Accurate payroll, payslips and SARS/UIF compliance without spreadsheet risk.',
    bestFor: 'Employers that want payroll handled correctly, confidentially and on time.',
    bullets: [
      'Payroll processing & payslips',
      'PAYE and UIF submissions',
      'COIDA compliance',
      'IRP5 certificates',
    ],
    accent: 'var(--brand-cyan)',
    href: '/payroll',
  },
];

export function ServicePillars() {
  return (
    <section id="services" className="relative py-24 lg:py-40 bg-[#060a14] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16 lg:mb-24">
          <SectionHeading
            eyebrow="Disciplines"
            title="Three core functions. One subscription."
            subtitle="We handle the back-office complexity so you can focus on front-office growth."
            align="left"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={cn(
                "group relative p-8 rounded-[40px] bg-[#070c1a]/80 backdrop-blur-3xl border border-white/10 overflow-hidden",
                svc.featured && "lg:scale-105 border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.4)]"
              )}
            >
              {/* Subtle hover background glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: svc.accent }}
              />

              <div className="relative z-10">
                <div 
                  className="mb-8 w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${svc.accent}15`, borderColor: `${svc.accent}33` }}
                >
                  <svc.icon className="w-7 h-7" style={{ color: svc.accent }} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{svc.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">{svc.pitch}</p>

                <div className="mb-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">Core Inclusions</div>
                  <ul className="space-y-3">
                    {svc.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: svc.accent }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <Link
                    href={svc.href}
                    className="group/btn inline-flex items-center gap-2 text-sm font-bold text-white"
                  >
                    Explore {svc.title}
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <div className="h-px w-24 bg-white/10" />
          <p className="text-white/30 text-sm font-medium">Ready to simplify your finance function?</p>
          <MagneticButton>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 text-sm font-bold text-[#060a14] hover:bg-emerald-400 transition-all shadow-[0_20px_40px_rgba(74,222,128,0.2)]"
            >
              Build your subscription
              <ArrowRight className="h-4 w-4" />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);
