import { Link } from 'react-router';
import { MailCheck } from 'lucide-react';
import { Button } from '@/components/atoms';
import { routes } from '@/lib/constants';

export function VerifyEmailPage() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="rounded-full bg-primary/10 p-3 text-primary">
        <MailCheck className="size-6" />
      </div>
      <h1 className="text-2xl font-bold">Verify your email</h1>
      <p className="text-sm text-muted-foreground">
        We sent a verification link to your inbox. After approval, you can log
        in to your affiliate portal.
      </p>
      <Button asChild size="lg" className="w-full">
        <Link to={routes.login}>Go to login</Link>
      </Button>
    </div>
  );
}
