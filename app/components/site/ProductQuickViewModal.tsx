import { useState } from "react";
import { useShopStore } from "@/lib/store";
import {
  HeartIcon,
  MinusIcon,
  PackageCheckIcon,
  PlusIcon,
  TruckIcon,
  XIcon,
} from "./icons";

export function ProductQuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addItem,
    wishlist,
    toggleWishlist,
  } = useShopStore();

  const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "materials" | "specs">(
    "details"
  );

  if (!quickViewProduct) return null;

  const currentSwatch =
    quickViewProduct.swatches[selectedSwatchIndex] ||
    quickViewProduct.swatches[0];

  const isSaved = wishlist.some((i) => i.id === quickViewProduct.id);

  function handleAddToCart() {
    if (!quickViewProduct) return;
    addItem({
      id: quickViewProduct.id,
      title: quickViewProduct.title,
      price: quickViewProduct.price,
      src: quickViewProduct.src,
      swatchColor: currentSwatch?.hex,
      swatchName: currentSwatch?.name,
      detail: quickViewProduct.detail,
      quantity,
    });
    closeQuickView();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={quickViewProduct.title}
      onClick={closeQuickView}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden bg-background shadow-2xl md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuickView}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-xs transition-colors hover:bg-background"
        >
          <XIcon size={18} />
        </button>

        {/* Product Image Column */}
        <div className="relative aspect-square w-full shrink-0 bg-muted md:w-1/2 md:aspect-auto">
          <img
            src={quickViewProduct.src}
            alt={quickViewProduct.title}
            className="h-full w-full object-cover"
          />
          <span className="absolute left-4 top-4 bg-background px-2.5 py-1 text-[9px] tracking-widest text-primary">
            {quickViewProduct.badge}
          </span>
        </div>

        {/* Details & Actions Column */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-medium uppercase tracking-widest text-primary">
              {quickViewProduct.department}
            </span>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-3xl font-medium leading-none text-foreground sm:text-4xl">
                {quickViewProduct.title}
              </h2>
              <span className="font-display text-2xl text-foreground">
                ${quickViewProduct.price}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="text-primary" aria-hidden="true">
                ★★★★★
              </span>
              <span className="font-medium text-foreground">
                {quickViewProduct.rating}
              </span>
              <span className="text-muted-foreground">
                ({quickViewProduct.reviewCount} customer reviews)
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {quickViewProduct.description}
          </p>

          {/* Color Swatch Picker */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Color variant:{" "}
                <strong className="text-foreground">{currentSwatch?.name}</strong>
              </span>
            </div>
            <div className="mt-2.5 flex items-center gap-2.5">
              {quickViewProduct.swatches.map((swatch, idx) => {
                const isSelected = idx === selectedSwatchIndex;
                return (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => setSelectedSwatchIndex(idx)}
                    aria-label={`Select ${swatch.name}`}
                    className={`relative flex size-6 items-center justify-center rounded-full transition-all ${
                      isSelected
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span
                      className="size-5 rounded-full border border-border"
                      style={{ backgroundColor: swatch.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Add to Bag */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Quantity Controller */}
            <div className="flex h-12 w-32 items-center justify-between border border-border px-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="text-muted-foreground hover:text-foreground"
              >
                <MinusIcon size={14} />
              </button>
              <span className="font-medium text-foreground">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="text-muted-foreground hover:text-foreground"
              >
                <PlusIcon size={14} />
              </button>
            </div>

            {/* Add to Bag Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex h-12 flex-1 items-center justify-center gap-3 bg-primary text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Add to bag · ${(quickViewProduct.price * quantity).toFixed(2)}
              <PlusIcon />
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() =>
                toggleWishlist({
                  id: quickViewProduct.id,
                  title: quickViewProduct.title,
                  price: quickViewProduct.price,
                  src: quickViewProduct.src,
                  detail: quickViewProduct.detail,
                  badge: quickViewProduct.badge,
                })
              }
              aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
              className={`flex size-12 shrink-0 items-center justify-center border transition-colors ${
                isSaved
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <HeartIcon fill={isSaved ? "currentColor" : "none"} size={18} />
            </button>
          </div>

          {/* Free Shipping & Return badges */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-y border-border py-3 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <TruckIcon size={16} className="text-primary" />
              <span>Complimentary shipping $100+</span>
            </div>
            <div className="flex items-center gap-2">
              <PackageCheckIcon size={16} className="text-primary" />
              <span>30-day effortless returns</span>
            </div>
          </div>

          {/* Specification Tabs */}
          <div className="mt-4">
            <div className="flex border-b border-border text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`border-b-2 pb-2 pr-4 transition-colors ${
                  activeTab === "details"
                    ? "border-primary font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Origin &amp; Maker
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("materials")}
                className={`border-b-2 pb-2 px-4 transition-colors ${
                  activeTab === "materials"
                    ? "border-primary font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Materials
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={`border-b-2 pb-2 pl-4 transition-colors ${
                  activeTab === "specs"
                    ? "border-primary font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Dimensions
              </button>
            </div>
            <div className="pt-3 text-[11px] leading-relaxed text-muted-foreground">
              {activeTab === "details" && <p>{quickViewProduct.origin}</p>}
              {activeTab === "materials" && <p>{quickViewProduct.materials}</p>}
              {activeTab === "specs" && <p>{quickViewProduct.dimensions}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
