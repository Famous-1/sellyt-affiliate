import { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Button, Input, Label } from '@/components/atoms';
import { useAuth } from '@/lib/auth/auth-context';
import { routes } from '@/lib/constants';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@sellyt.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      login(email, 'admin');
      toast.success('Admin signed in');
      navigate(routes.admin.dashboard);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Admin login</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage applications, commissions, and payouts.
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="admin-email">Email</Label>
          <Input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" size="lg" isLoading={loading} label="Sign in" />
      </form>
    </div>
  );
}
