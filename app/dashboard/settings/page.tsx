import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getShopByUser } from "@/app/actions/settings";
import SettingsClient from "@/app/components/dashboard/SettingsClient";

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
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Shop Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Update your shop details. Changes appear on your storefront immediately.
        </p>
      </div>
      <SettingsClient shop={serialized} />
    </div>
  );
}
