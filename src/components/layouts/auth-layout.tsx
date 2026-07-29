import { Outlet } from 'react-router';
import { BrandMark } from '@/components/molecules/brand-mark';
import { routes } from '@/lib/constants';

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#0B3D2E] px-10 py-10 text-white lg:flex xl:px-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(34,181,115,0.35),_transparent_55%)]" />
        <div className="relative">
          <BrandMark to={routes.home} />
        </div>
        <div className="relative max-w-md space-y-4">
          <h2 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Turn your audience into recurring revenue.
          </h2>
          <p className="text-base leading-relaxed text-white/70">
            Track referrals, monitor conversions, and get paid — all from one
            place.
          </p>
        </div>
        <p className="relative text-sm text-white/50">© 2026 Sellyt</p>
      </aside>

      <main className="flex min-h-screen flex-col bg-white">
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-6 py-8 sm:px-8 md:px-10 md:py-12">
          <div className="mb-8 lg:hidden">
            <BrandMark />
          </div>
          <div className="my-auto w-full py-4">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
