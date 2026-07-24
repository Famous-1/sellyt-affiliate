import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/atoms';
import { PageHeader, StatusBadge } from '@/components/molecules';
import { formatCurrency, formatDate, formatNumber } from '@/lib/helpers';
import { affiliates } from '@/lib/mock/data';

export function AffiliatesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Affiliates"
        description="Directory of approved partners and their performance."
      />

      <Card>
        <CardHeader>
          <CardTitle>Affiliate directory</CardTitle>
          <CardDescription>{affiliates.length} affiliates listed</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Affiliate</th>
                <th className="pb-3 pr-4 font-medium">Code</th>
                <th className="pb-3 pr-4 font-medium">Plan</th>
                <th className="pb-3 pr-4 font-medium">Clicks</th>
                <th className="pb-3 pr-4 font-medium">Signups</th>
                <th className="pb-3 pr-4 font-medium">Paid</th>
                <th className="pb-3 pr-4 font-medium">Earnings</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {affiliates.map((aff) => (
                <tr key={aff.id} className="border-b border-border last:border-0">
                  <td className="py-3.5 pr-4">
                    <p className="font-medium">{aff.name}</p>
                    <p className="text-xs text-muted-foreground">{aff.email}</p>
                  </td>
                  <td className="py-3.5 pr-4 font-mono text-xs">{aff.referralCode}</td>
                  <td className="py-3.5 pr-4 capitalize">{aff.plan}</td>
                  <td className="py-3.5 pr-4">{formatNumber(aff.clicks)}</td>
                  <td className="py-3.5 pr-4">{formatNumber(aff.signups)}</td>
                  <td className="py-3.5 pr-4">{formatNumber(aff.paidConversions)}</td>
                  <td className="py-3.5 pr-4 font-semibold text-primary">
                    {formatCurrency(aff.earnings)}
                  </td>
                  <td className="py-3.5 pr-4">
                    <StatusBadge status={aff.status} />
                  </td>
                  <td className="py-3.5 text-muted-foreground">
                    {formatDate(aff.joinedAt)}
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
