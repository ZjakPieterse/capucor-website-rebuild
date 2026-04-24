'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

const TOOLS = ['Xero', 'Dext', 'Syft', 'SimplePay', 'Karbon', 'Draftworx'];

const BAR_HEIGHTS = [38, 55, 42, 72, 58, 88, 70];

function DashboardMockup() {
  return (
    <div className="relative rounded-2xl border border-border bg-card shadow-2xl p-8 overflow-hidden">
      <div className="mb-2">
        <span className="text-sm font-medium text-muted-foreground">Monthly Revenue</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="text-3xl font-bold font-mono">R 142,800</div>
        <span className="flex items-center gap-1 text-base font-semibold text-success">
          <TrendingUp className="h-5 w-5" />
          +12.4%
        </span>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1.5 h-28 mb-5">
        {BAR_HEIGHTS.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm bg-primary"
            style={{
              height: `${h}%`,
              opacity: 0.25 + i * 0.11,
              transformOrigin: 'bottom',
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.6 + i * 0.07, duration: 0.35, ease: 'easeOut' }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted p-3">
          <div className="text-xs text-muted-foreground mb-1">VAT Due</div>
          <div className="text-sm font-semibold font-mono">R 18,360</div>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <div className="text-xs text-muted-foreground mb-1">Payroll</div>
          <div className="text-sm font-semibold font-mono">R 54,200</div>
        </div>
      </div>

      <motion.div
        className="absolute top-4 right-4 rounded-xl bg-success text-white text-xs font-medium px-3 py-1.5 shadow-lg"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✓ Filed on time
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Copy */}
          <div>
            <motion.p
              className="text-sm font-medium uppercase tracking-widest mb-4"
              style={{ color: 'var(--brand-navy)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Outsourced finance for growing SMEs
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* [EDITABLE] — three headline options in PLAN §5.2 */}
              Finance operations built for SMEs that move fast.
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {/* [EDITABLE] */}
              Capucor gives growing South African businesses a dedicated finance
              team — accounting, bookkeeping, and payroll — on a predictable
              monthly subscription. No hourly billing. No surprises.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Button
                nativeButton={false}
                render={<Link href="/pricing" />}
                size="lg"
                className="gap-2"
              >
                See Pricing <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                nativeButton={false}
                render={
                  <a
                    href={siteConfig.links.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                Book a Call
              </Button>
            </motion.div>

          </div>

          {/* Dashboard visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <DashboardMockup />
          </motion.div>
        </div>

        {/* Partners carousel — full width below hero grid */}
        <motion.div
          className="mt-16 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p
            className="text-xs font-medium uppercase tracking-widest text-center mb-5"
            style={{ color: 'var(--brand-cyan)' }}
          >
            Partners
          </p>
          <div
            className="overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            }}
          >
            <div className="flex gap-8 animate-marquee w-max">
              {[...TOOLS, ...TOOLS, ...TOOLS, ...TOOLS].map((tool, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap text-sm font-medium text-muted-foreground border border-border rounded-md px-5 py-2 bg-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
