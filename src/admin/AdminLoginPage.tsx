import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError.message || 'Invalid administrator credentials');
      } else {
        navigate('/admin');
      }
    } catch {
      setError('An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF8F2] relative">
      {/* Ambient background blur */}
      <div className="ambient-blob-1" />
      <div className="ambient-blob-2" />

      <div className="max-w-md w-full glass-panel rounded-3xl p-8 sm:p-10 shadow-2xl relative">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-[#746F64] hover:text-[#243D32] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </button>

        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#355746] text-[#FAF8F2] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-[#243D32]">Admin Portal</h1>
          <p className="text-xs text-[#746F64]">
            Authorized administrators only. Manage portfolio projects, media, and incoming messages.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#243D32] mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#746F64] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm text-[#243D32]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#243D32] mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#746F64] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm text-[#243D32]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-pulse">Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Access Dashboard</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-[#D9C8AA]/30 text-center text-[11px] text-[#746F64]">
          Protected by Supabase Auth &amp; Row Level Security.
        </div>
      </div>
    </div>
  );
};
