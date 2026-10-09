import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRightIcon,
  CircleCheckIcon,
  FileTextIcon,
  PlusIcon,
  ShieldIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "@/components/site/icons";
import type { Product } from "@/data/catalog";
import { useShopStore } from "@/lib/store";

export function meta() {
  return [{ title: "Store Administration · Form & Field" }];
}

export default function AdminDashboardRoute() {
  const {
    inventoryProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    adminOrders,
    updateAdminOrderStatus,
    openReceipt,
  } = useShopStore();

  const [activeTab, setActiveTab] = useState<"products" | "orders" | "promos">(
    "products"
  );

  // New product form modal state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDept, setFormDept] = useState<Product["department"]>("Table & kitchen");
  const [formBadge, setFormBadge] = useState("NEW ARRIVAL");
  const [formDetail, setFormDetail] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState(
    "https://api.builder.io/api/v1/image/assets/TEMP/d834ef582834500abb396ba536c15230520f607d?width=620"
  );

  const totalRevenue = adminOrders.reduce((acc, o) => acc + o.total, 0) + 14200;
  const activeOrdersCount = adminOrders.filter(
    (o) => o.status === "Processing" || o.status === "In Transit"
  ).length;

  function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!formTitle || !formPrice) return;
    const newProd: Product = {
      id: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: formTitle,
      price: Number(formPrice),
      department: formDept,
      badge: formBadge,
      detail: formDetail || `${formDept} · Natural`,
      description:
        formDesc ||
        "Carefully crafted by independent artisans using honest and natural materials.",
      rating: "5.0",
      reviewCount: 1,
      src: formImage,
      swatches: [{ hex: "#DBD3C2", name: "Natural Sand" }],
      tags: ["new"],
      materials: "Sustainably sourced natural materials",
      origin: "Porto, Portugal",
      dimensions: "Standard atelier dimensions",
    };
    addProduct(newProd);
    setShowAddProduct(false);
    setFormTitle("");
    setFormPrice("");
    setFormDetail("");
    setFormDesc("");
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-12 md:py-14">
      {/* Admin Title Bar */}
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <ShieldIcon size={22} />
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              Management Portal
            </span>
            <h1 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
              Store Administration
            </h1>
          </div>
        </div>

        <Link
          to="/"
          className="flex h-10 items-center gap-2 border border-border px-4 text-xs font-medium text-foreground hover:bg-muted"
        >
          <span>View Live Storefront</span>
          <ArrowRightIcon size={14} />
        </Link>
      </div>

      {/* KPI Overview Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="border border-border bg-background p-5">
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
            Total Gross Revenue
          </span>
          <p className="mt-2 font-display text-3xl font-medium text-foreground">
            ${totalRevenue.toLocaleString()}
          </p>
          <span className="mt-1 inline-block text-[11px] text-primary">
            +14.2% vs last month
          </span>
        </div>

        <div className="border border-border bg-background p-5">
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
            Active Fulfillment
          </span>
          <p className="mt-2 font-display text-3xl font-medium text-foreground">
            {activeOrdersCount} orders
          </p>
          <span className="mt-1 inline-block text-[11px] text-muted-foreground">
            Needs dispatch review
          </span>
        </div>

        <div className="border border-border bg-background p-5">
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
            Live Catalog Objects
          </span>
          <p className="mt-2 font-display text-3xl font-medium text-foreground">
            {inventoryProducts.length} items
          </p>
          <span className="mt-1 inline-block text-[11px] text-primary">
            100% in stock
          </span>
        </div>

        <div className="border border-border bg-background p-5">
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
            Free Shipping Rate
          </span>
          <p className="mt-2 font-display text-3xl font-medium text-foreground">
            $100 threshold
          </p>
          <span className="mt-1 inline-block text-[11px] text-primary">
            Promos active (AUTUMN10)
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="mt-10 flex gap-6 border-b border-border text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("products")}
          className={`border-b-2 pb-3 font-medium transition-colors ${
            activeTab === "products"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Catalog &amp; Inventory ({inventoryProducts.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className={`border-b-2 pb-3 font-medium transition-colors ${
            activeTab === "orders"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Customer Orders ({adminOrders.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("promos")}
          className={`border-b-2 pb-3 font-medium transition-colors ${
            activeTab === "promos"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Promotions &amp; Settings
        </button>
      </div>

      {/* Tab 1: Products */}
      {activeTab === "products" && (
        <div className="mt-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h2 className="font-display text-2xl text-foreground">
                Catalog Inventory
              </h2>
              <p className="text-xs text-muted-foreground">
                Manage live pieces, retail prices, departments, and badges.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddProduct(true)}
              className="flex items-center gap-2 bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
            >
              <PlusIcon size={14} />
              <span>Add new object</span>
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="py-3 px-4">Piece</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Badge</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {inventoryProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.src}
                          alt={p.title}
                          className="size-12 shrink-0 bg-muted object-cover"
                        />
                        <div>
                          <p className="font-display text-base text-foreground">
                            {p.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {p.detail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {p.department}
                    </td>
                    <td className="py-3 px-4 font-semibold text-foreground">
                      ${p.price}
                    </td>
                    <td className="py-3 px-4">
                      <span className="rounded-sm bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary">
                        {p.badge}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => deleteProduct(p.id)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label={`Delete ${p.title}`}
                      >
                        <TrashIcon size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Product Modal */}
          {showAddProduct && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
              onClick={() => setShowAddProduct(false)}
            >
              <div
                className="w-full max-w-lg bg-background p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-display text-2xl text-foreground">
                  Add new object to catalog
                </h3>
                <form
                  onSubmit={handleCreateProduct}
                  className="mt-4 flex flex-col gap-3"
                >
                  <div>
                    <label className="text-[11px] text-muted-foreground">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. Stoneware Butter Dish"
                      className="mt-1 h-9 w-full border border-border px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-muted-foreground">
                        Price ($ USD)
                      </label>
                      <input
                        type="number"
                        required
                        value={formPrice}
                        onChange={(e) => setFormPrice(e.target.value)}
                        placeholder="38"
                        className="mt-1 h-9 w-full border border-border px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground">
                        Department
                      </label>
                      <select
                        value={formDept}
                        onChange={(e) =>
                          setFormDept(e.target.value as Product["department"])
                        }
                        className="mt-1 h-9 w-full border border-border bg-background px-3 text-xs outline-none"
                      >
                        <option value="Home & living">Home & living</option>
                        <option value="Table & kitchen">Table & kitchen</option>
                        <option value="Textiles">Textiles</option>
                        <option value="Objects & gifts">Objects & gifts</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-muted-foreground">
                      Badge
                    </label>
                    <input
                      type="text"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                      placeholder="BESTSELLER / NEW ARRIVAL"
                      className="mt-1 h-9 w-full border border-border px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-muted-foreground">
                      Subtitle / Materials summary
                    </label>
                    <input
                      type="text"
                      value={formDetail}
                      onChange={(e) => setFormDetail(e.target.value)}
                      placeholder="Hand-thrown ceramic · Oatmeal"
                      className="mt-1 h-9 w-full border border-border px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-muted-foreground">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="mt-1 h-9 w-full border border-border px-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddProduct(false)}
                      className="border border-border px-4 py-2 text-xs text-muted-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
                    >
                      Save to catalog
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Orders */}
      {activeTab === "orders" && (
        <div className="mt-8">
          <div className="border-b border-border pb-4">
            <h2 className="font-display text-2xl text-foreground">
              Customer Orders &amp; Fulfillment
            </h2>
            <p className="text-xs text-muted-foreground">
              Update shipment statuses and inspect customer order baskets.
            </p>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Tracking</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {adminOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-muted/30">
                    <td className="py-3 px-4 font-display text-base font-medium text-foreground">
                      {ord.id}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {ord.date}
                    </td>
                    <td className="py-3 px-4 text-foreground">
                      {ord.items.map((i) => i.title).join(", ")}
                    </td>
                    <td className="py-3 px-4 font-semibold text-foreground">
                      ${ord.total}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          updateAdminOrderStatus(
                            ord.id,
                            e.target.value as any
                          )
                        }
                        className="h-8 border border-border bg-background px-2 text-xs font-medium outline-none"
                      >
                        <option value="Processing">Processing</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-[11px]">
                      {ord.trackingNumber}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => openReceipt(ord)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] border border-border text-foreground hover:border-primary hover:text-primary transition-colors rounded-xs"
                        title="View Customer Receipt"
                      >
                        <FileTextIcon size={13} />
                        <span>Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Promos */}
      {activeTab === "promos" && (
        <div className="mt-8 flex flex-col gap-6 max-w-2xl">
          <div className="border border-border bg-background p-6">
            <h2 className="font-display text-2xl text-foreground">
              Configured Promotional Codes
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <span className="font-mono text-sm font-semibold text-primary">
                    AUTUMN10
                  </span>
                  <p className="text-xs text-muted-foreground">
                    10% off entire order for seasonal newsletter subscribers
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <span className="font-mono text-sm font-semibold text-primary">
                    FREESHIP
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Waives standard $10 shipping fee regardless of order total
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="border border-border bg-background p-6">
            <h2 className="font-display text-2xl text-foreground">
              Shipping &amp; Logistics Rules
            </h2>
            <ul className="mt-3 flex flex-col gap-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <CircleCheckIcon size={14} className="text-primary" />
                <span>Complimentary shipping minimum: $100.00</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckIcon size={14} className="text-primary" />
                <span>Flat standard shipping: $10.00</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckIcon size={14} className="text-primary" />
                <span>Return window: 30 days from delivery</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
