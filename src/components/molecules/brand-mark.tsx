import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/constants';
import SellytLogo from '@/assets/svg/sellyt-logo.svg?react';
import SellytIcon from '@/assets/svg/sellyt-icon.svg?react';

export function BrandMark({
  className,
  showWordmark = true,
  to = routes.home,
}: {
  className?: string;
  showWordmark?: boolean;
  to?: string;
}) {
  const Logo = showWordmark ? SellytLogo : SellytIcon;

  return (
    <Link to={to} className={cn('inline-flex items-center', className)} aria-label="Sellyt">
      <Logo
        className={cn('w-auto shrink-0', showWordmark ? 'h-8' : 'h-7')}
        aria-hidden
      />
    </Link>
  );
}
