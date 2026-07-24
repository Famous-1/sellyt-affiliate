import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { Copy, QrCode, Share2 } from 'lucide-react';
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
import { useAuth } from '@/lib/auth/auth-context';
import { DEMO_AFFILIATE } from '@/lib/mock/data';

export function ReferralLinksPage() {
  const { user } = useAuth();
  const code = user?.referralCode ?? DEMO_AFFILIATE.referralCode ?? 'ALEX-SELLYT';
  const referralLink = `https://sellyt.com/?ref=${code}`;

  const shareCopy = useMemo(
    () =>
      `Grow your online store with Sellyt — inventory, WhatsApp sales, and payments in one place. Start free with my link: ${referralLink}`,
    [referralLink]
  );

  const copyText = async (value: string, message: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(message);
    } catch {
      toast.error('Could not copy');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        heading="Referral links"
        description="Copy your unique link, download a QR code, or grab ready-to-share copy."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your unique link</CardTitle>
            <CardDescription>
              Merchants who subscribe through this link are attributed to you.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="referral-code">Referral code</Label>
              <Input id="referral-code" value={code} readOnly />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="referral-link">Referral URL</Label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input id="referral-link" value={referralLink} readOnly className="font-mono text-sm" />
                <Button
                  className="shrink-0"
                  onClick={() => copyText(referralLink, 'Referral link copied')}
                >
                  <Copy className="size-4" />
                  Copy
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Tip: add UTM params when posting on social for cleaner analytics.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QR code</CardTitle>
            <CardDescription>
              Show this QR at events or in videos so people can scan and sign up.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="flex size-48 items-center justify-center rounded-xl border border-dashed border-primary/40 bg-primary/5 text-primary">
              <div className="flex flex-col items-center gap-2">
                <QrCode className="size-16" />
                <span className="text-xs font-medium">{code}</span>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => toast.success('QR download coming soon (demo)')}
            >
              Download QR
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="size-4 text-primary" />
            Share copy
          </CardTitle>
          <CardDescription>
            Paste this caption into Instagram, WhatsApp, or email campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Textarea value={shareCopy} readOnly rows={4} />
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => copyText(shareCopy, 'Share copy ready')}>
              <Copy className="size-4" />
              Copy caption
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                copyText(
                  `Join Sellyt with my code ${code} → ${referralLink}`,
                  'Short copy copied'
                )
              }
            >
              Copy short version
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
