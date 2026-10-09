import { ProductListingPage } from "@/components/site/ProductListingPage";

export function meta() {
  return [
    { title: "Table & Kitchen · Form & Field" },
    {
      name: "description",
      content:
        "Everyday mugs, oak boards, ceramic carafes, and considered tableware for unhurried meals.",
    },
  ];
}

export default function TableKitchenRoute() {
  return (
    <ProductListingPage
      eyebrow="Department Collection"
      title="Table &amp; kitchen."
      description="Handmade stoneware mugs, solid European oak serving boards, and pitchers meant for gathering around unhurried meals."
      defaultDepartment="Table & kitchen"
    />
  );
}
