import { cn } from '@/lib/utils';
import { formatZAR } from '@/lib/utils';

interface MonoPriceProps {
  amount: number;
  size?: 'lg' | 'base';
  className?: string;
}

export function MonoPrice({ amount, size = 'base', className }: MonoPriceProps) {
  return (
    <span
      className={cn(
        'font-mono whitespace-nowrap tabular-nums',
        size === 'lg' ? 'text-4xl font-bold' : 'text-base font-medium',
        className
      )}
    >
      {formatZAR(amount)}
    </span>
  );
}
