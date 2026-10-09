import { Link } from "react-router";
import { PackageCheckIcon, TruckIcon } from "@/components/site/icons";

export function meta() {
  return [
    { title: "Shipping & Returns · Form & Field" },
    {
      name: "description",
      content:
        "Complimentary shipping on orders over $100. Plastic-free packaging and 30-day effortless returns.",
    },
  ];
}

export default function ShippingReturnsRoute() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 md:px-12 md:py-20">
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          Customer Service
        </span>
        <h1 className="font-display text-4xl font-medium text-foreground sm:text-5xl md:text-6xl">
          Shipping &amp; returns
        </h1>
        <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
          Everything you need to know about our dispatch process, packaging
          materials, and thirty-day return policy.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="border border-border bg-background p-6">
          <TruckIcon size={28} className="text-primary" />
          <h2 className="mt-4 font-display text-2xl text-foreground">
            Domestic Delivery
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            We offer complimentary standard shipping on all orders of $100 or
            more within the contiguous United States. For orders under $100, a
            flat rate of $10 applies.
          </p>
          <ul className="mt-4 space-y-1.5 text-xs text-foreground font-medium">
            <li>Standard: 3–5 business days</li>
            <li>Express: 1–2 business days ($24)</li>
          </ul>
        </div>

        <div className="border border-border bg-background p-6">
          <PackageCheckIcon size={28} className="text-primary" />
          <h2 className="mt-4 font-display text-2xl text-foreground">
            30-Day Returns
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            We want you to live with and love every piece. If an object does not
            suit your home, returns are accepted within 30 days of delivery in
            original unused condition.
          </p>
          <p className="mt-4 text-xs font-medium text-primary">
            Pre-paid return labels provided upon request.
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-8 text-xs leading-relaxed text-muted-foreground">
        <div>
          <h3 className="font-display text-2xl text-foreground">
            Plastic-Free Packaging
          </h3>
          <p className="mt-2">
            Every shipment is nestled securely in molded cardboard, biodegradable
            recycled paper shreds, and sealed with water-activated paper tape. We
            do not use bubble wrap or styrofoam peanuts.
          </p>
        </div>

        <div>
          <h3 className="font-display text-2xl text-foreground">
            Damaged in Transit
          </h3>
          <p className="mt-2">
            Our ceramics and glassware are packed with immense devotion. In the
            unlikely event an item arrives chipped or damaged, please email us
            at{" "}
            <a
              href="mailto:hello@formandfield.com"
              className="text-foreground underline"
            >
              hello@formandfield.com
            </a>{" "}
            with a quick photo and your order number. A replacement will be
            dispatched immediately at no cost.
          </p>
        </div>

        <div>
          <h3 className="font-display text-2xl text-foreground">
            Initiating a Return
          </h3>
          <p className="mt-2">
            Visit your{" "}
            <Link to="/account" className="text-foreground underline">
              Account Page
            </Link>{" "}
            or contact our concierge with your order number. We will provide a
            printable return shipping label.
          </p>
        </div>
      </div>
    </div>
  );
}
