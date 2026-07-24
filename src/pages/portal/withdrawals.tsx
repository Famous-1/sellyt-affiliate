import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components/atoms';
import { PageHeader, StatusBadge } from '@/components/molecules';
import { formatCurrency, formatDate } from '@/lib/helpers';
import { portalMetrics, withdrawals as mockWithdrawals } from '@/lib/mock/data';
import type { WithdrawalRequest } from '@/types';

export function WithdrawalsPage() {
  const [history, setHistory] = useState<WithdrawalRequest[]>(mockWithdrawals);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'bank' | 'paystack' | 'flutterwave'>('bank');
  const [loading, setLoading] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = Number(amount);
    if (!value || value < 5000) {
      toast.error('Minimum withdrawal is ₦5,000');
      return;
    }
    if (value > portalMetrics.availableBalance) {
      toast.error('Amount exceeds available balance');
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      const next: WithdrawalRequest = {
        id: `w-${Date.now()}`,
        amount: value,
        method,
        accountName: 'Alex Creator',
        accountNumber: '0123456789',
        status: 'pending',
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setHistory((prev) => [next, ...prev]);
      setAmount('');
      toast.success('Withdrawal request submitted');
      setLoading(false);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Withdrawals"
        description={`Available balance: ${formatCurrency(portalMetrics.availableBalance)}`}
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Request payout</CardTitle>
            <CardDescription>
              Funds are sent to your saved payout method after approval.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="amount">Amount (NGN)</Label>
                <Input
                  id="amount"
                  type="number"
                  min={5000}
                  step={1000}
                  placeholder="50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="method">Payout method</Label>
                <select
                  id="method"
                  value={method}
                  onChange={(e) =>
                    setMethod(e.target.value as 'bank' | 'paystack' | 'flutterwave')
                  }
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <option value="bank">Bank transfer</option>
                  <option value="paystack">Paystack</option>
                  <option value="flutterwave">Flutterwave</option>
                </select>
              </div>
              <Button type="submit" isLoading={loading} label="Submit request" />
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>History</CardTitle>
            <CardDescription>Track the status of your payout requests</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Amount</th>
                  <th className="pb-3 pr-4 font-medium">Method</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="py-3.5 pr-4 font-semibold">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className="py-3.5 pr-4 capitalize text-muted-foreground">
                      {item.method}
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
    </div>
  );
}
