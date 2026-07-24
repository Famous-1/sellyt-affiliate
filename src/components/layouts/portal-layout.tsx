import { useState } from 'react';
import { NavLink, Outlet, Navigate, Link } from 'react-router';
import {
  Bell,
  ChartColumn,
  CreditCard,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  Wallet,
  X,
} from 'lucide-react';
import { BrandMark } from '@/components/molecules/brand-mark';
import { Button } from '@/components/atoms';
import { useAuth } from '@/lib/auth/auth-context';
import { routes } from '@/lib/constants';
import { cn } from '@/lib/utils';

const nav = [
  { to: routes.portal.dashboard, label: 'Dashboard', icon: LayoutDashboard },
  { to: routes.portal.referralLinks, label: 'Referral links', icon: Link2 },
  { to: routes.portal.analytics, label: 'Analytics', icon: ChartColumn },
  { to: routes.portal.conversions, label: 'Conversions', icon: ShoppingBag },
  { to: routes.portal.wallet, label: 'Wallet', icon: Wallet },
  { to: routes.portal.withdrawals, label: 'Withdrawal requests', icon: CreditCard },
  { to: routes.portal.notifications, label: 'Notifications', icon: Bell },
  { to: routes.portal.settings, label: 'Settings', icon: Settings },
];

export function PortalLayout() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user || user.role !== 'affiliate') {
    return <Navigate to={routes.login} replace />;
  }

  const firstName = user.name.split(' ')[0];
  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const navItems = (
    <nav className="flex flex-1 flex-col gap-1 p-4">
      {nav.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === routes.portal.dashboard}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            cn(
              'inline-flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
              isActive &&
                'bg-primary text-white shadow-sm shadow-primary/25 hover:bg-primary hover:text-white'
            )
          }
        >
          <item.icon className="size-4 shrink-0" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-[256px_1fr]">
      <aside className="hidden min-h-screen flex-col border-r border-border bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <BrandMark to={routes.portal.dashboard} />
        </div>
        {navItems}
        <div className="border-t border-border p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
            onClick={logout}
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[280px] flex-col bg-white shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <BrandMark to={routes.portal.dashboard} />
              <button
                type="button"
                className="rounded-lg p-2 hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            {navItems}
            <div className="border-t border-border p-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground"
                onClick={logout}
              >
                <LogOut className="size-4" />
                Log out
              </Button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-col bg-[#F7FBF8]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-white/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md hover:bg-muted lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Affiliate portal
              </p>
              <p className="text-base font-semibold text-foreground">
                Welcome back, {firstName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="size-9 rounded-md"
            >
              <Link to={routes.portal.notifications} aria-label="Notifications">
                <Bell className="size-5" />
              </Link>
            </Button>
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {initials}
            </span>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
