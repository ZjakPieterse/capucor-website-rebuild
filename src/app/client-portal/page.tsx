import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Client Portal',
  description: 'Capucor client portal — coming soon.',
  robots: { index: false },
};

export default function ClientPortalPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Lock className="h-6 w-6 text-primary" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-4">Client Portal</h1>
        <p className="text-lg text-muted-foreground mb-3">
          We&apos;re building a dedicated portal for existing clients.
        </p>
        <p className="text-sm text-muted-foreground mb-10">
          In the meantime, use the link provided in your welcome email to access your documents and reports.
        </p>

        <a
          href={siteConfig.links.booking}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-[1.03]"
        >
          Book a call with your team
          <ArrowRight className="h-4 w-4" />
        </a>

        <div className="mt-8">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
