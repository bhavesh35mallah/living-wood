import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  LeafIcon,
  PlusIcon,
} from "./icons";
import { img, products } from "@/data/catalog";
import { useShopStore } from "@/lib/store";

export interface HeroSlideData {
  id: string;
  number: string;
  tabLabel: string;
  season: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  filterId: "all" | "bestsellers" | "new" | "under-50";
  featuredProductId: string;
  src: string;
  tag: string;
}

export const heroSlidesData: HeroSlideData[] = [
  {
    id: "vessel",
    number: "01",
    tabLabel: "The Stoneware Vessel",
    season: "AUTUMN / WINTER 2026 · EDITION 04",
    title: "A slower home.\nA richer everyday.",
    subtitle:
      "Considered objects, natural textures, and unhurried rituals. Beautiful things shaped by hand to earn their place in your life.",
    ctaLabel: "Discover the Autumn Edit",
    filterId: "bestsellers",
    featuredProductId: "everyday-vessel",
    src: img("e8f9bf39b308d7921395c101fda6c48caa3e210e", 2000),
    tag: "PORTO ATELIER · HAND-GLAZED",
  },
  {
    id: "gathering",
    number: "02",
    tabLabel: "The Gathering Table",
    season: "TABLE & KITCHEN · SPECIAL CURATION",
    title: "The table,\nwhere stories live.",
    subtitle:
      "An unhurried meal, solid European oak, and fluted ceramics. Thoughtful pieces that turn getting together into something to remember.",
    ctaLabel: "Explore Dining & Tableware",
    filterId: "new",
    featuredProductId: "fluted-stoneware-carafe",
    src: img("7ba85f5cb5438ff587a661fa2132517c94d6fade", 2000),
    tag: "SOLID OAK & CERAMICS",
  },
  {
    id: "textiles",
    number: "03",
    tabLabel: "Belgian Flax & Comfort",
    season: "TACTILE LIVING · NATURAL FIBERS",
    title: "Textures of calm.\nQuiet comfort.",
    subtitle:
      "Stone-washed European flax linen and hand-loomed organic cotton. Honest warmth crafted to soften and deepen in character over years.",
    ctaLabel: "Browse Textiles & Throws",
    filterId: "all",
    featuredProductId: "hand-loomed-waffle-throw",
    src: img("34612192302e2e5df18556cfa4906e8ea0187660", 2000),
    tag: "100% ORGANIC FLAX & COTTON",
  },
];

export function HeroSwiper({
  onSelectFilter,
}: {
  onSelectFilter: (filterId: "all" | "bestsellers" | "new" | "under-50") => void;
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { addItem, openQuickView, openArticle } = useShopStore();

  return (
    <section
      aria-label="Hero Showcase"
      className="relative w-full border-b border-border bg-background"
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={900}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="hero-swiper-instance"
      >
        {heroSlidesData.map((slide) => {
          const featuredProduct = products.find(
            (p) => p.id === slide.featuredProductId
          );

          return (
            <SwiperSlide key={slide.id}>
              <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] w-full overflow-hidden">
                {/* Background Full-Bleed Visual */}
                <img
                  src={slide.src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />

                {/* Atmospheric Warm Editorial Scrim */}
                {/* Desktop: gradient from warm ivory on left fading across */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--background))] via-[hsl(var(--background)/0.88)] to-transparent sm:via-[hsl(var(--background)/0.75)] lg:via-[hsl(var(--background)/0.65)] lg:to-transparent"
                  aria-hidden="true"
                />

                {/* Mobile overlay to ensure crisp contrast on all viewports */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background)/0.6)] to-transparent sm:hidden"
                  aria-hidden="true"
                />

                {/* Content Overlay */}
                <div className="relative z-10 mx-auto flex h-full min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] max-w-7xl flex-col justify-between px-6 py-12 sm:px-12 sm:py-16 lg:py-20">
                  {/* Top Badge */}
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-[10px] font-medium tracking-[0.15em] text-primary backdrop-blur-xs">
                      <LeafIcon size={12} className="text-primary" />
                      {slide.season}
                    </span>
                    <span className="hidden text-[10px] tracking-widest text-muted-foreground uppercase sm:inline-block">
                      {slide.tag}
                    </span>
                  </div>

                  {/* Main Editorial Text & Action */}
                  <div className="my-auto max-w-2xl py-8">
                    <h1 className="font-display text-[46px] font-medium leading-[0.98] text-foreground sm:text-[64px] lg:text-[76px] whitespace-pre-line tracking-tight">
                      {slide.title}
                    </h1>

                    <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-foreground/80 sm:text-muted-foreground">
                      {slide.subtitle}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectFilter(slide.filterId);
                          const el = document.getElementById("featured-products");
                          el?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex h-12 items-center gap-5 rounded-sm bg-primary px-7 text-xs font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:gap-6"
                      >
                        <span>{slide.ctaLabel}</span>
                        <ArrowRightIcon size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById("featured-products");
                          el?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex h-12 items-center gap-2 border border-border/80 bg-background/70 px-5 text-xs font-medium text-foreground backdrop-blur-xs transition-colors hover:border-primary"
                      >
                        <span>View catalog</span>
                      </button>
                    </div>
                  </div>

                  {/* Floating Atelier Piece Capsule (Right side on desktop, bottom on tablet) */}
                  {featuredProduct && (
                    <div className="absolute bottom-20 right-6 z-20 hidden md:flex w-[290px] flex-col gap-3 rounded-sm border border-border/70 bg-background/90 p-4 shadow-lg backdrop-blur-md sm:right-12 lg:bottom-24 lg:right-16">
                      <div className="flex items-center justify-between text-[9px] font-semibold tracking-widest uppercase text-primary">
                        <span>Featured Object</span>
                        <span>{featuredProduct.badge}</span>
                      </div>

                      <div className="flex items-center gap-3.5">
                        <img
                          src={featuredProduct.src}
                          alt={featuredProduct.title}
                          className="size-16 shrink-0 rounded-xs bg-muted object-cover"
                        />
                        <div className="flex flex-1 flex-col">
                          <h2
                            onClick={() => openQuickView(featuredProduct)}
                            className="cursor-pointer font-display text-lg font-medium leading-tight text-foreground hover:underline"
                          >
                            {featuredProduct.title}
                          </h2>
                          <span className="text-xs font-semibold text-foreground mt-0.5">
                            ${featuredProduct.price}
                          </span>
                          <span className="text-[10px] text-muted-foreground line-clamp-1">
                            {featuredProduct.detail}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 border-t border-border/60 pt-2.5">
                        <button
                          type="button"
                          onClick={() =>
                            addItem({
                              id: featuredProduct.id,
                              title: featuredProduct.title,
                              price: featuredProduct.price,
                              src: featuredProduct.src,
                              swatchColor: featuredProduct.swatches[0]?.hex,
                              swatchName: featuredProduct.swatches[0]?.name,
                              detail: featuredProduct.detail,
                            })
                          }
                          className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-xs bg-primary text-[11px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          <PlusIcon size={12} />
                          <span>Quick add to bag</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openQuickView(featuredProduct)}
                          aria-label="View specifications"
                          className="flex size-8 items-center justify-center rounded-xs border border-border bg-background text-primary hover:bg-muted"
                        >
                          <EyeIcon size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Empty spacer so bottom controls sit naturally */}
                  <div className="h-4" />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Editorial Slide Navigation Tabs Bar */}
      <div className="relative z-20 border-t border-border bg-background/95 px-6 py-4 backdrop-blur-xs sm:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Topic Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto sm:gap-6">
            {heroSlidesData.map((s, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => swiperRef.current?.slideToLoop(idx)}
                  className={`group flex items-center gap-3 text-left transition-all ${
                    active ? "opacity-100" : "opacity-55 hover:opacity-85"
                  }`}
                  aria-label={`Switch to slide: ${s.tabLabel}`}
                >
                  <span
                    className={`font-mono text-xs font-semibold ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {s.number}
                  </span>
                  <div className="flex flex-col">
                    <span
                      className={`text-xs whitespace-nowrap ${
                        active
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {s.tabLabel}
                    </span>
                    <span
                      className={`mt-1 h-0.5 w-full rounded-full transition-all duration-500 ${
                        active ? "bg-primary" : "bg-transparent group-hover:bg-border"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Minimal Arrow Controls */}
          <div className="flex items-center justify-end gap-2 text-muted-foreground">
            <span className="mr-2 text-[11px]">
              0{activeIndex + 1} / 0{heroSlidesData.length}
            </span>
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous slide"
              className="flex size-8 items-center justify-center rounded-xs border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeftIcon size={14} />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next slide"
              className="flex size-8 items-center justify-center rounded-xs border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRightIcon size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
