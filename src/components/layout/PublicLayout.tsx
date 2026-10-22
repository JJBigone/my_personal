import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../navigation/Navbar';
import { Footer } from './Footer';

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#355746] selection:text-[#FAF8F2]">
      {/* Ambient background visual elements */}
      <div className="ambient-blob-1" />
      <div className="ambient-blob-2" />
      <div className="ambient-blob-3" />

      {/* Floating Liquid Glass Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className={isHome ? "flex-1 w-full" : "flex-1 pt-28 pb-12 px-4 sm:px-8 max-w-6xl mx-auto w-full"}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
