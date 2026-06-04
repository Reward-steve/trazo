export type ShopStatus = "trial" | "active" | "expired";

export interface ShopDates {
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

  const base = {
    daysLeft,
  };

  if (status === "active") {
    return {
      ...base,
      type: "active" as const,
      tone: "green" as const,
      title: "Subscription active",
      message: `Renews in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}.`,
      cta: "Manage plan",
    };
  }

  if (status === "trial") {
    const urgent = daysLeft <= 3;

    return {
      ...base,
      type: "trial" as const,
      tone: urgent ? ("orange" as const) : ("blue" as const),
      urgent,
      title: urgent
        ? `⚠️ ${daysLeft} day${daysLeft !== 1 ? "s" : ""} left in trial`
        : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left in trial`,
      message: urgent
        ? "Your store may pause soon. Upgrade to avoid interruption."
        : "Your trial is active. Everything is running normally.",
      cta: "Upgrade plan",
    };
  }

  return {
    ...base,
    type: "expired" as const,
    tone: "red" as const,
    urgent: true,
    title: "Subscription expired",
    message: "Your store is paused. Reactivate to resume orders.",
    cta: "Reactivate store",
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
