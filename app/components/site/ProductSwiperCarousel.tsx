import { useRef, useState } from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  HeartIcon,
  PlusIcon,
} from "./icons";
import type { Product } from "@/data/catalog";
import { useShopStore } from "@/lib/store";

export function ProductSwiperCarousel({
  products,
}: {
  products: Product[];
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const { addItem, toggleWishlist, isInWishlist, openQuickView } = useShopStore();
  const [swatchState, setSwatchState] = useState<Record<string, number>>({});
  const [addedState, setAddedState] = useState<Record<string, boolean>>({});

  function handleSwatchSelect(productId: string, idx: number, e: React.MouseEvent) {
    e.stopPropagation();
    setSwatchState((prev) => ({ ...prev, [productId]: idx }));
  }

  function handleQuickAdd(product: Product, e: React.MouseEvent) {
    e.stopPropagation();
    const activeIndex = swatchState[product.id] || 0;
    const swatch = product.swatches[activeIndex] || product.swatches[0];

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      src: product.src,
      swatchColor: swatch?.hex,
      swatchName: swatch?.name,
      detail: product.detail,
    });

    setAddedState((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedState((prev) => ({ ...prev, [product.id]: false }));
    }, 1400);
  }

  return (
    <div className="relative">
      {/* External Prev/Next controls */}
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous products"
          className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
        >
          <ChevronLeftIcon size={16} />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next products"
          className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
        >
          <ChevronRightIcon size={16} />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={24}
        slidesPerView={1.15}
        breakpoints={{
          640: {
            slidesPerView: 2.2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="pb-12"
      >
        {products.map((product) => {
          const isSaved = isInWishlist(product.id);
          const activeSwatchIndex = swatchState[product.id] || 0;
          const currentSwatch =
            product.swatches[activeSwatchIndex] || product.swatches[0];
          const justAdded = addedState[product.id];

          return (
            <SwiperSlide key={product.id}>
              <article className="group flex flex-col gap-3 border border-border/40 bg-background p-3 transition-colors hover:border-primary/40">
                <div
                  className="relative aspect-square cursor-pointer overflow-hidden bg-muted"
                  onClick={() => openQuickView(product)}
                >
                  <img
                    src={product.src}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[8px] tracking-wider text-primary">
                    {product.badge}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        src: product.src,
                        detail: product.detail,
                        badge: product.badge,
                      });
                    }}
                    aria-label="Save to wishlist"
                    className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background text-primary shadow-xs transition-transform active:scale-90"
                  >
                    <HeartIcon
                      size={16}
                      fill={isSaved ? "currentColor" : "none"}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuickView(product);
                    }}
                    aria-label="Quick view"
                    className="absolute right-3 top-12 flex size-8 items-center justify-center rounded-full bg-background text-primary opacity-0 shadow-xs transition-opacity group-hover:opacity-100"
                  >
                    <EyeIcon size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="absolute inset-x-3 bottom-3 flex h-9 items-center justify-center gap-2 bg-primary text-xs font-medium text-primary-foreground opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
                  >
                    {justAdded ? (
                      <>
                        <span>Added</span>
                        <CheckIcon size={13} />
                      </>
                    ) : (
                      <>
                        <span>Quick add</span>
                        <PlusIcon size={13} />
                      </>
                    )}
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
                    <div className="flex items-center gap-1.5">
                      <ul className="flex gap-1.5" aria-label="Color options">
                        {product.swatches.map((color, idx) => {
                          const active = idx === activeSwatchIndex;
                          return (
                            <li key={color.hex}>
                              <button
                                type="button"
                                onClick={(e) =>
                                  handleSwatchSelect(product.id, idx, e)
                                }
                                title={color.name}
                                className={`flex size-3.5 items-center justify-center rounded-full transition-transform ${
                                  active
                                    ? "scale-110 ring-1 ring-primary ring-offset-1"
                                    : ""
                                }`}
                              >
                                <span
                                  className="size-2.5 rounded-full border border-border"
                                  style={{ backgroundColor: color.hex }}
                                />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                      {currentSwatch && (
                        <span className="text-[10px] text-muted-foreground">
                          {currentSwatch.name}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <span className="text-primary">★</span>
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
