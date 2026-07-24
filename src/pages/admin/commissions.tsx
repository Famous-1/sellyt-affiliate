import { useState } from 'react';
import toast from 'react-hot-toast';
import { Check, X } from 'lucide-react';
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
import { conversions as mockConversions } from '@/lib/mock/data';
import type { CommissionStatus, Conversion } from '@/types';

export function CommissionsPage() {
  const [items, setItems] = useState<Conversion[]>(mockConversions);

  const updateStatus = (id: string, status: CommissionStatus) => {
    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
    toast.success(`Commission marked as ${status}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Commissions"
        description="Review and approve affiliate conversion commissions."
      />

      <Card>
        <CardHeader>
          <CardTitle>Conversion management</CardTitle>
          <CardDescription>
            {items.filter((c) => c.status === 'pending').length} pending review
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Merchant</th>
                <th className="pb-3 pr-4 font-medium">Plan</th>
                <th className="pb-3 pr-4 font-medium">Amount</th>
                <th className="pb-3 pr-4 font-medium">Commission</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Date</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
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
                          <X className="size-4" />
                          Reject
                        </Button>
                      </div>
                    ) : item.status === 'approved' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(item.id, 'paid')}
                      >
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
