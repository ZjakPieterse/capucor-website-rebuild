'use client';

import { Quote } from 'lucide-react';
import type { Testimonial } from '@/types';

interface TestimonialSpotlightProps {
  testimonial: Testimonial;
}

export function TestimonialSpotlight({ testimonial: t }: TestimonialSpotlightProps) {
  const subtitle = [t.role, t.business].filter(Boolean).join(' · ');

  return (
    <figure
      className="relative rounded-3xl border border-white/5 bg-white/5 p-8 overflow-hidden"
      aria-label="Customer testimonial"
    >
      <div className="absolute top-0 right-0 p-8 text-white/5">
        <Quote className="w-12 h-12 rotate-180" />
      </div>
      
      <blockquote className="text-sm italic leading-relaxed text-white/60 mb-6 relative z-10">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-4 relative z-10">
        {t.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={t.avatar_url}
            alt={t.name}
            loading="lazy"
            decoding="async"
            className="h-10 w-10 rounded-full object-cover grayscale"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <span className="text-xs font-bold text-emerald-400">
              {t.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <p className="text-xs font-bold text-white uppercase tracking-widest">{t.name}</p>
          {subtitle && (
            <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em] mt-0.5">{subtitle}</p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
