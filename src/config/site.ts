export const siteConfig = {
  name: 'Capucor Business Solutions',
  tagline: 'Outsourced finance for growing SMEs.',
  description:
    'Subscription accounting, bookkeeping, and payroll for South African SMEs. Fixed monthly pricing, Xero-powered, SAICA-aligned.',
  url: 'https://capucor.co.za',
  ogImage: '/api/og',
  links: {
    facebook: 'https://facebook.com/capucor',
    instagram: 'https://instagram.com/capucor',
    linkedin: 'https://linkedin.com/company/capucor',
    booking: process.env.NEXT_PUBLIC_BOOKING_URL ?? 'https://calendar.app.google/ixopmxLuGgNH5Lkk8',
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/#contact' },
  ],
};
