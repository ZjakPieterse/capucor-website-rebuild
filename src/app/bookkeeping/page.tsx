import type { Metadata } from 'next';
import { BarChart2, Users } from 'lucide-react';
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
      "Your Xero subscription is part of the service, set up correctly for your business from day one. You get access to proper cloud accounting software — the same platform your bookkeeper works in — without paying for it separately or setting it up yourself.",
  },
  {
    title: 'Transaction processing and categorisation',
    description:
      'Every transaction from your bank feeds captured and coded to the right account each month. Your books reflect your actual business activity, not a rough approximation of it.',
  },
  {
    title: 'Monthly bank reconciliations',
    description:
      'Every bank account and credit card reconciled against your actual statements each month. By the time the new month starts, your books match your bank, and any discrepancies have already been investigated.',
  },
  {
    title: 'Monthly management accounts',
    description:
      'A profit and loss statement and balance sheet delivered every month. Pull them any time to see how the business is performing, what your cash position is, and whether your margins are holding.',
  },
];

const OTHER_SERVICES = [
  { title: 'Accounting', href: '/accounting', icon: BarChart2 },
  { title: 'Payroll', href: '/payroll', icon: Users },
];

export default function BookkeepingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">Bookkeeping</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your books, reconciled and up to date every month. Every transaction is processed,
            categorised, and reconciled against your bank statements by the time the new month
            starts. You get a real P&amp;L and balance sheet each month. Actual numbers you can act on.
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
            there&apos;s nothing to scramble for. When you need to decide whether to hire, invest,
            or pull back, the numbers are already there.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-3">See what it costs</h2>
          <p className="text-muted-foreground mb-8">
            Flat monthly pricing. Build your exact subscription in minutes.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Build your subscription →
          </a>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-lg font-semibold mb-6 text-muted-foreground">Other services</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {OTHER_SERVICES.map((svc) => (
              <a
                key={svc.title}
                href={svc.href}
                className="feature-card flex items-center gap-4 rounded-xl border border-border bg-card px-6 py-5 hover:border-primary/50 transition-colors"
              >
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <svc.icon className="h-5 w-5 text-foreground" />
                </div>
                <span className="text-sm font-medium">{svc.title}</span>
                <span className="ml-auto text-muted-foreground text-sm">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
