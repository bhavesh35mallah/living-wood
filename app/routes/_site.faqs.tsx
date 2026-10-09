import { useState } from "react";
import { Link } from "react-router";

export function meta() {
  return [
    { title: "Frequently Asked Questions · Form & Field" },
    {
      name: "description",
      content:
        "Common questions about ceramic care, linen washing, shipping rates, and maker origins.",
    },
  ];
}

const faqs = [
  {
    category: "Materials & Care",
    q: "Is your stoneware dishwasher and microwave safe?",
    a: "Yes. All of our Portuguese high-fire stoneware is dishwasher and microwave safe, with non-toxic lead-free glazes. However, like all handcrafted ceramics, hand washing with mild dish soap will prolong the natural luster of the matte chalk glaze.",
  },
  {
    category: "Materials & Care",
    q: "How should I care for pure European flax linen?",
    a: "Wash on a gentle cycle in cold or lukewarm water using mild plant-based detergent. Tumble dry on low heat or hang outdoors in the breeze. Natural linen looks best with its lived-in, textured wrinkles—ironing is completely optional.",
  },
  {
    category: "Materials & Care",
    q: "How do I maintain the solid European oak serving board?",
    a: "Wipe clean with a damp cloth and mild soap; never submerge in water or place in the dishwasher. Season with organic food-grade mineral oil or walnut oil every two to three months to maintain the wood’s moisture and natural grain.",
  },
  {
    category: "Orders & Shipping",
    q: "How do I qualify for complimentary shipping?",
    a: "All domestic orders with a subtotal of $100 or higher qualify for complimentary standard shipping. This discount is applied automatically in your shopping bag.",
  },
  {
    category: "Orders & Shipping",
    q: "What carrier do you use and how can I track my package?",
    a: "We ship domestically via carbon-neutral ground service with USPS and UPS. Tracking numbers are generated immediately upon dispatch and visible on your Account page.",
  },
  {
    category: "Trade & Gifting",
    q: "Do you offer an interior design or trade discount?",
    a: "Yes. We partner with interior designers, architects, and hospitality stylists. Email us at trade@formandfield.com with your business credentials for trade pricing.",
  },
  {
    category: "Trade & Gifting",
    q: "Can I include a handwritten gift note?",
    a: "Absolutely. During checkout or by contacting us right after placing your order, let us know your message and we will write it by hand on our unbleached letterpress stationery.",
  },
];

export default function FaqsRoute() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 md:px-12 md:py-20">
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          Answers &amp; Guidance
        </span>
        <h1 className="font-display text-4xl font-medium text-foreground sm:text-5xl md:text-6xl">
          Frequently asked questions
        </h1>
        <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
          Everything from ceramic kiln techniques and flax maintenance to trade
          orders and shipping timelines.
        </p>
      </div>

      <div className="mt-12 flex flex-col divide-y divide-border">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-5">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-start justify-between text-left"
              >
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
                    {faq.category}
                  </span>
                  <h3 className="mt-1 font-display text-xl text-foreground sm:text-2xl">
                    {faq.q}
                  </h3>
                </div>
                <span className="ml-4 font-display text-2xl text-primary">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-16 border-t border-border pt-8 text-center">
        <p className="text-xs text-muted-foreground">
          Have a question that isn&apos;t covered here?
        </p>
        <Link
          to="/contact-us"
          className="mt-2 inline-block font-display text-lg text-primary underline underline-offset-4"
        >
          Send our team a note
        </Link>
      </div>
    </div>
  );
}
