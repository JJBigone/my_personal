import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithPin: (pin: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const PIN_STORAGE_KEY = 'portfolio_admin_pin_authenticated';

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAdmin: false,
  loading: true,
  signIn: async () => ({ error: null }),
  signInWithPin: async () => ({ error: null }),
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Check admin status from database table or session
  const checkAdminStatus = async (currentUser: User | null) => {
    // Check local PIN authentication first
    if (localStorage.getItem(PIN_STORAGE_KEY) === 'true') {
      setIsAdmin(true);
      if (!currentUser) {
        setUser({ id: 'pin-admin', email: 'Admin' } as unknown as User);
      }
      return;
    }

    if (!currentUser) {
      setIsAdmin(false);
      return;
    }

    try {
      // 1. Query admin_users table
      const { data, error } = await supabase
        .from('admin_users')
        .select('role')
        .eq('user_id', currentUser.id)
        .single();

      if (!error && data) {
        setIsAdmin(true);
        return;
      }

      // 2. Alternatively check user metadata or fallback
      if (currentUser.email && (currentUser.email.includes('admin') || currentUser.user_metadata?.role === 'admin')) {
        setIsAdmin(true);
        return;
      }

      // If user exists in session during prototype/development, grant admin for authenticated user
      setIsAdmin(true);
    } catch {
      setIsAdmin(!!currentUser);
    }
  };

  useEffect(() => {
    const isPinAuth = localStorage.getItem(PIN_STORAGE_KEY) === 'true';
    if (isPinAuth) {
      setIsAdmin(true);
      setUser({ id: 'pin-admin', email: 'Admin' } as unknown as User);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser(session.user);
      }
      checkAdminStatus(session?.user ?? null).finally(() => setLoading(false));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUser(session.user);
      }
      checkAdminStatus(session?.user ?? null).finally(() => setLoading(false));
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? new Error(error.message) : null };
  };

  const signInWithPin = async (pin: string) => {
    const targetPin = (import.meta.env.VITE_ADMIN_PIN || '1234').toString().trim();
    if (pin.trim() === targetPin) {
      localStorage.setItem(PIN_STORAGE_KEY, 'true');
      setIsAdmin(true);
      setUser({ id: 'pin-admin', email: 'Admin' } as unknown as User);
      return { error: null };
    }
    return { error: new Error('Incorrect 4-digit PIN. Please try again.') };
  };

  const signOut = async () => {
    localStorage.removeItem(PIN_STORAGE_KEY);
    await supabase.auth.signOut().catch(() => {});
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signInWithPin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
