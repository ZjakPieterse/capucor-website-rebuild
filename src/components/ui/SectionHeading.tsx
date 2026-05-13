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
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#2DD4BF]/80">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-4xl font-normal leading-[1.02] tracking-[-0.045em] text-white md:text-5xl">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-sm leading-7 text-white/45">
          {subtitle}
        </p>
      )}
    </div>
  );
}
