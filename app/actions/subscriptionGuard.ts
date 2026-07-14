import { ShopPlan } from "../types";

export interface ShopBilling {
  plan: ShopPlan;
  isActive: boolean;
  planActivatedAt: Date | null;
}

/* ─────────────────────────────
   PLAN CONFIG (single source of truth)
───────────────────────────── */
export const PLAN_LIMITS = {
  free: {
    products: 20,
    branding: true,
  },
  growth: {
    products: 50,
    branding: false,
  },
  pro: {
    products: Infinity,
    branding: false,
  },
} as const;

/* ─────────────────────────────
   CORE HELPERS
───────────────────────────── */

export function getProductLimit(plan: ShopPlan): number {
  return PLAN_LIMITS[plan].products;
}

export function showBranding(plan: ShopPlan): boolean {
  return PLAN_LIMITS[plan].branding;
}

export function canAddProduct(plan: ShopPlan, currentCount: number): boolean {
  return currentCount < getProductLimit(plan);
}

/* ─────────────────────────────
   ACCESS CONTROL (SIMPLE & RELIABLE)
───────────────────────────── */

export function isShopActive(shop: ShopBilling): boolean {
  return shop.isActive === true;
}

export function requireActiveShop(shop: ShopBilling): void {
  if (!shop.isActive) {
    throw new Error("SHOP_INACTIVE");
  }
}
