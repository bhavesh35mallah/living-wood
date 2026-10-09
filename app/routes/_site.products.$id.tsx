import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowRightIcon,
  CircleCheckIcon,
  EyeIcon,
  HeartIcon,
  MinusIcon,
  PackageCheckIcon,
  PlusIcon,
  SparklesIcon,
  TruckIcon,
} from "@/components/site/icons";
import { products } from "@/data/catalog";
import { useShopStore } from "@/lib/store";
import { ProductSwiperCarousel } from "@/components/site/ProductSwiperCarousel";

export function meta({ params }: { params: { id?: string } }) {
  const product = products.find((p) => p.id === params.id);
  return [
    {
      title: product
        ? `${product.title} · Form & Field`
        : "Product Details · Form & Field",
    },
    {
      name: "description",
      content: product?.description || "Objects for everyday living.",
    },
  ];
}

export default function ProductDetailRoute() {
  const { id } = useParams();
  const { addItem, toggleWishlist, isInWishlist, openQuickView, openChatbot } =
    useShopStore();

  const product = products.find((p) => p.id === id) || products[0];
  const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<
    "materials" | "dimensions" | "care" | "origin"
  >("materials");

  const isSaved = isInWishlist(product.id);
  const currentSwatch =
    product.swatches[selectedSwatchIndex] || product.swatches[0];

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.department === product.department)
    .concat(products.filter((p) => p.id !== product.id))
    .slice(0, 4);

  function handleAddToCart() {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      src: product.src,
      swatchColor: currentSwatch?.hex,
      swatchName: currentSwatch?.name,
      detail: product.detail,
      quantity,
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-12 md:py-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              to="/shop-all"
              className="hover:text-foreground"
            >
              {product.department}
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium">{product.title}</li>
        </ol>
      </nav>

      {/* Main Product Showcase */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery Column */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden bg-muted">
            <img
              src={product.src}
              alt={product.title}
              className="h-full w-full object-cover"
            />
            <span className="absolute left-4 top-4 bg-background px-3 py-1.5 text-[9px] tracking-widest text-primary">
              {product.badge}
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto">
            <div className="size-20 shrink-0 border-2 border-primary overflow-hidden bg-muted">
              <img
                src={product.src}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Additional gallery thumbnails */}
            <div className="size-20 shrink-0 border border-border opacity-70 hover:opacity-100 overflow-hidden bg-muted">
              <img
                src={product.src}
                alt=""
                className="h-full w-full object-cover grayscale-25"
              />
            </div>
          </div>
        </div>

        {/* Product Information Column */}
        <div className="flex flex-col">
          <span className="text-[11px] font-medium uppercase tracking-widest text-primary">
            {product.department}
          </span>
          <h1 className="mt-1 font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            {product.title}
          </h1>

          <div className="mt-2 flex items-center justify-between">
            <span className="font-display text-3xl font-medium text-foreground">
              ${product.price}
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-primary">★★★★★</span>
              <span className="font-medium text-foreground">
                {product.rating}
              </span>
              <span className="text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Color variant selection */}
          <div className="mt-8 border-t border-border pt-6">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Colorway:{" "}
                <strong className="text-foreground">{currentSwatch?.name}</strong>
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              {product.swatches.map((swatch, idx) => {
                const isSelected = idx === selectedSwatchIndex;
                return (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => setSelectedSwatchIndex(idx)}
                    title={swatch.name}
                    className={`relative flex size-8 items-center justify-center rounded-full transition-all ${
                      isSelected
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span
                      className="size-6 rounded-full border border-border"
                      style={{ backgroundColor: swatch.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-12 w-36 items-center justify-between border border-border px-4">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Decrease quantity"
              >
                <MinusIcon size={14} />
              </button>
              <span className="text-sm font-medium text-foreground">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Increase quantity"
              >
                <PlusIcon size={14} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex h-12 flex-1 items-center justify-center gap-3 bg-primary text-xs font-medium text-primary-foreground hover:opacity-90"
            >
              Add to bag · ${(product.price * quantity).toFixed(2)}
              <PlusIcon />
            </button>

            <button
              type="button"
              onClick={() =>
                toggleWishlist({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  src: product.src,
                  detail: product.detail,
                  badge: product.badge,
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

          {/* Concierge Styling & Care Advice Trigger */}
          <button
            type="button"
            onClick={() =>
              openChatbot(
                `Tell me more about the ${product.title} (materials, styling advice, and care instructions).`
              )
            }
            className="mt-3 flex w-full items-center justify-center gap-2 border border-border/80 bg-muted/20 py-2.5 text-xs text-foreground/80 hover:border-primary hover:text-foreground transition-all rounded-xs"
          >
            <SparklesIcon size={14} className="text-primary" />
            <span>Have questions? Ask our Concierge about this piece</span>
          </button>

          {/* Complimentary Shipping Banner */}
          <div className="mt-8 flex flex-col gap-3 border-y border-border py-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <TruckIcon size={18} className="text-primary shrink-0" />
              <span>
                Complimentary shipping on all orders over $100. Dispatched within
                24 hours.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <PackageCheckIcon size={18} className="text-primary shrink-0" />
              <span>
                Considered, plastic-free packaging. 30-day effortless returns.
              </span>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="mt-6 flex flex-col divide-y divide-border">
            <div>
              <button
                type="button"
                onClick={() =>
                  setActiveAccordion(
                    activeAccordion === "materials" ? ("" as any) : "materials"
                  )
                }
                className="flex w-full items-center justify-between py-3.5 text-left text-xs font-medium uppercase tracking-wider text-foreground"
              >
                <span>Materials &amp; Sourcing</span>
                <span>{activeAccordion === "materials" ? "−" : "+"}</span>
              </button>
              {activeAccordion === "materials" && (
                <p className="pb-4 text-xs leading-relaxed text-muted-foreground">
                  {product.materials}
                </p>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() =>
                  setActiveAccordion(
                    activeAccordion === "dimensions" ? ("" as any) : "dimensions"
                  )
                }
                className="flex w-full items-center justify-between py-3.5 text-left text-xs font-medium uppercase tracking-wider text-foreground"
              >
                <span>Dimensions &amp; Specifications</span>
                <span>{activeAccordion === "dimensions" ? "−" : "+"}</span>
              </button>
              {activeAccordion === "dimensions" && (
                <p className="pb-4 text-xs leading-relaxed text-muted-foreground">
                  {product.dimensions}
                </p>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() =>
                  setActiveAccordion(
                    activeAccordion === "origin" ? ("" as any) : "origin"
                  )
                }
                className="flex w-full items-center justify-between py-3.5 text-left text-xs font-medium uppercase tracking-wider text-foreground"
              >
                <span>Workshop &amp; Origin</span>
                <span>{activeAccordion === "origin" ? "−" : "+"}</span>
              </button>
              {activeAccordion === "origin" && (
                <p className="pb-4 text-xs leading-relaxed text-muted-foreground">
                  Handcrafted in {product.origin}. Each piece carries subtle
                  variations from the hands that shaped it.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      <div className="mt-20 border-t border-border pt-12">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-widest text-primary">
              Curated pairings
            </span>
            <h2 className="mt-1 font-display text-3xl font-medium text-foreground sm:text-4xl">
              You may also love
            </h2>
          </div>
          <Link
            to="/shop-all"
            className="text-xs text-primary underline underline-offset-4 hover:opacity-80"
          >
            Explore all
          </Link>
        </div>

        <div className="mt-8">
          <ProductSwiperCarousel products={relatedProducts} />
        </div>
      </div>
    </div>
  );
}
