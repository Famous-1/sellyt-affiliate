import { Badge } from '@/components/atoms/badge';
import type { CommissionStatus, WithdrawalStatus, ApplicationStatus } from '@/types';

const map: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'destructive'> = {
  pending: 'warning',
  approved: 'success',
  paid: 'success',
  active: 'success',
  rejected: 'destructive',
  failed: 'destructive',
  suspended: 'destructive',
};

export function StatusBadge({
  status,
}: {
  status: CommissionStatus | WithdrawalStatus | ApplicationStatus | string;
}) {
  return (
    <Badge variant={map[status] ?? 'default'} className="capitalize">
      {status}
    </Badge>
  );
}
