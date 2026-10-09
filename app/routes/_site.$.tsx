import { Link, useLocation } from "react-router";

import { ArrowRightIcon } from "@/components/site/icons";

export function meta() {
  return [{ title: "Coming soon · Form & Field" }];
}

export default function PlaceholderRoute() {
  const { pathname } = useLocation();
  const name = pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, " ");

  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center gap-5 bg-muted px-6 py-24 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
        {name}
      </p>
      <h1 className="font-display text-5xl leading-none text-foreground">
        This page is still being made.
      </h1>
      <p className="max-w-md text-[15px] leading-[1.8] text-muted-foreground">
        Keep prompting to fill in this page with the content you want.
      </p>
      <Link
        to="/"
        className="mt-2 flex h-12 items-center gap-6 rounded-sm bg-primary px-6 text-[13px] font-medium text-primary-foreground"
      >
        Back to the shop
        <ArrowRightIcon />
      </Link>
    </section>
  );
}
