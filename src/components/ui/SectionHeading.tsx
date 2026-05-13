import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'space-y-4',
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl font-extralight leading-[1.02] tracking-[-0.055em] md:text-5xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
