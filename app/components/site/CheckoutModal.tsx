import { useState } from "react";
import { useShopStore } from "@/lib/store";
import {
  ArrowRightIcon,
  CircleCheckIcon,
  PackageCheckIcon,
  TruckIcon,
  XIcon,
} from "./icons";

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    appliedDiscount,
    orderNumber,
    completeCheckout,
  } = useShopStore();

  const [formData, setFormData] = useState({
    name: "Eleanor Vance",
    email: "eleanor@example.com",
    address: "742 Evergreen Terrace, Apt 4B",
    city: "Portland",
    postalCode: "97201",
    payment: "card",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const discountAmount = appliedDiscount
    ? (subtotal * appliedDiscount.percent) / 100
    : 0;
  const isFreeShipping = subtotal >= 100 || appliedDiscount?.code === "FREESHIP";
  const shipping = isFreeShipping ? 0 : 10;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      completeCheckout();
      setIsSubmitting(false);
    }, 800);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
      onClick={closeCheckout}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-primary">
              FORM &amp; FIELD · SECURE CHECKOUT
            </span>
            <h2 className="font-display text-2xl text-foreground">
              {orderNumber ? "Order Confirmed" : "Complete your purchase"}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCheckout}
            aria-label="Close checkout"
            className="text-muted-foreground hover:text-foreground"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6">
          {orderNumber ? (
            /* Order Success State */
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CircleCheckIcon size={28} />
              </div>

              <h3 className="mt-4 font-display text-3xl font-medium text-foreground">
                Thank you, {formData.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Order confirmation #{orderNumber} has been recorded.
              </p>

              <div className="mt-6 flex w-full max-w-sm flex-col gap-3 rounded-sm border border-border bg-muted/40 p-4 text-left text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Shipping to:</span>
                  <span className="font-medium text-foreground">
                    {formData.address}, {formData.city}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Confirmation sent to:</span>
                  <span className="font-medium text-foreground">
                    {formData.email}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Estimated delivery:</span>
                  <span className="font-medium text-primary">
                    3–5 business days
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-6 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <TruckIcon size={16} className="text-primary" />
                  <span>Tracked dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <PackageCheckIcon size={16} className="text-primary" />
                  <span>Plastic-free packaging</span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCheckout}
                className="mt-8 flex h-11 items-center gap-3 rounded-sm bg-primary px-6 text-xs font-medium text-primary-foreground hover:opacity-90"
              >
                Back to the shop
                <ArrowRightIcon />
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">
                  1. Shipping Information
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] text-muted-foreground">
                      Full name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-1 h-9 w-full border border-border bg-background px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="mt-1 h-9 w-full border border-border bg-background px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-muted-foreground">
                      Street address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="mt-1 h-9 w-full border border-border bg-background px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="mt-1 h-9 w-full border border-border bg-background px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground">
                      Postal code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({ ...formData, postalCode: e.target.value })
                      }
                      className="mt-1 h-9 w-full border border-border bg-background px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Order summary box */}
              <div className="border-t border-border pt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">
                  2. Order Summary ({cart.length} items)
                </h4>
                <div className="mt-3 flex flex-col gap-1.5 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between text-primary">
                      <span>Discount ({appliedDiscount.code})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-foreground">
                      {isFreeShipping ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="mt-1 flex justify-between border-t border-border pt-2 text-sm font-medium text-foreground">
                    <span className="font-display text-lg">Total due</span>
                    <span className="font-display text-lg">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="mt-2 flex h-12 w-full items-center justify-center gap-3 rounded-sm bg-primary text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing order...</span>
                ) : (
                  <>
                    <span>Place order · ${finalTotal.toFixed(2)}</span>
                    <ArrowRightIcon />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
