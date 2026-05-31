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
  Copy,
  CheckCircle,
} from "lucide-react";
import { ThemeToggle } from "../../components/ui/ThemeProvider";

import { useClerk } from "@clerk/nextjs";
import { cn } from "../../lib/utils";
import { useState } from "react";

interface Shop {
  id: string;
  shopName: string;
  slug: string;
  logoUrl: string;
  products: { id: string; available: boolean }[];
}

interface DashboardSidebarProps {
  shop: Shop;
}

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  {
    href: "/dashboard/products",
    label: "Products",
    icon: Package,
    exact: false,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
    exact: false,
  },
];

export default function DashboardSidebar({ shop }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const storefrontUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/store/${shop.slug}`;

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(storefrontUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const availableCount = shop.products.filter((p) => p.available).length;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-background">
      {/* Platform logo */}
      <div className="px-5 py-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm shadow-sm">
            ₦
          </div>
          <span className="font-bold text-text text-sm group-hover:text-primary transition-colors">
            Trazo
          </span>
        </Link>
      </div>

      {/* Shop card */}
      <div className="mx-3 my-3 p-3 bg-surface rounded-xl border border-border">
        <div className="flex items-center gap-3 mb-3">
          {shop.logoUrl ? (
            <div className="relative h-10 w-10 rounded-xl overflow-hidden shrink-0 bg-surface">
              <Image
                src={shop.logoUrl}
                alt={shop.shopName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-10 w-10 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
              <Store className="h-5 w-5 text-primary" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-bold text-text text-sm truncate">
              {shop.shopName}
            </p>
            <p className="text-xs text-text mt-0.5">
              {availableCount} of {shop.products.length} products live
            </p>
          </div>
        </div>

        {/* Storefront link — the most important thing */}
        <div className="bg-background rounded-lg border border-border p-2">
          <p className="text-[10px] font-semibold text-text uppercase tracking-wider mb-1 px-1">
            Your store link
          </p>
          <div className="flex items-center gap-1">
            <p className="text-xs text-primary font-medium truncate flex-1 px-1">
              /store/{shop.slug}
            </p>
            <button
              onClick={handleCopy}
              title="Copy link"
              className="p-1.5 rounded-md text-text hover:text-primary hover:bg-primary-light transition-all shrink-0"
            >
              {copied ? (
                <CheckCircle className="h-3.5 w-3.5 text-primary-light0" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
            <Link
              href={`/store/${shop.slug}`}
              target="_blank"
              title="Preview storefront"
              className="p-1.5 rounded-md text-text hover:text-primary hover:bg-primary-light transition-all shrink-0"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {navLinks.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-primary-light text-primary"
                  : "text-text-secondary  hover:text-text hover:bg-background ",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  active ? "text-primary" : "text-text",
                )}
              />
              <span>{label}</span>
              {/* Product count badge */}
              {href === "/dashboard/products" && shop.products.length > 0 && (
                <span
                  className={cn(
                    "ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                    active
                      ? "bg-emerald-100 dark:bg-emerald-900 text-primary dark:text-emerald-300"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500",
                  )}
                >
                  {shop.products.length}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Help hint */}
      <div className="mx-3 mb-3 p-3 bg-primary-light dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
        <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-0.5">
          Share your store
        </p>
        <p className="text-[11px] text-primary leading-relaxed">
          Copy your store link above and put it in your Instagram bio or
          WhatsApp status.
        </p>
      </div>

      {/* Bottom Actions (Sign out & Theme Toggle) */}
      <div className="px-3 pb-4 border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center gap-2">
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-text hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex-1"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Sign out</span>
        </button>

        <ThemeToggle />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col h-screen sticky top-0 border-r border-gray-100 dark:border-gray-800">
        {SidebarContent()}
      </aside>

      {/* Mobile topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {shop.logoUrl ? (
            <div className="relative h-7 w-7 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={shop.logoUrl}
                alt={shop.shopName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-7 w-7 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xs">
              ₦
            </div>
          )}
          <span className="font-bold text-gray-900 dark:text-white text-sm truncate max-w-[160px]">
            {shop.shopName}
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-50  transition"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 mt-14"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "md:hidden fixed top-14 left-0 bottom-0 w-72 z-50 border-r border-gray-100 dark:border-gray-800 overflow-y-auto transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {SidebarContent()}
      </aside>

      {/* Mobile content spacer */}
      <div className="md:hidden h-14 w-full" />
    </>
  );
}
