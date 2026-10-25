import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PillNav from '../ui/PillNav';
import { Sparkles, User, FolderGit2, Wrench, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'About', href: '/about', icon: <User className="w-4 h-4" /> },
    { label: 'Workshops', href: '/projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { label: 'Skills', href: '/skills', icon: <Wrench className="w-4 h-4" /> },
    { label: 'Contact', href: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <header
      className={cn(
        "fixed top-3 sm:top-4 left-0 right-0 z-50 px-4 sm:px-8 max-w-6xl mx-auto flex items-center justify-between pointer-events-none transition-all duration-300",
        scrolled && "py-0.5"
      )}
    >
      <div className="pointer-events-auto transition-transform duration-300">
        <PillNav
          logo="/logo.png"
          logoAlt="Pacharaphum Profile Logo"
          logoHref="/"
          items={navItems}
          activeHref={location.pathname}
          linkComponent={Link}
          theme="earth"
          layout="split"
          itemStyle="pill"
          hoverEffect="fill"
          indicator="dot"
          size="md"
          surface="glass"
          highlightColor="#355746"
          highlightTextColor="#FAF8F2"
          textColor="#243D32"
          barColor={scrolled ? "rgba(243, 235, 221, 0.88)" : "rgba(243, 235, 221, 0.72)"}
          ariaLabel="Main Navigation"
        />
      </div>

      {/* Right action button on desktop */}
      <div className="hidden lg:flex items-center gap-3 pointer-events-auto">
        <Link
          to="/contact"
          className={cn(
            "px-5 py-2.5 rounded-full bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 border border-[#82977B]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355746]",
            scrolled && "shadow-lg"
          )}
        >
          Get in Touch
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
