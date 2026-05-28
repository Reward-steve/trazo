"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Settings,
  ExternalLink,
  LogOut,
  Store,
  Menu,
  X,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { cn } from "@/app/lib/utils";
import { useState } from "react";

interface Shop {
  id: string;
  shopName: string;
  slug: string;
  logoUrl: string;
  products: { id: string }[];
}

interface DashboardSidebarProps {
  shop: Shop;
}

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/products", label: "Products", icon: Package, exact: false },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, exact: false },
];

export default function DashboardSidebar({ shop }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
            ₦
          </div>
          <span className="font-bold text-gray-900 text-sm">NaijaCart</span>
        </Link>
      </div>

      {/* Shop identity */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {shop.logoUrl ? (
            <div className="relative h-9 w-9 rounded-xl overflow-hidden shrink-0 bg-gray-100">
              <Image src={shop.logoUrl} alt={shop.shopName} fill className="object-cover" />
            </div>
          ) : (
            <div className="h-9 w-9 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
              <Store className="h-5 w-5 text-emerald-600" />
            </div>
          )}
          <div className="min-w-0">
            <p className="font-bold text-gray-900 text-sm truncate">{shop.shopName}</p>
            <p className="text-xs text-gray-400 truncate">{shop.products.length} products</p>
          </div>
        </div>

        {/* Storefront link */}
        <Link
          href={`/store/${shop.slug}`}
          target="_blank"
          className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View storefront
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              isActive(href, exact)
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <Icon className={cn("h-4 w-4", isActive(href, exact) ? "text-emerald-600" : "text-gray-400")} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom — sign out */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all w-full"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 bg-white border-r border-gray-100 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-xs">
            ₦
          </div>
          <span className="font-bold text-gray-900 text-sm">{shop.shopName}</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-50"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/40 z-40 mt-14" onClick={() => setMobileOpen(false)} />
          <aside className="md:hidden fixed top-14 left-0 bottom-0 w-64 bg-white z-50 border-r border-gray-100 overflow-y-auto">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Mobile content offset */}
      <div className="md:hidden h-14 shrink-0" />
    </>
  );
}
