import { Link } from 'react-router';
import toast from 'react-hot-toast';
import {
  ArrowRight,
  Copy,
  Eye,
  MousePointerClick,
  ShoppingBag,
  Wallet,
} from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/atoms';
import { MetricCard, StatusBadge } from '@/components/molecules';
import { routes } from '@/lib/constants';
import { formatCurrency, formatDate, formatNumber } from '@/lib/helpers';
import { useAuth } from '@/lib/auth/auth-context';
import {
  conversions,
  DEMO_AFFILIATE,
  portalMetrics,
  weeklyActivity,
} from '@/lib/mock/data';

export function DashboardPage() {
  const { user } = useAuth();
  const code = user?.referralCode ?? DEMO_AFFILIATE.referralCode;
  const referralLink = `https://sellyt.com/?ref=${code}`;
  const conversionRate =
    portalMetrics.signups > 0
      ? ((portalMetrics.paid / portalMetrics.signups) * 100).toFixed(1)
      : '0';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success('Referral link copied');
    } catch {
      toast.error('Could not copy link');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Available balance"
          value={formatCurrency(portalMetrics.availableBalance)}
          icon={Wallet}
          highlight
        />
        <MetricCard
          label="Clicks"
          value={formatNumber(portalMetrics.clicks)}
          icon={MousePointerClick}
        />
        <MetricCard
          label="Signups"
          value={formatNumber(portalMetrics.signups)}
          icon={Eye}
        />
        <MetricCard
          label="Paid conversions"
          value={formatNumber(portalMetrics.paid)}
          hint={`${conversionRate}% conv.`}
          icon={ShoppingBag}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <Card className="border-border/80 shadow-sm xl:col-span-3">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Performance (7 days)</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary">
              <Link to={routes.portal.analytics}>
                View analytics
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} width={40} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={false}
                  name="Clicks"
                />
                <Line
                  type="monotone"
                  dataKey="signups"
                  stroke="#062c1b"
                  strokeWidth={2}
                  dot={false}
                  name="Signups"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm xl:col-span-2">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button onClick={copyLink} className="justify-start rounded-lg">
              <Copy className="size-4" />
              Copy referral link
            </Button>
            <Button asChild variant="outline" className="justify-start rounded-lg">
              <Link to={routes.portal.withdrawals}>Request withdrawal</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start rounded-lg">
              <Link to={routes.portal.wallet}>View wallet</Link>
            </Button>
            <div className="mt-2 space-y-1 rounded-xl bg-muted/50 px-3 py-3 text-sm">
              <p className="text-muted-foreground">
                Pending:{' '}
                <span className="font-semibold text-foreground">
                  {formatCurrency(portalMetrics.pendingBalance)}
                </span>
              </p>
              <p className="text-muted-foreground">
                Lifetime:{' '}
                <span className="font-semibold text-foreground">
                  {formatCurrency(portalMetrics.lifetimeEarnings)}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/80 shadow-sm">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Recent referrals</CardTitle>
          <Button asChild variant="ghost" size="sm" className="text-primary">
            <Link to={routes.portal.conversions}>
              See all
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">ID</th>
                <th className="pb-3 pr-4 font-medium">Merchant</th>
                <th className="pb-3 pr-4 font-medium">Date</th>
                <th className="pb-3 pr-4 font-medium">Plan</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">Commission</th>
              </tr>
            </thead>
            <tbody>
              {conversions.slice(0, 5).map((item) => (
                <tr key={item.id} className="border-b border-border/60 last:border-0">
                  <td className="py-3.5 pr-4 font-mono text-xs text-muted-foreground">
                    {item.id}
                  </td>
                  <td className="py-3.5 pr-4 font-medium">{item.merchantName}</td>
                  <td className="py-3.5 pr-4 text-muted-foreground">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="py-3.5 pr-4">{item.plan || '—'}</td>
                  <td className="py-3.5 pr-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 font-semibold text-primary">
                    {formatCurrency(item.commission)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
