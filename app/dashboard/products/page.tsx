import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getProducts } from "../../actions/product";
import { getShopByUser } from "../../actions/settings";
import ProductsClient from "../../components/dashboard/ProductsClient";
import { getProductLimit } from "../../actions/subscriptionGuard";
import { normalizePlan } from "../../lib/utils";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const shop = await getShopByUser();

  if (!shop) {
    redirect("/onboarding");
  }

  const products = await getProducts();

  const available = products.filter((p) => p.available).length;

  const serialized = products.map((p) => ({
    id: p.id,
    shopId: p.shopId,
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl,
    available: p.available,
    stock: p.stock,
    createdAt: p.createdAt,
  }));

  const planLimits = {
    free: 10,
    growth: 50,
    pro: Infinity,
  };

  const limit = planLimits[shop.plan ?? "free"];
  const usage = products.length;

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
          <div className="text-right">
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

      {/* PLAN USAGE (NEW - IMPORTANT FOR MONETIZATION) */}
      <div className="bg-surface border border-border rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-text capitalize">
            {shop.plan} plan
          </p>
          <p className="text-[11px] text-text-muted">
            {usage}/{limit === Infinity ? "∞" : limit} products used
          </p>
        </div>

        {shop.plan === "free" && (
          <span className="text-[10px] px-2 py-1 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/20">
            Upgrade available
          </span>
        )}
      </div>

      {/* Context hint */}
      {products.length > 0 && (
        <div className="flex items-center gap-2.5 bg-surface border border-border rounded-2xl px-4 py-3">
          <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          <p className="text-[11px] text-text-muted leading-relaxed">
            Toggling a product off hides it from customers without deleting it.
          </p>
        </div>
      )}

      <ProductsClient
        products={serialized}
        shopSlug={shop.slug}
        productLimit={getProductLimit(normalizePlan(shop.plan))}
        plan={shop.plan}
      />
    </div>
  );
}
