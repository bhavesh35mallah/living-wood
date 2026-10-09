import { useShopStore } from "@/lib/store";
import { CircleCheckIcon, XIcon } from "./icons";

export function ToastContainer() {
  const { toasts, removeToast } = useShopStore();

  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notifications"
      className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col gap-2"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 border border-border bg-background px-4 py-3 text-xs text-foreground shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2"
          role="status"
        >
          <CircleCheckIcon className="text-primary" size={16} />
          <span className="font-medium">{toast.message}</span>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss notification"
          >
            <XIcon size={14} />
          </button>
        </div>
      ))}
    </aside>
  );
}
