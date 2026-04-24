export const siteConfig = {
  name: 'Capucor Business Solutions',
  tagline: 'Outsourced finance for growing SMEs.',
  description:
    'Subscription accounting, bookkeeping, and payroll services for South African SMEs. Tech-forward, transparent pricing, SAICA-aligned.',
  url: 'https://capucor.co.za',
  ogImage: '/api/og',
  links: {
    facebook: 'https://facebook.com/capucor',
    instagram: 'https://instagram.com/capucor',
    linkedin: 'https://linkedin.com/company/capucor',
    booking: process.env.NEXT_PUBLIC_BOOKING_URL ?? '#',
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/#contact' },
  ],
};
