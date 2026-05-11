import type { Metadata } from 'next';
import { Users } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Payroll',
  description:
    'Accurate, compliant payroll for South African staff teams of any size. PAYE, UIF, and IRP5s handled.',
  alternates: { canonical: `${siteConfig.url}/payroll` },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: `${siteConfig.url}/payroll`,
    title: 'Payroll — Capucor Business Solutions',
    description:
      'Accurate, compliant payroll for South African staff teams of any size. PAYE, UIF, and IRP5s handled.',
    images: [{ url: `${siteConfig.url}/api/og`, width: 1200, height: 630 }],
  },
};

const INCLUDED = [
  {
    title: 'Payroll processing and payslips',
    description: "Your team's payslips calculated correctly and issued on time, every month.",
  },
  {
    title: 'PAYE and UIF submissions',
    description:
      'Your EMP201 filed monthly. PAYE and UIF submitted to SARS before the deadline.',
  },
  {
    title: 'COIDA compliance',
    description: 'Your COIDA return filed annually. No compliance gaps.',
  },
  {
    title: 'IRP5 certificates',
    description: 'Year-end certificates for every employee, ready before the filing deadline.',
  },
];

export default function PayrollPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted mb-6">
            <Users className="h-6 w-6 text-foreground" />
          </div>
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
            Service overview
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">Payroll</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Accurate payroll for your staff team, every month. PAYE and UIF submissions handled.
            IRP5s ready at year-end.
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
            Your staff get paid correctly. SARS gets its submissions on time. You&apos;re not
            exposed to penalties for late or incorrect filings. When payroll day comes,
            it&apos;s just done.
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
