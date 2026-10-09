import { Link } from "react-router";
import { ArrowRightIcon } from "@/components/site/icons";
import { img } from "@/data/catalog";

export function meta() {
  return [
    { title: "Our Story · Form & Field" },
    {
      name: "description",
      content:
        "Fewer things, better stories. Meet our founders and the independent European artisan workshops behind Form & Field.",
    },
  ];
}

export default function OurStoryRoute() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 md:px-12 md:py-20">
      {/* Header */}
      <div className="flex flex-col gap-3 text-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          Form &amp; Field · Origins
        </span>
        <h1 className="font-display text-4xl font-medium text-foreground sm:text-6xl md:text-7xl">
          Fewer things.
          <br />
          Better stories.
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          We started Form &amp; Field with a simple conviction: the objects we
          live with every day should earn their place in our homes.
        </p>
      </div>

      {/* Hero Visual */}
      <div className="mt-12 overflow-hidden bg-muted">
        <img
          src={img("1c1fbb302f05b0719881159f71e061a66c30b30a", 1600)}
          alt="Ceramicist in Portugal shaping stoneware clay"
          className="h-[380px] w-full object-cover sm:h-[520px]"
        />
        <div className="flex flex-wrap justify-between border-t border-border bg-background p-4 text-[10px] text-muted-foreground">
          <span>PORTUGAL CERAMIC ATELIER</span>
          <span>ESTABLISHED 1982 · WHEEL-THROWN STONEWARE</span>
        </div>
      </div>

      {/* Editorial Essay */}
      <div className="mx-auto mt-16 max-w-2xl space-y-6 text-sm leading-relaxed text-foreground/90">
        <h2 className="font-display text-3xl text-foreground">
          A reaction against the disposable
        </h2>
        <p>
          Too much modern homeware is designed for the scroll rather than the
          shelf. It arrives wrapped in layers of non-recyclable plastic, looks
          passable from across a room, and falls apart after half a dozen
          washes.
        </p>
        <p>
          We wanted something fundamentally different: objects that feel
          grounded, substantial, and quietly beautiful. Pieces that gain
          richness through everyday touch—stoneware that warms your palms on a
          brisk morning, European flax linen that softens with every wash, and
          solid oak boards that carry the pleasant marks of shared meals.
        </p>

        <div className="border-l-2 border-primary my-8 pl-6 italic font-display text-2xl text-foreground">
          “When you purchase something made with care, you inherit the patience
          of the person who made it.”
        </div>

        <h2 className="font-display text-3xl text-foreground pt-4">
          Independent Workshops, Generational Skill
        </h2>
        <p>
          We travel directly to family-owned potteries in Porto, linen mills in
          Flanders, and woodturners in the Black Forest. We know our makers by
          name. We work within their production cycles rather than forcing
          unsustainable factory deadlines.
        </p>
        <p>
          This means our collections are released in small, deliberate batches.
          When a piece sells out, we wait patiently for the kiln to fire again
          rather than cutting corners.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="mt-20 border-t border-border pt-12">
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-primary">
          Our Commitments
        </span>
        <h2 className="mt-1 font-display text-3xl font-medium text-foreground sm:text-4xl">
          Principles that guide every piece
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="font-display text-2xl text-foreground">
              01 · Honest Materials
            </span>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Only pure stoneware clay, certified European flax, sustainably
              harvested white oak, and clean apiary beeswax. No synthetic blends
              or petroleum wax.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-display text-2xl text-foreground">
              02 · Fair Craftsmanship
            </span>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Fair living wages, safe workshop conditions, and preservation of
              traditional ceramic and weaving heritage across Europe.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-display text-2xl text-foreground">
              03 · Mindful Packaging
            </span>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Every parcel is protected with 100% recyclable molded paper pulp,
              unbleached cardboard, and kraft paper tape. Zero single-use
              plastics.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="mt-20 flex flex-col items-center justify-center gap-4 border border-border bg-muted/40 p-10 text-center">
        <h3 className="font-display text-3xl text-foreground">
          Discover the pieces in our autumn edit
        </h3>
        <p className="max-w-md text-xs text-muted-foreground">
          Explore everyday stoneware, flax cushion covers, and considered
          objects for your home.
        </p>
        <Link
          to="/shop-all"
          className="mt-2 inline-flex h-11 items-center gap-3 bg-primary px-6 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          Explore all objects
          <ArrowRightIcon />
        </Link>
      </div>
    </div>
  );
}
