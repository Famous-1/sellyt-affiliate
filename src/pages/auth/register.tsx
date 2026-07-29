import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Button, Input, Label } from '@/components/atoms';
import { useAuth } from '@/lib/auth/auth-context';
import { routes } from '@/lib/constants';
import { cn } from '@/lib/utils';

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Nigeria',
  'India',
  'Germany',
  'Kenya',
  'France',
  'Canada',
] as const;

const CHANNELS = [
  'YouTube',
  'Instagram',
  'TikTok',
  'Blog',
  'Newsletter',
  'Podcast',
  'Community',
  'Other',
] as const;

const PAYOUT_METHODS = ['PayPal', 'Bank transfer', 'Wise', 'Stripe'] as const;

const selectClassName = cn(
  'flex h-10 w-full rounded-md border border-input bg-transparent px-3.5 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow]',
  'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
  'disabled:cursor-not-allowed disabled:opacity-50'
);

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    password: '',
    confirmPassword: '',
    channel: '',
    socialUrl: '',
    website: '',
    audienceSize: '',
    payoutMethod: '',
  });

  const update =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!agreed) {
      toast.error('Please agree to the Terms & Conditions.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      register({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
      });
      toast.success('Application submitted. Check your email to verify.');
      navigate(routes.verifyEmail);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Apply to be a Sellyt affiliate
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Free to join. No Sellyt store required.
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={update('firstName')}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              value={form.lastName}
              onChange={update('lastName')}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={update('email')}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={update('phone')}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="country">Country</Label>
            <select
              id="country"
              className={selectClassName}
              value={form.country}
              onChange={update('country')}
              required
            >
              <option value="">Select</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={update('password')}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={update('confirmPassword')}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="channel">Preferred promotion channel</Label>
          <select
            id="channel"
            className={selectClassName}
            value={form.channel}
            onChange={update('channel')}
            required
          >
            <option value="">Select channel</option>
            {CHANNELS.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="socialUrl">Social profile URL</Label>
          <Input
            id="socialUrl"
            type="url"
            placeholder="https://"
            value={form.socialUrl}
            onChange={update('socialUrl')}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="website">Website (optional)</Label>
          <Input
            id="website"
            type="url"
            placeholder="https://"
            value={form.website}
            onChange={update('website')}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="audienceSize">Audience size (optional)</Label>
            <Input
              id="audienceSize"
              type="number"
              min={0}
              placeholder="10000"
              value={form.audienceSize}
              onChange={update('audienceSize')}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="payoutMethod">Preferred payout method</Label>
            <select
              id="payoutMethod"
              className={selectClassName}
              value={form.payoutMethod}
              onChange={update('payoutMethod')}
              required
            >
              <option value="">Select</option>
              {PAYOUT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 rounded border-input accent-primary"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
          />
          <span>
            I agree to the{' '}
            <a
              href="https://gosellyt.com/terms"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Terms & Conditions
            </a>{' '}
            and{' '}
            <a
              href="https://gosellyt.com/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={loading}
          label="Submit application"
        />
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to={routes.login} className="font-medium text-primary">
          Log in
        </Link>
      </p>
    </div>
  );
}
