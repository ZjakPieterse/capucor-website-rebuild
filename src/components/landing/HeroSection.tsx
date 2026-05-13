'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PremiumDashboard } from './PremiumDashboard';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headline = 'Stop Managing the Past. Engineer Your Future.';

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-24 lg:pt-32 pb-28 lg:pb-40"
    >
      {/* Dynamic Background Glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/4 right-[5%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Finance Command Centre
          </motion.div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-heading font-bold tracking-tighter leading-[1.05] mb-8 max-w-5xl text-balance">
            {headline.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "inline-block mr-[0.2em]",
                  word === 'Engineer' && "text-emerald-400"
                )}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-lg lg:text-xl text-white/40 leading-relaxed mb-10 max-w-2xl font-thin-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            The high-fidelity finance function for South African SMEs. Real accountants, modern stack, and a rhythm that turns chaos into clarity.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <MagneticButton>
              <Button nativeButton={false} render={<Link href="/pricing" />} size="lg" className="rounded-2xl px-8 h-14 font-bold bg-white text-black hover:bg-white/90">
                Build your subscription
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                nativeButton={false}
                render={<a href={siteConfig.links.booking} target="_blank" rel="noopener noreferrer" />}
                variant="outline" size="lg" className="rounded-2xl px-8 h-14 font-bold border-white/10 hover:bg-white/5"
              >
                <Calendar className="h-4 w-4 mr-2" /> Book a fit call
              </Button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* The 3D Bento Showcase */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 h-40 bottom-0 pointer-events-none" />
          <PremiumDashboard />
        </div>
      </div>
    </section>
  );
}
