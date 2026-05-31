import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getProducts } from "../../actions/product";
import { getShopByUser } from "../../actions/settings";
import ProductsClient from "../../components/dashboard/ProductsClient";
import { Product } from "@prisma/client";

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
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Products
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage what customers see on your storefront.
          </p>
        </div>
        {products.length > 0 && (
          <div className="shrink-0 text-right">
            <p className="text-2xl font-black text-gray-900 dark:text-white">
              {available}
              <span className="text-gray-300 dark:text-gray-600 font-normal">
                /{products.length}
              </span>
            </p>
            <p className="text-xs text-gray-400">live products</p>
          </div>
        )}
      </div>

      {/* Context hint — only shown when they have products */}
      {products.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
          <p className="text-xs text-blue-700 dark:text-blue-300">
            Changes you make here appear on your storefront immediately.
            Toggling a product off hides it from customers without deleting it.
          </p>
        </div>
      )}

      <ProductsClient products={serialized} shopSlug={shop.slug} />
    </div>
  );
}
