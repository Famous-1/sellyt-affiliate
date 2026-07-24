import { Link } from 'react-router';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  ChartColumn,
  CircleDollarSign,
  QrCode,
  Share2,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Button, Badge, Card, CardContent } from '@/components/atoms';
import { LandingNavbar } from '@/components/molecules/landing-navbar';
import { BrandMark } from '@/components/molecules/brand-mark';
import { routes } from '@/lib/constants';
import { commissionTiers } from '@/lib/mock/data';
import { formatCurrency } from '@/lib/helpers';

const audiences = [
  'YouTubers',
  'Influencers',
  'Bloggers',
  'Community owners',
  'Educators',
  'Agencies',
];

const steps = [
  {
    title: 'Get your link',
    description:
      'Sign up in minutes and grab your unique referral link and QR code.',
    icon: QrCode,
  },
  {
    title: 'Share & track',
    description:
      'Promote Sellyt anywhere. Track every click, signup, and paid conversion in real time.',
    icon: Share2,
  },
  {
    title: 'Get paid',
    description:
      'Commissions are auto-calculated. Withdraw to bank or Paystack when you’re ready.',
    icon: Banknote,
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,181,115,0.14),_transparent_55%)]" />
          <div className="pointer-events-none absolute -right-24 top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 size-56 rounded-full bg-[#00EB7B]/15 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-2 md:items-center md:gap-16 md:px-6 md:py-24">
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-[#166534]">
                <span className="size-1.5 rounded-full bg-primary" />
                New — Sellyt Affiliate Program
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
                Promote Sellyt.{' '}
                <span className="text-primary">
                  Earn on every paid subscription.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Share Sellyt with your audience and earn recurring commissions
                whenever a merchant upgrades to a paid plan. No Sellyt store
                required.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg" className="rounded-lg shadow-md shadow-primary/25">
                  <Link to={routes.register}>
                    Apply in 2 minutes
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-lg border-border text-foreground"
                >
                  <a href="#how-it-works">See how it works</a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-5 pt-2 text-sm font-medium text-foreground/80">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="size-5 text-primary" />
                  Free to join
                </span>
                <span className="inline-flex items-center gap-2">
                  <CircleDollarSign className="size-5 text-primary" />
                  Recurring commissions
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-primary/30 via-primary/5 to-transparent blur-xl" />
              <Card className="relative overflow-hidden rounded-2xl border-primary/15 shadow-2xl shadow-primary/10">
                <div className="flex items-center justify-between bg-gradient-to-r from-[#062c1b] to-[#0a3d28] px-5 py-3.5 text-white">
                  <div>
                    <p className="text-sm font-semibold">Your affiliate dashboard</p>
                    <p className="text-xs text-white/70">Live performance</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00EB7B]/20 px-2.5 py-1 text-[11px] font-semibold text-[#00EB7B]">
                    <span className="size-1.5 animate-pulse rounded-full bg-[#00EB7B]" />
                    Live
                  </span>
                </div>
                <CardContent className="space-y-4 bg-gradient-to-b from-white to-muted/40 p-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ['Clicks', '12,483'],
                      ['Signups', '342'],
                      ['Paid', '58'],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-border/80 bg-white p-3 shadow-sm"
                      >
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="mt-1 text-xl font-bold tracking-tight">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          Available balance
                        </p>
                        <p className="mt-1 text-3xl font-bold tracking-tight text-primary">
                          {formatCurrency(128450)}
                        </p>
                      </div>
                      <Button size="sm" className="rounded-lg">
                        Withdraw
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2 rounded-lg border border-border bg-white px-3 py-2.5">
                      <code className="truncate font-mono text-xs text-muted-foreground">
                        sellyt.com/?ref=ALEX-SELLYT
                      </code>
                      <Badge variant="primary">Copy</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="who" className="border-y border-border bg-[#F7FBF8] py-14">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-8 flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Users className="size-4" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                Built for creators, entrepreneurs & agencies
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {audiences.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
                How it works
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Three simple steps to your first commission
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                From application to payout — built to stay transparent and fast.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <Card
                  key={step.title}
                  className="group border-border/80 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                >
                  <CardContent className="flex flex-col gap-5 p-6">
                    <div className="flex items-center justify-between">
                      <div className="rounded-2xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <step.icon className="size-5" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Step {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="commissions" className="bg-[#F7FBF8] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-12 max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
                Commissions
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                Two plans. Rates: Standard 20%, Premium 25%, Annual subscriptions
                30%.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {commissionTiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={
                    tier.popular
                      ? 'relative overflow-hidden border-primary shadow-xl shadow-primary/15'
                      : 'border-border/80'
                  }
                >
                  {tier.popular && (
                    <div className="absolute right-0 top-0 rounded-bl-xl bg-primary px-3 py-1 text-xs font-semibold text-white">
                      Most popular
                    </div>
                  )}
                  <CardContent className="flex flex-col gap-6 p-6 md:p-8">
                    <div>
                      <h3 className="text-xl font-semibold">{tier.name}</h3>
                      <p className="mt-2 text-4xl font-bold tracking-tight">
                        {formatCurrency(tier.price)}
                        <span className="text-sm font-medium text-muted-foreground">
                          {' '}
                          / month
                        </span>
                      </p>
                      <p className="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">
                        {tier.rate} commission
                      </p>
                    </div>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium text-foreground/80">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5">
                <QrCode className="size-4 text-primary" /> Link + QR code
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5">
                <ChartColumn className="size-4 text-primary" /> Live analytics
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5">
                <Banknote className="size-4 text-primary" /> Fast payouts
              </span>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#062c1b] via-[#0a3d28] to-primary p-8 text-white shadow-2xl shadow-primary/20 md:p-12">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                    Ready to earn with Sellyt?
                  </h2>
                  <p className="mt-3 text-white/75 md:text-lg">
                    Join creators already earning recurring commissions with the
                    Sellyt Affiliate Program.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-lg bg-white text-[#062c1b] hover:bg-white/90"
                  >
                    <Link to={routes.register}>Become an affiliate</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-lg border-white/40 bg-transparent text-white hover:bg-white/10"
                  >
                    <Link to={routes.login}>I already have an account</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex flex-col gap-3">
            <BrandMark />
            <span>© 2026 Sellyt. All rights reserved.</span>
          </div>
          <div className="flex gap-5">
            <a href="https://gosellyt.com/terms" className="hover:text-foreground">
              Terms
            </a>
            <a
              href="https://gosellyt.com/privacy-policy"
              className="hover:text-foreground"
            >
              Privacy
            </a>
            <Link to={routes.admin.login} className="hover:text-foreground">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
