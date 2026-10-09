import { useState } from "react";
import { Link } from "react-router";
import {
  CheckIcon,
  EyeIcon,
  HeartIcon,
  PlusIcon,
} from "./icons";
import { products } from "@/data/catalog";
import type { Product } from "@/data/catalog";
import { useShopStore } from "@/lib/store";

interface ProductListingProps {
  title: string;
  eyebrow?: string;
  description: string;
  defaultDepartment?: string;
  defaultTag?: "bestsellers" | "new" | "under-50";
}

export function ProductListingPage({
  title,
  eyebrow = "Form & Field Collection",
  description,
  defaultDepartment,
  defaultTag,
}: ProductListingProps) {
  const { addItem, toggleWishlist, isInWishlist, openQuickView } = useShopStore();

  const [selectedDept, setSelectedDept] = useState<string>(
    defaultDepartment || "all"
  );
  const [selectedPrice, setSelectedPrice] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Filter products
  let filtered = products.filter((p) => {
    if (defaultTag && !p.tags.includes(defaultTag)) return false;
    if (selectedDept !== "all" && p.department !== selectedDept) return false;
    if (selectedPrice === "under-50" && p.price >= 50) return false;
    if (selectedPrice === "50-75" && (p.price < 50 || p.price > 75)) return false;
    if (selectedPrice === "over-75" && p.price <= 75) return false;
    return true;
  });

  // Sort products
  if (sortBy === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered = [...filtered].sort(
      (a, b) => Number(b.rating) - Number(a.rating)
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-12 md:py-16">
      {/* Editorial Header */}
      <div className="flex flex-col gap-3 border-b border-border pb-8">
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-primary">
          {eyebrow}
        </span>
        <h1 className="font-display text-4xl font-medium text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Filter and sorting toolbar */}
      <div className="mt-8 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground text-[11px] uppercase tracking-wider mr-1">
            Department:
          </span>
          {[
            { id: "all", label: "All departments" },
            { id: "Home & living", label: "Home & living" },
            { id: "Table & kitchen", label: "Table & kitchen" },
            { id: "Textiles", label: "Textiles" },
            { id: "Objects & gifts", label: "Objects & gifts" },
          ].map((dept) => {
            const active = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => setSelectedDept(dept.id)}
                className={`rounded-full px-3 py-1 transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {dept.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Price Range */}
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Price:</span>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="h-8 border border-border bg-background px-2 text-xs outline-none"
            >
              <option value="all">Any price</option>
              <option value="under-50">Under $50</option>
              <option value="50-75">$50 – $75</option>
              <option value="over-75">Over $75</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-8 border border-border bg-background px-2 text-xs outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Showing {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </span>
        {(selectedDept !== "all" || selectedPrice !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSelectedDept("all");
              setSelectedPrice("all");
            }}
            className="underline hover:text-foreground"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="font-display text-2xl text-foreground">
              No matching pieces found
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your department or price filter selections.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product) => {
              const isSaved = isInWishlist(product.id);
              return (
                <article
                  key={product.id}
                  className="group flex flex-col gap-3 border border-border/40 bg-background p-3 transition-colors hover:border-primary/40"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.src}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[8px] tracking-wider text-primary">
                      {product.badge}
                    </span>

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
                      aria-label="Save to wishlist"
                      className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background text-primary shadow-xs"
                    >
                      <HeartIcon
                        size={16}
                        fill={isSaved ? "currentColor" : "none"}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => openQuickView(product)}
                      aria-label="Quick view"
                      className="absolute right-3 top-12 flex size-8 items-center justify-center rounded-full bg-background text-primary opacity-0 transition-opacity group-hover:opacity-100 shadow-xs"
                    >
                      <EyeIcon size={15} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="flex items-baseline justify-between">
                      <Link
                        to={`/products/${product.id}`}
                        className="font-display text-xl leading-tight text-foreground hover:underline"
                      >
                        {product.title}
                      </Link>
                      <span className="text-xs font-semibold text-foreground">
                        ${product.price}
                      </span>
                    </div>

                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      {product.detail}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span className="text-primary">★★★★★</span>
                        <span>{product.rating}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          addItem({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            src: product.src,
                            swatchColor: product.swatches[0]?.hex,
                            swatchName: product.swatches[0]?.name,
                            detail: product.detail,
                          })
                        }
                        className="flex h-7 items-center gap-1 bg-primary px-3 text-[11px] font-medium text-primary-foreground hover:opacity-90"
                      >
                        <PlusIcon size={12} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
