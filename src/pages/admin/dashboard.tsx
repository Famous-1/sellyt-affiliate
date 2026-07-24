import {
  BadgePercent,
  FileText,
  MousePointerClick,
  Users,
  WalletCards,
} from 'lucide-react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms';
import { MetricCard, PageHeader } from '@/components/molecules';
import { formatCurrency, formatNumber } from '@/lib/helpers';
import { adminOverview, weeklyActivity } from '@/lib/mock/data';

export function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Program overview"
        description="All-time performance across the Sellyt affiliate program."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Affiliates"
          value={formatNumber(adminOverview.affiliates)}
          icon={Users}
        />
        <MetricCard
          label="Affiliate revenue"
          value={formatCurrency(adminOverview.affiliateRevenue)}
          icon={BadgePercent}
        />
        <MetricCard
          label="Pending applications"
          value={formatNumber(adminOverview.pendingApplications)}
          icon={FileText}
          highlight
        />
        <MetricCard
          label="Pending payouts"
          value={formatCurrency(adminOverview.pendingPayouts)}
          hint={`${formatCurrency(adminOverview.commissionsPaid)} paid out`}
          icon={WalletCards}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          label="Total clicks"
          value={formatNumber(adminOverview.totalClicks)}
          hint={`${formatNumber(adminOverview.signups7d)} signups (7d)`}
          icon={MousePointerClick}
        />
        <MetricCard
          label="Paid conversions"
          value={formatNumber(adminOverview.paidConversions)}
          icon={BadgePercent}
        />
        <MetricCard
          label="Commissions paid"
          value={formatCurrency(adminOverview.commissionsPaid)}
          icon={WalletCards}
        />
      </div>

      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle>Program activity (7 days)</CardTitle>
          <CardDescription>
            Program-wide clicks, signups, and paid conversions
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={40} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="clicks"
                name="Clicks"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="signups"
                name="Signups"
                stroke="#062c1b"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="paid"
                name="Paid"
                stroke="#94a3b8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
