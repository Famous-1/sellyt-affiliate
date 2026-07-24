export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  verifyEmail: '/verify-email',

  portal: {
    root: '/portal',
    dashboard: '/portal/dashboard',
    referralLinks: '/portal/referral-links',
    analytics: '/portal/analytics',
    conversions: '/portal/conversions',
    wallet: '/portal/wallet',
    withdrawals: '/portal/withdrawals',
    notifications: '/portal/notifications',
    settings: '/portal/settings',
  },

  admin: {
    root: '/admin',
    login: '/admin/login',
    dashboard: '/admin/dashboard',
    applications: '/admin/applications',
    affiliates: '/admin/affiliates',
    commissions: '/admin/commissions',
    payouts: '/admin/payouts',
    reports: '/admin/reports',
    settings: '/admin/settings',
  },
} as const;

export function removeForwardSlashes(path: string) {
  return path.replace(/^\/+/, '');
}
