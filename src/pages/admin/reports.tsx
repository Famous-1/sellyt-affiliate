import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BadgePercent, MousePointerClick, Users, WalletCards } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms';
import { MetricCard, PageHeader } from '@/components/molecules';
import { formatCurrency, formatNumber } from '@/lib/helpers';
import { adminOverview, weeklyActivity } from '@/lib/mock/data';

export function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Reports"
        description="High-level summary of affiliate program health."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Affiliate revenue"
          value={formatCurrency(adminOverview.affiliateRevenue)}
          hint="Attributed subscription revenue"
          icon={BadgePercent}
        />
        <MetricCard
          label="Commissions paid"
          value={formatCurrency(adminOverview.commissionsPaid)}
          hint="Paid to affiliates"
          icon={WalletCards}
        />
        <MetricCard
          label="Active affiliates"
          value={formatNumber(adminOverview.affiliates)}
          hint={`${adminOverview.pendingApplications} awaiting review`}
          icon={Users}
        />
        <MetricCard
          label="Signups (7d)"
          value={formatNumber(adminOverview.signups7d)}
          hint={`${formatNumber(adminOverview.totalClicks)} total clicks`}
          icon={MousePointerClick}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly funnel</CardTitle>
          <CardDescription>Clicks → signups → paid conversions</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={40} />
              <Tooltip />
              <Legend />
              <Bar dataKey="clicks" name="Clicks" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="signups" name="Signups" fill="#062c1b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="paid" name="Paid" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Conversion rate</CardTitle>
            <CardDescription>Paid / signups (lifetime)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">
              {(
                (adminOverview.paidConversions /
                  Math.max(adminOverview.signups7d, 1)) *
                100
              ).toFixed(1)}
              %
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Demo rate using 7d signups as proxy
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg commission</CardTitle>
            <CardDescription>Per paid conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatCurrency(
                Math.round(
                  adminOverview.commissionsPaid /
                    Math.max(adminOverview.paidConversions, 1)
                )
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payout queue</CardTitle>
            <CardDescription>Outstanding affiliate balances</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatCurrency(adminOverview.pendingPayouts)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
