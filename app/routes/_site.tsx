import { Outlet } from "react-router";

import { SiteFooter, SiteHeader } from "@/components/site/SiteShell";
import { CartDrawer } from "@/components/site/CartDrawer";
import { WishlistDrawer } from "@/components/site/WishlistDrawer";
import { SearchModal } from "@/components/site/SearchModal";
import { ProductQuickViewModal } from "@/components/site/ProductQuickViewModal";
import { ArticleModal } from "@/components/site/ArticleModal";
import { CheckoutModal } from "@/components/site/CheckoutModal";
import { ToastContainer } from "@/components/site/ToastContainer";
import { MobileMenuDrawer } from "@/components/site/MobileMenuDrawer";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";

export default function SiteLayout() {
  return (
    <div className="min-h-full bg-background font-sans text-foreground">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />

      {/* Global interactive drawers, dialogs & Concierge */}
      <MobileMenuDrawer />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <ProductQuickViewModal />
      <ArticleModal />
      <CheckoutModal />
      <ToastContainer />
      <ChatbotWidget />
    </div>
  );
}
