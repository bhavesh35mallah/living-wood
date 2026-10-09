import { Link, NavLink } from "react-router";
import { useShopStore } from "@/lib/store";

import {
  BagIcon,
  ChevronDownIcon,
  HeartIcon,
  InstagramIcon,
  MenuIcon,
  SearchIcon,
  ShieldIcon,
  SparklesIcon,
  UserIcon,
} from "./icons";

export const departments = [
  { label: "Festive edit ✨", to: "/festive" },
  { label: "New arrivals", to: "/new-arrivals" },
  { label: "Shop all", to: "/shop-all" },
  { label: "Home & living", to: "/home-living" },
  { label: "Table & kitchen", to: "/table-kitchen" },
  { label: "Textiles", to: "/textiles" },
  { label: "Objects & gifts", to: "/objects-gifts" },
  { label: "Our story", to: "/our-story" },
  { label: "The journal", to: "/the-journal" },
];

const footerGroups = [
  {
    title: "EXPLORE",
    links: [
      { label: "Festive & Holiday edit ✨", to: "/festive" },
      { label: "New arrivals", to: "/new-arrivals" },
      { label: "Home & living", to: "/home-living" },
      { label: "Table & kitchen", to: "/table-kitchen" },
      { label: "Textiles", to: "/textiles" },
      { label: "Objects & gifts", to: "/objects-gifts" },
      { label: "Gift cards", to: "/gift-cards" },
    ],
  },
  {
    title: "HERE TO HELP",
    links: [
      { label: "Contact us", to: "/contact-us" },
      { label: "Shipping & returns", to: "/shipping-returns" },
      { label: "Order tracking", to: "/order-tracking" },
      { label: "Care guide", to: "/care-guide" },
      { label: "FAQs", to: "/faqs" },
    ],
  },
  {
    title: "FORM & FIELD",
    links: [
      { label: "Our story", to: "/our-story" },
      { label: "Our makers", to: "/our-makers" },
      { label: "Our commitments", to: "/our-commitments" },
      { label: "The journal", to: "/the-journal" },
      { label: "Trade program", to: "/trade-program" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy policy", to: "/privacy-policy" },
  { label: "Terms of service", to: "/terms-of-service" },
  { label: "Accessibility", to: "/accessibility" },
];

const payments = ["VISA", "Mastercard", "AMEX", "Apple Pay"];

export function SiteHeader() {
  const {
    cart,
    wishlist,
    openCart,
    openWishlist,
    openSearch,
    openMobileMenu,
    openChatbot,
    user,
  } = useShopStore();
  const totalCartItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  const totalWishlistItems = wishlist.length;

  return (
    <header>
      <div className="flex min-h-8 items-center justify-center bg-primary px-4 py-2 text-center text-[11px] text-primary-foreground">
        <span>
          Thoughtfully chosen. Beautifully lived in.
          <span className="hidden sm:inline">
            {"  ·  "}Complimentary shipping on orders $100+
          </span>
        </span>
      </div>

      <div className="flex h-20 items-center justify-between px-4 md:h-[98px] md:px-16">
        <div className="flex items-center gap-3 md:w-[300px]">
          <button
            type="button"
            onClick={openMobileMenu}
            aria-label="Open mobile menu"
            className="flex size-9 items-center justify-center text-foreground hover:text-primary md:hidden"
          >
            <MenuIcon size={22} />
          </button>

          <button
            type="button"
            onClick={openSearch}
            className="flex items-center gap-2.5 text-left text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Search the shop"
          >
            <SearchIcon className="text-primary" />
            <span className="hidden md:inline">Find something lovely</span>
            <kbd className="hidden rounded border border-border bg-muted/70 px-1.5 py-0.5 text-[10px] text-muted-foreground lg:inline-block">
              ⌘K
            </kbd>
          </button>
        </div>

        <Link to="/" className="flex flex-col items-center gap-1">
          <span className="font-display text-[26px] font-medium leading-none text-foreground sm:text-3xl md:text-4xl">
            FORM &amp; FIELD
          </span>
          <span className="hidden text-[9px] tracking-[0.18em] text-muted-foreground sm:block">
            OBJECTS FOR EVERYDAY LIVING
          </span>
        </Link>

        <div className="flex items-center justify-end gap-3.5 text-primary md:w-[300px] md:gap-5">
          <button
            type="button"
            onClick={() => openChatbot()}
            aria-label="Open Atelier Concierge"
            title="Ask Concierge"
            className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors py-1 px-2 rounded-full border border-border/80 hover:border-primary/50"
          >
            <SparklesIcon size={14} className="text-primary" />
            <span className="text-[11px] font-medium uppercase tracking-wider">Concierge</span>
          </button>

          <Link
            to={user?.role === "admin" ? "/admin" : "/account"}
            aria-label="Admin Dashboard"
            title="Admin Dashboard"
            className="hidden lg:block text-muted-foreground hover:text-primary transition-colors text-[11px] uppercase tracking-wider font-medium"
          >
            {user?.role === "admin" ? "Admin" : ""}
          </Link>

          <Link
            to="/account"
            aria-label={user ? `Account (${user.name})` : "Sign in / Account"}
            title={user ? user.name : "Account"}
            className="hidden sm:block hover:opacity-80 transition-opacity"
          >
            <UserIcon />
          </Link>

          <button
            type="button"
            onClick={openWishlist}
            aria-label={`Saved items (${totalWishlistItems})`}
            className="relative hidden sm:block hover:opacity-80 transition-opacity"
          >
            <HeartIcon />
            {totalWishlistItems > 0 && (
              <span className="absolute -right-2 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {totalWishlistItems}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Shopping bag (${totalCartItems} items)`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <BagIcon />
            <span className="text-xs text-foreground">
              <span className="hidden sm:inline">Bag </span>({totalCartItems})
            </span>
          </button>
        </div>
      </div>

      <nav
        aria-label="Shop departments"
        className="overflow-x-auto border-y border-border"
      >
        <ul className="mx-auto flex h-14 w-max min-w-full items-center justify-center gap-[38px] px-5 text-[13px] text-foreground">
          {departments.map((item) => (
            <li key={item.to} className="shrink-0">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  "whitespace-nowrap transition-colors hover:text-primary" +
                  (isActive ? " underline underline-offset-8" : "")
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const { currency, setCurrency, openChatbot } = useShopStore();

  function toggleCurrency() {
    if (currency === "USD") setCurrency("EUR");
    else if (currency === "EUR") setCurrency("GBP");
    else setCurrency("USD");
  }
  return (
    <footer className="px-5 pb-7 pt-12 md:px-16 md:pt-16">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[330px_repeat(3,minmax(0,1fr))_200px] lg:gap-x-8">
        <div className="col-span-2 flex flex-col items-start gap-[18px] lg:col-span-1">
          <span className="font-display text-[34px] font-medium leading-none text-foreground">
            FORM &amp; FIELD
          </span>
          <p className="max-w-[282px] text-[13px] leading-[1.8] text-muted-foreground">
            Thoughtfully chosen objects for the home, and the everyday moments
            within it.
          </p>
          <div className="flex items-center gap-[18px] pt-1.5 text-primary">
            <a href="https://instagram.com" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a
              href="https://pinterest.com"
              aria-label="Pinterest"
              className="font-display text-[25px] font-semibold leading-none"
            >
              p
            </a>
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-[18px]">
            <h2 className="text-[10px] font-medium tracking-[0.12em] text-primary">
              {group.title}
            </h2>
            <ul className="flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 flex flex-col items-start gap-[18px] lg:col-span-1">
          <h2 className="text-[10px] font-medium tracking-[0.12em] text-primary">
            LET’S TALK
          </h2>
          <button
            type="button"
            onClick={() => openChatbot()}
            className="flex items-center gap-1.5 text-xs text-primary hover:opacity-80 font-medium transition-opacity"
          >
            <SparklesIcon size={14} />
            <span>Chat with Concierge</span>
          </button>
          <a
            href="mailto:hello@formandfield.com"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            hello@formandfield.com
          </a>
          <p className="text-xs leading-[1.8] text-muted-foreground">
            Monday–Friday, 9am–5pm
            <br />
            We’re always happy to help.
          </p>
          <button
            type="button"
            onClick={toggleCurrency}
            aria-label="Change currency"
            className="flex items-center gap-2 text-[11px] text-primary transition-opacity hover:opacity-80"
          >
            {currency === "USD"
              ? "United States · USD $"
              : currency === "EUR"
              ? "European Union · EUR €"
              : "United Kingdom · GBP £"}
            <ChevronDownIcon />
          </button>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
        <p className="text-[10px] text-muted-foreground">
          © 2026 Form &amp; Field. Made for living.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legalLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-[10px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-2">
          {payments.map((name) => (
            <li
              key={name}
              className="flex h-[23px] items-center rounded-sm border border-border px-2 text-[8px] font-semibold text-muted-foreground"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
