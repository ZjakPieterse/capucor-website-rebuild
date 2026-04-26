export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "What's included in each subscription tier?",
    answer:
      'Each tier builds on the previous. Basic covers core compliance — bookkeeping, annual financial statements, income tax and provisional tax returns, and VAT201 submissions. Pro adds monthly management accounts, EMP201 submissions, and expanded payroll. Premium adds daily processing, budget vs actuals, and a live KPI dashboard. Full inclusions are in the pricing calculator.',
  },
  {
    question: 'How do I switch from my current accountant?',
    answer:
      "We manage the transition. After your Discovery Call we'll request your prior-year financial statements and Xero access (or migrate your data into Xero if you're on another platform). Most transitions complete within two weeks.",
  },
  {
    question: 'Are you SARS compliant?',
    answer:
      'Yes. VAT201s, EMP201s, provisional tax returns, and CIPC annual returns are all filed on time via SARS eFiling. Every set of financials is reviewed and signed off by a SAICA-aligned senior accountant before submission.',
  },
  {
    question: 'How is my data kept secure?',
    answer:
      'Your data lives in Xero and Supabase, both of which use bank-grade encryption at rest and in transit. We operate under POPIA and do not share your data with third parties. You retain full ownership of your Xero file.',
  },
  {
    question: 'Do I need to be on Xero already?',
    answer:
      "No. If you're on another platform or using spreadsheets, we'll migrate you to Xero as part of onboarding. The process typically takes three to five business days depending on the volume of historical data.",
  },
  {
    question: "What are your contract terms?",
    answer:
      'Month-to-month subscriptions with 30 days written notice to cancel. No lock-in contracts. We believe you should stay because the service is valuable, not because you’re trapped.',
  },
  {
    question: 'Can my subscription price change?',
    answer:
      'Prices are reviewed annually and any increase is communicated 60 days in advance. Your bracket and tier are locked at your agreed rate until then.',
  },
  {
    question: 'How do I cancel?',
    answer:
      'Email us with 30 days notice. We’ll prepare a handover pack with all your financial statements, tax submissions, and Xero credentials so your next accountant has everything they need.',
  },
];
