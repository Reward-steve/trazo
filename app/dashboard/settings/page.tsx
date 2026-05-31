import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getShopByUser } from "../../actions/settings";
import SettingsClient from "../../components/dashboard/SettingsClient";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const shop = await getShopByUser();
  if (!shop) redirect("/onboarding");

  const serialized = {
    ...shop,
    updatedAt: new Date(shop.updatedAt),
    createdAt: new Date(shop.createdAt),
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Shop Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Changes appear on your storefront immediately.
          </p>
        </div>
        <Link
          href={`/store/${shop.slug}`}
          target="_blank"
          className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 px-3 py-2 rounded-xl transition-all"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View storefront
        </Link>
      </div>

      {/* WhatsApp number warning */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 mb-5 flex items-start gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
        <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
          Your WhatsApp number is where all customer orders are sent. Make sure
          it is correct — a wrong number means lost orders.
        </p>
      </div>

      <SettingsClient shop={serialized} />
    </div>
  );
}
