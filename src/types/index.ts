export type UserRole = 'affiliate' | 'admin';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export type CommissionStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'paid';

export type WithdrawalStatus =
  | 'pending'
  | 'approved'
  | 'paid'
  | 'rejected'
  | 'failed';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  referralCode?: string;
  plan?: 'standard' | 'premium';
  status?: ApplicationStatus;
}

export interface AffiliateApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  audience: string;
  platforms: string[];
  website?: string;
  reason: string;
  status: ApplicationStatus;
  createdAt: string;
}

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  plan: 'standard' | 'premium';
  status: 'active' | 'suspended';
  clicks: number;
  signups: number;
  paidConversions: number;
  earnings: number;
  joinedAt: string;
}

export interface Conversion {
  id: string;
  merchantName: string;
  plan: string;
  amount: number;
  commission: number;
  status: CommissionStatus;
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  amount: number;
  method: 'bank' | 'paystack' | 'flutterwave';
  accountName: string;
  accountNumber: string;
  status: WithdrawalStatus;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface MetricPoint {
  label: string;
  clicks: number;
  signups: number;
  paid: number;
}
