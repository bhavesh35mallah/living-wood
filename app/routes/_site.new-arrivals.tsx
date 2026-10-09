import { ProductListingPage } from "@/components/site/ProductListingPage";

export function meta() {
  return [
    { title: "New Arrivals · Form & Field" },
    {
      name: "description",
      content:
        "The latest arrivals in natural linen, small-batch stoneware, and organic scents.",
    },
  ];
}

export default function NewArrivalsRoute() {
  return (
    <ProductListingPage
      eyebrow="Autumn 2026 Collection"
      title="Fresh arrivals."
      description="New silhouettes, seasonal glazes, and recently woven flax textiles fresh from our maker workshops."
      defaultTag="new"
    />
  );
}
