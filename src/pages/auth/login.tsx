import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Button, Input, Label } from '@/components/atoms';
import { useAuth } from '@/lib/auth/auth-context';
import { routes } from '@/lib/constants';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('password');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      login(email, 'affiliate');
      toast.success('Welcome back');
      navigate(routes.portal.dashboard);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Log in to your Sellyt affiliate portal.
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              className="text-sm font-medium text-primary hover:underline"
              onClick={() => toast('Password reset is coming soon.')}
            >
              Forgot?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="size-4 rounded border-input accent-primary"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          Remember me
        </label>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={loading}
          label="Log in"
        />
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link to={routes.register} className="font-medium text-primary">
          Apply now
        </Link>
      </p>
    </div>
  );
}
