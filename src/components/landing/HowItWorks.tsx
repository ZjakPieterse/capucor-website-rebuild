"use client";

import { Inbox, Cog, BarChart2, MessageSquare } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCursorGlow } from "@/hooks/useCursorGlow";

const STEPS = [
  {
    icon: Inbox,
    number: "01",
    title: "Collect & Collaborate",
    body: "You know exactly what to send, where to send it, and by when. We make the monthly admin clear and repeatable, so both sides can deliver properly.",
    deliverable:
      "VAT201, EMP201, provisional tax and CIPC deadlines tracked through a structured workflow, not memory or last-minute panic.",
  },
  {
    icon: Cog,
    number: "02",
    title: "Process & Reconcile",
    body: "We capture, code and reconcile the month’s activity in Xero, including bank feeds, supplier invoices, payroll entries and key control accounts.",
    deliverable:
      "Your Xero ledger stays reconciled and decision-ready. When the bank, SARS or a funder needs a number, you are not scrambling to catch up.",
  },
  {
    icon: BarChart2,
    number: "03",
    title: "Review & Report",
    body: "A senior accountant checks the numbers before they reach you. You receive a clear monthly report showing performance, cash flow, debtors and anything that needs attention.",
    deliverable:
      "A concise monthly view of revenue, expenses, cash flow, debtors and anything unusual that deserves attention.",
  },
  {
    icon: MessageSquare,
    number: "04",
    title: "Advise & Plan",
    body: "We turn the report into useful business conversation: tax timing, cash pressure, margin movement, compliance risks and practical next steps.",
    deliverable:
      "Risks, opportunities and planning points raised early, while there is still time to act on them.",
  },
];

export function HowItWorks() {
  const rowRef = useCursorGlow<HTMLDivElement>();

  return (
    <section
      id="how-it-works"
      className="premium-section bg-background overflow-hidden py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="How it works"
          title="A monthly rhythm that keeps you in control"
          subtitle="Great finance work needs a clear monthly rhythm. We process, review, report and advise so the month closes properly. Hover a step to see the handoff."
        />

        <div
          ref={rowRef}
          className="how-glass-row relative mt-14 flex flex-col gap-4 lg:flex-row"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.number}
                tabIndex={0}
                className="how-glass-card"
                aria-label={`Step ${step.number}: ${step.title}`}
              >
                <span className="how-step-number">{step.number}</span>
                <Icon className="how-step-icon" aria-hidden="true" />
                <h3 className="how-step-title">{step.title}</h3>

                <div className="how-step-reveal">
                  <p className="how-step-body">{step.body}</p>
                  <div className="how-step-you-get">
                    <span className="how-step-you-get-label">You get</span>
                    <p className="how-step-you-get-text">{step.deliverable}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
