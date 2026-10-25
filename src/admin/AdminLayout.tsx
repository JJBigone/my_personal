import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F2]">
        <div className="text-sm font-semibold text-[#355746] animate-pulse">
          Verifying security authorization...
        </div>
      </div>
    );
  }

  // Redirect to login if unauthenticated or not an admin
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const adminNav = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Workshops', path: '/admin/projects', icon: FolderKanban },
    { name: 'New Workshop', path: '/admin/projects/new', icon: PlusCircle },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] flex flex-col md:flex-row text-[#243D32]">
      {/* Sidebar for Desktop */}
      <aside className="w-full md:w-64 glass-panel border-r border-[#D9C8AA]/40 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5 font-bold text-lg text-[#243D32]">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-8 h-8 rounded-full object-cover border border-[#D9C8AA]/50 shadow-xs" 
              />
              <div>
                <span className="text-sm font-bold block leading-tight">Pacharaphum</span>
                <span className="text-[10px] text-[#82977B] font-semibold uppercase tracking-wider block">Admin Center</span>
              </div>
            </Link>
          </div>

          <div className="p-3 rounded-2xl glass-panel-subtle flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#82977B]/20 flex items-center justify-center text-[#355746]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold truncate text-[#243D32]">{user.email}</div>
              <div className="text-[10px] text-[#80634D] font-semibold uppercase">Super Administrator</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-[#355746] text-[#FAF8F2] shadow-sm'
                      : 'text-[#4B382D] hover:bg-[#FAF8F2]/80 hover:text-[#243D32]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-[#D9C8AA]/30 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#746F64] hover:text-[#243D32] hover:bg-[#FAF8F2]/50 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => signOut()}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
