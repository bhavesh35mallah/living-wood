import { ProductListingPage } from "@/components/site/ProductListingPage";

export function meta() {
  return [
    { title: "Textiles · Form & Field" },
    {
      name: "description",
      content:
        "European flax linen cushion covers, organic cotton waffle throws, and washed table linens.",
    },
  ];
}

export default function TextilesRoute() {
  return (
    <ProductListingPage
      eyebrow="Department Collection"
      title="Textiles &amp; linens."
      description="Pure Belgian and French flax linen stone-washed for lived-in comfort, alongside hand-loomed organic cotton throws."
      defaultDepartment="Textiles"
    />
  );
}
