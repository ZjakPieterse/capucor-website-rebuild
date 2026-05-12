import type { Metadata } from 'next';
import Link from 'next/link';
import { PortalNotifyForm } from '@/components/portal/PortalNotifyForm';

export const metadata: Metadata = {
  title: 'Client Portal',
  description: 'Capucor client portal — coming soon.',
  robots: { index: false },
};

export default function ClientPortalPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          Coming soon
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Client Portal</h1>
        <p className="text-muted-foreground mb-8">
          A single place for your documents, monthly reports and compliance status. Drop your email and we&apos;ll let you know the moment it&apos;s ready.
        </p>

        <PortalNotifyForm />

        <Link
          href="/"
          className="mt-8 inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
