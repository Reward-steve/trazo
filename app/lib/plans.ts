// lib/plans.ts
// Single source of truth for Trazo's pricing tiers.
// Consumed by: marketing pricing page, subscription page,
// Paystack checkout, and server-side plan-gating layer.

export const PLAN_ORDER = ["free", "growth", "pro"] as const;
export type PlanKey = (typeof PLAN_ORDER)[number];

export interface PlanDefinition {
  key: PlanKey;
  label: string;
  price: number | null;       
  period: string;
  isPro: boolean;
  cta: string;
  features: string[];
  productLimit: number | null;  
  capabilities: {
    canReceiveOrders: boolean; 
    hasBranding: boolean;    
    analytics: "none" | "basic" | "advanced";
    prioritySupport: boolean;
  };
}

export const PLANS: Record<PlanKey, PlanDefinition> = {
  free: {
    key: "free",
    label: "Free",
    price: null,
    period: "Forever, no card needed",
    isPro: false,
    cta: "Get Started Free",
    productLimit: 15,
    features: [
      "Up to 20 products",
      "Public storefront link",
      "Mobile-friendly storefront",
      "Customers can browse your store",
      "Share your store anywhere",
    ],
    capabilities: {
      canReceiveOrders: true,
      hasBranding: true,
      analytics: "none",
      prioritySupport: false,
    },
  },

  growth: {
    key: "growth",
    label: "Growth",
    price: 1500,
    period: "per month",
    isPro: true,
    cta: "Upgrade to Growth",
    productLimit: 45,
    features: [
      "Everything in Free",
      "Up to 50 products",
      "Customers can place orders",
      "Orders land in your WhatsApp",
      "Order history dashboard",
      "No Trazo branding",
      "Basic analytics",
    ],
    capabilities: {
      canReceiveOrders: true,
      hasBranding: false,
      analytics: "basic",
      prioritySupport: false,
    },
  },

  pro: {
    key: "pro",
    label: "Pro",
    price: 3500,
    period: "per month",
    isPro: true,
    cta: "Go Pro",
    productLimit: null, // unlimited
    features: [
      "Everything in Growth",
      "Unlimited products",
      "Advanced analytics",
      "Sales insights",
      "Best-selling products",
      "Customer insights",
      "Priority support",
    ],
    capabilities: {
      canReceiveOrders: true,
      hasBranding: false,
      analytics: "advanced",
      prioritySupport: true,
    },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getPlan(key: PlanKey): PlanDefinition {
  return PLANS[key];
}

export function getPlanRank(plan: PlanKey): number {
  return PLAN_ORDER.indexOf(plan);
}

export function canReceiveOrders(plan: PlanKey): boolean {
  return PLANS[plan].capabilities.canReceiveOrders;
}

export function showBranding(plan: PlanKey): boolean {
  return PLANS[plan].capabilities.hasBranding;
}

export function getProductLimit(plan: PlanKey): number | null {
  return PLANS[plan].productLimit;
}

export function isAtProductLimit(plan: PlanKey, count: number): boolean {
  const limit = getProductLimit(plan);
  if (limit === null) return false; // unlimited
  return count >= limit;
}