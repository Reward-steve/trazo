export type ShopStatus = "trial" | "active" | "expired";

interface ShopDates {
  trialEndsAt: Date | null;
  subscriptionEndsAt: Date | null;
}

// ─── Core status ──────────────────────────────────────────────────────────────

export function getShopStatus(shop: ShopDates): ShopStatus {
  const now = new Date();

  if (shop.subscriptionEndsAt && shop.subscriptionEndsAt > now) return "active";
  if (shop.trialEndsAt && shop.trialEndsAt > now) return "trial";

  return "expired";
}

// ─── Days remaining ───────────────────────────────────────────────────────────

export function getDaysLeft(shop: ShopDates): number {
  const now = new Date();
  // Paid subscription takes priority over trial
  const end = shop.subscriptionEndsAt ?? shop.trialEndsAt;
  if (!end) return 0;
  return Math.max(
    0,
    Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
  );
}

// ─── Banner data for dashboard UI ────────────────────────────────────────────

export function getShopBillingBanner(shop: ShopDates) {
  const status = getShopStatus(shop);
  const daysLeft = getDaysLeft(shop);

  if (status === "active") {
    return {
      type: "active" as const,
      title: "Subscription active",
      message: `Your plan renews in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}.`,
    };
  }

  if (status === "trial") {
    const urgent = daysLeft <= 3;
    return {
      type: "trial" as const,
      urgent,
      title: urgent
        ? `⚠️ ${daysLeft} day${daysLeft !== 1 ? "s" : ""} left in your trial`
        : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left in your free trial`,
      message: urgent
        ? "Your store will pause soon. Pay ₦3,000 now to keep receiving orders without interruption."
        : "After your trial ends, continue for ₦3,000/month. Your products and settings are always safe.",
    };
  }

  // expired
  return {
    type: "expired" as const,
    urgent: true,
    title: "Your store is paused",
    message:
      "Your trial has ended. Pay ₦3,000 to reactivate and keep receiving orders.",
  };
}

// ─── Boolean helpers ─────────────────────────────────────────────────────────

export function isShopActive(shop: ShopDates): boolean {
  return getShopStatus(shop) !== "expired";
}

export function isTrialUser(shop: ShopDates): boolean {
  return getShopStatus(shop) === "trial";
}

export function isPaidUser(shop: ShopDates): boolean {
  return getShopStatus(shop) === "active";
}

// ─── Hard gate for server actions ────────────────────────────────────────────
// Call this inside any server action that should be blocked for expired shops
// e.g. createProduct, updateShop etc.

export function requireActiveShop(shop: ShopDates): void {
  if (!isShopActive(shop)) {
    throw new Error("SUBSCRIPTION_EXPIRED");
  }
}
