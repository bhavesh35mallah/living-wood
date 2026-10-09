import { Link, NavLink } from "react-router";
import { useShopStore } from "@/lib/store";
import { departments } from "./SiteShell";
import {
  ChevronDownIcon,
  LogOutIcon,
  SearchIcon,
  ShieldIcon,
  UserIcon,
  XIcon,
} from "./icons";

export function MobileMenuDrawer() {
  const {
    isMobileMenuOpen,
    closeMobileMenu,
    openSearch,
    user,
    logout,
    currency,
    setCurrency,
  } = useShopStore();

  if (!isMobileMenuOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-start bg-black/40 backdrop-blur-xs transition-opacity md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      onClick={closeMobileMenu}
    >
      <div
        className="flex h-full w-[310px] max-w-[85vw] flex-col bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="font-display text-2xl font-medium text-foreground"
          >
            FORM &amp; FIELD
          </Link>
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close menu"
            className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Quick Search trigger */}
        <div className="border-b border-border p-4">
          <button
            type="button"
            onClick={() => {
              closeMobileMenu();
              openSearch();
            }}
            className="flex h-10 w-full items-center gap-3 border border-border bg-muted/40 px-3 text-xs text-muted-foreground"
          >
            <SearchIcon size={16} className="text-primary" />
            <span>Search objects, linen, ceramics...</span>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              Departments
            </span>
            <ul className="mt-2 flex flex-col divide-y divide-border/60">
              {departments.map((dept) => (
                <li key={dept.to}>
                  <NavLink
                    to={dept.to}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      "flex py-2.5 text-sm transition-colors " +
                      (isActive
                        ? "font-medium text-primary underline underline-offset-4"
                        : "text-foreground hover:text-primary")
                    }
                  >
                    {dept.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-1 border-t border-border pt-4">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              Pages &amp; Stories
            </span>
            <ul className="mt-2 flex flex-col gap-2.5 text-xs text-muted-foreground">
              <li>
                <Link
                  to="/our-story"
                  onClick={closeMobileMenu}
                  className="hover:text-foreground"
                >
                  Our story &amp; makers
                </Link>
              </li>
              <li>
                <Link
                  to="/the-journal"
                  onClick={closeMobileMenu}
                  className="hover:text-foreground"
                >
                  The journal
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  onClick={closeMobileMenu}
                  className="hover:text-foreground"
                >
                  Contact &amp; Help
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-returns"
                  onClick={closeMobileMenu}
                  className="hover:text-foreground"
                >
                  Shipping &amp; returns
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 font-medium text-primary hover:underline"
                >
                  <ShieldIcon size={14} />
                  <span>Admin Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Account & Currency footer */}
        <div className="border-t border-border bg-muted/40 p-5">
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Link
                  to="/account"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 text-xs font-medium text-foreground hover:text-primary"
                >
                  <UserIcon size={16} />
                  <span>{user.name}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  aria-label="Sign out"
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  <LogOutIcon size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="flex h-9 flex-1 items-center justify-center border border-border bg-background text-xs font-medium text-foreground"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="flex h-9 flex-1 items-center justify-center bg-primary text-xs font-medium text-primary-foreground"
              >
                Join
              </Link>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <span className="text-[11px] text-muted-foreground">Currency</span>
            <button
              type="button"
              onClick={() => {
                const next =
                  currency === "USD"
                    ? "EUR"
                    : currency === "EUR"
                    ? "GBP"
                    : "USD";
                setCurrency(next);
              }}
              className="flex items-center gap-1.5 text-xs text-primary"
            >
              <span>{currency}</span>
              <ChevronDownIcon size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
