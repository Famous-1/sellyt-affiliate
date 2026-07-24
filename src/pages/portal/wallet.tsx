import { Link } from 'react-router';
import { ArrowUpRight, Banknote, Clock3, Wallet } from 'lucide-react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms';
import { MetricCard, PageHeader } from '@/components/molecules';
import { routes } from '@/lib/constants';
import { formatCurrency } from '@/lib/helpers';
import { portalMetrics, withdrawals } from '@/lib/mock/data';

export function WalletPage() {
  const paidOut = withdrawals
    .filter((w) => w.status === 'paid')
    .reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Wallet"
        description="See balances, lifetime earnings, and recent payouts."
        actions={
          <Button asChild>
            <Link to={routes.portal.withdrawals}>
              Request withdrawal
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          label="Available balance"
          value={formatCurrency(portalMetrics.availableBalance)}
          hint="Ready to withdraw"
          icon={Wallet}
        />
        <MetricCard
          label="Pending balance"
          value={formatCurrency(portalMetrics.pendingBalance)}
          hint="Awaiting commission approval"
          icon={Clock3}
        />
        <MetricCard
          label="Lifetime earnings"
          value={formatCurrency(portalMetrics.lifetimeEarnings)}
          hint={`${formatCurrency(paidOut)} paid out`}
          icon={Banknote}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Earnings summary</CardTitle>
            <CardDescription>How your balance is composed</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {[
              {
                label: 'Available',
                value: portalMetrics.availableBalance,
                className: 'text-primary',
              },
              {
                label: 'Pending approval',
                value: portalMetrics.pendingBalance,
                className: 'text-foreground',
              },
              {
                label: 'Paid out',
                value: paidOut,
                className: 'text-muted-foreground',
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
              >
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className={`text-sm font-semibold ${row.className}`}>
                  {formatCurrency(row.value)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payout tips</CardTitle>
            <CardDescription>Keep withdrawals smooth</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>
              Minimum withdrawal is <span className="font-medium text-foreground">₦5,000</span>.
            </p>
            <p>
              Bank transfers usually clear within 1–2 business days after approval.
            </p>
            <p>
              Update your payout details under{' '}
              <Link to={routes.portal.settings} className="font-medium text-primary">
                Settings
              </Link>{' '}
              before requesting a withdrawal.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
