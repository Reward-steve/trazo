import { getProducts } from "@/app/actions/product";
import { getSettings } from "@/app/actions/settings";
import StorefrontClient from "@/app/components/store/StorefrontClient";
import { Product } from "@/app/types";
export const dynamic = "force-dynamic";

export default async function StorePage() {
  const [products, settings] = await Promise.all([
    getProducts(),
    getSettings(),
  ]);

  // Serialize dates for client component
  const serializedProducts = products.map((p: Product) => ({
    ...p,
    createdAt: new Date(p.createdAt),
  }));

  const serializedSettings = {
    ...settings,
    updatedAt: new Date(settings.updatedAt),
  };

  return (
    <StorefrontClient
      products={serializedProducts}
      settings={serializedSettings}
    />
  );
}
