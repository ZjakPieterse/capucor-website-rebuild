'use client';

import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { motion } from 'motion/react';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function FinalCTA() {
  return (
    <section className="relative py-32 lg:py-48 bg-[#060a14] overflow-hidden border-t border-white/5">
      {/* Background Cinematic Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-emerald-500/10 blur-[180px] rounded-[100%] rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-[100%] -rotate-12" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Ready to transition?
          </div>
          
          <h2 className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tighter leading-[1.1]">
            Finance work that <br className="hidden lg:block" />
            <span className="text-white/40 italic">actually</span> feels professional.
          </h2>
          
          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
            Move your business from reactive scrambling to proactive growth with a finance function that runs on a set monthly cadence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-emerald-500 text-[#060a14] text-base font-bold hover:bg-emerald-400 transition-all shadow-[0_20px_60px_rgba(74,222,128,0.3)]"
              >
                Build your subscription
                <ArrowRight className="w-5 h-5" />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <a
                href={siteConfig.links.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-base font-bold hover:bg-white/10 transition-all backdrop-blur-xl"
              >
                <Calendar className="w-5 h-5" />
                Book a fit call
              </a>
            </MagneticButton>
          </div>
          
          <div className="mt-16 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/20">
             <div className="flex items-center gap-2">
               <div className="w-1 h-1 rounded-full bg-white/20" />
               NO JOINING FEES
             </div>
             <div className="flex items-center gap-2">
               <div className="w-1 h-1 rounded-full bg-white/20" />
               NO LONG-TERM CONTRACTS
             </div>
             <div className="flex items-center gap-2">
               <div className="w-1 h-1 rounded-full bg-white/20" />
               SAICA REGISTERED AGA(SA)
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
