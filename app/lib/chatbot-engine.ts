import { type Product, products as catalogProducts } from "@/data/catalog";
import { useShopStore } from "@/lib/store";

export interface ChatMessage {
  id: string;
  sender: "concierge" | "user";
  text: string;
  timestamp: string;
  products?: Product[];
  actionChips?: string[];
  badge?: string;
}

export const initialGreetingMessage: ChatMessage = {
  id: "msg-welcome",
  sender: "concierge",
  text: "Welcome to Living Wood. I am your atelier concierge. I can recommend handcrafted pieces tailored to your space, answer questions on materials and care, share active promo codes, or check shipping details.",
  timestamp: "Just now",
  badge: "Atelier Concierge",
  actionChips: [
    "✨ Thoughtful gifts under $50",
    "☕ Stoneware mugs & carafes",
    "🌿 Belgian linen textiles",
    "🕯️ Candles & scents",
    "🚚 Shipping & return policy",
    "🏷️ Active promo codes",
  ],
};

/**
 * Intelligent client-side Concierge query processor
 */
export function processConciergeQuery(
  rawQuery: string,
  allProducts: Product[] = catalogProducts
): Omit<ChatMessage, "id" | "timestamp"> {
  const q = rawQuery.trim().toLowerCase();

  // 1. Order Status / Tracking Check
  if (
    q.includes("where is my order") ||
    q.includes("track my order") ||
    q.includes("order status") ||
    q.includes("tracking") ||
    q.includes("my order") ||
    q.includes("ff-") ||
    q.includes("trk-")
  ) {
    const user = useShopStore.getState().user;
    if (user && user.orders && user.orders.length > 0) {
      const latestOrder = user.orders[0];
      return {
        sender: "concierge",
        badge: "Order Status",
        text: `Here is the status for your most recent order:\n\n• **Order ID**: #${latestOrder.id}\n• **Status**: ${latestOrder.status}\n• **Tracking**: \`${latestOrder.trackingNumber}\`\n• **Order Total**: $${latestOrder.total}.00 (${latestOrder.items.length} items)\n• **Date**: ${latestOrder.date}\n\nAll shipments are securely packaged in recyclable paper mailers.`,
        actionChips: ["What is your return policy?", "Shop new arrivals", "Ask about materials"],
      };
    } else {
      return {
        sender: "concierge",
        badge: "Order Tracking",
        text: "You can track any order directly from your [Account page](/account) or by checking the tracking link sent in your shipping confirmation email. Standard delivery takes 3–5 business days.\n\nIf you have a specific order number (e.g. FF-782910), feel free to mention it!",
        actionChips: ["How does shipping work?", "Return & refund policy", "Browse bestsellers"],
      };
    }
  }

  // 2. Promo & Discount Codes
  if (
    q.includes("promo") ||
    q.includes("discount") ||
    q.includes("coupon") ||
    q.includes("code") ||
    q.includes("deal") ||
    q.includes("sale") ||
    q.includes("voucher") ||
    q.includes("autumn10") ||
    q.includes("freeship")
  ) {
    return {
      sender: "concierge",
      badge: "Promotions & Offers",
      text: "We currently have two active atelier promotions for you:\n\n• **AUTUMN10** — Enjoy **10% off** your entire order (works across all ceramics, linen, and woodwork).\n• **FREESHIP** — Enjoy **complimentary shipping** on any order with no minimum spend.\n\nYou can enter either code in your Bag drawer or during Checkout to apply the saving.",
      actionChips: ["Show bestsellers", "Gifts under $50", "Ceramic mugs"],
    };
  }

  // 3. Shipping & Delivery
  if (
    q.includes("shipping") ||
    q.includes("delivery") ||
    q.includes("deliver") ||
    q.includes("ship") ||
    q.includes("how long to arrive") ||
    q.includes("free shipping") ||
    q.includes("courier") ||
    q.includes("express")
  ) {
    return {
      sender: "concierge",
      badge: "Shipping & Delivery",
      text: "Here are our shipping details:\n\n• **Complimentary Shipping**: On all orders over $100 (or using promo code **FREESHIP**).\n• **Standard Delivery**: 3–5 business days ($8 flat fee for orders under $100).\n• **Express Delivery**: 1–2 business days ($18 flat fee).\n• **Packaging**: 100% plastic-free, recyclable FSC-certified paper and unbleached cotton ribbon.",
      actionChips: ["Return policy", "Do you have promo codes?", "Explore bestsellers"],
    };
  }

  // 4. Returns & Exchanges
  if (
    q.includes("return") ||
    q.includes("refund") ||
    q.includes("exchange") ||
    q.includes("damaged") ||
    q.includes("broken") ||
    q.includes("warranty") ||
    q.includes("send back")
  ) {
    return {
      sender: "concierge",
      badge: "Returns & Exchanges",
      text: "We stand behind our craftsmanship with an effortless **30-day return policy**:\n\n• Returns are accepted within 30 days of delivery for unwashed, unused items in original packaging.\n• We provide a pre-paid digital shipping label.\n• Once inspected at our atelier, refunds are credited back to your original payment method within 3–5 business days.\n• If a handcrafted item arrives damaged or broken, contact us immediately and we will dispatch a replacement free of charge.",
      actionChips: ["Contact atelier support", "Shipping details", "Browse the catalog"],
    };
  }

  // 5. Materials & Sustainability
  if (
    q.includes("sustainab") ||
    q.includes("where are") ||
    q.includes("where is") ||
    q.includes("origin") ||
    q.includes("materials") ||
    q.includes("portugal") ||
    q.includes("belgium") ||
    q.includes("artisan") ||
    q.includes("handcrafted") ||
    q.includes("eco")
  ) {
    return {
      sender: "concierge",
      badge: "Materials & Origins",
      text: "We partner exclusively with independent European heritage makers who honor traditional methods:\n\n• **Stoneware Clay**: Wheel-thrown in Porto & Aveiro, Portugal using locally sourced mineral-rich clays.\n• **Flax Linen**: Cultivated in France and woven in Ghent, Belgium (OEKO-TEX Standard 100 certified).\n• **White Oak**: Sustainably harvested from PEFC-certified forests in Germany's Black Forest.\n• **Beeswax & Botanicals**: Pure filtered apiary beeswax from the Cotswolds (UK) and botanical rapeseed waxes from Grasse (France).",
      actionChips: ["Show stoneware ceramics", "Show linen textiles", "Show woodwork"],
    };
  }

  // 6. Care & Maintenance Instructions
  if (
    q.includes("care") ||
    q.includes("clean") ||
    q.includes("wash") ||
    q.includes("dishwasher") ||
    q.includes("microwave") ||
    q.includes("maintain") ||
    q.includes("laundry")
  ) {
    return {
      sender: "concierge",
      badge: "Atelier Care Guide",
      text: "Caring for natural, honest materials is simple and rewarding:\n\n• **Stoneware (Mugs, Carafes, Vessels)**: Dishwasher & microwave safe. Matte glazes resist staining; avoid sudden thermal shocks.\n• **Pure Flax Linen (Cushions & Throws)**: Machine wash cold or warm on gentle cycle; tumble dry low or air dry in sunlight. Embrace its natural, lived-in rumpled drape.\n• **European White Oak (Boards)**: Wipe with mild soapy water and dry immediately. Never soak or put in dishwasher. Rehydrate with food-grade walnut or mineral oil every 3 months.\n• **Candles & Tapers**: Trim wicks to 1/4\" before lighting. Allow wax to melt edge-to-edge on first burn.",
      actionChips: ["Everyday stoneware mug", "Linen cushion cover", "Gather serving board"],
    };
  }

  // 7. Contact / Hours / Atelier Location
  if (
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("email") ||
    q.includes("support") ||
    q.includes("hours") ||
    q.includes("address") ||
    q.includes("location") ||
    q.includes("where are you located")
  ) {
    return {
      sender: "concierge",
      badge: "Atelier Concierge",
      text: "Our physical atelier and design studio is located in Portland, Oregon:\n\n• **Address**: 742 Evergreen Terrace, Portland, OR 97201\n• **Email**: concierge@livingwood.com\n• **Phone**: +1 (503) 892-4102\n• **Studio Hours**: Monday through Friday, 9:00 AM – 6:00 PM PT.\n\nOur online store and concierge assistant are available 24/7.",
      actionChips: ["Shipping policy", "Active promo codes", "Shop all pieces"],
    };
  }

  // 8. Brand Philosophy / "What is Living Wood?"
  if (
    q.includes("who are you") ||
    q.includes("what is living wood") ||
    q.includes("about") ||
    q.includes("philosophy") ||
    q.includes("story") ||
    q.includes("slow home")
  ) {
    return {
      sender: "concierge",
      badge: "Living Wood Philosophy",
      text: "Living Wood was founded on the belief that the objects we touch every day should be honest, calming, and built to outlive trends.\n\nWe celebrate the 'slow home'—filling spaces with tactile Portuguese stoneware, tumbled Belgian flax, and solid German oak that collect patina and warmth over a lifetime.",
      actionChips: ["Browse bestsellers", "Gifts under $50", "View ceramics"],
    };
  }

  // 9. PRODUCT SEARCH & RECOMMENDATION BASED ON USER REQUIREMENTS
  // Extract budget constraint
  let maxPrice: number | null = null;
  const underMatch = q.match(/under\s*\$?(\d+)/i) || q.match(/less than\s*\$?(\d+)/i) || q.match(/below\s*\$?(\d+)/i);
  if (underMatch && underMatch[1]) {
    maxPrice = parseInt(underMatch[1], 10);
  } else if (q.includes("cheap") || q.includes("budget") || q.includes("affordable") || q.includes("inexpensive")) {
    maxPrice = 45;
  }

  // Department / Subject Matching
  const matchesKitchen =
    q.includes("mug") ||
    q.includes("cup") ||
    q.includes("coffee") ||
    q.includes("tea") ||
    q.includes("drink") ||
    q.includes("carafe") ||
    q.includes("pitcher") ||
    q.includes("water") ||
    q.includes("board") ||
    q.includes("cutting") ||
    q.includes("serving") ||
    q.includes("kitchen") ||
    q.includes("dining") ||
    q.includes("table") ||
    q.includes("tableware") ||
    q.includes("cheese");

  const matchesTextiles =
    q.includes("linen") ||
    q.includes("flax") ||
    q.includes("cushion") ||
    q.includes("pillow") ||
    q.includes("throw") ||
    q.includes("blanket") ||
    q.includes("waffle") ||
    q.includes("cotton") ||
    q.includes("textile") ||
    q.includes("bed") ||
    q.includes("bedding") ||
    q.includes("sofa") ||
    q.includes("couch");

  const matchesCandles =
    q.includes("candle") ||
    q.includes("taper") ||
    q.includes("wax") ||
    q.includes("scent") ||
    q.includes("fragrance") ||
    q.includes("fig") ||
    q.includes("cedar") ||
    q.includes("beeswax") ||
    q.includes("smell") ||
    q.includes("aroma") ||
    q.includes("flame") ||
    q.includes("burn");

  const matchesVessels =
    q.includes("vessel") ||
    q.includes("vase") ||
    q.includes("pot") ||
    q.includes("flower") ||
    q.includes("branch") ||
    q.includes("shelf") ||
    q.includes("sculpt") ||
    q.includes("decor") ||
    q.includes("living room");

  const matchesGifts =
    q.includes("gift") ||
    q.includes("present") ||
    q.includes("birthday") ||
    q.includes("housewarming") ||
    q.includes("host") ||
    q.includes("mother") ||
    q.includes("friend") ||
    q.includes("wedding");

  const matchesStoneware = q.includes("stoneware") || q.includes("ceramic") || q.includes("clay") || q.includes("glaze");
  const matchesWood = q.includes("wood") || q.includes("oak") || q.includes("timber");
  const matchesNew = /\b(new|latest|recent|arrival|arrivals)\b/i.test(q);
  const matchesBestseller = /\b(best|bestseller|bestsellers|popular|favorite|top)\b/i.test(q);

  // Filter products based on extracted intent
  let filtered = allProducts.filter((product) => {
    // Budget check
    if (maxPrice !== null && product.price > maxPrice) {
      return false;
    }

    // Direct title or id match
    if (q.includes(product.id) || q.includes(product.title.toLowerCase())) {
      return true;
    }

    // New arrivals filter
    if (matchesNew && !product.tags.includes("new")) {
      return false;
    }

    // Bestseller filter
    if (matchesBestseller && !product.tags.includes("bestsellers")) {
      return false;
    }

    // Department / Category checks
    if (matchesKitchen && product.department === "Table & kitchen") return true;
    if (matchesTextiles && product.department === "Textiles") return true;
    if (matchesCandles && (product.id.includes("candle") || product.id.includes("taper"))) return true;
    if (matchesVessels && (product.id.includes("vessel") || product.department === "Home & living")) return true;
    if (matchesStoneware && (product.materials.toLowerCase().includes("stoneware") || product.materials.toLowerCase().includes("ceramic"))) return true;
    if (matchesWood && product.materials.toLowerCase().includes("oak")) return true;

    // Gifts check
    if (matchesGifts) {
      return (
        product.id === "sunday-ritual-candle" ||
        product.id === "everyday-stoneware-mug" ||
        product.id === "beeswax-taper-candle-pair" ||
        product.id === "gather-serving-board"
      );
    }

    // Fallback: check if query words exist in description, materials, or origin
    const words = q.split(/\s+/).filter((w) => w.length > 3);
    const hasWordMatch = words.some(
      (w) =>
        product.title.toLowerCase().includes(w) ||
        product.description.toLowerCase().includes(w) ||
        product.materials.toLowerCase().includes(w) ||
        product.origin.toLowerCase().includes(w)
    );

    return hasWordMatch;
  });

  // If price filter was applied but no specific category matched, return all items under that price
  if (filtered.length === 0 && maxPrice !== null) {
    filtered = allProducts.filter((p) => p.price <= maxPrice);
  }

  // If items matched, build custom recommendation narrative
  if (filtered.length > 0) {
    const topItems = filtered.slice(0, 3);
    const countText = topItems.length === 1 ? "piece" : `${topItems.length} handcrafted pieces`;
    let intro = `I selected ${countText} that closely match your criteria`;
    if (maxPrice !== null) {
      intro += ` under $${maxPrice}`;
    }
    intro += ":";

    return {
      sender: "concierge",
      badge: "Product Recommendations",
      text: `${intro}\n\nEach item below is in stock and crafted by our partner artisans. You can add them straight to your bag or click to inspect their tactile details.`,
      products: topItems,
      actionChips: [
        "Do you have a discount code?",
        "What are the shipping details?",
        "Explore all products",
      ],
    };
  }

  // 10. Warm Fallback for Unrecognized / Conversational Queries
  const isGreeting = q === "hi" || q === "hello" || q === "hey" || q === "good morning" || q === "good evening";
  if (isGreeting) {
    return {
      sender: "concierge",
      badge: "Living Wood Concierge",
      text: "Warm greetings! How can I assist your home today? Tell me what kind of piece you are searching for (e.g. kitchen ceramics, sofa cushions, or gifts under $50), or ask me any question about our shipping and care.",
      actionChips: [
        "✨ Thoughtful gifts under $50",
        "☕ Stoneware mugs & carafes",
        "🌿 Belgian linen textiles",
        "🕯️ Candles & scents",
      ],
    };
  }

  return {
    sender: "concierge",
    badge: "Personal Concierge",
    text: `I'd love to help guide you! Could you share a bit more about what you have in mind? For example:\n\n• **By Room**: Table & Kitchen, Living Room, Bedroom\n• **By Material**: Portuguese stoneware, Belgian flax linen, Black Forest oak, pure beeswax\n• **By Budget**: "Items under $50" or "Gifts under $40"\n\nHere are a few popular selections you might enjoy:`,
    products: allProducts.slice(0, 3),
    actionChips: [
      "✨ Thoughtful gifts under $50",
      "☕ Ceramic coffee mugs",
      "🌿 Linen cushions & throws",
      "🏷️ Active promo codes",
      "🚚 Shipping & return policy",
    ],
  };
}
