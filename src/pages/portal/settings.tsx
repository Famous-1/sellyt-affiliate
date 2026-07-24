import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components/atoms';
import { PageHeader } from '@/components/molecules';
import { useAuth } from '@/lib/auth/auth-context';
import { DEMO_AFFILIATE } from '@/lib/mock/data';

export function SettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name ?? DEMO_AFFILIATE.name,
    email: user?.email ?? DEMO_AFFILIATE.email,
    phone: '+2348011112233',
  });
  const [payout, setPayout] = useState({
    accountName: user?.name ?? DEMO_AFFILIATE.name,
    accountNumber: '0123456789',
    bankName: 'GTBank',
    method: 'bank',
  });

  const updateProfile =
    (key: keyof typeof profile) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setProfile((prev) => ({ ...prev, [key]: event.target.value }));

  const updatePayout =
    (key: keyof typeof payout) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setPayout((prev) => ({ ...prev, [key]: event.target.value }));

  const onSave = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      toast.success('Settings saved');
      setLoading(false);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Settings"
        description="Manage your profile and payout details."
      />

      <form onSubmit={onSave} className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>How you appear in the affiliate portal</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={profile.name} onChange={updateProfile('name')} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={updateProfile('email')}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={profile.phone} onChange={updateProfile('phone')} />
            </div>
            <div className="rounded-lg bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
              Referral code:{' '}
              <span className="font-semibold text-primary">
                {user?.referralCode ?? DEMO_AFFILIATE.referralCode}
              </span>
              {' · '}
              Plan:{' '}
              <span className="font-semibold capitalize text-foreground">
                {user?.plan ?? DEMO_AFFILIATE.plan}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payout details</CardTitle>
            <CardDescription>Used for approved withdrawal requests</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="method">Preferred method</Label>
              <select
                id="method"
                value={payout.method}
                onChange={updatePayout('method')}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="bank">Bank transfer</option>
                <option value="paystack">Paystack</option>
                <option value="flutterwave">Flutterwave</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="accountName">Account name</Label>
              <Input
                id="accountName"
                value={payout.accountName}
                onChange={updatePayout('accountName')}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="accountNumber">Account number</Label>
              <Input
                id="accountNumber"
                value={payout.accountNumber}
                onChange={updatePayout('accountNumber')}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bankName">Bank name</Label>
              <Input
                id="bankName"
                value={payout.bankName}
                onChange={updatePayout('bankName')}
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Button type="submit" size="lg" isLoading={loading} label="Save changes" />
        </div>
      </form>
    </div>
  );
}
