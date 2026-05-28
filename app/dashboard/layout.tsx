import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getShopByUser } from "../actions/settings";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  // If vendor has no shop yet, send them to onboarding
  const shop = await getShopByUser();
  if (!shop) redirect("/onboarding");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar shop={shop} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
