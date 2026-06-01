export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  available: boolean;
  stock?: number | null; // null = unlimited
  createdAt: Date;
}

export interface ShopSettings {
  id: string;
  shopName: string;
  whatsappNumber: string;
  description: string;
  logoUrl: string;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock?: number | null; // carried from product so cart can enforce limits
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
}
