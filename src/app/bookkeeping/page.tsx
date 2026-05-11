import type { Metadata } from 'next';
import { BookMarked } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Bookkeeping',
  description:
    'Real-time bookkeeping for South African SMEs. Monthly reconciliations, management accounts, and Xero included.',
  alternates: { canonical: `${siteConfig.url}/bookkeeping` },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: `${siteConfig.url}/bookkeeping`,
    title: 'Bookkeeping — Capucor Business Solutions',
    description:
      'Real-time bookkeeping for South African SMEs. Monthly reconciliations, management accounts, and Xero included.',
    images: [{ url: `${siteConfig.url}/api/og`, width: 1200, height: 630 }],
  },
};

const INCLUDED = [
  {
    title: 'Xero included',
    description:
      'Your Xero subscription is part of the service. Proper business software, set up correctly, without paying for it separately.',
  },
  {
    title: 'Transaction processing and categorisation',
    description:
      'Every transaction coded and categorised. Your books reflect what actually happened in your business.',
  },
  {
    title: 'Monthly bank reconciliations',
    description:
      'Every account reconciled each month. By the time the new month starts, your books match your bank.',
  },
  {
    title: 'Monthly management accounts',
    description:
      'A P&L and balance sheet every month. Pull them any time you need to see where you stand.',
  },
];

export default function BookkeepingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted mb-6">
            <BookMarked className="h-6 w-6 text-foreground" />
          </div>
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
            Service overview
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">Bookkeeping</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your books, reconciled and up to date every month. Clean enough to make decisions from,
            and ready for your accountant at year-end.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-8 text-center">What&apos;s included</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {INCLUDED.map((item) => (
              <div
                key={item.title}
                className="feature-card rounded-xl border border-border bg-card p-6"
              >
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What this means for you */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-4">What this means for you</h2>
          <p className="text-muted-foreground leading-relaxed">
            You stop running your business on gut feel and bank balance. You have a real P&amp;L, a
            clean balance sheet, and books your accountant can sign off on. At year-end,
            there&apos;s nothing to scramble for.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-3">See what it costs</h2>
          <p className="text-muted-foreground mb-8">
            Flat monthly pricing. Build your exact subscription.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            See our pricing →
          </a>
        </div>
      </section>
    </>
  );
}
