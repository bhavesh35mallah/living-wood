import { ProductListingPage } from "@/components/site/ProductListingPage";

export function meta() {
  return [
    { title: "Shop All Objects · Form & Field" },
    {
      name: "description",
      content:
        "Explore our entire collection of everyday stoneware, natural linen textiles, solid oak boards, and botanical candles.",
    },
  ];
}

export default function ShopAllRoute() {
  return (
    <ProductListingPage
      eyebrow="The Full Catalog"
      title="Objects for everyday living."
      description="Considered pieces made from honest materials by independent European workshops. Crafted slowly to enrich daily rituals."
    />
  );
}
