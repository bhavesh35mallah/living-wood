import { ProductListingPage } from "@/components/site/ProductListingPage";

export function meta() {
  return [
    { title: "Objects & Gifts · Form & Field" },
    {
      name: "description",
      content:
        "Botanical candles, beeswax tapers, small delights, and lasting gifts.",
    },
  ];
}

export default function ObjectsGiftsRoute() {
  return (
    <ProductListingPage
      eyebrow="Department Collection"
      title="Objects &amp; gifts."
      description="Small things crafted with meticulous devotion. Natural wax candles, brass holders, and small-batch delights that bring lasting joy."
      defaultDepartment="Objects & gifts"
    />
  );
}
