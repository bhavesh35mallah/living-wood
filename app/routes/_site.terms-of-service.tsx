export function meta() {
  return [
    { title: "Terms of Service · Form & Field" },
    {
      name: "description",
      content:
        "Terms and conditions governing the purchase of Form & Field objects and website use.",
    },
  ];
}

export default function TermsOfServiceRoute() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:px-12 md:py-20">
      <div className="flex flex-col gap-3 border-b border-border pb-6">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          Legal &amp; Terms
        </span>
        <h1 className="font-display text-4xl font-medium text-foreground sm:text-5xl">
          Terms of Service
        </h1>
        <p className="text-xs text-muted-foreground">
          Effective Date: October 2026 · Form &amp; Field Living Co.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-xs sm:text-sm leading-relaxed text-muted-foreground">
        <p>
          By accessing the Form &amp; Field website or purchasing goods from our
          curation, you agree to the following terms and guidelines.
        </p>

        <h2 className="font-display text-2xl text-foreground pt-4">
          1. Handmade Variations
        </h2>
        <p>
          Our objects are created by hand using natural materials—including raw
          stoneware clay, stone-washed flax, and unbleached beeswax. Because they
          are not mass-produced by machines, subtle variations in glaze pooling,
          clay speckling, and grain patterns are natural and celebrated
          characteristics of authentic craft.
        </p>

        <h2 className="font-display text-2xl text-foreground pt-4">
          2. Order Acceptance &amp; Pricing
        </h2>
        <p>
          All orders are subject to acceptance and stock availability. We
          reserve the right to refuse or cancel orders if inaccuracies regarding
          pricing, inventory, or promotional codes are discovered. If payment has
          already been processed, an immediate refund will be issued.
        </p>

        <h2 className="font-display text-2xl text-foreground pt-4">
          3. Intellectual Property
        </h2>
        <p>
          All photography, written essays, maker narratives, and design marks are
          the exclusive property of Form &amp; Field Living Co. and may not be
          reproduced without prior written consent.
        </p>
      </div>
    </div>
  );
}
