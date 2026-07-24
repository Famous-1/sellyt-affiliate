import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/atoms';
import { PageHeader, StatusBadge } from '@/components/molecules';
import { formatCurrency, formatDate } from '@/lib/helpers';
import { conversions } from '@/lib/mock/data';

export function ConversionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Conversions"
        description="Every merchant signup and paid subscription attributed to you."
      />

      <Card>
        <CardHeader>
          <CardTitle>Commission history</CardTitle>
          <CardDescription>
            {conversions.length} conversion{conversions.length === 1 ? '' : 's'} recorded
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Merchant</th>
                <th className="pb-3 pr-4 font-medium">Plan</th>
                <th className="pb-3 pr-4 font-medium">Amount</th>
                <th className="pb-3 pr-4 font-medium">Commission</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {conversions.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0">
                  <td className="py-3.5 pr-4 font-medium">{item.merchantName}</td>
                  <td className="py-3.5 pr-4 text-muted-foreground">{item.plan}</td>
                  <td className="py-3.5 pr-4">{formatCurrency(item.amount)}</td>
                  <td className="py-3.5 pr-4 font-semibold text-primary">
                    {formatCurrency(item.commission)}
                  </td>
                  <td className="py-3.5 pr-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 text-muted-foreground">
                    {formatDate(item.createdAt)}
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
