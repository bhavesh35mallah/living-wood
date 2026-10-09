import { useState, useRef } from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  PlusIcon,
  CheckIcon,
  ShoppingBagIcon,
  PackageCheckIcon,
  TruckIcon,
  ArrowRightIcon,
} from "./icons";
import { products, type Product } from "@/data/catalog";
import { useShopStore } from "@/lib/store";

interface FestiveBundle {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  price: number;
  originalPrice: number;
  savings: number;
  src: string;
  items: {
    productId: string;
    title: string;
    swatchName: string;
    swatchHex: string;
    price: number;
  }[];
}

const festiveBundles: FestiveBundle[] = [
  {
    id: "bundle-festive-host",
    title: "The Festive Host Gathering Set",
    subtitle: "Solid German oak board, fluted carafe & pure beeswax tapers",
    badge: "HOST'S FAVORITE · SAVE $18",
    price: 120,
    originalPrice: 138,
    savings: 18,
    src: "https://api.builder.io/api/v1/image/assets/TEMP/6d60bdf507d21b58b73a333f9975a9773dd64b50?width=621",
    items: [
      {
        productId: "gather-serving-board",
        title: "Gather serving board",
        swatchName: "Natural Honey Oak",
        swatchHex: "#B99065",
        price: 68,
      },
      {
        productId: "fluted-stoneware-carafe",
        title: "Fluted stoneware carafe",
        swatchName: "Chalk White",
        swatchHex: "#DBD3C2",
        price: 48,
      },
      {
        productId: "beeswax-taper-candle-pair",
        title: "Pure beeswax tapers (Pair)",
        swatchName: "Warm Honey",
        swatchHex: "#D4A359",
        price: 22,
      },
    ],
  },
  {
    id: "bundle-golden-hearth",
    title: "The Golden Candlelit Hearth Duo",
    subtitle: "Botanical fig candle in amber glass & hand-dipped beeswax pair",
    badge: "WARMTH & SCENT · SAVE $10",
    price: 50,
    originalPrice: 60,
    savings: 10,
    src: "https://api.builder.io/api/v1/image/assets/TEMP/e8a1b865468b2334676e8777b67301077bde0710?width=620",
    items: [
      {
        productId: "sunday-ritual-candle",
        title: "Sunday ritual candle",
        swatchName: "Amber Glass",
        swatchHex: "#8C653F",
        price: 38,
      },
      {
        productId: "beeswax-taper-candle-pair",
        title: "Pure beeswax tapers (Pair)",
        swatchName: "Warm Honey",
        swatchHex: "#D4A359",
        price: 22,
      },
    ],
  },
  {
    id: "bundle-winter-comfort",
    title: "The Winter Fireplace Comfort Edit",
    subtitle: "Organic waffle throw & stonewashed Belgian linen cushion",
    badge: "TEXTILE HEIRLOOM · SAVE $15",
    price: 128,
    originalPrice: 143,
    savings: 15,
    src: "https://api.builder.io/api/v1/image/assets/TEMP/34612192302e2e5df18556cfa4906e8ea0187660?width=620",
    items: [
      {
        productId: "hand-loomed-waffle-throw",
        title: "Hand-loomed waffle throw",
        swatchName: "Oatmeal",
        swatchHex: "#DDD2BD",
        price: 85,
      },
      {
        productId: "linen-cushion-cover",
        title: "Linen cushion cover",
        swatchName: "Earthy Olive",
        swatchHex: "#7C8068",
        price: 58,
      },
    ],
  },
];

type FestiveTab = "table" | "candles" | "bundles";

export function FestiveSection() {
  const [activeTab, setActiveTab] = useState<FestiveTab>("table");
  const [swatchState, setSwatchState] = useState<Record<string, number>>({});
  const [addedProductIds, setAddedProductIds] = useState<Record<string, boolean>>({});
  const [addedBundleId, setAddedBundleId] = useState<string | null>(null);

  const swiperRef = useRef<SwiperType | null>(null);
  const { addItem, openCart, openQuickView, currency, addToast } = useShopStore();

  const currencySymbol = currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$";

  // Products filtered for Festive Table
  const tableProducts = products.filter(
    (p) =>
      p.id === "gather-serving-board" ||
      p.id === "fluted-stoneware-carafe" ||
      p.id === "everyday-stoneware-mug" ||
      p.id === "everyday-vessel"
  );

  // Products filtered for Candlelight & Scents
  const candleProducts = products.filter(
    (p) =>
      p.id === "beeswax-taper-candle-pair" ||
      p.id === "sunday-ritual-candle" ||
      p.id === "everyday-vessel" ||
      p.id === "everyday-stoneware-mug"
  );

  const currentProducts = activeTab === "table" ? tableProducts : candleProducts;

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
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

    setAddedProductIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProductIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleAddBundle = (bundle: FestiveBundle) => {
    // Add all items from the bundle
    bundle.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      addItem({
        id: item.productId,
        title: `${item.title} (${bundle.title} item)`,
        price: item.price,
        src: prod?.src || bundle.src,
        swatchColor: item.swatchHex,
        swatchName: item.swatchName,
        detail: `Part of ${bundle.title}`,
      });
    });

    setAddedBundleId(bundle.id);
    addToast(
      `Added "${bundle.title}" with complimentary pine ribbon wrapping!`,
      "success"
    );
    setTimeout(() => {
      setAddedBundleId(null);
      openCart();
    }, 600);
  };

  return (
    <section className="relative overflow-hidden bg-[#22291E] text-[#F7F4EE] py-16 sm:py-24 border-y border-[#3E4735]">
      {/* Subtle festive atmospheric glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.15) 0%, transparent 60%), radial-gradient(ellipse at 15% 85%, rgba(184,134,11,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        {/* Top Eyebrow & Headline */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[#3E4735] pb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase text-[#D4AF37]">
              <SparklesIcon size={14} className="text-[#D4AF37]" />
              <span>The Festive Atelier · A Season of Celebration</span>
            </div>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.04] text-[#FAF8F4] tracking-tight">
              Gather Around the Table. <br />
              <span className="italic font-normal text-[#E8D9BD]">
                Fill the Evening with Light.
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#BFBCAE] max-w-xl">
              When winter evenings arrive, we embrace unhurried rituals: lighting
              hand-dipped beeswax tapers, serving artisanal bread on solid oak, and
              sharing thoughtful gifts. Each piece is wrapped in complimentary pine
              ribbon with a botanical card.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="rounded-xs border border-[#4D5742] bg-[#293224]/80 px-4 py-3 text-xs text-[#E8D9BD] backdrop-blur-xs">
              <span className="block text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                Guaranteed Holiday Delivery
              </span>
              <span>Order before Dec 20 · Complimentary gift wrapping</span>
            </div>

            <Link
              to="/festive"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-[#FAF8F4] hover:text-[#D4AF37] transition-colors group"
            >
              <span>Explore Festive Edit</span>
              <ArrowRightIcon
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Festive Navigation Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#3E4735]/70 pb-4">
          <div className="flex gap-2 sm:gap-4 overflow-x-auto text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("table")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-xs uppercase tracking-wider font-medium ${
                activeTab === "table"
                  ? "bg-[#D4AF37] text-[#1B2117] font-semibold shadow-sm"
                  : "text-[#DCD8CB] hover:text-white bg-[#2A3325]/70 border border-[#3E4735]"
              }`}
            >
              <span>The Festive Table</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("candles")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-xs uppercase tracking-wider font-medium ${
                activeTab === "candles"
                  ? "bg-[#D4AF37] text-[#1B2117] font-semibold shadow-sm"
                  : "text-[#DCD8CB] hover:text-white bg-[#2A3325]/70 border border-[#3E4735]"
              }`}
            >
              <span>Golden Candlelight &amp; Scents</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("bundles")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-xs uppercase tracking-wider font-medium ${
                activeTab === "bundles"
                  ? "bg-[#D4AF37] text-[#1B2117] font-semibold shadow-sm"
                  : "text-[#DCD8CB] hover:text-white bg-[#2A3325]/70 border border-[#3E4735]"
              }`}
            >
              <SparklesIcon size={12} className={activeTab === "bundles" ? "text-[#1B2117]" : "text-[#D4AF37]"} />
              <span>Curated Festive Bundles</span>
            </button>
          </div>

          {activeTab !== "bundles" && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex size-8 items-center justify-center rounded-xs border border-[#48533E] text-[#DCD8CB] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                aria-label="Previous festive piece"
              >
                <ChevronLeftIcon size={15} />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                className="flex size-8 items-center justify-center rounded-xs border border-[#48533E] text-[#DCD8CB] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                aria-label="Next festive piece"
              >
                <ChevronRightIcon size={15} />
              </button>
            </div>
          )}
        </div>

        {/* TAB 1 & 2: SWIPER SLIDER OF FESTIVE OBJECTS */}
        {activeTab !== "bundles" && (
          <div className="mt-8">
            <Swiper
              modules={[Navigation, Pagination]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              spaceBetween={24}
              slidesPerView={1.15}
              breakpoints={{
                640: { slidesPerView: 2.2, spaceBetween: 24 },
                1024: { slidesPerView: 3.2, spaceBetween: 28 },
                1280: { slidesPerView: 4, spaceBetween: 28 },
              }}
              className="!pb-6"
            >
              {currentProducts.map((product) => {
                const currentSwatchIdx = swatchState[product.id] || 0;
                const currentSwatch = product.swatches[currentSwatchIdx] || product.swatches[0];
                const isAdded = addedProductIds[product.id];

                return (
                  <SwiperSlide key={product.id} className="h-auto">
                    <article className="group flex flex-col h-full bg-[#293224]/80 border border-[#3E4735] rounded-xs overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300">
                      {/* Image container */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#1D2319]">
                        <img
                          src={product.src}
                          alt={product.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Festive Badge */}
                        <span className="absolute top-3 left-3 bg-[#1C2218]/90 text-[#D4AF37] border border-[#D4AF37]/40 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider backdrop-blur-xs rounded-xs">
                          {activeTab === "table" ? "FESTIVE TABLE" : "CANDLELIGHT EDIT"}
                        </span>

                        {/* Quick View Button */}
                        <button
                          type="button"
                          onClick={() => openQuickView(product)}
                          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-xs bg-[#1C2218]/80 text-[#FAF8F4] hover:bg-[#D4AF37] hover:text-[#1B2117] transition-all opacity-0 group-hover:opacity-100"
                          title="Quick View"
                        >
                          <EyeIcon size={14} />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              to={`/products/${product.id}`}
                              className="font-display text-xl text-[#FAF8F4] hover:underline"
                            >
                              {product.title}
                            </Link>
                            <span className="font-display text-base font-semibold text-[#D4AF37]">
                              {currencySymbol}
                              {product.price}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-[#BFBCAE] line-clamp-1">
                            {product.detail}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#3E4735]/60 flex items-center justify-between gap-2">
                          {/* Colorway selector */}
                          <div className="flex items-center gap-1.5">
                            {product.swatches.map((swatch, sIdx) => (
                              <button
                                key={swatch.name}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSwatchState((prev) => ({
                                    ...prev,
                                    [product.id]: sIdx,
                                  }));
                                }}
                                title={swatch.name}
                                className={`size-3.5 rounded-full border border-black/30 transition-transform ${
                                  sIdx === currentSwatchIdx ? "scale-125 ring-1 ring-[#D4AF37]" : ""
                                }`}
                                style={{ backgroundColor: swatch.hex }}
                              />
                            ))}
                            <span className="text-[10px] text-[#A6A295] ml-1 truncate max-w-[80px]">
                              {currentSwatch?.name}
                            </span>
                          </div>

                          {/* Quick Add */}
                          <button
                            type="button"
                            onClick={(e) => handleQuickAdd(product, e)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider rounded-xs transition-colors ${
                              isAdded
                                ? "bg-emerald-600 text-white"
                                : "bg-[#D4AF37] text-[#1B2117] hover:bg-[#E5BF45]"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <CheckIcon size={12} />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <PlusIcon size={12} />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}

        {/* TAB 3: CURATED FESTIVE BUNDLES GRID */}
        {activeTab === "bundles" && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {festiveBundles.map((bundle) => {
              const isAdded = addedBundleId === bundle.id;

              return (
                <div
                  key={bundle.id}
                  className="flex flex-col justify-between bg-[#283123] border border-[#444E3A] hover:border-[#D4AF37] rounded-xs p-6 transition-all duration-300 shadow-md group"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#1C2218] rounded-xs mb-4">
                      <img
                        src={bundle.src}
                        alt={bundle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-[#1B2117]/90 text-[#D4AF37] border border-[#D4AF37]/50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider backdrop-blur-xs">
                        {bundle.badge}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-2xl text-[#FAF8F4] font-medium">
                        {bundle.title}
                      </h3>
                    </div>

                    <p className="mt-1 text-xs text-[#BFBCAE] leading-relaxed">
                      {bundle.subtitle}
                    </p>

                    {/* Included pieces list */}
                    <div className="mt-4 border-t border-[#3E4735] pt-3 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                        Bundle includes:
                      </span>
                      {bundle.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs text-[#DCD8CB]"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="size-2 rounded-full shrink-0"
                              style={{ backgroundColor: item.swatchHex }}
                            />
                            <span>{item.title}</span>
                          </div>
                          <span className="text-[#A6A295] font-mono text-[11px]">
                            {currencySymbol}
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#3E4735] flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-2xl font-semibold text-[#FAF8F4]">
                          {currencySymbol}
                          {bundle.price}
                        </span>
                        <span className="text-xs text-[#8E8B7E] line-through">
                          {currencySymbol}
                          {bundle.originalPrice}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#D4AF37] font-medium">
                        Save {currencySymbol}
                        {bundle.savings} today
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddBundle(bundle)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-[#D4AF37] text-[#1B2117] hover:bg-[#E5BF45]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckIcon size={14} />
                          <span>Bundle Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBagIcon size={14} />
                          <span>Add Set</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Festive Guarantee & Gifting Ribbon Banner */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#3E4735] pt-10 text-xs text-[#DCD8CB]">
          <div className="flex items-start gap-3">
            <div className="size-9 rounded-full bg-[#2E3728] border border-[#48533E] flex items-center justify-center text-[#D4AF37] shrink-0">
              <PackageCheckIcon size={18} />
            </div>
            <div>
              <h4 className="font-medium text-[#FAF8F4] text-sm">
                Archival Gift Wrapping
              </h4>
              <p className="mt-1 text-[#BFBCAE] leading-relaxed text-[11px]">
                Complimentary unbleached gift box, pine green cotton ribbon &amp;
                botanical sprig included with every order.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="size-9 rounded-full bg-[#2E3728] border border-[#48533E] flex items-center justify-center text-[#D4AF37] shrink-0">
              <SparklesIcon size={18} />
            </div>
            <div>
              <h4 className="font-medium text-[#FAF8F4] text-sm">
                Handwritten Gift Notes
              </h4>
              <p className="mt-1 text-[#BFBCAE] leading-relaxed text-[11px]">
                Add your heartfelt message at checkout. Our atelier handwrites each
                note on heavy cotton cardstock.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="size-9 rounded-full bg-[#2E3728] border border-[#48533E] flex items-center justify-center text-[#D4AF37] shrink-0">
              <TruckIcon size={18} />
            </div>
            <div>
              <h4 className="font-medium text-[#FAF8F4] text-sm">
                Carbon-Neutral Express
              </h4>
              <p className="mt-1 text-[#BFBCAE] leading-relaxed text-[11px]">
                Dispatched with tracked carbon-neutral carriers. Free shipping on
                orders over $100 or with code FREESHIP.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
