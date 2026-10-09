import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRightIcon,
  DownloadIcon,
  FileTextIcon,
  HeartIcon,
  LogOutIcon,
  MapPinIcon,
  PackageCheckIcon,
  PlusIcon,
  ShieldIcon,
  ShoppingBagIcon,
  TrashIcon,
  UserIcon,
} from "@/components/site/icons";
import { useShopStore } from "@/lib/store";

export function meta() {
  return [{ title: "My Account · Form & Field" }];
}

export default function AccountRoute() {
  const {
    user,
    logout,
    wishlist,
    addItem,
    toggleWishlist,
    updateUser,
    addAddress,
    deleteAddress,
    openReceipt,
  } = useShopStore();

  const [activeTab, setActiveTab] = useState<
    "orders" | "wishlist" | "addresses" | "profile"
  >("orders");

  // Profile form state
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profileEmail, setProfileEmail] = useState(user?.email || "");
  const [profilePhone, setProfilePhone] = useState(user?.phone || "");

  // New address state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZip, setNewZip] = useState("");

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 py-20 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted text-primary">
          <UserIcon size={24} />
        </div>
        <h1 className="mt-4 font-display text-4xl font-medium text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          View your order history, manage addresses, and view your personal
          saved collection.
        </p>
        <div className="mt-6 flex w-full flex-col gap-3">
          <Link
            to="/login"
            className="flex h-11 w-full items-center justify-center gap-2 bg-primary text-xs font-medium text-primary-foreground"
          >
            Sign in
            <ArrowRightIcon />
          </Link>
          <Link
            to="/register"
            className="flex h-11 w-full items-center justify-center border border-border text-xs font-medium text-foreground hover:bg-muted"
          >
            Create an account
          </Link>
        </div>
      </div>
    );
  }

  function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    updateUser({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
    });
  }

  function handleAddAddress(e: React.FormEvent) {
    e.preventDefault();
    if (!newStreet || !newCity || !newZip) return;
    addAddress({
      label: newLabel || "Alternate Address",
      street: newStreet,
      city: newCity,
      state: newState || "OR",
      zip: newZip,
      isDefault: false,
    });
    setShowAddressModal(false);
    setNewLabel("");
    setNewStreet("");
    setNewCity("");
    setNewZip("");
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-12 md:py-16">
      {/* Account Hero Bar */}
      <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-primary">
            Customer Profile
          </span>
          <h1 className="mt-1 font-display text-4xl font-medium text-foreground sm:text-5xl">
            {user.name}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {user.email} · Member since {user.joinedDate}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {user.role === "admin" && (
            <Link
              to="/admin"
              className="flex h-9 items-center gap-2 border border-primary bg-primary/5 px-4 text-xs font-medium text-primary hover:bg-primary/10"
            >
              <ShieldIcon size={14} />
              <span>Admin Panel</span>
            </Link>
          )}

          <button
            type="button"
            onClick={logout}
            className="flex h-9 items-center gap-2 border border-border px-4 text-xs text-muted-foreground hover:text-foreground"
          >
            <LogOutIcon size={14} />
            <span>Sign out</span>
          </button>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="mt-8 flex gap-6 overflow-x-auto border-b border-border text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 border-b-2 pb-3 font-medium transition-colors ${
            activeTab === "orders"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <ShoppingBagIcon size={15} />
          <span>Orders ({user.orders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("wishlist")}
          className={`flex items-center gap-2 border-b-2 pb-3 font-medium transition-colors ${
            activeTab === "wishlist"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <HeartIcon size={15} />
          <span>Saved pieces ({wishlist.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("addresses")}
          className={`flex items-center gap-2 border-b-2 pb-3 font-medium transition-colors ${
            activeTab === "addresses"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <MapPinIcon size={15} />
          <span>Addresses ({user.addresses.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 border-b-2 pb-3 font-medium transition-colors ${
            activeTab === "profile"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <UserIcon size={15} />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === "orders" && (
        <div className="mt-8">
          {user.orders.length === 0 ? (
            <div className="py-16 text-center">
              <PackageCheckIcon size={32} className="mx-auto text-primary" />
              <h2 className="mt-3 font-display text-2xl text-foreground">
                No orders yet
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Your future orders and shipment updates will appear here.
              </p>
              <Link
                to="/shop-all"
                className="mt-4 inline-flex h-10 items-center gap-2 bg-primary px-5 text-xs font-medium text-primary-foreground"
              >
                Browse catalog
                <ArrowRightIcon size={14} />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {user.orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-border bg-background p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Order Number
                        </span>
                        <p className="font-display text-lg font-medium text-foreground">
                          {order.id}
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Date Placed
                        </span>
                        <p className="text-xs text-foreground">{order.date}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Total
                        </span>
                        <p className="text-xs font-semibold text-foreground">
                          ${order.total}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => openReceipt(order)}
                        className="flex items-center gap-1.5 px-3 py-1 text-xs border border-border text-foreground hover:border-primary hover:text-primary transition-colors rounded-xs"
                        title="View & Download Receipt"
                      >
                        <FileTextIcon size={14} />
                        <span>Receipt</span>
                      </button>

                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                          order.status === "Delivered"
                            ? "bg-primary/10 text-primary"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {order.trackingNumber}
                      </span>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="mt-4 flex flex-col divide-y divide-border/60">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 py-3">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="size-16 shrink-0 bg-muted object-cover"
                        />
                        <div className="flex flex-1 items-center justify-between">
                          <div>
                            <h3 className="font-display text-base text-foreground">
                              {item.title}
                            </h3>
                            <p className="text-[11px] text-muted-foreground">
                              Variant: {item.swatchName} · Qty: {item.quantity}
                            </p>
                          </div>
                          <span className="text-xs font-medium text-foreground">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Wishlist */}
      {activeTab === "wishlist" && (
        <div className="mt-8">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center">
              <HeartIcon size={32} className="mx-auto text-primary" />
              <h2 className="mt-3 font-display text-2xl text-foreground">
                Your wishlist is empty
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Tap the heart on any object while browsing to curate your
                collection.
              </p>
              <Link
                to="/shop-all"
                className="mt-4 inline-flex h-10 items-center gap-2 bg-primary px-5 text-xs font-medium text-primary-foreground"
              >
                Explore shop
                <ArrowRightIcon size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col border border-border bg-background p-4"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-muted">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                    />
                    <button
                      type="button"
                      onClick={() => toggleWishlist(item)}
                      aria-label="Remove from wishlist"
                      className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background text-primary shadow-xs"
                    >
                      <TrashIcon size={15} />
                    </button>
                  </div>

                  <div className="mt-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-xl text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      ${item.price}
                    </span>
                  </div>

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
                    className="mt-4 flex h-10 w-full items-center justify-center gap-2 bg-primary text-xs font-medium text-primary-foreground hover:opacity-90"
                  >
                    <PlusIcon size={14} />
                    <span>Move to bag</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Addresses */}
      {activeTab === "addresses" && (
        <div className="mt-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="font-display text-2xl text-foreground">
              Shipping &amp; Delivery Addresses
            </h2>
            <button
              type="button"
              onClick={() => setShowAddressModal(true)}
              className="flex items-center gap-2 bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
            >
              <PlusIcon size={14} />
              <span>Add address</span>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {user.addresses.map((addr) => (
              <div
                key={addr.id}
                className="relative flex flex-col justify-between border border-border bg-background p-5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-medium text-foreground">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {addr.street}
                    <br />
                    {addr.city}, {addr.state} {addr.zip}
                    <br />
                    United States
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-end border-t border-border pt-3">
                  <button
                    type="button"
                    onClick={() => deleteAddress(addr.id)}
                    className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive"
                  >
                    <TrashIcon size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for adding address */}
          {showAddressModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
              onClick={() => setShowAddressModal(false)}
            >
              <div
                className="w-full max-w-md bg-background p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-display text-2xl text-foreground">
                  Add shipping address
                </h3>
                <form
                  onSubmit={handleAddAddress}
                  className="mt-4 flex flex-col gap-3"
                >
                  <div>
                    <label className="text-[11px] text-muted-foreground">
                      Label (e.g. Home, Studio)
                    </label>
                    <input
                      type="text"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      placeholder="Home"
                      className="mt-1 h-9 w-full border border-border px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      placeholder="123 Country Road"
                      className="mt-1 h-9 w-full border border-border px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-[11px] text-muted-foreground">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="Portland"
                        className="mt-1 h-9 w-full border border-border px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={newZip}
                        onChange={(e) => setNewZip(e.target.value)}
                        placeholder="97201"
                        className="mt-1 h-9 w-full border border-border px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddressModal(false)}
                      className="border border-border px-4 py-2 text-xs text-muted-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
                    >
                      Save address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Profile Settings */}
      {activeTab === "profile" && (
        <div className="mt-8 max-w-lg">
          <form
            onSubmit={handleProfileSave}
            className="flex flex-col gap-4 border border-border bg-background p-6"
          >
            <h2 className="font-display text-2xl text-foreground">
              Personal Information
            </h2>
            <div>
              <label className="text-[11px] text-muted-foreground">
                Display name
              </label>
              <input
                type="text"
                required
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
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
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                className="mt-1 h-10 w-full border border-border bg-background px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground">
                Phone number
              </label>
              <input
                type="tel"
                value={profilePhone}
                onChange={(e) => setProfilePhone(e.target.value)}
                className="mt-1 h-10 w-full border border-border bg-background px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="mt-2 flex h-11 items-center justify-center bg-primary text-xs font-medium text-primary-foreground hover:opacity-90"
            >
              Update profile
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
