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

  const appUrl = process.env.APP_URL || "https://trazo-omega.vercel.app";
  const storefrontUrl = `${appUrl}/store/${shop.slug}`;

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-500",
    },
    {
      label: "Live & Available",
      value: availableProducts,
      icon: ToggleRight,
      bg: "bg-[var(--color-primary-light)]",
      iconColor: "text-[var(--color-primary)]",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: AlertCircle,
      bg: "bg-[var(--color-warning-light)]",
      iconColor: "text-[var(--color-warning)]",
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

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-black text-[var(--color-text)]">
          {shop.shopName}
        </h1>
        <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm mt-1">
          Your shop dashboard — manage products, share your link, receive
          orders.
        </p>
      </div>

      {/* Storefront hero card */}
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] rounded-2xl p-4 sm:p-6 mb-5 text-white shadow-lg shadow-[var(--color-primary)]/20">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="min-w-0">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">
              Your storefront link
            </p>
            <p className="text-base sm:text-lg font-black break-all leading-tight">
              {appUrl.replace("https://", "")}/store/{shop.slug}
            </p>
          </div>
          <Link
            href={`/store/${shop.slug}`}
            target="_blank"
            className="sm:shrink-0 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-2 rounded-xl transition-all w-full sm:w-auto"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Preview
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <CopyLinkButton url={storefrontUrl} />
        </div>

        <div className="border-t border-white/20 pt-4">
          <p className="text-white/60 text-xs font-medium mb-2">
            Where to share this link:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: Instagram, label: "Instagram bio" },
              { icon: MessageCircle, label: "WhatsApp status" },
              { icon: ExternalLink, label: "Twitter/X bio" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1 text-xs text-white/80"
              >
                <Icon className="h-3 w-3" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {stats.map(({ label, value, icon: Icon, bg, iconColor }) => (
          <div
            key={label}
            className="card p-4 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0"
          >
            <div
              className={`h-8 w-8 ${bg} rounded-xl flex items-center justify-center sm:mb-2 shrink-0`}
            >
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
            <div>
              <p className="text-xl font-black text-[var(--color-text)] leading-tight">
                {value}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-tight">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Setup checklist */}
        {!setupComplete && (
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 bg-[var(--color-warning-light)] rounded-lg flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-[var(--color-warning)]" />
              </div>
              <p className="font-bold text-[var(--color-text)] text-sm">
                Complete your setup
              </p>
            </div>
            <div className="space-y-3">
              {setupSteps.map(({ done, label, hint, href }) => (
                <Link
                  key={label}
                  href={done ? "#" : href}
                  className={`flex items-start gap-3 group ${done ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      done
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                        : "border-[var(--color-border)] group-hover:border-[var(--color-primary)]"
                    }`}
                  >
                    {done && (
                      <svg
                        className="h-3 w-3 text-white"
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
                      className={`text-sm font-medium transition-colors ${
                        done
                          ? "text-[var(--color-text-muted)] line-through"
                          : "text-[var(--color-text)] group-hover:text-[var(--color-primary)]"
                      }`}
                    >
                      {label}
                    </p>
                    {!done && (
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        {hint}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div className="space-y-3">
          {[
            {
              href: "/dashboard/products",
              icon: Package,
              iconBg: "bg-blue-50 dark:bg-blue-900/20",
              iconColor: "text-blue-500",
              title: "Manage Products",
              desc: "Add, edit, or remove products",
            },
            {
              href: "/dashboard/settings",
              icon: ExternalLink,
              iconBg: "bg-purple-50 dark:bg-purple-900/20",
              iconColor: "text-purple-500",
              title: "Shop Settings",
              desc: "Logo, name, WhatsApp number",
            },
          ].map(({ href, icon: Icon, iconBg, iconColor, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="group card p-5 flex items-center justify-between hover:border-[var(--color-primary-light)] hover:shadow-[var(--shadow-raised)] transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-9 w-9 ${iconBg} rounded-xl flex items-center justify-center`}
                >
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div>
                  <p className="font-bold text-[var(--color-text)] text-sm">
                    {title}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    {desc}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-[var(--color-border)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* No products nudge */}
      {totalProducts === 0 && (
        <div className="mt-5 bg-[var(--color-warning-light)] border border-[var(--color-warning)]/20 rounded-2xl p-5 flex items-start gap-4">
          <div className="h-9 w-9 bg-[var(--color-warning)]/10 rounded-xl flex items-center justify-center shrink-0">
            <Package className="h-5 w-5 text-[var(--color-warning)]" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[var(--color-text)] text-sm">
              Your shop has no products yet
            </p>
            <p className="text-[var(--color-text-secondary)] text-xs mt-0.5 mb-3">
              Customers who visit your storefront link will see an empty page.
              Add products now so they can start ordering.
            </p>
            <Link
              href="/dashboard/products"
              className="inline-flex items-center gap-1.5 bg-[var(--color-warning)] hover:bg-[var(--color-warning-hover,#b45309)] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
            >
              Add your first product
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
