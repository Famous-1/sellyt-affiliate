import { useState } from 'react';
import toast from 'react-hot-toast';
import { Bell, CheckCheck } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/atoms';
import { PageHeader } from '@/components/molecules';
import { formatDate } from '@/lib/helpers';
import { notifications as mockNotifications } from '@/lib/mock/data';
import type { NotificationItem } from '@/types';
import { cn } from '@/lib/utils';

export function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>(mockNotifications);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const markRead = (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Notifications"
        description={
          unread > 0
            ? `You have ${unread} unread notification${unread === 1 ? '' : 's'}.`
            : 'You are all caught up.'
        }
        actions={
          <Button variant="outline" onClick={markAllRead} disabled={unread === 0}>
            <CheckCheck className="size-4" />
            Mark all read
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-4 text-primary" />
            Inbox
          </CardTitle>
          <CardDescription>Commission, signup, and payout alerts</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => markRead(item.id)}
              className={cn(
                'flex w-full flex-col gap-1 rounded-lg border border-border p-4 text-left transition-colors hover:bg-muted/40',
                !item.read && 'border-primary/30 bg-primary/5'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold">{item.title}</p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatDate(item.createdAt)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{item.body}</p>
              {!item.read && (
                <span className="mt-1 text-xs font-medium text-primary">Unread</span>
              )}
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
