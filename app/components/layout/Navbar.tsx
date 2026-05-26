"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, LayoutDashboard, LogIn } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface NavbarProps {
  // For storefront pages only
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
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md",
        isLandingPage || isStorefront
          ? "bg-[#0a0a0a]/80 border-white/5"
          : "bg-white/90 border-gray-100",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold"
            >
              <div className="h-9 w-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black shadow-sm">
                ₦
              </div>
              <span
                className={cn(
                  "tracking-tight max-w-[140px] truncate sm:max-w-none",
                  isLandingPage || isStorefront
                    ? "text-white"
                    : "text-gray-900",
                )}
              >
                {isStorefront && shopName ? shopName : "NaijaCart"}
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {/* Landing page nav */}
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
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5"
                >
                  <LogIn className="h-4 w-4" /> Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-sm"
                >
                  Create free shop
                </Link>
              </>
            )}

            {/* Dashboard nav */}
            {isDashboard && (
              <>
                <Link
                  href="/dashboard"
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5",
                    pathname === "/dashboard"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <Link
                  href="/dashboard/products"
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5",
                    pathname === "/dashboard/products"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  )}
                >
                  Products
                </Link>
                <Link
                  href="/dashboard/settings"
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5",
                    pathname === "/dashboard/settings"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  )}
                >
                  Settings
                </Link>
              </>
            )}

            {/* Storefront nav */}
            {isStorefront && (
              <>
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  NaijaCart
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
              </>
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
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                "p-2 rounded-lg transition",
                isLandingPage || isStorefront
                  ? "text-gray-400 hover:text-white hover:bg-white/10"
                  : "text-gray-600 hover:bg-gray-50",
              )}
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className={cn(
            "md:hidden border-t",
            isLandingPage || isStorefront
              ? "bg-[#0a0a0a]/95 border-white/5"
              : "bg-white/95 border-gray-100",
          )}
        >
          <div className="px-4 py-3 space-y-1">
            {isLandingPage && (
              <>
                <Link
                  href="/store/demo"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  Demo Store
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <LogIn className="h-4 w-4" /> Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center justify-center px-3 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-all mt-2"
                >
                  Create free shop
                </Link>
              </>
            )}

            {isDashboard && (
              <>
                {[
                  { href: "/dashboard", label: "Dashboard" },
                  { href: "/dashboard/products", label: "Products" },
                  { href: "/dashboard/settings", label: "Settings" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      pathname === href
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </>
            )}

            {isStorefront && (
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                Back to NaijaCart
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
