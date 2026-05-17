export interface TierHighlightItem {
  text: string;
  services: string[];
  tooltip: string;
  calculatorOnly?: boolean;
}

export const TIER_HIGHLIGHTS: Record<string, TierHighlightItem[]> = {
  basic: [
    { text: 'Annual Financial Statements', services: ['accounting'], tooltip: 'Year-end statements ready for SARS, banks, and funders.' },
    { text: 'SARS and CIPC Compliance', services: ['accounting'], tooltip: 'Tax returns and annual filings filed for you each year.' },
    { text: 'VAT Reports & Submission', services: ['accounting'], tooltip: 'VAT returns handled accurately, every cycle.' },
    { text: 'Xero Business Software', services: ['bookkeeping'], tooltip: 'Cloud accounting included. No extra software bill.' },
    { text: 'Monthly Bookkeeping', services: ['bookkeeping'], tooltip: 'Books kept current and reconciled each month.' },
    { text: 'Quarterly Reports', services: ['accounting'], tooltip: 'Quarterly P&L and balance sheet in your inbox.' },
    { text: 'Payroll Included', services: ['payroll'], tooltip: '', calculatorOnly: true },
  ],
  pro: [
    { text: 'Annual Tax Planning', services: ['accounting'], tooltip: 'Reduce your tax bill before year-end, legally.' },
    { text: 'Weekly Processing', services: ['bookkeeping'], tooltip: 'Fresher numbers. Catch issues early.' },
    { text: 'Suppliers Processing', services: ['bookkeeping'], tooltip: 'Supplier invoices ready to pay, on time.' },
    { text: 'Monthly Reports', services: ['accounting'], tooltip: 'Monthly P&L and balance sheet in your inbox.' },
    { text: 'Payroll Included', services: ['payroll'], tooltip: '', calculatorOnly: true },
  ],
  premium: [
    { text: 'Monthly Tax Strategy', services: ['accounting'], tooltip: 'We flag tax exposure throughout the year, not only in March.' },
    { text: 'Daily Processing', services: ['bookkeeping'], tooltip: "Your Xero ledger reconciled every day." },
    { text: 'Budget vs Actuals', services: ['bookkeeping'], tooltip: "See exactly where you're over or under budget, every month." },
    { text: 'Live KPI Dashboard', services: ['accounting'], tooltip: 'Key metrics on a live dashboard, updated as transactions come in.' },
    { text: 'Payroll Included', services: ['payroll'], tooltip: '', calculatorOnly: true },
  ],
};

export const TIER_CUMULATIVE_LABELS: Record<string, string> = {
  pro: 'All of Basic, plus:',
  premium: 'All of Pro, plus:',
};

export const PACKAGE_COMMON_ITEMS = [
  { text: 'Dedicated Finance Team', tooltip: 'A named team that knows your business.' },
  { text: 'SARS & CIPC Compliance', tooltip: 'Tax returns and annual filings done each year. Nothing to remember.' },
  { text: 'Year-round Advisory', tooltip: 'Ongoing guidance from your accountant — not just at year-end.' },
];

export const TIER_BUYER_FIT: Record<string, string> = {
  basic: 'For businesses that need the essentials done properly.',
  pro: 'For businesses that want monthly visibility and a more active finance rhythm.',
  premium: 'For businesses that want closer advisory, live KPIs and deeper monthly planning.',
};
