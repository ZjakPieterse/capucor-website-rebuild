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
        'space-y-3',
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
