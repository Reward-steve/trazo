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

export function getDaysLeft(shop: {
  trialEndsAt: Date | null;
  subscriptionEndsAt: Date | null;
}) {
  const now = new Date();
  const end = shop.subscriptionEndsAt ?? shop.trialEndsAt;

  if (!end) return 0;

  const diff = end.getTime() - now.getTime();

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function isTrialUser(shop: {
  trialEndsAt: Date | null;
  subscriptionEndsAt: Date | null;
}) {
  return (
    !shop.subscriptionEndsAt &&
    !!shop.trialEndsAt &&
    shop.trialEndsAt > new Date()
  );
}

/* 🔐 CORE GATE (YOU NEED THIS) */
export function requireActiveShop(shop: {
  trialEndsAt: Date | null;
  subscriptionEndsAt: Date | null;
}) {
  const now = new Date();

  const end = shop.subscriptionEndsAt ?? shop.trialEndsAt;

  const isExpired = !end || end < now;

  if (isExpired) {
    throw new Error("SUBSCRIPTION_EXPIRED");
  }
}
