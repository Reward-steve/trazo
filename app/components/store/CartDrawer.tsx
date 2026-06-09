"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, Send } from "lucide-react";
import { CartItem, CustomerDetails, ShopSettings } from "../../types";
import { formatNaira, generateWhatsAppURL } from "../../lib/utils";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { cn } from "../../lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  settings: ShopSettings;
}

const EMPTY_CUSTOMER: CustomerDetails = { name: "", phone: "", address: "" };

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  settings,
}: CartDrawerProps) {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [customer, setCustomer] = useState<CustomerDetails>(EMPTY_CUSTOMER);
  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});

  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const validate = () => {
    const e: Partial<CustomerDetails> = {};
    if (!customer.name.trim()) e.name = "Full name is required";
    if (!customer.phone.trim()) e.phone = "Phone number is required";
    if (!customer.address.trim()) e.address = "Delivery address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleClose = useCallback(() => {
    setStep("cart");
    setCustomer(EMPTY_CUSTOMER);
    setErrors({});
    onClose();
  }, [onClose]);

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
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface z-50 flex flex-col border-l border-border animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-header">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-white" />
            <h2 className="text-sm font-bold text-white">
              {step === "cart"
                ? `Cart${totalQty > 0 ? ` (${totalQty})` : ""}`
                : "Delivery details"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress indicator */}
        {items.length > 0 && (
          <div className="flex gap-1 px-4 pt-3">
            <div className="h-1 flex-1 rounded-full bg-primary" />
            <div
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-300",
                step === "checkout" ? "bg-primary" : "bg-border",
              )}
            />
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {items.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
            <div className="h-16 w-16 bg-bubble-out rounded-2xl flex items-center justify-center">
              <ShoppingBag className="h-7 w-7 text-primary-dark" />
            </div>
            <div>
              <p className="font-bold text-text text-sm mb-1">
                Your cart is empty
              </p>
              <p className="text-xs text-text-muted">
                Add items from the store to place an order
              </p>
            </div>
            <Button variant="secondary" onClick={handleClose} size="sm">
              Continue shopping
            </Button>
          </div>
        )}

        {/* ── CART STEP ── */}
        {items.length > 0 && step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
              {items.map((item) => {
                const maxStock = item.stock ?? Infinity;
                const canIncrease = item.quantity < maxStock;
                const canDecrease = item.quantity > 1;
                const atMax =
                  item.stock !== null &&
                  item.stock !== undefined &&
                  item.quantity >= item.stock;

                return (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-surface-alt rounded-2xl border border-border"
                  >
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden shrink-0 bg-surface">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text line-clamp-2 leading-snug">
                        {item.name}
                      </p>
                      <p className="text-sm font-bold text-primary-dark mt-0.5">
                        {formatNaira(item.price * item.quantity)}
                      </p>

                      {/* Only show when they've hit the stock ceiling */}
                      {atMax && (
                        <p className="text-[11px] text-amber-500 mt-1 font-medium">
                          Max quantity reached
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            canDecrease &&
                            onUpdateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={!canDecrease}
                          className={cn(
                            "h-7 w-7 rounded-lg bg-surface border border-border flex items-center justify-center transition active:scale-95",
                            !canDecrease && "opacity-40 cursor-not-allowed",
                          )}
                        >
                          <Minus className="h-3 w-3 text-text-muted" />
                        </button>

                        <span className="text-sm font-bold w-5 text-center text-text">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            canIncrease &&
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={!canIncrease}
                          className={cn(
                            "h-7 w-7 rounded-lg bg-surface border border-border flex items-center justify-center transition active:scale-95",
                            canIncrease
                              ? "hover:border-primary"
                              : "opacity-40 cursor-not-allowed",
                          )}
                        >
                          <Plus className="h-3 w-3 text-text-muted" />
                        </button>

                        <button
                          onClick={() => onRemove(item.id)}
                          className="ml-auto text-[11px] text-text-muted hover:text-red-500 font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-4 py-4 border-t border-border space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium text-text-muted">
                  Total
                </span>
                <span className="text-lg font-black text-text">
                  {formatNaira(total)}
                </span>
              </div>
              <Button
                className="w-full bg-header hover:bg-primary-dark"
                size="lg"
                onClick={() => setStep("checkout")}
              >
                Proceed to checkout →
              </Button>
            </div>
          </>
        )}

        {/* ── CHECKOUT STEP ── */}
        {items.length > 0 && step === "checkout" && (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              <p className="text-xs text-text-muted leading-relaxed">
                Fill in your details. Your order will be sent to the
                vendor&apos;s WhatsApp — they will confirm and arrange delivery.
              </p>

              <Input
                label="Full name"
                placeholder="e.g. Chidi Okonkwo"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                error={errors.name}
              />
              <Input
                label="Phone number"
                placeholder="e.g. 08012345678"
                type="tel"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
                error={errors.phone}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-text">
                  Delivery address
                </label>
                <textarea
                  placeholder="e.g. 14 Admiralty Way, Lekki Phase 1, Lagos"
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                  rows={3}
                  className={cn(
                    "w-full px-3 py-2.5 rounded-xl border text-sm resize-none transition-colors",
                    "bg-surface text-text placeholder:text-text-muted",
                    errors.address
                      ? "border-red-500/60 focus:ring-red-500/30 focus:border-red-500/60"
                      : "border-border hover:border-primary/40 focus:ring-primary/30 focus:border-primary/60",
                    "focus:outline-none focus:ring-2",
                  )}
                />
                {errors.address && (
                  <p className="text-[11px] text-red-500">{errors.address}</p>
                )}
              </div>

              {/* Order summary */}
              <div className="bg-surface-alt border border-border rounded-2xl p-3 space-y-2">
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-widest mb-2">
                  Order summary
                </p>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <span className="text-text-muted truncate flex-1 mr-2">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="font-medium text-text shrink-0">
                      {formatNaira(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 mt-1 flex justify-between items-baseline">
                  <span className="text-xs text-text-muted">Total</span>
                  <span className="font-black text-text">
                    {formatNaira(total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 py-4 border-t border-border space-y-2">
              <Button
                className="w-full bg-header hover:bg-primary-dark"
                size="lg"
                onClick={handleOrder}
              >
                <Send className="h-4 w-4" />
                Send order on WhatsApp
              </Button>
              <button
                onClick={() => setStep("cart")}
                className="w-full text-xs text-text-muted hover:text-text py-2 transition-colors"
              >
                ← Back to cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
