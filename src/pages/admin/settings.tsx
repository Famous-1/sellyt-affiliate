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
  Textarea,
} from '@/components/atoms';
import { PageHeader } from '@/components/molecules';
import { commissionTiers } from '@/lib/mock/data';

export function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    standardRate: '20',
    premiumRate: '25',
    minWithdrawal: '5000',
    cookieDays: '30',
    autoApprove: false,
    programName: 'Sellyt Affiliate Program',
    welcomeMessage:
      'Thanks for joining the Sellyt affiliate program. Share your link and start earning.',
  });

  const update =
    (key: keyof typeof settings) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        event.target.type === 'checkbox'
          ? (event.target as HTMLInputElement).checked
          : event.target.value;
      setSettings((prev) => ({ ...prev, [key]: value }));
    };

  const onSave = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      toast.success('Program settings saved');
      setLoading(false);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Program settings"
        description="Configure commission rates and affiliate program defaults."
      />

      <form onSubmit={onSave} className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Commission rates</CardTitle>
            <CardDescription>
              Current tiers: {commissionTiers.map((t) => `${t.name} ${t.rate}`).join(' · ')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="standardRate">Standard rate (%)</Label>
                <Input
                  id="standardRate"
                  type="number"
                  min={0}
                  max={100}
                  value={settings.standardRate}
                  onChange={update('standardRate')}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="premiumRate">Premium rate (%)</Label>
                <Input
                  id="premiumRate"
                  type="number"
                  min={0}
                  max={100}
                  value={settings.premiumRate}
                  onChange={update('premiumRate')}
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="minWithdrawal">Minimum withdrawal (NGN)</Label>
                <Input
                  id="minWithdrawal"
                  type="number"
                  min={0}
                  value={settings.minWithdrawal}
                  onChange={update('minWithdrawal')}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cookieDays">Attribution window (days)</Label>
                <Input
                  id="cookieDays"
                  type="number"
                  min={1}
                  value={settings.cookieDays}
                  onChange={update('cookieDays')}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Program details</CardTitle>
            <CardDescription>Messaging shown to affiliates</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="programName">Program name</Label>
              <Input
                id="programName"
                value={settings.programName}
                onChange={update('programName')}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="welcomeMessage">Welcome message</Label>
              <Textarea
                id="welcomeMessage"
                rows={4}
                value={settings.welcomeMessage}
                onChange={update('welcomeMessage')}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.autoApprove}
                onChange={update('autoApprove')}
                className="size-4 accent-[var(--primary)]"
              />
              Auto-approve new applications
            </label>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Button type="submit" size="lg" isLoading={loading} label="Save settings" />
        </div>
      </form>
    </div>
  );
}
