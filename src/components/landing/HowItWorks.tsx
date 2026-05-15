"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCursorGlow } from "@/hooks/useCursorGlow";
import { useHowItWorksScroll } from "@/hooks/useHowItWorksScroll";

const STEPS = [
  {
    number: "01",
    title: "Collect",
    body: "You know exactly what to send, where to send it, and by when. We make the monthly admin clear and repeatable, so both sides can deliver properly.",
    deliverable:
      "VAT201, EMP201, provisional tax and CIPC deadlines tracked through a structured workflow, not memory or last-minute panic.",
  },
  {
    number: "02",
    title: "Process",
    body: "We capture, code and reconcile the month’s activity in Xero, including bank feeds, supplier invoices, payroll entries and key control accounts.",
    deliverable:
      "Your Xero ledger stays reconciled and decision-ready. When the bank, SARS or a funder needs a number, you are not scrambling to catch up.",
  },
  {
    number: "03",
    title: "Review",
    body: "A senior accountant checks the numbers before they reach you. You receive a clear monthly report showing performance, cash flow, debtors and anything that needs attention.",
    deliverable:
      "A concise monthly view of revenue, expenses, cash flow, debtors and anything unusual that deserves attention.",
  },
  {
    number: "04",
    title: "Advise",
    body: "We turn the report into useful business conversation: tax timing, cash pressure, margin movement, compliance risks and practical next steps.",
    deliverable:
      "Risks, opportunities and planning points raised early, while there is still time to act on them.",
  },
];

export function HowItWorks() {
  const rowRef = useCursorGlow<HTMLDivElement>();
  const { activeStep, sectionRef } = useHowItWorksScroll(STEPS.length);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="how-pin-section premium-section bg-background overflow-hidden"
    >
      <div className="how-pin-inner mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="How it works"
          title="A monthly rhythm that keeps you in control"
          subtitle="Great finance work needs a clear monthly rhythm. We process, review, report and advise so the month closes properly. Scroll to walk through each step."
        />

        <div
          ref={rowRef}
          data-active-step={activeStep}
          className="how-glass-row relative mt-10 flex flex-col gap-4 lg:flex-row"
        >
          {STEPS.map((step, i) => (
            <article
              key={step.number}
              data-step={i}
              data-active={i === activeStep}
              tabIndex={0}
              className="how-glass-card"
              aria-label={`Step ${step.number}: ${step.title}`}
              aria-current={i === activeStep ? "step" : undefined}
            >
              <div className="how-step-header">
                <span className="how-numeral" aria-hidden="true">
                  {step.number}
                </span>
                <h3 className="how-step-title">{step.title}</h3>
              </div>

              <div className="how-step-reveal">
                <p className="how-step-body">{step.body}</p>
                <div className="how-step-you-get">
                  <span className="how-step-you-get-label">You get</span>
                  <p className="how-step-you-get-text">{step.deliverable}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
