import { useEffect, useRef, useState } from "react";
import { products } from "@/data/catalog";
import { useShopStore } from "@/lib/store";
import { ArrowRightIcon, PlusIcon, SearchIcon, XIcon } from "./icons";

const popularQueries = [
  "Stoneware",
  "Linen",
  "Oak",
  "Candle",
  "Carafe",
  "Under $50",
];

export function SearchModal() {
  const {
    isSearchOpen,
    closeSearch,
    searchQuery,
    setSearchQuery,
    addItem,
    openQuickView,
  } = useShopStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const [activeChip, setActiveChip] = useState<string | null>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else useShopStore.getState().openSearch();
      }
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const query = searchQuery.trim().toLowerCase();
  const filtered = products.filter((p) => {
    if (!query) return true;
    if (query === "under $50") return p.price < 50;
    return (
      p.title.toLowerCase().includes(query) ||
      p.detail.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.department.toLowerCase().includes(query) ||
      p.materials.toLowerCase().includes(query)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-16 backdrop-blur-xs sm:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label="Search the shop"
      onClick={closeSearch}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-2xl flex-col bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <SearchIcon className="text-primary" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveChip(null);
            }}
            placeholder="Search by object, material, or room..."
            className="flex-1 bg-transparent font-display text-xl text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveChip(null);
                inputRef.current?.focus();
              }}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Clear query"
            >
              <XIcon size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={closeSearch}
            className="rounded-sm border border-border px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground"
          >
            ESC
          </button>
        </div>

        {/* Popular chips */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-5 py-3">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Explore:
          </span>
          {popularQueries.map((chip) => {
            const isSelected = activeChip === chip || searchQuery === chip;
            return (
              <button
                key={chip}
                type="button"
                onClick={() => {
                  setSearchQuery(chip);
                  setActiveChip(chip);
                }}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary/40"
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-5">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-display text-2xl text-foreground">
                No matching objects found
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try searching for &quot;stoneware&quot;, &quot;linen&quot;, or &quot;candle&quot;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="group flex gap-3.5 border border-border bg-background p-3 transition-colors hover:border-primary/40"
                >
                  <img
                    src={product.src}
                    alt={product.title}
                    className="size-20 shrink-0 cursor-pointer bg-muted object-cover"
                    onClick={() => {
                      closeSearch();
                      openQuickView(product);
                    }}
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          className="cursor-pointer font-display text-base leading-tight text-foreground hover:underline"
                          onClick={() => {
                            closeSearch();
                            openQuickView(product);
                          }}
                        >
                          {product.title}
                        </h4>
                        <span className="text-xs font-medium text-foreground">
                          ${product.price}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1">
                        {product.detail}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          closeSearch();
                          openQuickView(product);
                        }}
                        className="text-[11px] text-muted-foreground hover:text-foreground hover:underline"
                      >
                        Quick view
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          addItem({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            src: product.src,
                            swatchColor: product.swatches[0]?.hex,
                            swatchName: product.swatches[0]?.name,
                            detail: product.detail,
                          });
                          closeSearch();
                        }}
                        className="flex h-7 items-center gap-1.5 bg-primary px-2.5 text-[11px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        <PlusIcon size={12} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
          <span>{filtered.length} objects available</span>
          <button
            type="button"
            onClick={closeSearch}
            className="flex items-center gap-1 hover:text-foreground"
          >
            Close search <ArrowRightIcon size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
