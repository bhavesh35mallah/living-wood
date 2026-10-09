import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Article, type Product, products as initialCatalogProducts } from "@/data/catalog";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  src: string;
  swatchColor: string;
  swatchName: string;
  quantity: number;
  detail: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  src: string;
  detail: string;
  badge?: string;
}

export interface ToastItem {
  id: string;
  message: string;
  type?: "info" | "success" | "error";
}

export interface UserAddress {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface UserOrderItem {
  title: string;
  price: number;
  quantity: number;
  src: string;
  swatchName: string;
}

export interface UserOrder {
  id: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing";
  total: number;
  trackingNumber: string;
  items: UserOrderItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  phone: string;
  joinedDate: string;
  addresses: UserAddress[];
  orders: UserOrder[];
}

interface ShopStore {
  // Auth & User Account
  user: User | null;
  login: (email: string, password?: string, role?: "customer" | "admin") => boolean;
  register: (name: string, email: string, password?: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<Omit<User, "id" | "orders">>) => void;
  addAddress: (address: Omit<UserAddress, "id">) => void;
  deleteAddress: (id: string) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  appliedDiscount: { code: string; percent: number } | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: {
    id: string;
    title: string;
    price: number;
    src: string;
    swatchColor?: string;
    swatchName?: string;
    detail?: string;
    quantity?: number;
  }) => void;
  removeItem: (id: string, swatchColor: string) => void;
  updateQuantity: (id: string, swatchColor: string, delta: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;

  // Wishlist
  wishlist: WishlistItem[];
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: (item: WishlistItem) => boolean;
  isInWishlist: (id: string) => boolean;

  // Search
  isSearchOpen: boolean;
  searchQuery: string;
  openSearch: () => void;
  closeSearch: () => void;
  setSearchQuery: (query: string) => void;

  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Article Modal
  activeArticle: Article | null;
  openArticle: (article: Article) => void;
  closeArticle: () => void;

  // Mobile Menu
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;

  // Concierge Chatbot
  isChatbotOpen: boolean;
  chatbotInitialPrompt: string | null;
  openChatbot: (initialPrompt?: string) => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
  setChatbotInitialPrompt: (prompt: string | null) => void;

  // Mock Checkout
  isCheckoutOpen: boolean;
  orderNumber: string | null;
  openCheckout: () => void;
  closeCheckout: () => void;
  completeCheckout: () => string;

  // Inventory & Admin Dashboard
  inventoryProducts: Product[];
  adminOrders: UserOrder[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateAdminOrderStatus: (orderId: string, status: UserOrder["status"]) => void;

  // Currency
  currency: "USD" | "EUR" | "GBP";
  setCurrency: (c: "USD" | "EUR" | "GBP") => void;

  // Toasts
  toasts: ToastItem[];
  addToast: (message: string, type?: "info" | "success" | "error") => void;
  removeToast: (id: string) => void;
}

const defaultUser: User = {
  id: "usr-01",
  name: "Eleanor Vance",
  email: "eleanor.vance@example.com",
  role: "customer",
  phone: "+1 (503) 892-4102",
  joinedDate: "October 2025",
  addresses: [
    {
      id: "addr-1",
      label: "Home (Primary)",
      street: "742 Evergreen Terrace, Apt 4B",
      city: "Portland",
      state: "OR",
      zip: "97201",
      isDefault: true,
    },
    {
      id: "addr-2",
      label: "Studio Office",
      street: "1240 NW Flanders St, Suite 200",
      city: "Portland",
      state: "OR",
      zip: "97209",
      isDefault: false,
    },
  ],
  orders: [
    {
      id: "FF-782910",
      date: "Sep 28, 2026",
      status: "Delivered",
      total: 92,
      trackingNumber: "TRK-98241029US",
      items: [
        {
          title: "Everyday stoneware mug",
          price: 24,
          quantity: 2,
          src: "https://api.builder.io/api/v1/image/assets/TEMP/eceaa766830e008246802a9ea3903aa37c4db9a9?width=620",
          swatchName: "Chalk",
        },
        {
          title: "Sunday ritual candle",
          price: 38,
          quantity: 1,
          src: "https://api.builder.io/api/v1/image/assets/TEMP/e8a1b865468b2334676e8777b67301077bde0710?width=620",
          swatchName: "Amber Glass",
        },
      ],
    },
    {
      id: "FF-830192",
      date: "Aug 14, 2026",
      status: "Delivered",
      total: 126,
      trackingNumber: "TRK-67310492US",
      items: [
        {
          title: "Linen cushion cover",
          price: 58,
          quantity: 1,
          src: "https://api.builder.io/api/v1/image/assets/TEMP/37959eba56d623b57b8cd261b6bf35fddd93d352?width=620",
          swatchName: "Earthy Olive",
        },
        {
          title: "Gather serving board",
          price: 68,
          quantity: 1,
          src: "https://api.builder.io/api/v1/image/assets/TEMP/6d60bdf507d21b58b73a333f9975a9773dd64b50?width=621",
          swatchName: "Natural Honey Oak",
        },
      ],
    },
  ],
};

const initialAdminOrders: UserOrder[] = [
  ...defaultUser.orders,
  {
    id: "FF-902381",
    date: "Oct 8, 2026",
    status: "Processing",
    total: 148,
    trackingNumber: "TRK-88219401US",
    items: [
      {
        title: "The everyday vessel",
        price: 48,
        quantity: 1,
        src: "https://api.builder.io/api/v1/image/assets/TEMP/e8f9bf39b308d7921395c101fda6c48caa3e210e?width=620",
        swatchName: "Chalk Sand",
      },
      {
        title: "Hand-loomed waffle throw",
        price: 85,
        quantity: 1,
        src: "https://api.builder.io/api/v1/image/assets/TEMP/34612192302e2e5df18556cfa4906e8ea0187660?width=620",
        swatchName: "Oatmeal",
      },
    ],
  },
  {
    id: "FF-910482",
    date: "Oct 7, 2026",
    status: "In Transit",
    total: 70,
    trackingNumber: "TRK-77192841US",
    items: [
      {
        title: "Fluted stoneware carafe",
        price: 48,
        quantity: 1,
        src: "https://api.builder.io/api/v1/image/assets/TEMP/d834ef582834500abb396ba536c15230520f607d?width=620",
        swatchName: "Chalk White",
      },
      {
        title: "Pure beeswax tapers (Pair)",
        price: 22,
        quantity: 1,
        src: "https://api.builder.io/api/v1/image/assets/TEMP/1eaa793704e68d956c822522f7da074a273aea60?width=620",
        swatchName: "Warm Honey",
      },
    ],
  },
];

export const useShopStore = create<ShopStore>()(
  persist(
    (set, get) => ({
      // User auth
      user: defaultUser,

      login: (email, _password, role = "customer") => {
        const isAdmin = email.toLowerCase().includes("admin") || role === "admin";
        const name = email.split("@")[0] || "User";
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
        set({
          user: {
            ...defaultUser,
            name: isAdmin ? "Admin Specialist" : formattedName,
            email,
            role: isAdmin ? "admin" : "customer",
          },
        });
        get().addToast(`Signed in as ${isAdmin ? "Administrator" : formattedName}`, "success");
        return true;
      },

      register: (name, email) => {
        set({
          user: {
            ...defaultUser,
            id: "usr-" + Date.now().toString(36),
            name,
            email,
            role: "customer",
            orders: [],
            joinedDate: "October 2026",
          },
        });
        get().addToast(`Welcome to Form & Field, ${name}!`, "success");
        return true;
      },

      logout: () => {
        set({ user: null });
        get().addToast("Signed out successfully", "info");
      },

      updateUser: (updates) => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({ user: { ...currentUser, ...updates } });
        get().addToast("Profile details updated", "success");
      },

      addAddress: (address) => {
        const currentUser = get().user;
        if (!currentUser) return;
        const newAddress: UserAddress = {
          ...address,
          id: "addr-" + Date.now().toString(36),
        };
        const updatedAddresses = address.isDefault
          ? currentUser.addresses.map((a) => ({ ...a, isDefault: false })).concat(newAddress)
          : [...currentUser.addresses, newAddress];
        set({ user: { ...currentUser, addresses: updatedAddresses } });
        get().addToast("Address saved", "success");
      },

      deleteAddress: (id) => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({
          user: {
            ...currentUser,
            addresses: currentUser.addresses.filter((a) => a.id !== id),
          },
        });
        get().addToast("Address removed", "info");
      },

      // Cart state
      cart: [
        {
          id: "everyday-stoneware-mug",
          title: "Everyday stoneware mug",
          price: 24,
          src: "https://api.builder.io/api/v1/image/assets/TEMP/eceaa766830e008246802a9ea3903aa37c4db9a9?width=620",
          swatchColor: "#DBD3C2",
          swatchName: "Chalk",
          quantity: 1,
          detail: "Hand-glazed stoneware · Chalk",
        },
      ],
      isCartOpen: false,
      appliedDiscount: null,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addItem: (item) => {
        const swatchColor = item.swatchColor || "#DBD3C2";
        const swatchName = item.swatchName || "Default";
        const quantity = item.quantity || 1;
        const currentCart = get().cart;

        const existingIndex = currentCart.findIndex(
          (i) => i.id === item.id && i.swatchColor === swatchColor
        );

        let updated: CartItem[];
        if (existingIndex > -1) {
          updated = currentCart.map((i, index) =>
            index === existingIndex
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        } else {
          updated = [
            ...currentCart,
            {
              id: item.id,
              title: item.title,
              price: item.price,
              src: item.src,
              swatchColor,
              swatchName,
              quantity,
              detail: item.detail || "",
            },
          ];
        }

        set({ cart: updated, isCartOpen: true });
        get().addToast(`Added "${item.title}" to your bag`, "success");
      },

      removeItem: (id, swatchColor) => {
        const item = get().cart.find(
          (i) => i.id === id && i.swatchColor === swatchColor
        );
        set((state) => ({
          cart: state.cart.filter(
            (i) => !(i.id === id && i.swatchColor === swatchColor)
          ),
        }));
        if (item) {
          get().addToast(`Removed "${item.title}" from your bag`, "info");
        }
      },

      updateQuantity: (id, swatchColor, delta) => {
        set((state) => ({
          cart: state.cart
            .map((i) => {
              if (i.id === id && i.swatchColor === swatchColor) {
                const newQty = i.quantity + delta;
                return newQty > 0 ? { ...i, quantity: newQty } : null;
              }
              return i;
            })
            .filter((i): i is CartItem => i !== null),
        }));
      },

      clearCart: () => set({ cart: [], appliedDiscount: null }),

      applyDiscount: (code) => {
        const trimmed = code.trim().toUpperCase();
        if (trimmed === "AUTUMN10" || trimmed === "WELCOME10") {
          set({ appliedDiscount: { code: trimmed, percent: 10 } });
          get().addToast(`Promo code ${trimmed} applied (10% off)!`, "success");
          return { success: true, message: "10% discount applied to your order." };
        }
        if (trimmed === "FREESHIP") {
          set({ appliedDiscount: { code: "FREESHIP", percent: 0 } });
          get().addToast("Complimentary shipping unlocked!", "success");
          return { success: true, message: "Complimentary shipping applied." };
        }
        return {
          success: false,
          message: 'Invalid code. Try "AUTUMN10" for 10% off.',
        };
      },

      removeDiscount: () => set({ appliedDiscount: null }),

      // Wishlist state
      wishlist: [],
      isWishlistOpen: false,

      openWishlist: () => set({ isWishlistOpen: true }),
      closeWishlist: () => set({ isWishlistOpen: false }),

      toggleWishlist: (item) => {
        const list = get().wishlist;
        const exists = list.some((i) => i.id === item.id);
        if (exists) {
          set({ wishlist: list.filter((i) => i.id !== item.id) });
          get().addToast(`Removed "${item.title}" from saved pieces`, "info");
          return false;
        } else {
          set({ wishlist: [...list, item] });
          get().addToast(`Saved "${item.title}" to your wishlist`, "success");
          return true;
        }
      },

      isInWishlist: (id) => get().wishlist.some((i) => i.id === id),

      // Search state
      isSearchOpen: false,
      searchQuery: "",
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Quick View state
      quickViewProduct: null,
      openQuickView: (product) => set({ quickViewProduct: product }),
      closeQuickView: () => set({ quickViewProduct: null }),

      // Article Modal state
      activeArticle: null,
      openArticle: (article) => set({ activeArticle: article }),
      closeArticle: () => set({ activeArticle: null }),

      // Mobile Menu state
      isMobileMenuOpen: false,
      openMobileMenu: () => set({ isMobileMenuOpen: true }),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),

      // Concierge Chatbot state
      isChatbotOpen: false,
      chatbotInitialPrompt: null,
      openChatbot: (initialPrompt?: string) =>
        set({
          isChatbotOpen: true,
          chatbotInitialPrompt: initialPrompt || null,
        }),
      closeChatbot: () => set({ isChatbotOpen: false }),
      toggleChatbot: () => set((s) => ({ isChatbotOpen: !s.isChatbotOpen })),
      setChatbotInitialPrompt: (prompt) => set({ chatbotInitialPrompt: prompt }),

      // Checkout state
      isCheckoutOpen: false,
      orderNumber: null,
      openCheckout: () => set({ isCheckoutOpen: true, orderNumber: null }),
      closeCheckout: () => set({ isCheckoutOpen: false, orderNumber: null }),
      completeCheckout: () => {
        const orderNum = "FF-" + Math.floor(100000 + Math.random() * 900000);
        const currentCart = get().cart;
        const subtotal = currentCart.reduce((acc, i) => acc + i.price * i.quantity, 0);
        const discountAmount = get().appliedDiscount
          ? (subtotal * get().appliedDiscount!.percent) / 100
          : 0;
        const shipping = subtotal >= 100 ? 0 : 10;
        const total = Math.round(subtotal - discountAmount + shipping);

        const newOrder: UserOrder = {
          id: orderNum,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          status: "Processing",
          total,
          trackingNumber: "TRK-" + Math.floor(10000000 + Math.random() * 90000000) + "US",
          items: currentCart.map((i) => ({
            title: i.title,
            price: i.price,
            quantity: i.quantity,
            src: i.src,
            swatchName: i.swatchName,
          })),
        };

        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              orders: [newOrder, ...currentUser.orders],
            },
          });
        }

        set((state) => ({
          orderNumber: orderNum,
          cart: [],
          appliedDiscount: null,
          adminOrders: [newOrder, ...state.adminOrders],
        }));

        return orderNum;
      },

      // Admin & Inventory state
      inventoryProducts: initialCatalogProducts,
      adminOrders: initialAdminOrders,

      addProduct: (newProduct) => {
        set((state) => ({
          inventoryProducts: [newProduct, ...state.inventoryProducts],
        }));
        get().addToast(`Created product "${newProduct.title}"`, "success");
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          inventoryProducts: state.inventoryProducts.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
        get().addToast("Product updated in catalog", "success");
      },

      deleteProduct: (id) => {
        set((state) => ({
          inventoryProducts: state.inventoryProducts.filter((p) => p.id !== id),
        }));
        get().addToast("Product removed from catalog", "info");
      },

      updateAdminOrderStatus: (orderId, status) => {
        set((state) => ({
          adminOrders: state.adminOrders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        }));
        get().addToast(`Order ${orderId} marked as ${status}`, "success");
      },

      // Currency
      currency: "USD",
      setCurrency: (currency) => set({ currency }),

      // Toast state
      toasts: [],
      addToast: (message, type = "info") => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
          toasts: [...state.toasts.slice(-3), { id, message, type }],
        }));
        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          }));
        }, 3200);
      },
      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "form-and-field-storage",
      partialize: (state) => ({
        user: state.user,
        cart: state.cart,
        wishlist: state.wishlist,
        appliedDiscount: state.appliedDiscount,
        currency: state.currency,
        inventoryProducts: state.inventoryProducts,
        adminOrders: state.adminOrders,
      }),
    }
  )
);
