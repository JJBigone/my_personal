import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export type NavigationSection = {
  title: string;
  href: string;
  isActive?: boolean;
};

type HeaderProps = {
  navigationData: NavigationSection[];
  className?: string;
};

const CollaborateButton = ({ className }: { className?: string }) => (
  <Link to="/contact">
    <Button className={cn("relative text-xs sm:text-sm font-semibold rounded-full h-10 p-1 ps-4 pe-11 group transition-all duration-500 hover:ps-11 hover:pe-4 w-fit overflow-hidden bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] shadow-md cursor-pointer", className)}>
      <span className="relative z-10 transition-all duration-500">
        Let's Connect
      </span>
      <span className="absolute right-1 w-8 h-8 bg-[#FAF8F2] text-[#243D32] rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
        <ArrowUpRight size={14} />
      </span>
    </Button>
  </Link>
);

export const Header = ({ navigationData, className }: HeaderProps) => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={cn(
        "inset-x-0 z-50 px-4 flex items-center justify-center sticky top-3 h-20",
        className,
      )}
    >
      <div
        className={cn(
          "w-full max-w-6xl flex items-center justify-between gap-3 sm:gap-6 transition-all duration-500 px-4 sm:px-6 py-2.5 rounded-full",
          sticky
            ? "glass-panel shadow-xl border border-[#D9C8AA]/50"
            : "glass-panel-subtle border border-[#D9C8AA]/30",
        )}
      >
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="Pacharaphum Profile Logo"
            className="w-9 h-9 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-105 border border-[#D9C8AA]/50"
          />
          <span className="font-semibold text-base sm:text-lg tracking-tight text-[#243D32]">
            Pacharaphum <span className="text-[#82977B]">Profile</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <NavigationMenu className="bg-[#FAF8F2]/60 p-1 rounded-full border border-[#D9C8AA]/30">
            <NavigationMenuList className="flex gap-1">
              {navigationData.map((navItem) => {
                const active = navItem.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(navItem.href);

                return (
                  <NavigationMenuItem key={navItem.title}>
                    <Link
                      to={navItem.href}
                      className={cn(
                        "px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all",
                        active
                          ? "bg-[#355746] text-[#FAF8F2] shadow-xs"
                          : "text-[#4B382D] hover:bg-[#FAF8F2] hover:text-[#243D32]"
                      )}
                    >
                      {navItem.title}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop CTA & Mobile Menu */}
        <div className="flex items-center gap-3">
          <CollaborateButton className="hidden sm:flex" />

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="rounded-full glass-panel p-2.5 text-[#243D32] hover:bg-[#FAF8F2] transition-colors cursor-pointer"
                  aria-label="Toggle menu"
                >
                  <Menu width={18} height={18} />
                </button>
              </SheetTrigger>

              <SheetContent
                showCloseButton={false}
                side="right"
                className="w-full sm:w-80 p-6 glass-panel flex flex-col justify-between border-l border-[#D9C8AA]/40"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-[#D9C8AA]/30">
                    <div className="flex items-center gap-2">
                      <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
                      <span className="font-bold text-sm text-[#243D32]">Pacharaphum</span>
                    </div>
                    <SheetClose asChild>
                      <button
                        type="button"
                        className="rounded-full glass-panel p-2 text-[#746F64] hover:text-[#243D32] cursor-pointer"
                      >
                        <X width={16} height={16} />
                      </button>
                    </SheetClose>
                  </div>

                  <div className="py-6 space-y-2">
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    {navigationData.map((item) => (
                      <Link
                        key={item.title}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#243D32] hover:bg-[#355746] hover:text-[#FAF8F2] transition-colors"
                      >
                        <span>{item.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-60" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D9C8AA]/30 space-y-3">
                  <CollaborateButton className="w-full justify-center" />
                  <p className="text-[11px] text-[#746F64] text-center">
                    © {new Date().getFullYear()} Pacharaphum Profile
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
