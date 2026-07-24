import { Link } from 'react-router';
import { BrandMark } from '@/components/molecules/brand-mark';
import { Button } from '@/components/atoms';
import { routes } from '@/lib/constants';

const links = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#commissions', label: 'Commissions' },
  { href: '#who', label: "Who it's for" },
];

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[72px] md:px-6">
        <BrandMark className="shrink-0" />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button
            asChild
            variant="ghost"
            className="h-10 px-3 text-sm font-medium text-foreground hover:bg-transparent hover:text-primary sm:px-4"
          >
            <Link to={routes.login}>Log in</Link>
          </Button>
          <Button
            asChild
            className="h-10 rounded-lg px-3 text-sm shadow-sm shadow-primary/20 sm:px-5"
          >
            <Link to={routes.register}>
              <span className="sm:hidden">Join</span>
              <span className="hidden sm:inline">Become an affiliate</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
