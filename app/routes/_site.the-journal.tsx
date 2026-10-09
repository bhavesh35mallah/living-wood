import { useState } from "react";
import { articles } from "@/data/catalog";
import { useShopStore } from "@/lib/store";

export function meta() {
  return [
    { title: "The Journal · Form & Field" },
    {
      name: "description",
      content:
        "Notes on quiet craft, tactile living, and the rituals of the everyday.",
    },
  ];
}

export default function TheJournalRoute() {
  const { openArticle } = useShopStore();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = articles.filter(
    (a) => selectedCategory === "all" || a.category === selectedCategory
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-12 md:py-20">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-border pb-8">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          Form &amp; Field · Publication
        </span>
        <h1 className="font-display text-4xl font-medium text-foreground sm:text-6xl md:text-7xl">
          The Journal
        </h1>
        <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
          Notes on an unhurried morning, gatherings around solid oak, and the
          enduring beauty of natural materials.
        </p>

        {/* Filter chips */}
        <div className="mt-4 flex gap-2 overflow-x-auto text-xs">
          {["all", "At home", "Living well", "Material matters"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3.5 py-1 transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground font-medium"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === "all" ? "All essays" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
        {filtered.map((article) => (
          <article
            key={article.id}
            className="group flex cursor-pointer flex-col gap-4"
            onClick={() => openArticle(article)}
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={article.src}
                alt={article.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="font-medium uppercase tracking-wider text-primary">
                {article.category}
              </span>
              <span>{article.time}</span>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-display text-2xl leading-snug text-foreground group-hover:underline sm:text-3xl">
                {article.title}
              </h2>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {article.text}
              </p>
            </div>

            <span className="inline-block text-xs font-medium text-primary underline underline-offset-4">
              Read the story →
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
