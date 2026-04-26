'use client';

import { CreditCard, BadgeCheck, Zap, MessageSquare } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const DIFFERENTIATORS = [
  {
    icon: CreditCard,
    title: 'Subscription pricing',
    body: 'One fixed monthly fee. No hourly rates, no surprise invoices at year-end, no ambiguity. You know exactly what Capucor costs.',
  },
  {
    icon: BadgeCheck,
    title: 'SAICA-aligned senior reviewers',
    body: 'Every set of financials is reviewed by a qualified, experienced accountant. Not a junior. Not software.',
  },
  {
    icon: Zap,
    title: 'Tech-first onboarding in under 14 days',
    body: 'We migrate your data, connect your tools, and have you fully operational faster than any traditional firm.',
  },
  {
    icon: MessageSquare,
    title: 'Advisory included, not extra',
    body: 'B-BBEE certificates, cash-flow timing, tax structuring, supplier contract questions — that conversation is part of the service, not a billable extra.',
  },
];

export function WhyCapucor() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Why Capucor"
            title="Built differently from day one."
            subtitle="More than just compliance. We give you reliable numbers, practical advice, and a better way to run your business."
          />
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {DIFFERENTIATORS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <div className="flex gap-5 rounded-xl border border-border bg-card p-6">
                <div className="shrink-0 mt-0.5 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
