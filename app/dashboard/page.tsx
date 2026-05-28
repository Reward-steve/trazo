import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Package,
  ExternalLink,
  ArrowRight,
  ShoppingBag,
  ToggleRight,
} from "lucide-react";
import { getShopByUser } from "../actions/settings";
import CopyLinkButton from "../components/dashboard/CopyLinkButton";
import { Product } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const shop = await getShopByUser();
  if (!shop) redirect("/onboarding");

  const totalProducts = shop.products.length;
  const availableProducts = shop.products.filter(
    (p: Product) => p.available,
  ).length;
  const storefrontUrl = `${process.env.APP_URL || "https://naijacart.com"}/store/${shop.slug}`;

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Available",
      value: availableProducts,
      icon: ToggleRight,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Out of Stock",
      value: totalProducts - availableProducts,
      icon: ShoppingBag,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Welcome back 👋</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Here&apos;s an overview of your shop.
        </p>
      </div>

      {/* Storefront link card */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 mb-6 text-white shadow-lg shadow-emerald-600/20">
        <p className="text-emerald-100 text-sm font-medium mb-1">
          Your storefront link
        </p>
        <p className="text-lg font-black mb-4 break-all">/store/{shop.slug}</p>
        <div className="flex flex-wrap gap-3">
          <CopyLinkButton url={storefrontUrl} />
          <Link
            href={`/store/${shop.slug}`}
            target="_blank"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            Preview
          </Link>
        </div>
        <p className="text-emerald-200 text-xs mt-4">
          Put this link in your Instagram bio or WhatsApp status to start
          receiving orders.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
          >
            <div
              className={`h-9 w-9 ${bg} rounded-xl flex items-center justify-center mb-3`}
            >
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <p className="text-2xl font-black text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/products"
          className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex items-center justify-between"
        >
          <div>
            <p className="font-bold text-gray-900 text-sm">Manage Products</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Add, edit, or remove products
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/dashboard/settings"
          className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex items-center justify-between"
        >
          <div>
            <p className="font-bold text-gray-900 text-sm">Shop Settings</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Update name, logo, WhatsApp number
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* Empty state nudge */}
      {totalProducts === 0 && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
          <div className="h-9 w-9 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
            <Package className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-amber-900 text-sm">
              Your shop has no products yet
            </p>
            <p className="text-amber-700 text-xs mt-0.5 mb-3">
              Add your first product so customers can start ordering.
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
