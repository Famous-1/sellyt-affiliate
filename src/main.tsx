import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';
import {
  AdminDashboardPage,
  AdminLoginPage,
  AdminSettingsPage,
  AffiliatesPage,
  AnalyticsPage,
  ApplicationsPage,
  CommissionsPage,
  ConversionsPage,
  DashboardPage,
  LandingPage,
  LoginPage,
  NotificationsPage,
  PayoutsPage,
  ReferralLinksPage,
  RegisterPage,
  ReportsPage,
  SettingsPage,
  VerifyEmailPage,
  WalletPage,
  WithdrawalsPage,
} from '@/pages';
import { AdminLayout, AuthLayout, PortalLayout } from '@/components/layouts';
import { AuthProvider } from '@/lib/auth/auth-context';
import { removeForwardSlashes, routes } from '@/lib/constants';
import './index.css';

const router = createBrowserRouter([
  {
    path: routes.home,
    Component: LandingPage,
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: removeForwardSlashes(routes.login),
        Component: LoginPage,
      },
      {
        path: removeForwardSlashes(routes.register),
        Component: RegisterPage,
      },
      {
        path: removeForwardSlashes(routes.verifyEmail),
        Component: VerifyEmailPage,
      },
      {
        path: removeForwardSlashes(routes.admin.login),
        Component: AdminLoginPage,
      },
    ],
  },
  {
    path: removeForwardSlashes(routes.portal.root),
    Component: PortalLayout,
    children: [
      { index: true, element: <Navigate to={routes.portal.dashboard} replace /> },
      {
        path: removeForwardSlashes(routes.portal.dashboard).replace('portal/', ''),
        Component: DashboardPage,
      },
      {
        path: 'referral-links',
        Component: ReferralLinksPage,
      },
      {
        path: 'analytics',
        Component: AnalyticsPage,
      },
      {
        path: 'conversions',
        Component: ConversionsPage,
      },
      {
        path: 'wallet',
        Component: WalletPage,
      },
      {
        path: 'withdrawals',
        Component: WithdrawalsPage,
      },
      {
        path: 'notifications',
        Component: NotificationsPage,
      },
      {
        path: 'settings',
        Component: SettingsPage,
      },
    ],
  },
  {
    path: removeForwardSlashes(routes.admin.root),
    Component: AdminLayout,
    children: [
      { index: true, element: <Navigate to={routes.admin.dashboard} replace /> },
      {
        path: 'dashboard',
        Component: AdminDashboardPage,
      },
      {
        path: 'applications',
        Component: ApplicationsPage,
      },
      {
        path: 'affiliates',
        Component: AffiliatesPage,
      },
      {
        path: 'commissions',
        Component: CommissionsPage,
      },
      {
        path: 'payouts',
        Component: PayoutsPage,
      },
      {
        path: 'reports',
        Component: ReportsPage,
      },
      {
        path: 'settings',
        Component: AdminSettingsPage,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.home} replace />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProvider>
  </StrictMode>
);
