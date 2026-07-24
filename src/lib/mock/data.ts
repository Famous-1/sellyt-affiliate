import type {
  Affiliate,
  AffiliateApplication,
  AuthUser,
  Conversion,
  MetricPoint,
  NotificationItem,
  WithdrawalRequest,
} from '@/types';

export const DEMO_AFFILIATE: AuthUser = {
  id: 'aff-1',
  name: 'Alex Creator',
  email: 'alex@example.com',
  role: 'affiliate',
  referralCode: 'ALEX-SELLYT',
  plan: 'premium',
  status: 'approved',
};

export const DEMO_ADMIN: AuthUser = {
  id: 'admin-1',
  name: 'Sellyt Admin',
  email: 'admin@sellyt.com',
  role: 'admin',
};

export const portalMetrics = {
  clicks: 12483,
  signups: 342,
  paid: 58,
  availableBalance: 128450,
  pendingBalance: 24500,
  lifetimeEarnings: 418900,
};

export const weeklyActivity: MetricPoint[] = [
  { label: 'Mon', clicks: 820, signups: 24, paid: 4 },
  { label: 'Tue', clicks: 940, signups: 31, paid: 6 },
  { label: 'Wed', clicks: 1100, signups: 28, paid: 5 },
  { label: 'Thu', clicks: 980, signups: 36, paid: 8 },
  { label: 'Fri', clicks: 1250, signups: 42, paid: 9 },
  { label: 'Sat', clicks: 870, signups: 22, paid: 3 },
  { label: 'Sun', clicks: 760, signups: 19, paid: 2 },
];

export const conversions: Conversion[] = [
  {
    id: 'c1',
    merchantName: 'Fashion Hub',
    plan: 'Growth',
    amount: 10000,
    commission: 2500,
    status: 'approved',
    createdAt: '2026-07-20',
  },
  {
    id: 'c2',
    merchantName: 'Glow Beauty',
    plan: 'Starter',
    amount: 5000,
    commission: 1000,
    status: 'pending',
    createdAt: '2026-07-19',
  },
  {
    id: 'c3',
    merchantName: 'Tech Cart NG',
    plan: 'Annual Growth',
    amount: 50000,
    commission: 15000,
    status: 'paid',
    createdAt: '2026-07-12',
  },
  {
    id: 'c4',
    merchantName: 'Fresh Foods Co',
    plan: 'Growth',
    amount: 10000,
    commission: 2500,
    status: 'rejected',
    createdAt: '2026-07-08',
  },
];

export const withdrawals: WithdrawalRequest[] = [
  {
    id: 'w1',
    amount: 50000,
    method: 'bank',
    accountName: 'Alex Creator',
    accountNumber: '0123456789',
    status: 'paid',
    createdAt: '2026-07-01',
  },
  {
    id: 'w2',
    amount: 25000,
    method: 'paystack',
    accountName: 'Alex Creator',
    accountNumber: '0123456789',
    status: 'pending',
    createdAt: '2026-07-18',
  },
];

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Commission approved',
    body: 'Your ₦2,500 commission from Fashion Hub was approved.',
    read: false,
    createdAt: '2026-07-20T10:00:00Z',
  },
  {
    id: 'n2',
    title: 'New signup',
    body: 'A merchant signed up using your referral link.',
    read: false,
    createdAt: '2026-07-19T14:30:00Z',
  },
  {
    id: 'n3',
    title: 'Withdrawal paid',
    body: 'Your withdrawal of ₦50,000 has been paid.',
    read: true,
    createdAt: '2026-07-01T09:00:00Z',
  },
];

export const applications: AffiliateApplication[] = [
  {
    id: 'a1',
    name: 'Ngozi Okeke',
    email: 'ngozi@creators.ng',
    phone: '+2348012345678',
    audience: '50k+',
    platforms: ['YouTube', 'Instagram'],
    website: 'https://ngozi.blog',
    reason: 'I review SaaS tools for SMEs weekly.',
    status: 'pending',
    createdAt: '2026-07-21',
  },
  {
    id: 'a2',
    name: 'Tunde Media',
    email: 'tunde@media.co',
    phone: '+2348098765432',
    audience: '10k-50k',
    platforms: ['TikTok', 'X'],
    reason: 'I help vendors sell online.',
    status: 'pending',
    createdAt: '2026-07-20',
  },
  {
    id: 'a3',
    name: 'Ada Agency',
    email: 'hello@ada.agency',
    phone: '+2348076543210',
    audience: '100k+',
    platforms: ['Agency', 'LinkedIn'],
    reason: 'We onboard ecommerce brands monthly.',
    status: 'approved',
    createdAt: '2026-07-10',
  },
];

export const affiliates: Affiliate[] = [
  {
    id: 'aff-1',
    name: 'Alex Creator',
    email: 'alex@example.com',
    referralCode: 'ALEX-SELLYT',
    plan: 'premium',
    status: 'active',
    clicks: 12483,
    signups: 342,
    paidConversions: 58,
    earnings: 418900,
    joinedAt: '2026-04-01',
  },
  {
    id: 'aff-2',
    name: 'Ada Agency',
    email: 'hello@ada.agency',
    referralCode: 'ADA-AGENCY',
    plan: 'standard',
    status: 'active',
    clicks: 8420,
    signups: 190,
    paidConversions: 31,
    earnings: 186000,
    joinedAt: '2026-05-12',
  },
  {
    id: 'aff-3',
    name: 'Campus Sellers',
    email: 'campus@uni.ng',
    referralCode: 'CAMPUS-NG',
    plan: 'standard',
    status: 'suspended',
    clicks: 2100,
    signups: 44,
    paidConversions: 3,
    earnings: 12000,
    joinedAt: '2026-06-02',
  },
];

export const adminOverview = {
  affiliates: 1284,
  pendingApplications: 23,
  totalClicks: 482910,
  paidConversions: 1204,
  affiliateRevenue: 18432000,
  commissionsPaid: 4218000,
  pendingPayouts: 845000,
  signups7d: 8421,
};

export const commissionTiers = [
  {
    name: 'Standard',
    price: 5000,
    rate: '20%',
    features: [
      'Referral link + QR code',
      'Real-time click & signup tracking',
      'Standard commission tier',
      'Withdraw to bank, Paystack or Flutterwave',
    ],
  },
  {
    name: 'Premium',
    price: 10000,
    rate: '25%',
    popular: true,
    features: [
      'Everything in Standard',
      'Higher commission tier',
      'Priority payout processing',
      'Advanced analytics & reports',
      'Priority support',
    ],
  },
];
