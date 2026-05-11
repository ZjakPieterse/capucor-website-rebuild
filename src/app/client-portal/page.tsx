import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Client Portal',
  description: 'Capucor client portal — coming soon.',
  robots: { index: false },
};

export default function ClientPortalPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Client Portal</h1>
        <p className="text-muted-foreground mb-8">
          Coming soon. Your account manager will be in touch with access details once it&apos;s live.
        </p>
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
