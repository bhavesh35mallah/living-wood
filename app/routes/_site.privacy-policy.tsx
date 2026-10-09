export function meta() {
  return [
    { title: "Privacy Policy · Form & Field" },
    {
      name: "description",
      content:
        "Our commitment to protecting your personal information and privacy.",
    },
  ];
}

export default function PrivacyPolicyRoute() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:px-12 md:py-20">
      <div className="flex flex-col gap-3 border-b border-border pb-6">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          Legal &amp; Privacy
        </span>
        <h1 className="font-display text-4xl font-medium text-foreground sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="text-xs text-muted-foreground">
          Last revised: October 2026 · Form &amp; Field Living Co.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-xs sm:text-sm leading-relaxed text-muted-foreground">
        <p>
          At Form &amp; Field, we respect your right to privacy as deeply as we
          respect the craft of our makers. We do not sell, rent, or trade your
          personal information to third-party data brokers.
        </p>

        <h2 className="font-display text-2xl text-foreground pt-4">
          1. Information We Collect
        </h2>
        <p>
          When you place an order, join our seasonal newsletter, or create an
          account, we collect essential details such as your name, billing and
          delivery address, email address, phone number, and payment
          authorization data.
        </p>

        <h2 className="font-display text-2xl text-foreground pt-4">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>To fulfill, pack, and dispatch your orders.</li>
          <li>To send tracking links and delivery confirmations.</li>
          <li>
            To send our seasonal letterpress newsletters (only if explicitly
            opted in).
          </li>
          <li>To provide personalized concierge customer service.</li>
        </ul>

        <h2 className="font-display text-2xl text-foreground pt-4">
          3. Security &amp; Storage
        </h2>
        <p>
          All transaction communications are encrypted using Transport Layer
          Security (TLS 1.3). Payment card information is processed directly
          through certified PCI-DSS Level 1 payment processors and is never
          stored on our local servers.
        </p>

        <h2 className="font-display text-2xl text-foreground pt-4">
          4. Your Rights
        </h2>
        <p>
          You may request an export or complete deletion of your customer
          profile at any time by contacting{" "}
          <a
            href="mailto:privacy@formandfield.com"
            className="text-foreground underline"
          >
            privacy@formandfield.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
