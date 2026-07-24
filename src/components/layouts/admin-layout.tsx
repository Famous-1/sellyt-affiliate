import { useState } from 'react';
import { NavLink, Outlet, Navigate, Link } from 'react-router';
import {
  BadgePercent,
  ChartColumn,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Shield,
  Users,
  WalletCards,
  X,
} from 'lucide-react';
import { BrandMark } from '@/components/molecules/brand-mark';
import { Button } from '@/components/atoms';
import { useAuth } from '@/lib/auth/auth-context';
import { routes } from '@/lib/constants';
import { cn } from '@/lib/utils';

const nav = [
  { to: routes.admin.dashboard, label: 'Overview', icon: LayoutDashboard },
  { to: routes.admin.applications, label: 'Applications', icon: FileText },
  { to: routes.admin.affiliates, label: 'Affiliates', icon: Users },
  { to: routes.admin.commissions, label: 'Commissions', icon: BadgePercent },
  { to: routes.admin.payouts, label: 'Payouts', icon: WalletCards },
  { to: routes.admin.reports, label: 'Reports', icon: ChartColumn },
  { to: routes.admin.settings, label: 'Settings', icon: Settings },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user || user.role !== 'admin') {
    return <Navigate to={routes.admin.login} replace />;
  }

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#111827]">
      <header className="sticky top-0 z-40 bg-[#111827]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <BrandMark to={routes.admin.dashboard} />
            <span className="hidden items-center gap-1.5 rounded-full border border-primary/40 px-2.5 py-1 text-xs font-semibold text-primary sm:inline-flex">
              <Shield className="size-3" />
              Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={routes.portal.dashboard}
              className="hidden items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white sm:inline-flex"
            >
              Affiliate portal
              <ExternalLink className="size-3.5" />
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
              title="Log out"
            >
              {initials}
            </button>
          </div>
        </div>

        <nav className="mx-auto hidden max-w-7xl gap-1 overflow-x-auto px-4 md:flex md:px-6">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-3 py-3 text-sm font-medium text-white/55 transition-colors hover:text-white',
                  isActive && 'border-primary text-white'
                )
              }
            >
              <item.icon className="size-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[280px] flex-col bg-[#111827] shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
              <BrandMark to={routes.admin.dashboard} />
              <button
                type="button"
                className="rounded-lg p-2 text-white/70 hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 p-3">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'inline-flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white',
                      isActive && 'bg-primary text-white hover:bg-primary hover:text-white'
                    )
                  }
                >
                  <item.icon className="size-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="border-t border-white/10 p-4">
              <Button
                asChild
                variant="outline"
                className="mb-2 w-full border-white/20 bg-transparent text-white hover:bg-white/10"
              >
                <Link to={routes.portal.dashboard} onClick={() => setMobileOpen(false)}>
                  Affiliate portal
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white/70 hover:bg-white/10 hover:text-white"
                onClick={logout}
              >
                <LogOut className="size-4" />
                Log out
              </Button>
            </div>
          </aside>
        </div>
      )}

      <div className="min-h-[calc(100vh-7.5rem)] rounded-t-[1.75rem] bg-[#F4F7F5] md:rounded-t-[2rem]">
        <main className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
