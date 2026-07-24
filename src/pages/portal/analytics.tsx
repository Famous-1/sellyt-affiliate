import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MousePointerClick, ShoppingBag, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms';
import { MetricCard, PageHeader } from '@/components/molecules';
import { formatNumber } from '@/lib/helpers';
import { portalMetrics, weeklyActivity } from '@/lib/mock/data';

export function AnalyticsPage() {
  const weekClicks = weeklyActivity.reduce((sum, d) => sum + d.clicks, 0);
  const weekSignups = weeklyActivity.reduce((sum, d) => sum + d.signups, 0);
  const weekPaid = weeklyActivity.reduce((sum, d) => sum + d.paid, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Analytics"
        description="Understand how your traffic converts into paid subscriptions."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          label="Clicks (7d)"
          value={formatNumber(weekClicks)}
          hint={`${formatNumber(portalMetrics.clicks)} lifetime`}
          icon={MousePointerClick}
        />
        <MetricCard
          label="Signups (7d)"
          value={formatNumber(weekSignups)}
          hint={`${formatNumber(portalMetrics.signups)} lifetime`}
          icon={UserPlus}
        />
        <MetricCard
          label="Paid (7d)"
          value={formatNumber(weekPaid)}
          hint={`${formatNumber(portalMetrics.paid)} lifetime`}
          icon={ShoppingBag}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clicks & signups</CardTitle>
          <CardDescription>Daily trend for the past week</CardDescription>
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
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="signups"
                name="Signups"
                stroke="#062c1b"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Paid conversions</CardTitle>
          <CardDescription>Commission-eligible payments by day</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={32} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="paid" name="Paid" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
