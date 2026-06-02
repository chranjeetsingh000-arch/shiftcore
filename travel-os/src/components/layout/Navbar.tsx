"use client";

import { useState } from "react";
import Link from "next/link";
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
  const { user, signOut } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-black text-white shadow-md">
              ✈
            </div>
            <span className="text-lg font-black tracking-tight text-gray-900">
              Travel<span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">OS</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Dashboard
                </Link>
                <Link href="/account" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Account
                </Link>
                <button
                  onClick={signOut}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2 text-sm font-bold text-white shadow-md shadow-violet-200 transition-all hover:shadow-violet-300 hover:scale-105"
                >
                  Get Started Free
                </Link>
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
              <span className={cn("block h-0.5 bg-current transition-all", menuOpen && "rotate-45 translate-y-2")} />
              <span className={cn("block h-0.5 bg-current transition-all", menuOpen && "opacity-0")} />
              <span className={cn("block h-0.5 bg-current transition-all", menuOpen && "-rotate-45 -translate-y-2")} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200 mt-2 flex flex-col gap-2">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">Dashboard</Link>
                  <button onClick={() => { signOut(); setMenuOpen(false); }} className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-700 text-left">Sign out</button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600">Sign in</Link>
                  <Link href="/auth/signup" onClick={() => setMenuOpen(false)} className="rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2.5 text-sm font-bold text-white text-center">Get Started Free</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
