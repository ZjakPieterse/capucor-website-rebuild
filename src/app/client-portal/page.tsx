import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  Calendar,
  FileText,
  MessageSquare,
  Building2,
  CircleAlert,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PortalNotifyForm } from '@/components/portal/PortalNotifyForm';
import { PreviewLockedNotice } from '@/components/portal/PreviewLockedNotice';
import { isPreviewAllowed } from '@/lib/preview-gate';
import { formatZAR } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import type { SubscriptionSummary } from '@/types';

export const metadata: Metadata = {
  title: 'Client Portal',
  description: 'Your Capucor subscription, documents and compliance status.',
  robots: { index: false },
};

/**
 * /client-portal — FRAMEWORK STUB.
 *
 * Once Paystack + auth are wired:
 *   - Resolve the current user via Supabase auth in a server component
 *   - Fetch their subscription row(s) from the `subscriptions` table
 *   - Render the real summary, document feed, and a working cancel button
 *
 * For now: a preview of the post-launch experience using mock data, plus
 * the existing waitlist form for prospects who do not yet have a
 * subscription.
 */

const MOCK_SUBSCRIPTION: SubscriptionSummary = {
  id: 'sub_preview_demo',
  status: 'active',
  tierSlug: 'pro',
  tierName: 'Pro',
  monthlyTotalZAR: 2075,
  vatZAR: 311,
  totalChargeZAR: 2386,
  services: ['accounting', 'bookkeeping'],
  brackets: { accounting: 1, bookkeeping: 1 },
  nextBillingDate: '2026-06-01',
  endAt: null,
  createdAt: '2026-05-01T08:00:00Z',
};

function StatusBadge({ status }: { status: SubscriptionSummary['status'] }) {
  const styles: Record<SubscriptionSummary['status'], { label: string; cls: string }> = {
    active: { label: 'Active', cls: 'bg-primary/15 text-primary border-primary/30' },
    pending_payment: { label: 'Pending payment', cls: 'bg-warning/15 text-warning border-warning/30' },
    cancelling: { label: 'Cancelling', cls: 'bg-warning/15 text-warning border-warning/30' },
    cancelled: { label: 'Cancelled', cls: 'bg-muted text-muted-foreground border-border' },
    past_due: { label: 'Past due', cls: 'bg-destructive/15 text-destructive border-destructive/30' },
  };
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${s.cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}

function formatLongDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

interface ClientPortalPageProps {
  searchParams: Promise<{ preview?: string | string[] }>;
}

export default async function ClientPortalPage({ searchParams }: ClientPortalPageProps) {
  const { preview } = await searchParams;
  if (!isPreviewAllowed(preview)) {
    return (
      <PreviewLockedNotice
        title="Client portal coming soon"
        body="We're putting the finishing touches on it. Drop your email and we'll let you know the moment it's ready."
      />
    );
  }

  const sub = MOCK_SUBSCRIPTION;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
      {/* Preview banner — remove once auth is wired */}
      <div className="rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 mb-8 flex items-start gap-3">
        <CircleAlert className="h-4 w-4 mt-0.5 shrink-0 text-warning" />
        <p className="text-xs leading-relaxed text-warning">
          <span className="font-semibold">Preview.</span> Once your subscription is active, you&rsquo;ll sign in to see your real subscription, monthly reports and a working cancel button here. The details below are example data so you can see what the portal will look like.
        </p>
      </div>

      <header className="mb-10">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Client portal
        </p>
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-3xl font-bold tracking-tight">Your subscription</h1>
          <StatusBadge status={sub.status} />
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">

        {/* Main column */}
        <div className="space-y-6">

          {/* Plan card */}
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              Plan & services
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Tier
                </dt>
                <dd className="font-medium">{sub.tierName}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Services
                </dt>
                <dd className="font-medium capitalize">{sub.services.join(', ')}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Monthly subtotal
                </dt>
                <dd className="font-mono font-medium">{formatZAR(sub.monthlyTotalZAR)}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  VAT (15%)
                </dt>
                <dd className="font-mono font-medium">{formatZAR(sub.vatZAR)}</dd>
              </div>
              <div className="sm:col-span-2">
                <Separator className="my-1" />
              </div>
              <div className="sm:col-span-2 flex items-baseline justify-between">
                <dt className="text-sm font-semibold">Total monthly charge</dt>
                <dd className="font-mono font-bold text-lg">{formatZAR(sub.totalChargeZAR)}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" disabled className="gap-2">
                Change tier or services
              </Button>
              <Button variant="ghost" disabled className="gap-2 text-destructive hover:text-destructive">
                Cancel with 30 days notice
              </Button>
            </div>
          </section>

          {/* Documents (empty stub) */}
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Documents
            </h2>
            <div className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-8 text-center">
              <Lock className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Your monthly P&amp;L, balance sheet, VAT201 confirmations and IRP5s will appear here as the month closes.
              </p>
            </div>
          </section>
        </div>

        {/* Right column: at-a-glance */}
        <aside className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              At a glance
            </h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> Next billing
                </dt>
                <dd className="font-medium">{formatLongDate(sub.nextBillingDate)}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3" /> Subscription started
                </dt>
                <dd className="font-medium">{formatLongDate(sub.createdAt)}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-primary/25 bg-primary/[0.04] p-6">
            <h2 className="text-base font-semibold mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Need to speak to your accountant?
            </h2>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Your assigned AGA(SA) reviewer responds within one business day.
            </p>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={
                <a
                  href={siteConfig.links.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Book a 15-minute call
            </Button>
          </section>
        </aside>
      </div>

      {/* Waitlist for visitors who do not yet have an account */}
      <section className="mt-16 pt-10 border-t border-border">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Not a client yet?
          </p>
          <h2 className="text-2xl font-bold tracking-tight mb-3">Get notified when login goes live</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            We&rsquo;ll let you know the moment the portal opens for sign-ups, alongside any major Capucor product updates.
          </p>
          <PortalNotifyForm />
          <Link
            href="/pricing"
            className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Build your subscription →
          </Link>
        </div>
      </section>
    </main>
  );
}
