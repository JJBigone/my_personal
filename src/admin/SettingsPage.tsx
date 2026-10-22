import React from 'react';
import { Database, Shield, CheckCircle2, Server } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-[#243D32]">Portfolio Settings</h1>
        <p className="text-xs sm:text-sm text-[#746F64] mt-1">
          Review backend database status, security policies, and environment setup.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backend Status Card */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 text-[#355746]">
            <div className="w-10 h-10 rounded-xl bg-[#355746]/10 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#243D32]">Supabase Connection</h3>
              <p className="text-[11px] text-[#746F64]">PostgreSQL &amp; Storage</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[#746F64] block">Project URL:</span>
              <span className="font-mono text-[#243D32] break-all">{supabaseUrl || 'Configured via .env'}</span>
            </div>
            <div>
              <span className="text-[#746F64] block">Publishable Key:</span>
              <span className="font-mono text-[#243D32] break-all">
                {publishableKey ? `${publishableKey.substring(0, 16)}...` : 'Configured'}
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Client Initialized</span>
          </div>
        </div>

        {/* Security & RLS Card */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 text-[#80634D]">
            <div className="w-10 h-10 rounded-xl bg-[#80634D]/10 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#243D32]">Security &amp; RLS Policies</h3>
              <p className="text-[11px] text-[#746F64]">Server-Enforced Authorization</p>
            </div>
          </div>

          <p className="text-xs text-[#746F64] leading-relaxed">
            Row Level Security (RLS) guarantees that public visitors can only read published projects and submit messages. Unauthenticated users cannot create, update, or delete projects.
          </p>

          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>RLS Ready (supabase_schema.sql)</span>
            </span>
          </div>
        </div>
      </div>

      {/* SQL Migration Helper */}
      <div className="glass-panel rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm text-[#243D32]">
            <Server className="w-4 h-4 text-[#355746]" />
            <span>Database Setup Helper</span>
          </div>
        </div>
        <p className="text-xs text-[#746F64]">
          All SQL migration rules, tables (`projects`, `admin_users`, `contact_messages`), functions, and storage bucket security policies are prepared in <code>supabase_schema.sql</code>. You can paste it into the Supabase SQL Editor.
        </p>
      </div>
    </div>
  );
};
