import { useState } from "react";
import { ArrowRightIcon, CircleCheckIcon } from "@/components/site/icons";
import { useShopStore } from "@/lib/store";

export function meta() {
  return [
    { title: "Contact Us · Form & Field" },
    {
      name: "description",
      content:
        "We are always glad to assist with orders, maker inquiries, trade partnerships, or material advice.",
    },
  ];
}

export default function ContactUsRoute() {
  const { addToast } = useShopStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Order inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    addToast("Your note has been received. We reply within 24 hours.", "success");
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 md:px-12 md:py-20">
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          Customer Care &amp; Studio
        </span>
        <h1 className="font-display text-4xl font-medium text-foreground sm:text-5xl md:text-6xl">
          We&apos;re here to help.
        </h1>
        <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
          Questions about a piece, material care, or shipment status? Send us a
          note or drop by our studio hours.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Contact Information */}
        <div className="flex flex-col gap-8 lg:col-span-5">
          <div>
            <h2 className="font-display text-2xl text-foreground">
              Studio &amp; Office
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Form &amp; Field Atelier
              <br />
              1240 NW Flanders St, Suite 200
              <br />
              Portland, Oregon 97209
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-foreground">
              Hours of Concierge
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Monday through Friday: 9am – 5pm PT
              <br />
              Saturday &amp; Sunday: Closed for rest
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-foreground">
              Direct Inquiries
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              General:{" "}
              <a
                href="mailto:hello@formandfield.com"
                className="underline hover:text-foreground"
              >
                hello@formandfield.com
              </a>
              <br />
              Trade &amp; Interior Design:{" "}
              <a
                href="mailto:trade@formandfield.com"
                className="underline hover:text-foreground"
              >
                trade@formandfield.com
              </a>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border border-border bg-background p-6 lg:col-span-7 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CircleCheckIcon size={24} />
              </div>
              <h3 className="mt-4 font-display text-3xl font-medium text-foreground">
                Note received
              </h3>
              <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
                Thank you, {name}. A member of our concierge team will respond to{" "}
                <strong>{email}</strong> within one business day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage("");
                }}
                className="mt-6 border border-border px-4 py-2 text-xs text-foreground hover:bg-muted"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h2 className="font-display text-2xl text-foreground">
                Send a message
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[11px] text-muted-foreground">
                    Your name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eleanor Vance"
                    className="mt-1 h-10 w-full border border-border bg-background px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor@example.com"
                    className="mt-1 h-10 w-full border border-border bg-background px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-muted-foreground">Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="mt-1 h-10 w-full border border-border bg-background px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <option value="Order inquiry">Order inquiry or shipping</option>
                  <option value="Product recommendation">
                    Object sizing &amp; material question
                  </option>
                  <option value="Trade program">Trade &amp; design program</option>
                  <option value="Press / Editorial">Press &amp; maker note</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-muted-foreground">
                  Your note
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you today?"
                  className="mt-1 w-full border border-border bg-background p-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="mt-2 flex h-11 items-center justify-center gap-3 bg-primary text-xs font-medium text-primary-foreground hover:opacity-90"
              >
                Send message
                <ArrowRightIcon />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
