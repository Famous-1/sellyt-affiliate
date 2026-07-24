import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/constants';

export function BrandMark({
  className,
  showWordmark = true,
  to = routes.home,
  light = false,
}: {
  className?: string;
  showWordmark?: boolean;
  to?: string;
  light?: boolean;
}) {
  return (
    <Link to={to} className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-primary text-sm font-bold text-white shadow-sm shadow-primary/30">
        S
      </span>
      {showWordmark && (
        <span
          className={cn(
            'text-lg font-bold tracking-tight',
            light ? 'text-white' : 'text-foreground'
          )}
        >
          Sellyt
        </span>
      )}
    </Link>
  );
}
