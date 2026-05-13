import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} role="img" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} role="img" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} role="img" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const services = [
  { label: 'Accounting', href: '/#services' },
  { label: 'Bookkeeping', href: '/#services' },
  { label: 'Payroll', href: '/#services' },
  { label: 'Pricing', href: '/pricing' },
];

const company = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Our Tech Stack', href: '/#tech-stack' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Privacy Policy', href: '/privacy' },
];

export function Footer() {
  return (
    <footer className="relative bg-[#060a14] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Brand & Narrative */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="hover:opacity-80 transition-opacity block">
              <Image
                src="/brand/logo-dark.png"
                alt="Capucor Business Solutions"
                height={32}
                width={160}
                className="h-8 w-auto brightness-0 invert"
                style={{ width: 'auto' }}
              />
            </Link>
            <p className="text-lg text-white/40 leading-relaxed max-w-sm">
              We help ambitious businesses move from reactive scrambling to proactive growth through a professional monthly finance rhythm.
            </p>
            <div className="flex gap-4">
              <SocialLink href={siteConfig.links.facebook} icon={IconFacebook} />
              <SocialLink href={siteConfig.links.instagram} icon={IconInstagram} />
              <SocialLink href={siteConfig.links.linkedin} icon={IconLinkedIn} />
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Services</p>
              <ul className="space-y-4">
                {services.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm font-medium text-white/50 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Company</p>
              <ul className="space-y-4">
                {company.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm font-medium text-white/50 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1 space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Credentials</p>
              <div className="flex flex-wrap gap-3">
                {['Xero Gold Partner', 'SAICA Member'].map((badge) => (
                  <span
                    key={badge}
                    className="inline-block rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white/40"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <p className="text-xs text-white/20 leading-relaxed italic">
                POPIA compliant. Your financial data is encrypted and handled by SAICA registered professionals.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <p>
            &copy; {new Date().getFullYear()} Capucor Business Solutions.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/5 italic lowercase tracking-normal">Built for the next generation of business.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: React.ElementType }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}
