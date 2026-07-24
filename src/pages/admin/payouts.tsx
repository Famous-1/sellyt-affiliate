import { useState } from 'react';
import toast from 'react-hot-toast';
import { Banknote, Check } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/atoms';
import { PageHeader, StatusBadge } from '@/components/molecules';
import { formatCurrency, formatDate } from '@/lib/helpers';
import { withdrawals as mockWithdrawals } from '@/lib/mock/data';
import type { WithdrawalRequest, WithdrawalStatus } from '@/types';

export function PayoutsPage() {
  const [items, setItems] = useState<WithdrawalRequest[]>(mockWithdrawals);

  const updateStatus = (id: string, status: WithdrawalStatus) => {
    setItems((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status } : w))
    );
    toast.success(
      status === 'paid'
        ? 'Payout marked as paid'
        : status === 'approved'
          ? 'Payout approved'
          : `Payout ${status}`
    );
  };

  const pendingTotal = items
    .filter((w) => w.status === 'pending' || w.status === 'approved')
    .reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Payouts"
        description={`${formatCurrency(pendingTotal)} awaiting processing`}
      />

      <Card>
        <CardHeader>
          <CardTitle>Withdrawal requests</CardTitle>
          <CardDescription>Approve and mark payouts as paid</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Affiliate</th>
                <th className="pb-3 pr-4 font-medium">Amount</th>
                <th className="pb-3 pr-4 font-medium">Method</th>
                <th className="pb-3 pr-4 font-medium">Account</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Date</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0">
                  <td className="py-3.5 pr-4 font-medium">{item.accountName}</td>
                  <td className="py-3.5 pr-4 font-semibold text-primary">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="py-3.5 pr-4 capitalize text-muted-foreground">
                    {item.method}
                  </td>
                  <td className="py-3.5 pr-4 font-mono text-xs">
                    {item.accountNumber}
                  </td>
                  <td className="py-3.5 pr-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 pr-4 text-muted-foreground">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="py-3.5">
                    {item.status === 'pending' ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateStatus(item.id, 'approved')}
                        >
                          <Check className="size-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(item.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : item.status === 'approved' ? (
                      <Button size="sm" onClick={() => updateStatus(item.id, 'paid')}>
                        <Banknote className="size-4" />
                        Mark paid
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
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
