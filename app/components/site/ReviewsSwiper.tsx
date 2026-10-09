import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { CircleCheckIcon } from "./icons";

interface Review {
  quote: string;
  name: string;
  product: string;
  rating?: string;
  location?: string;
}

const customerReviews: Review[] = [
  {
    quote:
      "The kind of pieces you reach for every day. My morning coffee has become a small, lovely ritual with the chalk stoneware mug.",
    name: "Emily R.",
    product: "Everyday stoneware mug",
    location: "Seattle, WA",
  },
  {
    quote:
      "Beautifully made, without being precious. Everything feels even better in person — and in our home.",
    name: "Daniel M.",
    product: "Gather serving board",
    location: "Boulder, CO",
  },
  {
    quote:
      "Finally, a shop that understands less, but better. Thoughtful from the first click to the last bit of packaging.",
    name: "Sarah L.",
    product: "Linen cushion cover",
    location: "Austin, TX",
  },
  {
    quote:
      "The cedar and fig candle has a gentle, clean throw that fills the room without being overpowering. Will definitely purchase again.",
    name: "Julian K.",
    product: "Sunday ritual candle",
    location: "Brooklyn, NY",
  },
  {
    quote:
      "The waffle throw is wonderfully heavy yet breathable. The oatmeal hue fits our living room aesthetic like an heirloom.",
    name: "Claire & Thomas",
    product: "Hand-loomed waffle throw",
    location: "Chicago, IL",
  },
];

export function ReviewsSwiper() {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={32}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="pb-12"
      >
        {customerReviews.map((r, idx) => (
          <SwiperSlide key={idx}>
            <figure className="flex h-full flex-col justify-between border border-border/50 bg-background p-7 shadow-2xs">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary" aria-label="5 stars">
                    ★★★★★
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {r.location}
                  </span>
                </div>
                <blockquote className="font-display text-2xl leading-snug text-foreground sm:text-[26px]">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
              </div>

              <figcaption className="mt-6 flex flex-col gap-1 border-t border-border pt-4">
                <span className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground">
                    {r.name}
                  </span>
                  <CircleCheckIcon className="text-primary" size={13} />
                  <span className="text-[10px] text-muted-foreground">
                    Verified Buyer
                  </span>
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {r.product}
                </span>
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
