import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/atoms/card';
import { cn } from '@/lib/utils';

export function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
  className,
  highlight = false,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <Card
      className={cn(
        'overflow-hidden border-border/80 shadow-sm transition-shadow hover:shadow-md',
        highlight && 'border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-white',
        className
      )}
    >
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        {Icon && (
          <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
            <Icon className="size-5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
