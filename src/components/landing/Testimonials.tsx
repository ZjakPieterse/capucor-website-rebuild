'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 'left' | 'right') {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <SectionHeading
              align="left"
              eyebrow="Client testimonials"
              title="What our clients say."
            />
            {/* Mobile carousel controls */}
            <div className="flex gap-2 lg:hidden">
              <Button variant="outline" size="icon" onClick={() => scroll('left')} aria-label="Previous">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => scroll('right')} aria-label="Next">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile: horizontal scroll carousel */}
        <div
          ref={scrollRef}
          className={cn(
            'lg:hidden flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4',
            'scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]'
          )}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} className="shrink-0 w-[85vw] snap-start" />
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.1}>
              <TestimonialCard testimonial={t} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial: t,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 h-full flex flex-col',
        className
      )}
    >
      <Quote className="h-6 w-6 text-primary/40 mb-4 shrink-0" />
      <p className="text-sm leading-relaxed text-foreground flex-1 mb-6">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        {t.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={t.avatar_url}
            alt={t.name}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-primary">
              {t.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold">{t.name}</p>
          {(t.role || t.business) && (
            <p className="text-xs text-muted-foreground">
              {[t.role, t.business].filter(Boolean).join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
