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
import { formatDate } from '@/lib/helpers';
import { applications as mockApplications } from '@/lib/mock/data';
import type { AffiliateApplication, ApplicationStatus } from '@/types';

export function ApplicationsPage() {
  const [items, setItems] = useState<AffiliateApplication[]>(mockApplications);

  const updateStatus = (id: string, status: ApplicationStatus) => {
    setItems((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
    toast.success(status === 'approved' ? 'Application approved' : 'Application rejected');
  };

  const pending = items.filter((a) => a.status === 'pending').length;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Applications"
        description={`${pending} pending review · ${items.length} total`}
      />

      <div className="flex flex-col gap-4">
        {items.map((app) => (
          <Card key={app.id}>
            <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
              <div>
                <CardTitle>{app.name}</CardTitle>
                <CardDescription>
                  {app.email} · {app.phone} · Applied {formatDate(app.createdAt)}
                </CardDescription>
              </div>
              <StatusBadge status={app.status} />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">Audience</p>
                  <p className="text-sm font-medium">{app.audience}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Platforms</p>
                  <p className="text-sm font-medium">{app.platforms.join(', ')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Website</p>
                  <p className="truncate text-sm font-medium">
                    {app.website ?? '—'}
                  </p>
                </div>
              </div>
              <p className="rounded-lg bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                {app.reason}
              </p>
              {app.status === 'pending' && (
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => updateStatus(app.id, 'approved')}>
                    <Check className="size-4" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(app.id, 'rejected')}
                  >
                    <X className="size-4" />
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
