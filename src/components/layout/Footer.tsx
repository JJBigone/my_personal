import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-[#D9C8AA]/40 bg-[#F3EBDD]/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#355746] text-[#FAF8F2] flex items-center justify-center font-bold text-sm">
              M
            </div>
            <span className="font-semibold text-base text-[#243D32]">
              Studio<span className="text-[#82977B]">.Liquid</span>
            </span>
          </div>
          <p className="text-xs text-[#746F64] mt-2 max-w-sm">
            Crafting immersive digital experiences through gaming, creative technology, and liquid aesthetics.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 text-[#4B382D]">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass-panel hover:bg-[#355746] hover:text-[#FAF8F2] transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass-panel hover:bg-[#355746] hover:text-[#FAF8F2] transition-colors"
            aria-label="X (Twitter)"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass-panel hover:bg-[#355746] hover:text-[#FAF8F2] transition-colors"
            aria-label="YouTube"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>

        {/* Admin discreet link & copyright */}
        <div className="flex flex-col items-center md:items-end gap-1.5 text-xs text-[#746F64]">
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-[#80634D] fill-current" />
            <span>&amp; Earth Tone Glass</span>
          </div>
          <div className="flex items-center gap-3">
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
            <Link
              to="/admin"
              className="flex items-center gap-1 text-[#82977B] hover:text-[#243D32] transition-colors"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
