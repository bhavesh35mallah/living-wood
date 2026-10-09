import { useShopStore } from "@/lib/store";
import { ArrowRightIcon, HeartIcon, TrashIcon, XIcon } from "./icons";

export function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    closeWishlist,
    toggleWishlist,
    addItem,
  } = useShopStore();

  if (!isWishlistOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[2px] transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Saved pieces"
      onClick={closeWishlist}
    >
      <div
        className="flex h-full w-full max-w-[440px] flex-col bg-background shadow-2xl transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-baseline gap-2">
            <h2 className="font-display text-2xl font-medium text-foreground">
              Saved pieces
            </h2>
            <span className="text-xs text-muted-foreground">
              ({wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"})
            </span>
          </div>
          <button
            type="button"
            onClick={closeWishlist}
            aria-label="Close wishlist"
            className="flex size-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {wishlist.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-muted text-primary">
                <HeartIcon size={24} />
              </div>
              <span className="font-display text-3xl text-muted-foreground">
                No saved pieces yet
              </span>
              <p className="max-w-[260px] text-xs leading-relaxed text-muted-foreground">
                Tap the heart on any object while browsing to curate your own
                personal collection.
              </p>
              <button
                type="button"
                onClick={closeWishlist}
                className="mt-2 flex h-10 items-center gap-3 rounded-sm bg-primary px-5 text-xs font-medium text-primary-foreground"
              >
                Browse the shop
                <ArrowRightIcon />
              </button>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {wishlist.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="size-20 shrink-0 bg-muted object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg leading-tight text-foreground">
                          {item.title}
                        </h3>
                        <span className="text-xs font-medium text-foreground">
                          ${item.price}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          addItem({
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            src: item.src,
                            detail: item.detail,
                          });
                        }}
                        className="flex h-7 items-center gap-2 border border-primary px-3 text-[11px] font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        Move to bag
                        <ArrowRightIcon size={12} />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleWishlist(item)}
                        aria-label={`Remove ${item.title}`}
                        className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive"
                      >
                        <TrashIcon size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer actions */}
        {wishlist.length > 0 && (
          <div className="border-t border-border bg-background p-6">
            <button
              type="button"
              onClick={() => {
                wishlist.forEach((item) => {
                  addItem({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    src: item.src,
                    detail: item.detail,
                  });
                });
                closeWishlist();
              }}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-sm bg-primary text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Add all pieces to bag
              <ArrowRightIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
