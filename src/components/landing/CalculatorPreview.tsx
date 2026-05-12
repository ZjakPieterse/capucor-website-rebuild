import Link from 'next/link';
import { ArrowRight, Timer } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function CalculatorPreview() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 mb-6">
            <Timer className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Transparent pricing
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Build your finance subscription before the sales call.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Pick your services, choose your size bracket and see the monthly fee immediately.
            No quote request. No waiting. No surprise pricing conversation.
          </p>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-[1.03]"
          >
            See your monthly fee
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
