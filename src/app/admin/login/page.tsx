'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setStatus('error');
        setErrorMsg('Incorrect password. Try again.');
        setPassword('');
        inputRef.current?.focus();
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setStatus('error');
      setErrorMsg('Connection error. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0B0C] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-sm p-10 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-5">
              <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl text-white mb-1">Atelier Admin</h1>
            <p className="font-sans text-xs text-gray-500 uppercase tracking-widest">Gabriel Barclay</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="admin-password" className="block font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">
                Password
              </label>
              <input
                ref={inputRef}
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 font-sans text-sm px-5 py-4 rounded-sm focus:outline-none focus:border-[#D4AF37]/60 focus:bg-white/[0.07] transition-all duration-300"
                autoFocus
                autoComplete="current-password"
              />
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs font-sans text-red-400/80"
                >
                  {errorMsg}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || !password}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-[#0B0B0C] font-sans text-xs uppercase tracking-widest font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] rounded-sm"
            >
              {status === 'loading' ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Authenticating…
                </>
              ) : (
                <>
                  Enter Dashboard
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center font-sans text-xs text-gray-600">
            Access restricted to the artist.{' '}
            <a href="/" className="text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors">
              Return to gallery →
            </a>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
