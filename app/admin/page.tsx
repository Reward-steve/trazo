import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getProducts } from "@/app/actions/product";
import { getSettings } from "@/app/actions/settings";
import AdminClient from "@/app/components/admin/AdminClient";
import { Product } from "../types";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get("admin_auth");

  if (adminAuth?.value !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login");
  }

  const [products, settings] = await Promise.all([
    getProducts(),
    getSettings(),
  ]);

  const serializedProducts = products.map((p: Product) => ({
    ...p,
    createdAt: new Date(p.createdAt),
  }));

  const serializedSettings = {
    ...settings,
    updatedAt: new Date(settings.updatedAt),
  };

  return (
    <AdminClient products={serializedProducts} settings={serializedSettings} />
  );
}
