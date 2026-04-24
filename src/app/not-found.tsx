import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-32 px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">404</p>
      <h1 className="text-3xl font-bold tracking-tight mb-3">Page not found.</h1>
      <p className="text-muted-foreground max-w-sm mb-8">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <div className="flex gap-3">
        <Button nativeButton={false} render={<Link href="/" />}>Back to home</Button>
        <Button
          nativeButton={false}
          variant="outline"
          render={
            <a
              href={siteConfig.links.calendly}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          Book a Call
        </Button>
      </div>
    </div>
  );
}
