import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Package,
  ExternalLink,
  ArrowRight,
  ToggleRight,
  AlertCircle,
  Instagram,
  MessageCircle,
  Lightbulb,
  Settings,
} from "lucide-react";
import { getShopByUser } from "../actions/settings";
import CopyLinkButton from "../components/dashboard/CopyLinkButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const shop = await getShopByUser();
  if (!shop) redirect("/onboarding");

  const totalProducts = shop.products.length;
  const availableProducts = shop.products.filter((p) => p.available).length;
  const outOfStock = totalProducts - availableProducts;

  const appUrl = "https://trazo-omega.vercel.app";
  const storefrontUrl = `${appUrl}/store/${shop.slug}`;

  const stats = [
    {
      label: "Total products",
      value: totalProducts,
      icon: Package,
    },
    {
      label: "Live & available",
      value: availableProducts,
      icon: ToggleRight,
      highlight: true,
    },
    {
      label: "Out of stock",
      value: outOfStock,
      icon: AlertCircle,
      warn: outOfStock > 0,
    },
  ];

  const setupSteps = [
    {
      done: !!shop.logoUrl,
      label: "Add your shop logo",
      hint: "Helps customers recognise your brand",
      href: "/dashboard/settings",
    },
    {
      done: totalProducts > 0,
      label: "Add your first product",
      hint: "Customers can't order what they can't see",
      href: "/dashboard/products",
    },
    {
      done: totalProducts >= 3,
      label: "Add at least 3 products",
      hint: "Shops with more products get more orders",
      href: "/dashboard/products",
    },
  ];

  const setupComplete = setupSteps.every((s) => s.done);
  const doneCount = setupSteps.filter((s) => s.done).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-text leading-tight">
            {shop.shopName}
          </h1>
          <p className="text-text-muted text-xs mt-0.5">Dashboard</p>
        </div>
        <Link
          href="/dashboard/settings"
          className="h-9 w-9 flex items-center justify-center rounded-full bg-surface-alt border border-border text-text-muted hover:text-text transition-colors"
        >
          <Settings className="h-4 w-4" />
        </Link>
      </div>

      {/* Storefront link card — WhatsApp header green */}
      <div className="bg-primary-dark rounded-2xl p-4 text-white">
        <p className="text-white/60 text-[11px] font-medium uppercase tracking-widest mb-1">
          Your storefront
        </p>
        <p className="text-sm font-bold break-all leading-snug mb-3">
          {appUrl.replace("https://", "")}/store/{shop.slug}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <CopyLinkButton url={storefrontUrl} />
          <Link
            href={`/store/${shop.slug}`}
            target="_blank"
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Preview
          </Link>
        </div>

        <div className="border-t border-white/10 pt-3">
          <p className="text-white/50 text-[11px] mb-2">Share on</p>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: Instagram, label: "Instagram bio" },
              { icon: MessageCircle, label: "WhatsApp status" },
              { icon: ExternalLink, label: "Twitter/X bio" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-1 text-[11px] text-white/70"
              >
                <Icon className="h-3 w-3" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, icon: Icon, highlight, warn }) => (
          <div
            key={label}
            className="bg-surface border border-border rounded-2xl p-3 flex flex-col gap-2"
          >
            <div
              className={`h-7 w-7 rounded-xl flex items-center justify-center
                ${highlight ? "bg-bubble-out" : warn && value > 0 ? "bg-surface-alt" : "bg-surface-alt"}`}
            >
              <Icon
                className={`h-3.5 w-3.5
                  ${highlight ? "text-primary-dark" : warn && value > 0 ? "text-text-muted" : "text-text-muted"}`}
              />
            </div>
            <div>
              <p
                className={`text-2xl font-black leading-none
                ${highlight ? "text-primary-dark" : "text-text"}`}
              >
                {value}
              </p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-tight">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Setup checklist */}
      {!setupComplete && (
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <p className="text-sm font-bold text-text">Complete your setup</p>
            </div>
            <span className="text-[11px] text-text-muted font-medium">
              {doneCount}/{setupSteps.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-surface-alt rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(doneCount / setupSteps.length) * 100}%` }}
            />
          </div>

          <div className="space-y-3">
            {setupSteps.map(({ done, label, hint, href }) => (
              <Link
                key={label}
                href={done ? "#" : href}
                className={`flex items-start gap-3 group ${done ? "pointer-events-none" : ""}`}
              >
                {/* Checkbox circle */}
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors
                    ${
                      done
                        ? "border-primary bg-primary"
                        : "border-border group-hover:border-primary"
                    }`}
                >
                  {done && (
                    <svg
                      className="h-2.5 w-2.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p
                    className={`text-sm transition-colors
                    ${
                      done
                        ? "text-text-muted line-through"
                        : "text-text font-medium group-hover:text-primary"
                    }`}
                  >
                    {label}
                  </p>
                  {!done && (
                    <p className="text-[11px] text-text-muted mt-0.5">{hint}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="space-y-2">
        {[
          {
            href: "/dashboard/products",
            icon: Package,
            title: "Manage products",
            desc: "Add, edit, or remove products",
          },
          {
            href: "/dashboard/settings",
            icon: Settings,
            title: "Shop settings",
            desc: "Logo, name, WhatsApp number",
          },
        ].map(({ href, icon: Icon, title, desc }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center justify-between bg-surface border border-border rounded-2xl p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-bubble-out rounded-xl flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary-dark" />
              </div>
              <div>
                <p className="text-sm font-bold text-text">{title}</p>
                <p className="text-[11px] text-text-muted mt-0.5">{desc}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-border group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>

      {/* No products nudge */}
      {totalProducts === 0 && (
        <div className="bg-surface-alt border border-border rounded-2xl p-4 flex items-start gap-3">
          <div className="h-8 w-8 bg-surface rounded-xl border border-border flex items-center justify-center shrink-0">
            <Package className="h-4 w-4 text-text-muted" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-text">
              Your shop has no products yet
            </p>
            <p className="text-[11px] text-text-muted mt-0.5 mb-3 leading-relaxed">
              Customers who visit your storefront will see an empty page. Add
              products so they can start ordering.
            </p>
            <Link
              href="/dashboard/products"
              className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
            >
              Add your first product
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
