"use client";

import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const TOOLS = [
  {
    name: "Xero",
    monogram: "Xe",
    tagline: "Real-time ledger",
    benefit:
      "Your business records live in one cloud ledger that is processed, reconciled and ready for reporting.",
  },
  {
    name: "Dext",
    monogram: "De",
    tagline: "Document capture",
    benefit:
      "Supplier invoices and receipts are captured and pushed into the bookkeeping workflow instead of sitting in inboxes.",
  },
  {
    name: "Syft",
    monogram: "Sf",
    tagline: "Management reporting",
    benefit:
      "Reports and dashboards turn the ledger into a clearer view of revenue, expenses, cash flow and performance.",
  },
  {
    name: "Karbon",
    monogram: "Kr",
    tagline: "Workflow control",
    benefit:
      "Monthly tasks, compliance dates and client queries are tracked so work does not rely on memory or scattered emails.",
  },
  {
    name: "SimplePay",
    monogram: "SP",
    tagline: "Payroll processing",
    benefit:
      "Payslips, payroll calculations, EMP201 support and year-end payroll records stay structured and compliant.",
  },
  {
    name: "Draftworx",
    monogram: "Dw",
    tagline: "Financial statements",
    benefit:
      "Annual financial statements are prepared from clean records and reviewed for SARS, banks and stakeholders.",
  },
];

const WORKFLOW_STEPS = [
  "Capture",
  "Reconcile",
  "Track",
  "Report",
  "Pay",
  "Finalise",
];

export function TechStackShowcase() {
  return (
    <section id="tech-stack" className="premium-section py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our tech stack"
            title="Modern finance tools, built for your business"
            subtitle="The software is not the service. The service is how we set it up, monitor it and use it every month to keep your records, deadlines, payroll and reports under control."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
            {WORKFLOW_STEPS.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/[0.08] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary/90">
                  {step}
                </span>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <ArrowRight
                    className="h-3 w-3 shrink-0 text-primary/45"
                    aria-hidden
                  />
                )}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {TOOLS.map((tool, i) => (
            <ScrollReveal key={tool.name} delay={i * 0.07}>
              <div className="feature-card premium-card rounded-2xl border border-white/10 bg-card/80 p-5 sm:p-6 h-full">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/[0.18] to-primary/[0.04] font-mono text-sm font-bold tracking-tight text-primary shadow-[0_0_18px_-6px_color-mix(in_oklch,var(--primary)_45%,transparent)]"
                  >
                    {tool.monogram}
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-semibold leading-tight text-foreground">
                      {tool.name}
                    </p>
                    <p className="mt-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary/80">
                      {tool.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tool.benefit}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
