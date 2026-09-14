import { ShopPlan } from "../../types";

// types.ts
export interface ShopWithProducts {
  id: string;
  shopName: string;
  slug: string;
  whatsappNumber: string;
  description: string;
  logoUrl: string;
  plan: ShopPlan;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  products: { id: string }[];
  bankName: string | null;
  accountName: string | null;
  accountNumber: string | null;
  paymentInstructions: string | null;
}
