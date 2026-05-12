'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const TOOLS = [
  {
    name: 'Xero',
    tagline: 'Real-time ledger',
    benefit:
      'Your business records live in one cloud ledger that is processed, reconciled and ready for reporting.',
  },
  {
    name: 'Dext',
    tagline: 'Document capture',
    benefit:
      'Supplier invoices and receipts are captured and pushed into the bookkeeping workflow instead of sitting in inboxes.',
  },
  {
    name: 'Syft',
    tagline: 'Management reporting',
    benefit:
      'Reports and dashboards turn the ledger into a clearer view of revenue, expenses, cash flow and performance.',
  },
  {
    name: 'Karbon',
    tagline: 'Workflow control',
    benefit:
      'Monthly tasks, compliance dates and client queries are tracked so work does not rely on memory or scattered emails.',
  },
  {
    name: 'SimplePay',
    tagline: 'Payroll processing',
    benefit:
      'Payslips, payroll calculations, EMP201 support and year-end payroll records stay structured and compliant.',
  },
  {
    name: 'Draftworx',
    tagline: 'Financial statements',
    benefit:
      'Annual financial statements are prepared from clean records and reviewed for SARS, banks and stakeholders.',
  },
];

const WORKFLOW_STEPS = ['Capture', 'Reconcile', 'Track', 'Report', 'Pay', 'Finalise'];

export function TechStackShowcase() {
  return (
    <section id="tech-stack" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our tech stack"
            title="Modern finance tools, built for your business"
            subtitle="The software is not the service. The service is how we set it up, monitor it and use it every month to keep your records, deadlines, payroll and reports under control."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
            {WORKFLOW_STEPS.map((step, i) => (
              <span key={step} className="flex items-center gap-3">
                <span className="font-medium uppercase tracking-wider">{step}</span>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <span className="text-primary/60" aria-hidden>·</span>
                )}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool, i) => (
            <ScrollReveal key={tool.name} delay={i * 0.07}>
              <div className="rounded-xl border border-border bg-card p-6 h-full transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
                {/* Tool name badge */}
                <div className="mb-4 inline-flex items-center rounded-lg border border-primary/30 bg-primary/8 px-3 py-1.5">
                  <span className="text-sm font-semibold text-primary">{tool.name}</span>
                </div>

                <p className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                  {tool.tagline}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.benefit}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
