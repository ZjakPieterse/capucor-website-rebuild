'use client';

import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useCursorGlow } from '@/hooks/useCursorGlow';

export function FinalCTA() {
  const sectionRef = useCursorGlow<HTMLElement>();
  return (
    <section
      ref={sectionRef}
      className="cursor-glow premium-section relative border-t border-white/8 py-28 lg:py-40"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="mb-5 text-4xl font-extralight tracking-[-0.055em] lg:text-6xl">
            Ready to make finance work better?
          </h2>
          <p className="mb-10 text-lg font-light leading-relaxed text-muted-foreground">
            Build your subscription in a few minutes, or book a short fit call and we&apos;ll help you choose the right level of monthly support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="premium-button inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-primary/95 sm:w-auto"
            >
              Build your subscription
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={siteConfig.links.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-6 py-3 text-sm font-semibold backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary/35 hover:bg-white/[0.075] sm:w-auto"
            >
              <Calendar className="h-4 w-4" />
              Book a 15-minute fit call
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
