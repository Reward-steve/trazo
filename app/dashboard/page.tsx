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
import { getShopByUser } from "../../app/actions/settings";
import CopyLinkButton from "../../app/components/dashboard/CopyLinkButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const shop = await getShopByUser();
  if (!shop) redirect("/onboarding");

  const totalProducts = shop.products.length;
  const availableProducts = shop.products.filter((p) => p.available).length;
  const outOfStock = totalProducts - availableProducts;

  const appUrl = process.env.APP_URL || "https://naijacart.com";
  const storefrontUrl = `${appUrl}/store/${shop.slug}`;

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-500",
    },
    {
      label: "Live & Available",
      value: availableProducts,
      icon: ToggleRight,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-500",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      iconColor: "text-amber-500",
    },
  ];

  // Checklist — guides vendor through setup
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
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">
          {shop.shopName}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Your shop dashboard — manage products, share your link, receive
          orders.
        </p>
      </div>

      {/* Storefront link — hero card */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-5 sm:p-6 mb-5 text-white shadow-lg shadow-emerald-600/20">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wider mb-1">
              Your storefront link
            </p>
            <p className="text-base sm:text-lg font-black break-all leading-tight">
              {appUrl.replace("https://", "")}/store/{shop.slug}
            </p>
          </div>
          <Link
            href={`/store/${shop.slug}`}
            target="_blank"
            className="shrink-0 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-2 rounded-xl transition-all"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Preview
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <CopyLinkButton url={storefrontUrl} />
        </div>
        {/* Where to share */}
        <div className="border-t border-emerald-500/30 pt-4">
          <p className="text-emerald-200 text-xs font-medium mb-2">
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
                className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1 text-xs text-emerald-100"
              >
                <Icon className="h-3 w-3" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {stats.map(({ label, value, icon: Icon, bg, iconColor }) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <div
              className={`h-8 w-8 ${bg} rounded-xl flex items-center justify-center mb-2`}
            >
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
            <p className="text-xl font-black text-gray-900 dark:text-white">
              {value}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Setup checklist */}
        {!setupComplete && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-amber-500" />
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">
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
                        ? "border-emerald-500 bg-emerald-500"
                        : "border-gray-200 dark:border-gray-700 group-hover:border-emerald-400"
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
                      className={`text-sm font-medium ${done ? "text-gray-400 line-through" : "text-gray-900 dark:text-white group-hover:text-emerald-600"}`}
                    >
                      {label}
                    </p>
                    {!done && (
                      <p className="text-xs text-gray-400 mt-0.5">{hint}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div className="space-y-3">
          <Link
            href="/dashboard/products"
            className="group bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <Package className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  Manage Products
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Add, edit, or remove products
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/dashboard/settings"
            className="group bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <ExternalLink className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  Shop Settings
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Logo, name, WhatsApp number
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* No products nudge */}
      {totalProducts === 0 && (
        <div className="mt-5 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 flex items-start gap-4">
          <div className="h-9 w-9 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center shrink-0">
            <Package className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-amber-900 dark:text-amber-300 text-sm">
              Your shop has no products yet
            </p>
            <p className="text-amber-700 dark:text-amber-400 text-xs mt-0.5 mb-3">
              Customers who visit your storefront link will see an empty page.
              Add products now so they can start ordering.
            </p>
            <Link
              href="/dashboard/products"
              className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
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
