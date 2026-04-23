"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Templates", href: "/templates" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-neutral-100 py-[12px]"
          : "bg-transparent border-b border-transparent py-[20px]"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-[16px] sm:px-[24px] lg:px-[32px]">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-[8px] group">
          <span className="text-xl font-bold text-neutral-900 group-hover:opacity-80 transition-opacity duration-300">
             ImpactDesk AI
          </span>
        </Link>
        
        {/* Center/Right: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-[32px] ml-auto mr-[48px]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-base font-medium transition-colors duration-300 group ${
                  isActive ? "text-primary-blue font-bold" : "text-neutral-900 hover:text-primary-blue"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-[4px] h-[2px] bg-primary-blue transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Far Right: Actions & Mobile Toggle */}
        <div className="flex items-center gap-[16px]">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-[16px]">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-base font-medium text-neutral-700 hover:text-primary-blue transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={signOut}
                  className="rounded-full bg-white border border-neutral-300 text-neutral-900 px-[24px] py-[8px] text-sm font-medium shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/templates"
                className="rounded-full bg-primary-blue text-white px-[24px] py-[8px] text-sm font-medium shadow-sm transition-all duration-300 hover:bg-hoverBlue hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
              >
                Start Free Draft
              </Link>
            )}
          </div>

          {/* Mobile Toggle Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-[8px] text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-blue rounded-md transition-colors hover:text-primary-blue"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t border-neutral-100 shadow-md backdrop-blur-md absolute top-full left-0 w-full"
          >
            <div className="flex flex-col px-[24px] py-[24px] space-y-[16px]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-[8px] text-lg font-medium transition-colors duration-300 ${
                      isActive ? "text-primary-blue font-bold" : "text-neutral-900 hover:text-primary-blue"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-[16px] mt-[16px] border-t border-neutral-100">
                {user ? (
                  <div className="flex flex-col space-y-[12px]">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-[12px] text-lg font-medium text-neutral-900 hover:text-primary-blue transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full rounded-full bg-white border border-neutral-300 text-neutral-900 py-[12px] text-lg font-medium shadow-sm transition-all hover:bg-neutral-50"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/templates"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex justify-center items-center gap-[8px] rounded-full bg-primary-blue text-white py-[12px] text-lg font-medium shadow-sm transition-all hover:bg-hoverBlue"
                  >
                    Start Free Draft
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
