import { Outlet } from 'react-router';
import { BrandMark } from '@/components/molecules/brand-mark';

export function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7FBF8]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,181,115,0.16),_transparent_50%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-10">
        <div className="mb-8 flex justify-center">
          <BrandMark />
        </div>
        <div className="rounded-2xl border border-border/80 bg-white p-6 shadow-xl shadow-primary/5 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
