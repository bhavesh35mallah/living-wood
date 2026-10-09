import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link } from "react-router";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CopyIcon,
  EyeIcon,
  HeartIcon,
  LeafIcon,
  PackageCheckIcon,
  PlusIcon,
  TruckIcon,
} from "@/components/site/icons";
import { articles, img, products } from "@/data/catalog";
import type { Product } from "@/data/catalog";
import { useShopStore } from "@/lib/store";
import { HeroSwiper } from "@/components/site/HeroSwiper";
import { ProductSwiperCarousel } from "@/components/site/ProductSwiperCarousel";
import { ReviewsSwiper } from "@/components/site/ReviewsSwiper";
import { FestiveSection } from "@/components/site/FestiveSection";

export function meta() {
  return [
    { title: "Form & Field · Objects for everyday living" },
    {
      name: "description",
      content:
        "Considered objects, natural textures, and little rituals. Beautiful things for a life well lived.",
    },
  ];
}

const departments = [
  {
    title: "Home & living",
    text: "Make room for the everyday",
    to: "/home-living",
    src: img("d393e0e8842777ef806c17c5f855906698f6a17d", 620),
    count: "24 pieces",
  },
  {
    title: "Table & kitchen",
    text: "Gather a little more often",
    to: "/table-kitchen",
    src: img("d834ef582834500abb396ba536c15230520f607d", 620),
    count: "38 pieces",
  },
  {
    title: "Textiles",
    text: "Softness, in every layer",
    to: "/textiles",
    src: img("34612192302e2e5df18556cfa4906e8ea0187660", 620),
    count: "19 pieces",
  },
  {
    title: "Objects & gifts",
    text: "Small things. Lasting delight.",
    to: "/objects-gifts",
    src: img("1eaa793704e68d956c822522f7da074a273aea60", 620),
    count: "31 pieces",
  },
];

type FilterId = "all" | "bestsellers" | "new" | "under-50";

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All pieces" },
  { id: "bestsellers", label: "Bestsellers" },
  { id: "new", label: "New arrivals" },
  { id: "under-50", label: "Under $50" },
];

const reviews = [
  {
    quote:
      "The kind of pieces you reach for every day. My morning coffee has become a small, lovely ritual.",
    name: "Emily R.",
    product: "Everyday stoneware mug",
    rating: "5.0",
  },
  {
    quote:
      "Beautifully made, without being precious. Everything feels even better in person — and in our home.",
    name: "Daniel M.",
    product: "The gathering edit",
    rating: "5.0",
  },
  {
    quote:
      "Finally, a shop that understands less, but better. Thoughtful from the first click to the last bit of packaging.",
    name: "Sarah L.",
    product: "Linen cushion cover",
    rating: "5.0",
  },
];

const promises = [
  {
    icon: TruckIcon,
    title: "On its way, with care",
    text: "Complimentary shipping on orders $100+",
  },
  {
    icon: PackageCheckIcon,
    title: "Room to change your mind",
    text: "Easy returns within 30 days",
  },
  {
    icon: LeafIcon,
    title: "Thoughtful, by nature",
    text: "Natural materials. Mindful packaging.",
  },
];

const heroSlides = [
  {
    id: "01",
    eyebrow: "The art of everyday · Autumn 2026",
    title: "A slower home.\nA richer everyday.",
    text: "Considered objects, natural textures, and little rituals. Beautiful things for a life well lived.",
    cta: "Discover the autumn edit",
    filterId: "bestsellers" as FilterId,
    featuredTitle: "The everyday vessel",
    featuredDetail: "Hand-finished stoneware · $48",
    featuredProductId: "everyday-vessel",
    src: img("e8f9bf39b308d7921395c101fda6c48caa3e210e", 1760),
    tag: "AT HOME, WITH FORM & FIELD",
  },
  {
    id: "02",
    eyebrow: "The gathering edit · Edition 04",
    title: "The table,\nwhere stories live.",
    text: "An unhurried meal. A beautifully laid table. Pieces that turn getting together into something to remember.",
    cta: "Explore dining & kitchen",
    filterId: "new" as FilterId,
    featuredTitle: "Fluted stoneware carafe",
    featuredDetail: "Textured ceramic · $48",
    featuredProductId: "fluted-stoneware-carafe",
    src: img("7ba85f5cb5438ff587a661fa2132517c94d6fade", 1760),
    tag: "FOR UNHURRIED MEALS",
  },
  {
    id: "03",
    eyebrow: "Natural materials · Handcrafted",
    title: "Textures of calm.\nQuiet comfort.",
    text: "Heirloom textiles, beeswax glow, and tactile warmth crafted to last through generations of living.",
    cta: "Browse textiles & living",
    filterId: "all" as FilterId,
    featuredTitle: "Hand-loomed waffle throw",
    featuredDetail: "Organic cotton & flax · $85",
    featuredProductId: "hand-loomed-waffle-throw",
    src: img("34612192302e2e5df18556cfa4906e8ea0187660", 1760),
    tag: "PURE NATURAL FIBERS",
  },
];

function Eyebrow({
  children,
  className = "text-primary",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={
        "text-[11px] font-medium uppercase tracking-[0.12em] " + className
      }
    >
      {children}
    </p>
  );
}

function EditorialLink({
  to,
  children,
  light = false,
  onClick,
}: {
  to?: string;
  children: ReactNode;
  light?: boolean;
  onClick?: () => void;
}) {
  const className =
    "inline-flex items-center gap-2 border-b pb-1.5 text-[13px] transition-opacity hover:opacity-70 " +
    (light
      ? "border-primary-foreground text-primary-foreground"
      : "border-primary text-primary");

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
        <ArrowUpRightIcon />
      </button>
    );
  }

  return (
    <Link to={to || "#"} className={className}>
      {children}
      <ArrowUpRightIcon />
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  linkLabel,
  linkTo,
  onLinkClick,
}: {
  eyebrow: string;
  title: string;
  linkLabel: string;
  linkTo?: string;
  onLinkClick?: () => void;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
      <div className="flex flex-col gap-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display text-[34px] leading-[1.05] text-foreground sm:text-5xl">
          {title}
        </h2>
      </div>
      <EditorialLink to={linkTo} onClick={onLinkClick}>
        {linkLabel}
      </EditorialLink>
    </div>
  );
}

function Hero({
  onSelectFilter,
}: {
  onSelectFilter: (filterId: FilterId) => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { addItem, openQuickView } = useShopStore();

  const slide = heroSlides[currentSlide];

  // Auto advance every 6.5s unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  function nextSlide() {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }

  function prevSlide() {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }

  const featuredProduct = products.find(
    (p) => p.id === slide.featuredProductId
  );

  return (
    <section
      className="grid bg-muted lg:min-h-[624px] lg:grid-cols-[minmax(0,560px)_1fr]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Editorial Content */}
      <div className="flex flex-col justify-center gap-6 px-5 py-12 md:px-16 lg:py-10 lg:pr-[60px]">
        <Eyebrow>{slide.eyebrow}</Eyebrow>
        <h1 className="font-display text-[52px] leading-[0.99] text-foreground sm:text-[64px] lg:text-[76px] whitespace-pre-line">
          {slide.title}
        </h1>
        <p className="max-w-[380px] text-[15px] leading-[1.8] text-muted-foreground">
          {slide.text}
        </p>

        <div className="flex items-center gap-4 pt-1">
          <button
            type="button"
            onClick={() => {
              onSelectFilter(slide.filterId);
              const el = document.getElementById("featured-products");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex h-12 items-center gap-6 rounded-sm bg-primary px-6 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {slide.cta}
            <ArrowRightIcon />
          </button>
        </div>

        {/* Interactive Slide Switcher */}
        <div className="flex items-center gap-4 pt-6 text-[11px]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="flex size-7 items-center justify-center rounded-sm border border-border text-muted-foreground hover:border-primary hover:text-foreground"
            >
              <ChevronLeftIcon size={14} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex size-7 items-center justify-center rounded-sm border border-border text-muted-foreground hover:border-primary hover:text-foreground"
            >
              <ChevronRightIcon size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2" aria-label="Slides">
            {heroSlides.map((s, idx) => {
              const active = idx === currentSlide;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`flex items-center gap-2 text-xs transition-colors ${
                    active ? "font-semibold text-primary" : "text-muted-foreground"
                  }`}
                  aria-label={`Go to slide ${s.id}`}
                  aria-current={active}
                >
                  <span>{s.id}</span>
                  <span
                    className={`h-0.5 transition-all duration-300 ${
                      active ? "w-10 bg-primary" : "w-4 bg-border"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hero Visual Banner */}
      <div className="relative aspect-[4/3] lg:aspect-auto">
        <img
          src={slide.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        />

        <span className="absolute bottom-4 left-4 bg-background px-3 py-2 text-[9px] tracking-[0.1em] text-primary sm:left-7 sm:bottom-[26px] max-sm:hidden">
          {slide.tag}
        </span>

        {/* Floating Featured Product Highlight */}
        {featuredProduct && (
          <div className="absolute bottom-4 right-4 flex w-[280px] max-w-[calc(100%-2rem)] flex-col gap-3 bg-background p-4 shadow-sm sm:bottom-7 sm:right-7">
            <div className="flex items-start justify-between gap-4">
              <div
                className="flex cursor-pointer flex-col gap-1"
                onClick={() => openQuickView(featuredProduct)}
              >
                <span className="font-display text-[22px] leading-tight text-foreground hover:underline">
                  {slide.featuredTitle}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {slide.featuredDetail}
                </span>
              </div>
              <button
                type="button"
                onClick={() => openQuickView(featuredProduct)}
                aria-label="Quick view"
                className="text-primary hover:opacity-75"
              >
                <EyeIcon size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2 border-t border-border pt-2.5">
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
                className="flex h-8 flex-1 items-center justify-center gap-2 bg-primary text-[11px] font-medium text-primary-foreground hover:opacity-90"
              >
                <PlusIcon size={12} />
                <span>Quick add · ${featuredProduct.price}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Departments({
  onSelectDepartment,
}: {
  onSelectDepartment: (dept: string) => void;
}) {
  return (
    <section className="flex flex-col gap-8 px-5 pb-[70px] pt-14 md:px-16 md:pt-[76px]">
      <SectionHeading
        eyebrow="A place for everything"
        title="Find your everyday."
        linkLabel="Explore all departments"
        onLinkClick={() => {
          const el = document.getElementById("featured-products");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {departments.map((d) => (
          <div
            key={d.title}
            onClick={() => {
              onSelectDepartment(d.title);
              const el = document.getElementById("featured-products");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex cursor-pointer flex-col gap-4"
          >
            <div className="relative h-[250px] overflow-hidden bg-muted">
              <img
                src={d.src}
                alt={d.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-3 left-3 bg-background/90 px-2 py-1 text-[9px] font-medium tracking-wider text-muted-foreground backdrop-blur-xs">
                {d.count}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-[5px]">
                <span className="font-display text-[28px] leading-none text-foreground group-hover:underline">
                  {d.title}
                </span>
                <span className="text-xs text-muted-foreground">{d.text}</span>
              </div>
              <ArrowRightIcon
                size={18}
                className="text-primary transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  alwaysShowAdd = false,
}: {
  product: Product;
  alwaysShowAdd?: boolean;
}) {
  const { addItem, toggleWishlist, isInWishlist, openQuickView } =
    useShopStore();

  const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const isSaved = isInWishlist(product.id);
  const currentSwatch =
    product.swatches[selectedSwatchIndex] || product.swatches[0];

  function handleQuickAdd(e: React.MouseEvent) {
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      src: product.src,
      swatchColor: currentSwatch?.hex,
      swatchName: currentSwatch?.name,
      detail: product.detail,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  }

  function handleToggleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      src: product.src,
      detail: product.detail,
      badge: product.badge,
    });
  }

  return (
    <article className="group flex flex-col gap-4">
      <div
        className="relative h-[328px] cursor-pointer overflow-hidden bg-muted"
        onClick={() => openQuickView(product)}
      >
        <img
          src={product.src}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Badge */}
        <span className="absolute left-3.5 top-3.5 bg-background px-2 py-1.5 text-[8px] tracking-[0.1em] text-primary">
          {product.badge}
        </span>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-pressed={isSaved}
          aria-label={(isSaved ? "Remove " : "Save ") + product.title}
          className="absolute right-3 top-3 flex size-[30px] items-center justify-center rounded-full bg-background text-primary shadow-sm transition-transform active:scale-90"
        >
          <HeartIcon
            size={16}
            fill={isSaved ? "currentColor" : "none"}
          />
        </button>

        {/* Quick View hint icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openQuickView(product);
          }}
          aria-label={`Preview ${product.title}`}
          className="absolute right-3 top-12 flex size-[30px] items-center justify-center rounded-full bg-background text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
        >
          <EyeIcon size={15} />
        </button>

        {/* Quick Add Button */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className={
            "absolute inset-x-3.5 bottom-3.5 flex h-[39px] items-center justify-center gap-3 bg-primary text-xs text-primary-foreground transition-opacity focus-visible:opacity-100 group-hover:opacity-100 " +
            (alwaysShowAdd || justAdded ? "opacity-100" : "opacity-0")
          }
        >
          {justAdded ? (
            <>
              <span>Added to bag</span>
              <CheckIcon size={14} />
            </>
          ) : (
            <>
              <span>Quick add</span>
              <PlusIcon />
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className="cursor-pointer font-display text-2xl leading-none text-foreground hover:underline"
            onClick={() => openQuickView(product)}
          >
            {product.title}
          </h3>
          <span className="text-[13px] font-medium text-foreground">
            ${product.price}
          </span>
        </div>

        <p className="text-[11px] text-muted-foreground">{product.detail}</p>

        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-primary" aria-hidden="true">
            ★★★★★
          </span>
          <span className="text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Interactive Color Swatches */}
        <div className="flex items-center gap-1.5 pt-1">
          <ul className="flex gap-[7px]" aria-label="Colour options">
            {product.swatches.map((color, idx) => {
              const active = idx === selectedSwatchIndex;
              return (
                <li key={color.hex}>
                  <button
                    type="button"
                    onClick={() => setSelectedSwatchIndex(idx)}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                    className={`relative flex size-[15px] items-center justify-center rounded-full transition-transform ${
                      active ? "scale-110 ring-1 ring-primary ring-offset-1" : ""
                    }`}
                  >
                    <span
                      className="size-[11px] rounded-full border border-border"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          {currentSwatch && (
            <span className="ml-1 text-[10px] text-muted-foreground">
              {currentSwatch.name}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function FeaturedProducts({
  filter,
  setFilter,
  departmentFilter,
  clearDepartmentFilter,
}: {
  filter: FilterId;
  setFilter: (f: FilterId) => void;
  departmentFilter: string | null;
  clearDepartmentFilter: () => void;
}) {
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  const visible = products.filter((p) => {
    if (departmentFilter && p.department !== departmentFilter) return false;
    if (filter === "all") return true;
    return p.tags.includes(filter);
  });

  return (
    <section
      id="featured-products"
      className="flex flex-col gap-7 px-5 pb-20 pt-6 md:px-16"
    >
      <SectionHeading
        eyebrow="The pieces you come back to"
        title="Good things, well loved."
        linkLabel="View all catalog"
        onLinkClick={() => {
          setFilter("all");
          clearDepartmentFilter();
        }}
      />

      {/* Filter and department tags */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border">
        <div
          role="tablist"
          aria-label="Product filters"
          className="flex gap-7"
        >
          {filters.map((f) => {
            const active = f.id === filter && !departmentFilter;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(f.id);
                  clearDepartmentFilter();
                }}
                className={
                  "-mb-px border-b-2 pb-3 text-xs transition-colors " +
                  (active
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground")
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 pb-2 text-xs">
          {departmentFilter && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Filtered by:</span>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                {departmentFilter}
              </span>
              <button
                type="button"
                onClick={clearDepartmentFilter}
                className="text-[11px] underline text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            </div>
          )}

          {/* Swiper Slider vs Grid Toggle */}
          <div className="flex items-center gap-1 rounded-sm border border-border bg-muted/40 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("carousel")}
              className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                viewMode === "carousel"
                  ? "bg-background text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Swiper Carousel
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-background text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Product Display: Swiper Carousel or Grid */}
      {viewMode === "carousel" ? (
        <ProductSwiperCarousel products={visible} />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              alwaysShowAdd={i === 0 && !departmentFilter}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function Gathering() {
  const { addItem, applyDiscount, openCart } = useShopStore();

  function handleAddGatheringBundle() {
    const mug = products.find((p) => p.id === "everyday-stoneware-mug");
    const board = products.find((p) => p.id === "gather-serving-board");
    const cushion = products.find((p) => p.id === "linen-cushion-cover");

    if (mug) {
      addItem({
        id: mug.id,
        title: mug.title,
        price: mug.price,
        src: mug.src,
        detail: mug.detail,
      });
    }
    if (board) {
      addItem({
        id: board.id,
        title: board.title,
        price: board.price,
        src: board.src,
        detail: board.detail,
      });
    }
    if (cushion) {
      addItem({
        id: cushion.id,
        title: cushion.title,
        price: cushion.price,
        src: cushion.src,
        detail: cushion.detail,
      });
    }
    applyDiscount("AUTUMN10");
    openCart();
  }

  return (
    <section className="grid lg:min-h-[560px] lg:grid-cols-[820px_1fr] max-xl:lg:grid-cols-[1fr_1fr]">
      <div className="relative aspect-[4/3] lg:aspect-auto">
        <img
          src={img("7ba85f5cb5438ff587a661fa2132517c94d6fade", 1640)}
          alt="The gathering table setting"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute bottom-[30px] left-4 bg-background px-4 py-2.5 text-[10px] tracking-[0.1em] text-primary sm:left-8">
          THE GATHERING EDIT · 18 CONSIDERED PIECES
        </span>
      </div>
      <div className="flex flex-col justify-center gap-6 bg-primary px-5 py-16 text-primary-foreground md:px-16 xl:px-[70px]">
        <Eyebrow className="text-primary-foreground">
          For the moments that matter
        </Eyebrow>
        <h2 className="font-display text-5xl leading-none sm:text-[64px]">
          The pleasure
          <br />
          of gathering.
        </h2>
        <p className="text-[15px] leading-[1.8] opacity-85">
          An unhurried meal. A beautifully laid table. Pieces that turn getting
          together into something to remember.
        </p>
        <p className="text-[11px] opacity-70">
          Handmade stoneware &nbsp; / &nbsp; Natural linen &nbsp; / &nbsp; Solid
          oak
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-3">
          <button
            type="button"
            onClick={handleAddGatheringBundle}
            className="flex h-11 items-center gap-3 bg-primary-foreground px-5 text-xs font-medium text-primary transition-opacity hover:opacity-90"
          >
            Add Gathering Trio (10% off)
            <PlusIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

function OurStory() {
  const { openArticle } = useShopStore();

  return (
    <section className="flex flex-col items-center gap-10 px-5 py-16 md:px-16 lg:flex-row lg:gap-[88px] lg:py-[88px]">
      <div className="flex flex-1 flex-col items-start gap-6 lg:pr-10">
        <Eyebrow>Fewer things. Better stories.</Eyebrow>
        <h2 className="font-display text-[40px] leading-[1.06] text-foreground sm:text-[52px]">
          Not just made.
          <br />
          Made to mean something.
        </h2>
        <p className="text-[15px] leading-[1.8] text-muted-foreground">
          We believe the things we live with should earn their place. So we seek
          out independent makers, honest materials, and thoughtful design that
          gets better with time.
        </p>
        <p className="text-[15px] leading-[1.8] text-muted-foreground">
          From a family-run pottery in Portugal to a linen mill in Belgium,
          every piece carries a little of the hands that made it.
        </p>
        <div className="pt-1">
          <EditorialLink
            onClick={() => {
              const firstArticle = articles[0];
              if (firstArticle) openArticle(firstArticle);
            }}
          >
            Read our maker notes
          </EditorialLink>
        </div>
        <div className="flex flex-col gap-1 pt-3">
          <span className="font-display text-[27px] italic leading-none text-primary">
            Anna &amp; James
          </span>
          <span className="text-[10px] tracking-[0.1em] text-muted-foreground">
            FOUNDERS, FORM &amp; FIELD
          </span>
        </div>
      </div>
      <figure className="flex w-full flex-col gap-3 lg:w-[624px] lg:max-w-[52%] lg:shrink-0">
        <img
          src={img("1c1fbb302f05b0719881159f71e061a66c30b30a", 1248)}
          alt="Artisan hands shaping clay"
          className="h-[320px] w-full object-cover sm:h-[462px]"
        />
        <figcaption className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
          <span>FROM THE HANDS OF OUR MAKERS</span>
          <span>Porto, Portugal · Est. 1982</span>
        </figcaption>
      </figure>
    </section>
  );
}

function CustomerStories() {
  return (
    <section className="flex flex-col gap-8 bg-muted px-5 py-12 md:p-16">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <Eyebrow>Loved in real homes</Eyebrow>
        <p className="text-xs font-medium text-primary">
          4.9 / 5 {" · "} From 1,200+ happy homes across the country
        </p>
      </div>
      <ReviewsSwiper />
    </section>
  );
}

function Journal() {
  const { openArticle } = useShopStore();

  return (
    <section className="flex flex-col gap-8 px-5 py-16 md:px-16 md:py-20">
      <SectionHeading
        eyebrow="Notes on a considered life"
        title="A little inspiration for living."
        linkLabel="Explore all stories"
        onLinkClick={() => {
          const first = articles[0];
          if (first) openArticle(first);
        }}
      />
      <div className="grid gap-7 md:grid-cols-3">
        {articles.map((a) => (
          <article key={a.title} className="flex flex-col gap-4">
            <div
              className="cursor-pointer overflow-hidden bg-muted"
              onClick={() => openArticle(a)}
            >
              <img
                src={a.src}
                alt={a.title}
                className="h-[246px] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="uppercase tracking-[0.1em] text-primary">
                {a.category}
              </span>
              <span className="text-muted-foreground">{a.time}</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3
                className="cursor-pointer font-display text-[30px] leading-[1.1] text-foreground hover:underline"
                onClick={() => openArticle(a)}
              >
                {a.title}
              </h3>
              <p className="text-xs leading-[1.6] text-muted-foreground">
                {a.text}
              </p>
            </div>
            <div>
              <EditorialLink onClick={() => openArticle(a)}>
                Read the story
              </EditorialLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Promises() {
  return (
    <section className="grid gap-8 border-y border-border px-5 py-10 md:grid-cols-3 md:px-16 md:py-0 lg:h-[138px] lg:items-center">
      {promises.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className="flex items-center gap-[18px] md:justify-center"
        >
          <Icon className="text-primary" />
          <div className="flex flex-col gap-1.5">
            <span className="font-display text-[25px] leading-none text-foreground">
              {title}
            </span>
            <span className="text-[11px] text-muted-foreground">{text}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");
  const [copied, setCopied] = useState(false);
  const { applyDiscount, openCart, addToast } = useShopStore();

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (valid) {
      setStatus("done");
      addToast("Welcome! Enjoy 10% off with code AUTUMN10", "success");
    } else {
      setStatus("error");
    }
  }

  function handleCopyCode() {
    navigator.clipboard.writeText("AUTUMN10");
    setCopied(true);
    addToast("Code AUTUMN10 copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  }

  function handleApplyToBag() {
    applyDiscount("AUTUMN10");
    openCart();
  }

  return (
    <section className="flex flex-col gap-10 bg-[hsl(var(--wash))] px-5 py-12 md:p-16 lg:flex-row lg:items-center lg:gap-[100px]">
      <div className="flex flex-1 flex-col gap-3.5">
        <Eyebrow>A note from us, now and then</Eyebrow>
        <h2 className="font-display text-[40px] leading-[1.1] text-foreground sm:text-5xl">
          Good things in your inbox.
        </h2>
        <p className="text-[13px] leading-[1.7] text-muted-foreground">
          New finds, stories from our makers, and a little inspiration.
          <br />
          Join our community and enjoy 10% off your first order.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        noValidate
        className="flex flex-col gap-3.5 lg:w-[536px]"
      >
        {status === "done" ? (
          <div className="flex flex-col gap-3 border border-border bg-background p-5">
            <div className="flex items-center gap-2 text-xs font-medium text-primary">
              <CircleCheckIcon size={16} />
              <span>
                Thank you! Here is your 10% welcome note and promo code:
              </span>
            </div>

            <div className="flex items-center justify-between rounded-sm border border-border bg-muted/50 px-4 py-2.5">
              <span className="font-display text-xl font-medium tracking-wider text-foreground">
                AUTUMN10
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 border border-border bg-background px-3 py-1 text-[11px] font-medium text-foreground hover:bg-muted"
                >
                  {copied ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleApplyToBag}
                  className="bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground hover:opacity-90"
                >
                  Apply to bag
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-[52px] flex-col sm:flex-row max-sm:h-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              aria-label="Email address"
              aria-invalid={status === "error"}
              placeholder="Your email address"
              className="h-[52px] min-w-0 flex-1 border border-border bg-background px-[18px] text-[13px] text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive"
            />
            <button
              type="submit"
              className="flex h-[52px] items-center justify-center gap-3 bg-primary px-6 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-[142px] sm:px-0"
            >
              Sign me up
              <ArrowRightIcon />
            </button>
          </div>
        )}

        {status === "error" && (
          <p role="alert" className="text-[11px] text-destructive">
            Please enter a valid email address.
          </p>
        )}

        <p className="text-[10px] leading-[1.6] text-muted-foreground">
          Only the lovely stuff. Unsubscribe anytime. By signing up, you agree
          to our{" "}
          <Link to="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </section>
  );
}

export default function HomeRoute() {
  const [filter, setFilter] = useState<FilterId>("bestsellers");
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);

  return (
    <>
      <HeroSwiper
        onSelectFilter={(f) => {
          setFilter(f);
          setDepartmentFilter(null);
        }}
      />
      <Departments
        onSelectDepartment={(dept) => {
          setDepartmentFilter(dept);
        }}
      />
      <FestiveSection />
      <FeaturedProducts
        filter={filter}
        setFilter={setFilter}
        departmentFilter={departmentFilter}
        clearDepartmentFilter={() => setDepartmentFilter(null)}
      />
      <Gathering />
      <OurStory />
      <CustomerStories />
      <Journal />
      <Promises />
      <Newsletter />
    </>
  );
}
