import { useShopStore } from "@/lib/store";
import { ArrowRightIcon, XIcon } from "./icons";

export function ArticleModal() {
  const { activeArticle, closeArticle, openSearch } = useShopStore();

  if (!activeArticle) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={activeArticle.title}
      onClick={closeArticle}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeArticle}
          aria-label="Close story"
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-xs transition-colors hover:bg-background"
        >
          <XIcon size={18} />
        </button>

        {/* Hero image */}
        <div className="relative h-64 w-full bg-muted">
          <img
            src={activeArticle.src}
            alt={activeArticle.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="overflow-y-auto p-6 md:p-8">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="font-medium uppercase tracking-widest text-primary">
              {activeArticle.category}
            </span>
            <span>{activeArticle.time}</span>
          </div>

          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-foreground sm:text-4xl">
            {activeArticle.title}
          </h2>

          <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
            {activeArticle.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-8 border-t border-border pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-lg text-foreground">
                  Form &amp; Field Journal
                </p>
                <p className="text-xs text-muted-foreground">
                  Stories on quiet craft, tactile living, and everyday rituals.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  closeArticle();
                  openSearch();
                }}
                className="flex h-10 items-center justify-center gap-2 rounded-sm bg-primary px-5 text-xs font-medium text-primary-foreground hover:opacity-90"
              >
                Browse related pieces
                <ArrowRightIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
