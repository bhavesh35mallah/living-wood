export interface ProductSwatch {
  hex: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  detail: string;
  badge: string;
  rating: string;
  reviewCount: number;
  src: string;
  swatches: ProductSwatch[];
  tags: ("bestsellers" | "new" | "under-50")[];
  department: "Home & living" | "Table & kitchen" | "Textiles" | "Objects & gifts";
  description: string;
  materials: string;
  origin: string;
  dimensions: string;
}

export interface Article {
  id: string;
  category: string;
  time: string;
  title: string;
  text: string;
  src: string;
  content: string[];
}

export const img = (id: string, width: number) =>
  "https://api.builder.io/api/v1/image/assets/TEMP/" + id + "?width=" + width;

export const products: Product[] = [
  {
    id: "everyday-stoneware-mug",
    title: "Everyday stoneware mug",
    price: 24,
    detail: "Hand-glazed stoneware · Chalk",
    badge: "BESTSELLER",
    rating: "4.9",
    reviewCount: 128,
    src: img("eceaa766830e008246802a9ea3903aa37c4db9a9", 620),
    swatches: [
      { hex: "#DBD3C2", name: "Chalk" },
      { hex: "#837C68", name: "Olive Moss" },
      { hex: "#B38365", name: "Warm Ochre" },
    ],
    tags: ["bestsellers", "under-50"],
    department: "Table & kitchen",
    description:
      "Comfortably weighted, wheel-thrown feeling with an unhurried silhouette. Made from speckled stoneware clay and dipped by hand in a satiny matte chalk glaze.",
    materials: "100% locally sourced Portuguese stoneware clay, non-toxic mineral glaze",
    origin: "Porto, Portugal · Est. 1982",
    dimensions: "3.5\" diameter × 3.8\" height · 12 oz capacity",
  },
  {
    id: "linen-cushion-cover",
    title: "Linen cushion cover",
    price: 58,
    detail: "European flax linen · Olive",
    badge: "NATURAL MATERIALS",
    rating: "4.8",
    reviewCount: 86,
    src: img("37959eba56d623b57b8cd261b6bf35fddd93d352", 620),
    swatches: [
      { hex: "#7C8068", name: "Earthy Olive" },
      { hex: "#DDD2BD", name: "Natural Oatmeal" },
      { hex: "#AC8C75", name: "Raw Umber" },
    ],
    tags: ["bestsellers", "new"],
    department: "Textiles",
    description:
      "Woven from pure long-staple French and Belgian flax, stone-washed for lived-in softness that gains rich drape and character with every gentle wash.",
    materials: "100% European flax certified OEKO-TEX Standard 100",
    origin: "Ghent, Belgium",
    dimensions: "20\" × 20\" square (hidden brass zipper closure)",
  },
  {
    id: "gather-serving-board",
    title: "Gather serving board",
    price: 68,
    detail: "Solid European oak · Natural",
    badge: "SMALL-BATCH",
    rating: "4.9",
    reviewCount: 64,
    src: img("6d60bdf507d21b58b73a333f9975a9773dd64b50", 621),
    swatches: [
      { hex: "#B99065", name: "Natural Honey Oak" },
      { hex: "#4E3E34", name: "Smoked Oak" },
    ],
    tags: ["bestsellers"],
    department: "Table & kitchen",
    description:
      "Turned and beveled from sustainably managed European white oak. Sized generously for artisanal cheeses, crusty country loaves, and informal gatherings.",
    materials: "Sustainably harvested solid European white oak, food-safe organic walnut oil finish",
    origin: "Black Forest, Germany",
    dimensions: "18\" length × 9\" width × 0.85\" thickness",
  },
  {
    id: "sunday-ritual-candle",
    title: "Sunday ritual candle",
    price: 38,
    detail: "Botanical wax · Cedar & fig",
    badge: "A LITTLE LUXURY",
    rating: "4.9",
    reviewCount: 102,
    src: img("e8a1b865468b2334676e8777b67301077bde0710", 620),
    swatches: [
      { hex: "#8C653F", name: "Amber Glass" },
      { hex: "#DBD3C2", name: "Chalk Ceramic" },
    ],
    tags: ["bestsellers", "new", "under-50"],
    department: "Objects & gifts",
    description:
      "Hand-poured coconut and rapeseed wax infused with wild Mediterranean fig, dried cedar leaves, and warm vetiver. A clean, slow burn of up to 55 hours.",
    materials: "100% natural botanical wax, unbleached cotton wick, reusable amber tumbler",
    origin: "Grasse, France",
    dimensions: "8.5 oz / 240g · Approx. 55-hour burn time",
  },
  {
    id: "everyday-vessel",
    title: "The everyday vessel",
    price: 48,
    detail: "Hand-finished stoneware · Natural",
    badge: "ATELIER EDIT",
    rating: "4.9",
    reviewCount: 54,
    src: img("e8f9bf39b308d7921395c101fda6c48caa3e210e", 620),
    swatches: [
      { hex: "#DBD3C2", name: "Chalk Sand" },
      { hex: "#837C68", name: "Sage Earth" },
    ],
    tags: ["bestsellers", "under-50"],
    department: "Home & living",
    description:
      "A gently tapered ceramic vessel shaped to hold wild branches, kitchen wooden spoons, or stand alone as a sculptural focal point on open shelves.",
    materials: "High-fire stoneware clay with textured raw exterior and glazed water-tight interior",
    origin: "Porto, Portugal",
    dimensions: "5.5\" diameter × 7.2\" height",
  },
  {
    id: "hand-loomed-waffle-throw",
    title: "Hand-loomed waffle throw",
    price: 85,
    detail: "Organic cotton & linen · Oatmeal",
    badge: "NEW ARRIVAL",
    rating: "4.9",
    reviewCount: 39,
    src: img("34612192302e2e5df18556cfa4906e8ea0187660", 620),
    swatches: [
      { hex: "#DDD2BD", name: "Oatmeal" },
      { hex: "#7C8068", name: "Earthy Sage" },
      { hex: "#3C3835", name: "Charcoal" },
    ],
    tags: ["new"],
    department: "Textiles",
    description:
      "Deep waffle weave that traps gentle warmth while remaining breathable throughout seasons. Pre-washed for a tactile, pillowy texture.",
    materials: "70% GOTS certified organic cotton, 30% European flax",
    origin: "Northern Portugal",
    dimensions: "52\" × 70\" with delicately fringed selvage edges",
  },
  {
    id: "fluted-stoneware-carafe",
    title: "Fluted stoneware carafe",
    price: 48,
    detail: "Textured ceramic · Chalk white",
    badge: "SMALL-BATCH",
    rating: "4.8",
    reviewCount: 42,
    src: img("d834ef582834500abb396ba536c15230520f607d", 620),
    swatches: [
      { hex: "#DBD3C2", name: "Chalk White" },
      { hex: "#837C68", name: "Muted Olive" },
    ],
    tags: ["new", "under-50"],
    department: "Table & kitchen",
    description:
      "Fluted vertical ridges create an easy tactile grip without needing a formal handle. Pours with drip-free poise for morning water or chilled wine.",
    materials: "High-fire ceramic stoneware, food-safe matte interior glaze",
    origin: "Aveiro, Portugal",
    dimensions: "4\" base diameter × 9\" height · 1 liter capacity",
  },
  {
    id: "beeswax-taper-candle-pair",
    title: "Pure beeswax tapers (Pair)",
    price: 22,
    detail: "100% filtered beeswax · Honey",
    badge: "ORGANIC",
    rating: "5.0",
    reviewCount: 71,
    src: img("1eaa793704e68d956c822522f7da074a273aea60", 620),
    swatches: [
      { hex: "#D4A359", name: "Warm Honey" },
      { hex: "#E8E0D2", name: "Bleached Ivory" },
    ],
    tags: ["new", "under-50"],
    department: "Objects & gifts",
    description:
      "Hand-dipped tapers made from natural golden cappings beeswax. Emits a faint, subtle aroma of wildflower honey and a calm, smokeless golden flame.",
    materials: "100% pure filtered apiary beeswax, braided cotton wick",
    origin: "Cotswolds, United Kingdom",
    dimensions: "Standard 7/8\" base × 10\" height · 11-hour burn each",
  },
];

export const articles: Article[] = [
  {
    id: "art-of-unhurried-morning",
    category: "At home",
    time: "5 min read",
    title: "The art of an unhurried morning",
    text: "Simple rituals to make a little space for yourself before the day begins.",
    src: img("f8036a2ab416bb3d8fd8634c62833350600cc0f2", 837),
    content: [
      "There is a quiet quality to the first hour of daylight that rarely repeats itself later. Long before notifications ring and obligations take hold, the house sits in stillness.",
      "Making coffee or tea by hand—measuring the beans, listening to the water kettle slowly come to a boil, holding a warm stoneware mug in two hands—is not a waste of time. It is an intentional slowing down that steadies the nervous system.",
      "When we surround ourselves with honest materials that feel good to touch, everyday tasks cease to be chores and transform into mindful pauses. Choose one corner of your morning to slow down and notice the light.",
    ],
  },
  {
    id: "table-with-room-for-everyone",
    category: "Living well",
    time: "4 min read",
    title: "A table with room for everyone",
    text: "A thoughtful guide to gathering with warmth, ease, and without the fuss.",
    src: img("2da217c149b6b87507cc768f1ba0576558b90aee", 837),
    content: [
      "The most memorable dinners are rarely the most elaborate. In fact, excessive perfection often puts guests on edge, making them worry about wine spills or proper etiquette.",
      "Instead, lay a long linen runner down the center of an oak table. Place a wooden board piled with cheese, crusty country sourdough, and grapes within arm's reach. Light two beeswax tapers whose soft golden flame flickers at eye level.",
      "When the host is relaxed, everyone else exhales. True hospitality is not a display of culinary mastery; it is simply making generous room for conversation, second helpings, and lingering until late.",
    ],
  },
  {
    id: "linen-for-the-long-run",
    category: "Material matters",
    time: "6 min read",
    title: "Linen, for the long run",
    text: "Why this humble natural fiber only gets better, softer, and more beautiful with time.",
    src: img("9d061e7e62d1c1f33fe044278e3de54943069561", 837),
    content: [
      "Linen is one of humanity’s oldest cultivated textiles, dating back thousands of years. Spun from the strong inner fibers of the flax plant, it is naturally hypoallergenic, temperature-regulating, and exceptionally durable.",
      "Unlike synthetic fibers that degrade or lose their structure after frequent washing, flax softens and relaxes. The microscopic pectins in the fiber break down gently over time, yielding that distinctive, tumbled drape that feels like an heirloom from day one.",
      "Caring for linen is refreshingly uncomplicated: wash with gentle plant-based soap, tumble dry low or hang in fresh air, and embrace the gentle lived-in wrinkles. It never needs an iron to look extraordinary.",
    ],
  },
];
