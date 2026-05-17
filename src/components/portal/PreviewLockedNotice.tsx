import Link from 'next/link';
import { Lock, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PortalNotifyForm } from '@/components/portal/PortalNotifyForm';
import { siteConfig } from '@/config/site';

interface PreviewLockedNoticeProps {
  title?: string;
  body?: string;
}

export function PreviewLockedNotice({
  title = 'Client portal coming soon',
  body = "We're putting the finishing touches on it. Drop your email and we'll let you know the moment it's ready.",
}: PreviewLockedNoticeProps) {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 lg:py-24">
      <div className="rounded-2xl border border-border bg-card p-8 lg:p-10 text-center mb-10">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 mb-5">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{title}</h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
          {body}
        </p>
      </div>

      <div className="max-w-sm mx-auto mb-10">
        <PortalNotifyForm />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center text-center">
        <Button nativeButton={false} variant="outline" render={<Link href="/" />} className="gap-2">
          Back to home
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          nativeButton={false}
          variant="ghost"
          className="gap-2"
          render={
            <a
              href={siteConfig.links.booking}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <Calendar className="h-4 w-4" />
          Book a 15-minute call
        </Button>
      </div>
    </main>
  );
}
