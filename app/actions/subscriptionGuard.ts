import { redirect } from "next/navigation";

export type ShopStatus = "trial" | "active" | "expired";

export function getShopStatus(shop: {
  trialEndsAt: Date | null;
  subscriptionEndsAt: Date | null;
}): ShopStatus {
  const now = new Date();

  // Active subscription overrides everything
  if (shop.subscriptionEndsAt && shop.subscriptionEndsAt > now) {
    return "active";
  }

  // Trial still valid
  if (shop.trialEndsAt && shop.trialEndsAt > now) {
    return "trial";
  }

  return "expired";
}

/**
 * Hard gate: blocks access completely
 * Use in protected pages (dashboard, products, settings)
 */
export function requireActiveShop(shop: {
  trialEndsAt: Date | null;
  subscriptionEndsAt: Date | null;
  slug: string;
}) {
  const status = getShopStatus(shop);

  if (status === "expired") {
    redirect("/dashboard/billing");
  }

  return status;
}

/**
 * Soft gate: UI banner logic only (no redirects)
 * Use for dashboard banners
 */
export function getShopBillingBanner(shop: {
  trialEndsAt: Date | null;
  subscriptionEndsAt: Date | null;
}) {
  const status = getShopStatus(shop);
  const now = new Date();

  if (status === "active") {
    return {
      type: "active" as const,
      title: "Active subscription",
      message: "Your store is running normally.",
    };
  }

  if (shop.subscriptionEndsAt && shop.subscriptionEndsAt > now) {
    const daysLeft = Math.ceil(
      (shop.subscriptionEndsAt.getTime() - now.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    return {
      type: "trial" as const,
      title: "Subscription active",
      message: `Your plan is active. ${daysLeft} day(s) remaining.`,
    };
  }

  if (shop.trialEndsAt && shop.trialEndsAt > now) {
    const daysLeft = Math.ceil(
      (shop.trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    return {
      type: "trial" as const,
      title: "Free trial active",
      message: `${daysLeft} day(s) left in your trial.`,
    };
  }

  return {
    type: "expired" as const,
    title: "Your store is paused",
    message:
      "Your trial has ended. Reactivate your store to continue receiving orders.",
  };
}

/**
 * Lightweight check (for APIs / server actions)
 */
export function isShopActive(shop: {
  trialEndsAt: Date | null;
  subscriptionEndsAt: Date | null;
}) {
  return getShopStatus(shop) !== "expired";
}
