import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function FinalCTA() {
  return (
    <section className="py-24 lg:py-32 bg-muted/50 border-t border-border">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Ready to get your finances sorted?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            See an exact price in minutes, or book a no-pressure discovery call to talk through your
            situation first.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-[1.03]"
            >
              Calculate your price
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={siteConfig.links.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-input bg-input/30 px-6 py-3 text-sm font-semibold hover:bg-input/50 transition-all hover:scale-[1.03]"
            >
              <Calendar className="h-4 w-4" />
              Book a discovery call
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
