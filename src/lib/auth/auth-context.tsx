import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DEMO_ADMIN, DEMO_AFFILIATE } from '@/lib/mock/data';
import type { AuthUser, UserRole } from '@/types';

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  register: (payload: {
    name: string;
    email: string;
  }) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'sellyt-affiliate-auth';

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  const persist = useCallback((next: AuthUser | null) => {
    setUser(next);
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(
    (email: string, role: UserRole = 'affiliate') => {
      if (role === 'admin' || email.toLowerCase().includes('admin')) {
        persist({ ...DEMO_ADMIN, email });
        return true;
      }
      persist({ ...DEMO_AFFILIATE, email });
      return true;
    },
    [persist]
  );

  const register = useCallback(
    (payload: { name: string; email: string }) => {
      persist({
        ...DEMO_AFFILIATE,
        name: payload.name,
        email: payload.email,
        status: 'pending',
      });
      return true;
    },
    [persist]
  );

  const logout = useCallback(() => persist(null), [persist]);

  const value = useMemo(
    () => ({ user, login, logout, register }),
    [user, login, logout, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
