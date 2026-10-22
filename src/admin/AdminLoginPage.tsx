import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, AlertCircle, ArrowLeft, Delete, KeyRound, Mail } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const [useEmailAuth, setUseEmailAuth] = useState(false);

  // Email/password fallback state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signInWithPin, signIn } = useAuth();
  const navigate = useNavigate();
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Auto-focus first input on mount
  useEffect(() => {
    if (!useEmailAuth) {
      inputRefs[0].current?.focus();
    }
  }, [useEmailAuth]);

  const triggerShake = (msg: string) => {
    setError(msg);
    setIsShake(true);
    setTimeout(() => setIsShake(false), 500);
    setPin(['', '', '', '']);
    inputRefs[0].current?.focus();
  };

  const handlePinSubmit = async (pinString: string) => {
    setError('');
    setLoading(true);

    try {
      const { error: pinError } = await signInWithPin(pinString);
      if (pinError) {
        triggerShake(pinError.message || 'Incorrect PIN code');
      } else {
        navigate('/admin');
      }
    } catch {
      triggerShake('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newPin = [...pin];
    newPin[index] = digit;
    setPin(newPin);

    if (digit && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto submit when all 4 digits are entered
    const completePin = newPin.join('');
    if (completePin.length === 4) {
      handlePinSubmit(completePin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleKeypadPress = (num: string) => {
    const firstEmptyIndex = pin.findIndex(d => d === '');
    if (firstEmptyIndex !== -1) {
      handleDigitChange(firstEmptyIndex, num);
    }
  };

  const handleKeypadBackspace = () => {
    const lastFilledIndex = [...pin].reverse().findIndex(d => d !== '');
    if (lastFilledIndex !== -1) {
      const realIndex = 3 - lastFilledIndex;
      const newPin = [...pin];
      newPin[realIndex] = '';
      setPin(newPin);
      inputRefs[realIndex].current?.focus();
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF8F2] relative selection:bg-[#355746] selection:text-white">
      {/* Ambient background blur */}
      <div className="ambient-blob-1" />
      <div className="ambient-blob-2" />

      <div className={`max-w-sm w-full glass-panel rounded-3xl p-8 sm:p-9 shadow-2xl relative transition-transform ${isShake ? 'animate-shake' : ''}`}>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-[#746F64] hover:text-[#243D32] mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="relative w-16 h-16 mx-auto mb-2">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-16 h-16 rounded-full object-cover border-2 border-[#D9C8AA] shadow-md mx-auto" 
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#355746] text-[#FAF8F2] flex items-center justify-center shadow">
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#243D32]">Pacharaphum</h1>
          <p className="text-xs text-[#746F64]">
            {useEmailAuth
              ? 'Sign in with your administrator email & password'
              : 'Enter 4-digit security PIN to unlock'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!useEmailAuth ? (
          <div>
            {/* 4 Digit Boxes */}
            <div className="flex justify-center gap-3 mb-6">
              {pin.map((digit, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  disabled={loading}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-14 h-16 text-center text-2xl font-bold rounded-2xl glass-input transition-all ${
                    digit
                      ? 'border-[#355746] bg-[#355746]/5 text-[#243D32]'
                      : 'border-[#D9C8AA] text-[#243D32]'
                  } focus:ring-2 focus:ring-[#355746]/30 focus:border-[#355746] outline-none`}
                />
              ))}
            </div>

            {/* Tactile Keypad */}
            <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto mb-5">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  disabled={loading}
                  onClick={() => handleKeypadPress(num)}
                  className="h-12 rounded-xl glass-panel-subtle text-lg font-semibold text-[#243D32] hover:bg-[#355746] hover:text-white active:scale-95 transition-all cursor-pointer shadow-sm flex items-center justify-center"
                >
                  {num}
                </button>
              ))}
              <div />
              <button
                type="button"
                disabled={loading}
                onClick={() => handleKeypadPress('0')}
                className="h-12 rounded-xl glass-panel-subtle text-lg font-semibold text-[#243D32] hover:bg-[#355746] hover:text-white active:scale-95 transition-all cursor-pointer shadow-sm flex items-center justify-center"
              >
                0
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleKeypadBackspace}
                className="h-12 rounded-xl glass-panel-subtle text-[#746F64] hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all cursor-pointer shadow-sm flex items-center justify-center"
                title="Backspace"
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>

            {loading && (
              <div className="text-center text-xs font-semibold text-[#355746] animate-pulse py-2">
                Verifying PIN...
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleEmailLogin} className="space-y-4">
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
                className="w-full py-3 rounded-xl bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
        )}

        <div className="mt-6 pt-4 border-t border-[#D9C8AA]/30 text-center">
          <button
            type="button"
            onClick={() => {
              setError('');
              setUseEmailAuth(!useEmailAuth);
            }}
            className="text-[11px] text-[#746F64] hover:text-[#243D32] underline cursor-pointer transition-colors"
          >
            {useEmailAuth ? 'Switch to 4-Digit PIN' : 'Use Email & Password instead'}
          </button>
        </div>
      </div>
    </div>
  );
};
