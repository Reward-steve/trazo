import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getProducts } from "../../actions/product";
import { getShopByUser } from "../../actions/settings";
import ProductsClient from "../../components/dashboard/ProductsClient";
import { Product } from "../../types";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const [products, shop] = await Promise.all([getProducts(), getShopByUser()]);
  if (!shop) redirect("/onboarding");

  const available = products.filter((p) => p.available).length;

  const serialized = products.map((p: Product) => ({
    ...p,
    createdAt: new Date(p.createdAt),
  }));

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-text leading-tight">
            Products
          </h1>
          <p className="text-text-muted text-xs mt-0.5">
            Manage what customers see on your storefront.
          </p>
        </div>
        {products.length > 0 && (
          <div className="text-right shrink-0">
            <p className="text-lg font-black text-text leading-tight">
              {available}
              <span className="text-text-muted font-normal">
                /{products.length}
              </span>
            </p>
            <p className="text-[11px] text-text-muted">live</p>
          </div>
        )}
      </div>

      {/* Context hint */}
      {products.length > 0 && (
        <div className="flex items-center gap-2.5 bg-surface border border-border rounded-2xl px-4 py-3">
          <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          <p className="text-[11px] text-text-muted leading-relaxed">
            Changes appear on your storefront immediately. Toggling a product
            off hides it from customers without deleting it.
          </p>
        </div>
      )}

      <ProductsClient products={serialized} shopSlug={shop.slug} />
    </div>
  );
}
