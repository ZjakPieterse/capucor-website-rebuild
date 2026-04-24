export interface TierHighlightItem {
  text: string;
  services: string[];
  tooltip: string;
  calculatorOnly?: boolean;
}

export const TIER_HIGHLIGHTS: Record<string, TierHighlightItem[]> = {
  basic: [
    { text: 'Annual Financial Statements', services: ['accounting'], tooltip: 'Year-end statements ready for SARS, banks, and funders.' },
    { text: 'SARS and CIPC Compliance', services: ['accounting'], tooltip: 'Tax preparation and annual filings handled end-to-end.' },
    { text: 'VAT Reports & Submission', services: ['accounting'], tooltip: 'VAT returns handled accurately, every cycle.' },
    { text: 'Xero Business Software', services: ['bookkeeping'], tooltip: 'Cloud accounting included — no extra software bill.' },
    { text: 'Monthly Bookkeeping', services: ['bookkeeping'], tooltip: 'Books kept current and reconciled each month.' },
    { text: 'Quarterly Reports', services: ['accounting'], tooltip: 'Know where your business stands, every quarter.' },
    { text: 'Payroll Included', services: ['payroll'], tooltip: '', calculatorOnly: true },
  ],
  pro: [
    { text: 'Annual Tax Planning', services: ['accounting'], tooltip: 'Reduce your tax bill before year-end, legally.' },
    { text: 'Weekly Processing', services: ['bookkeeping'], tooltip: 'Fresher numbers — catch issues early.' },
    { text: 'Suppliers Processing', services: ['bookkeeping'], tooltip: 'Supplier invoices ready to pay, on time.' },
    { text: 'Monthly Reports', services: ['accounting'], tooltip: 'Know where your business stands, every month.' },
    { text: 'Payroll Included', services: ['payroll'], tooltip: '', calculatorOnly: true },
  ],
  premium: [
    { text: 'Monthly Tax Strategy', services: ['accounting'], tooltip: 'Tax-smart decisions all year, not just at year-end.' },
    { text: 'Daily Processing', services: ['bookkeeping'], tooltip: "Live financials to decide on today's numbers." },
    { text: 'Budget vs Actuals', services: ['bookkeeping'], tooltip: "See exactly where you're over or under budget, every month." },
    { text: 'Live KPI Dashboard', services: ['accounting'], tooltip: 'The numbers that matter, updated in real time.' },
    { text: 'Payroll Included', services: ['payroll'], tooltip: '', calculatorOnly: true },
  ],
};

export const TIER_CUMULATIVE_LABELS: Record<string, string> = {
  pro: 'Everything in Basic PLUS:',
  premium: 'Everything under Pro PLUS:',
};

export const PACKAGE_COMMON_ITEMS = [
  { text: 'Dedicated finance team', tooltip: 'A named team that knows your business.' },
  { text: 'Core financial services', tooltip: 'SARS and CIPC compliance, handled end-to-end.' },
  { text: 'Year-round advisory', tooltip: 'Advice when you need it, not just at year-end.' },
];
