"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Lock, Home, Store, Menu, X } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface NavbarProps {
  shopName: string;
  cartCount?: number;
  onOpenCart?: () => void;
}

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/store", label: "Storefront", icon: Store },
  { href: "/admin", label: "Admin", icon: Lock },
];

export default function Navbar({
  shopName,
  cartCount = 0,
  onOpenCart,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900"
            >
              <div className="h-9 w-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black shadow-sm">
                ₦
              </div>
              <span className="tracking-tight max-w-[140px] truncate sm:max-w-none">
                {shopName || "NaijaCart"}
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5",
                  pathname === href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}

            {pathname === "/store" && onOpenCart && (
              <button
                onClick={onOpenCart}
                className="ml-4 relative p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition duration-200"
              >
                <ShoppingBag className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center space-x-2 md:hidden">
            {pathname === "/store" && onOpenCart && (
              <button
                onClick={onOpenCart}
                className="relative p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition"
              >
                <ShoppingBag className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-50"
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
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-all",
                  pathname === href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                )}
              >
                <Icon className="h-5 w-5 text-gray-400" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
