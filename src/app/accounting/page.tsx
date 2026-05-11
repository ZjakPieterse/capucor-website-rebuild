import type { Metadata } from 'next';
import { BarChart2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Accounting',
  description:
    'Annual financial statements, tax returns, and CIPC compliance for South African SMEs. Done properly, on time.',
  alternates: { canonical: `${siteConfig.url}/accounting` },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: `${siteConfig.url}/accounting`,
    title: 'Accounting — Capucor Business Solutions',
    description:
      'Annual financial statements, tax returns, and CIPC compliance for South African SMEs. Done properly, on time.',
    images: [{ url: `${siteConfig.url}/api/og`, width: 1200, height: 630 }],
  },
};

const INCLUDED = [
  {
    title: 'Annual financial statements',
    description:
      'Compiled by a professional accountant each year. Ready for SARS, your bank, or any third party that asks.',
  },
  {
    title: 'Income tax and provisional tax',
    description:
      'Your tax returns filed on time. Provisional tax calculated and submitted before both deadlines.',
  },
  {
    title: 'VAT201 reporting and submission',
    description:
      'Every VAT cycle, handled. Whether monthly or bi-monthly, your VAT201 is submitted before the due date.',
  },
  {
    title: 'CIPC annual return filings',
    description:
      "Your company's annual return filed with CIPC. No late fees, no risk of deregistration.",
  },
];

export default function AccountingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted mb-6">
            <BarChart2 className="h-6 w-6 text-foreground" />
          </div>
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
            Service overview
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">Accounting</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your annual financials, tax returns, and CIPC compliance, handled completely. Filed
            correctly, on time, every year.
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
            At year-end, you don&apos;t chase an accountant or scramble to find documents. Your
            financials are ready when SARS needs them, when your bank asks, and when you want to
            know where your business stands.
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
