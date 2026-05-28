"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, Send } from "lucide-react";
import { CartItem, CustomerDetails, ShopSettings } from "../../types";
import { formatNaira, generateWhatsAppURL } from "../../lib/utils";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  settings: ShopSettings;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  settings,
}: CartDrawerProps) {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const validate = () => {
    const e: Partial<CustomerDetails> = {};
    if (!customer.name.trim()) e.name = "Name is required";
    if (!customer.phone.trim()) e.phone = "Phone number is required";
    if (!customer.address.trim()) e.address = "Delivery address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOrder = () => {
    if (!validate()) return;
    const url = generateWhatsAppURL(
      settings.whatsappNumber,
      settings.shopName,
      items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      customer,
      total,
    );
    window.open(url, "_blank");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-emerald-600" />
            {step === "cart" ? `Cart (${items.length})` : "Delivery Details"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Empty cart */}
        {items.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <ShoppingBag className="h-10 w-10 text-gray-300" />
            </div>
            <p className="font-semibold text-gray-700">Your cart is empty</p>
            <p className="text-sm text-gray-400">
              Add items from the store to get started
            </p>
            <Button variant="secondary" onClick={onClose} size="sm">
              Continue Shopping
            </Button>
          </div>
        )}

        {/* Cart step */}
        {items.length > 0 && step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0 bg-white">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-sm font-bold text-emerald-700 mt-0.5">
                      {formatNaira(item.price * item.quantity)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-6 w-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-6 w-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="ml-auto text-xs text-red-400 hover:text-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-gray-100 space-y-3">
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span className="text-emerald-700">{formatNaira(total)}</span>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => setStep("checkout")}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}

        {/* Checkout step */}
        {items.length > 0 && step === "checkout" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <p className="text-sm text-gray-500">
                Fill in your delivery details. Your order will be sent directly
                to the vendor on WhatsApp.
              </p>
              <Input
                label="Full Name"
                placeholder="e.g. Chidi Okonkwo"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                error={errors.name}
              />
              <Input
                label="Phone Number"
                placeholder="e.g. 08012345678"
                type="tel"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
                error={errors.phone}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Delivery Address
                </label>
                <textarea
                  placeholder="e.g. 14 Admiralty Way, Lekki Phase 1, Lagos"
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-gray-300 transition"
                />
                {errors.address && (
                  <p className="text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              {/* Order summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Order Summary
                </p>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      {formatNaira(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-emerald-700">
                  <span>Total</span>
                  <span>{formatNaira(total)}</span>
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-100 space-y-2">
              <Button className="w-full" size="lg" onClick={handleOrder}>
                <Send className="h-4 w-4" /> Send Order on WhatsApp
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                size="md"
                onClick={() => setStep("cart")}
              >
                ← Back to Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
