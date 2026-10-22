import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Navbar } from '../navigation/Navbar';
import { Footer } from './Footer';
import { PageTransition } from '../motion/PageTransition';
import { ScrollToTop } from '../motion/ScrollToTop';

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const isHome = location.pathname === '/';

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#355746] selection:text-[#FAF8F2] overflow-x-hidden">
      {/* Route-aware scroll manager */}
      <ScrollToTop />

      {/* Ambient background visual elements */}
      <div className="ambient-blob-1" />
      <div className="ambient-blob-2" />
      <div className="ambient-blob-3" />

      {/* Floating Liquid Glass Navigation */}
      <Navbar />

      {/* Main Page Content with Page Transition */}
      <main className={isHome ? "flex-1 w-full flex flex-col" : "flex-1 pt-28 pb-12 px-4 sm:px-8 max-w-6xl mx-auto w-full flex flex-col"}>
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            {currentOutlet}
          </PageTransition>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
