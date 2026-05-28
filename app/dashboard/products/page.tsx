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

  const serialized = products.map((p: Product) => ({
    ...p,
    createdAt: new Date(p.createdAt),
  }));

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Products</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage what appears in your storefront.
        </p>
      </div>
      <ProductsClient products={serialized} shopSlug={shop.slug} />
    </div>
  );
}
