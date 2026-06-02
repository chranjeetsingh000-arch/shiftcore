"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

const NAV_LINKS = [
  { href: "/deals", label: "Deals" },
  { href: "/calculator", label: "Cost Calculator" },
  { href: "/cashback", label: "Cashback" },
  { href: "/loyalty", label: "Loyalty" },
  { href: "/community", label: "Community" },
  { href: "/scams", label: "Scam Alerts" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const { user, signOut } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setHidden(y > lastY && y > 80);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <motion.header
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm transition-shadow duration-300",
        scrolled ? "border-gray-200 shadow-sm shadow-gray-100" : "border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ rotate: [0, -12, 12, 0], scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-black text-white shadow-md"
            >
              ✈
            </motion.div>
            <span className="text-lg font-black tracking-tight text-gray-900">
              Travel<span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">OS</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-violet-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-500"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Auth CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
                <Link href="/account" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Account</Link>
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={signOut}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Sign out
                </motion.button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Sign in</Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/auth/signup"
                    className="rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2 text-sm font-bold text-white shadow-md shadow-violet-200 hover:shadow-violet-300 transition-shadow"
                  >
                    Get Started Free
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block h-0.5 bg-current origin-center" />
              <motion.span animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} className="block h-0.5 bg-current" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block h-0.5 bg-current origin-center" />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        pathname === link.href ? "bg-violet-50 text-violet-700" : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3 border-t border-gray-100 mt-2 flex flex-col gap-2">
                  {user ? (
                    <>
                      <Link href="/dashboard" className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100">Dashboard</Link>
                      <button onClick={signOut} className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-700 text-left">Sign out</button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/signin" className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600">Sign in</Link>
                      <Link href="/auth/signup" className="rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2.5 text-sm font-bold text-white text-center">Get Started Free</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
