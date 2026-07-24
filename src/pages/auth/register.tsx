import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Button, Input, Label, Textarea } from '@/components/atoms';
import { useAuth } from '@/lib/auth/auth-context';
import { routes } from '@/lib/constants';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    audience: '',
    platforms: '',
    website: '',
    reason: '',
  });

  const update = (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      register({ name: form.name, email: form.email });
      toast.success('Application submitted. Check your email to verify.');
      navigate(routes.verifyEmail);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Become an affiliate</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Apply in about 2 minutes. We’ll review and notify you by email.
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={form.name} onChange={update('name')} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={update('email')}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={form.phone} onChange={update('phone')} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="audience">Audience size</Label>
            <Input
              id="audience"
              placeholder="e.g. 10k-50k"
              value={form.audience}
              onChange={update('audience')}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="platforms">Platforms</Label>
            <Input
              id="platforms"
              placeholder="YouTube, Instagram"
              value={form.platforms}
              onChange={update('platforms')}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="website">Website / social (optional)</Label>
            <Input
              id="website"
              value={form.website}
              onChange={update('website')}
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="reason">Why do you want to promote Sellyt?</Label>
            <Textarea
              id="reason"
              value={form.reason}
              onChange={update('reason')}
              required
            />
          </div>
        </div>
        <Button
          type="submit"
          size="lg"
          isLoading={loading}
          label="Submit application"
        />
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Already approved?{' '}
        <Link to={routes.login} className="font-medium text-primary">
          Log in
        </Link>
      </p>
    </div>
  );
}
