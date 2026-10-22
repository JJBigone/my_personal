import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, FolderGit2, User, Wrench, Mail, ShieldAlert } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'About', path: '/about', icon: User },
    { name: 'Projects', path: '/projects', icon: FolderGit2 },
    { name: 'Skills', path: '/skills', icon: Wrench },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 max-w-6xl mx-auto">
      <nav 
        className="glass-panel rounded-full px-5 py-3 sm:px-7 flex items-center justify-between shadow-lg"
        aria-label="Main Navigation"
      >
        {/* Brand / Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group text-decoration-none"
        >
          <div className="w-9 h-9 rounded-full bg-[#355746] text-[#FAF8F2] flex items-center justify-center font-bold text-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
            M
          </div>
          <span className="font-semibold text-lg tracking-tight text-[#243D32]">
            Studio<span className="text-[#82977B]">.Liquid</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active
                    ? 'text-[#243D32] bg-[#FAF8F2]/80 shadow-sm font-semibold'
                    : 'text-[#4B382D]/80 hover:text-[#243D32] hover:bg-[#FAF8F2]/40'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Action: Contact Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="px-5 py-2 rounded-full bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full text-[#243D32] hover:bg-[#FAF8F2]/60 transition-colors focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 glass-panel rounded-2xl p-4 shadow-xl border border-[#D9C8AA]/50 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#355746] text-[#FAF8F2]'
                    : 'text-[#243D32] hover:bg-[#FAF8F2]/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#D9C8AA]/40 flex flex-col gap-2">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-[#355746] text-[#FAF8F2] text-sm font-medium"
            >
              Get in Touch
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 text-xs text-[#746F64] hover:text-[#243D32] py-1"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
