"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, LogIn } from "lucide-react";
import { cn } from "../../lib/utils";

interface NavbarProps {
  shopName?: string;
  isStorefront?: boolean;
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Navbar({
  shopName,
  isStorefront = false,
  cartCount = 0,
  onOpenCart,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const isDark = isLandingPage || isStorefront;

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md",
        isDark
          ? "bg-[#0a0a0a]/80 border-white/5"
          : "bg-white/90 border-gray-100",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-xl"
          >
            <div className="h-9 w-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black shadow-sm shrink-0">
              ₦
            </div>
            <span
              className={cn(
                "tracking-tight truncate max-w-[160px] sm:max-w-none",
                isDark ? "text-white" : "text-gray-900",
              )}
            >
              {isStorefront && shopName ? shopName : "NaijaCart"}
            </span>
          </Link>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-2">
            {/* Landing page */}
            {isLandingPage && (
              <>
                <Link
                  href="/store/demo"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  Demo Store
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <LogIn className="h-4 w-4" />
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-sm"
                >
                  Create free shop
                </Link>
              </>
            )}

            {/* Storefront */}
            {isStorefront && (
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="px-3 py-2 rounded-lg text-xs font-medium text-gray-500 hover:text-white hover:bg-white/5 transition-all"
                >
                  Powered by NaijaCart
                </Link>
                {onOpenCart && (
                  <button
                    onClick={onOpenCart}
                    className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition"
                  >
                    <ShoppingBag className="h-6 w-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#0a0a0a] shadow-sm">
                        {cartCount}
                      </span>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Mobile right side */}
          <div className="flex items-center gap-2 md:hidden">
            {isStorefront && onOpenCart && (
              <button
                onClick={onOpenCart}
                className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition"
              >
                <ShoppingBag className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center border border-[#0a0a0a]">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            {isLandingPage && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
              >
                {menuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu — landing only */}
      {menuOpen && isLandingPage && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0a0a]/95 backdrop-blur-lg">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/store/demo"
              onClick={() => setMenuOpen(false)}
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              Demo Store
            </Link>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <LogIn className="h-4 w-4" />
              Log In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center px-3 py-3 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-all mt-2"
            >
              Create free shop
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
