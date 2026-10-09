import { useState } from "react";
import { Link } from "react-router";
import { useShopStore } from "@/lib/store";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "./icons";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    appliedDiscount,
    applyDiscount,
    removeDiscount,
    openCheckout,
  } = useShopStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{
    text: string;
    isError?: boolean;
  } | null>(null);

  if (!isCartOpen) return null;

  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const discountAmount = appliedDiscount
    ? (subtotal * appliedDiscount.percent) / 100
    : 0;
  const isFreeShipping = subtotal >= 100 || appliedDiscount?.code === "FREESHIP";
  const shipping = cart.length === 0 ? 0 : isFreeShipping ? 0 : 10;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);
  const shippingGap = Math.max(0, 100 - subtotal);
  const shippingPercent = Math.min(100, (subtotal / 100) * 100);

  function handleApplyPromo(e: React.FormEvent) {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscount(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setPromoInput("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[2px] transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      onClick={closeCart}
    >
      <div
        className="flex h-full w-full max-w-[440px] flex-col bg-background shadow-2xl transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-baseline gap-2">
            <h2 className="font-display text-2xl font-medium text-foreground">
              Your bag
            </h2>
            <span className="text-xs text-muted-foreground">
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="flex size-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="border-b border-border bg-muted/50 px-6 py-3.5">
          <div className="flex items-center justify-between text-xs text-foreground">
            {isFreeShipping ? (
              <span className="font-medium text-primary">
                🌿 You have unlocked complimentary shipping!
              </span>
            ) : (
              <span>
                Add{" "}
                <span className="font-semibold text-primary">
                  ${shippingGap.toFixed(2)}
                </span>{" "}
                more for complimentary shipping
              </span>
            )}
            <span className="text-[11px] text-muted-foreground">
              {Math.round(shippingPercent)}%
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${shippingPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="font-display text-3xl text-muted-foreground">
                Your bag is empty
              </span>
              <p className="max-w-[260px] text-xs leading-relaxed text-muted-foreground">
                Considered objects for everyday living await. Discover stoneware,
                natural linen, and handcrafted goods.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 flex h-10 items-center gap-3 rounded-sm bg-primary px-5 text-xs font-medium text-primary-foreground"
              >
                Explore shop
                <ArrowRightIcon />
              </button>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {cart.map((item) => (
                <li
                  key={`${item.id}-${item.swatchColor}`}
                  className="flex gap-4 py-4"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="size-20 shrink-0 bg-muted object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg leading-tight text-foreground">
                          {item.title}
                        </h3>
                        <span className="text-xs font-medium text-foreground">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <span
                          className="size-2.5 rounded-full border border-border"
                          style={{ backgroundColor: item.swatchColor }}
                        />
                        <span>{item.swatchName}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.swatchColor, -1)
                          }
                          aria-label="Decrease quantity"
                          className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <MinusIcon size={12} />
                        </button>
                        <span className="flex w-7 justify-center text-xs font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.swatchColor, 1)
                          }
                          aria-label="Increase quantity"
                          className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <PlusIcon size={12} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.swatchColor)}
                        aria-label={`Remove ${item.title}`}
                        className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive"
                      >
                        <TrashIcon size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Promo code & Order Summary */}
        {cart.length > 0 && (
          <div className="border-t border-border bg-background px-6 py-5">
            {/* Promo code input */}
            <form onSubmit={handleApplyPromo} className="mb-4">
              {appliedDiscount ? (
                <div className="flex items-center justify-between rounded-sm border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-primary">
                  <span>
                    Code <strong>{appliedDiscount.code}</strong> applied (
                    {appliedDiscount.percent}% off)
                  </span>
                  <button
                    type="button"
                    onClick={removeDiscount}
                    className="text-[11px] underline hover:opacity-75"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder='Promo code (try "AUTUMN10")'
                    className="h-9 min-w-0 flex-1 border border-border bg-background px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  />
                  <button
                    type="submit"
                    className="h-9 border border-primary px-3 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoMessage && (
                <p
                  className={`mt-1.5 text-[11px] ${
                    promoMessage.isError ? "text-destructive" : "text-primary"
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}
            </form>

            <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
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
              <div className="mt-2 flex justify-between border-t border-border pt-2 text-sm font-medium text-foreground">
                <span className="font-display text-lg">Estimated total</span>
                <span className="font-display text-lg">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                closeCart();
                openCheckout();
              }}
              className="mt-4 flex h-12 w-full items-center justify-center gap-3 rounded-sm bg-primary text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Proceed to checkout · ${finalTotal.toFixed(2)}
              <ArrowRightIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
