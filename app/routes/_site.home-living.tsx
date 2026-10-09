import { ProductListingPage } from "@/components/site/ProductListingPage";

export function meta() {
  return [
    { title: "Home & Living · Form & Field" },
    {
      name: "description",
      content:
        "Handcrafted ceramic vessels, sculptural pottery, and quiet objects for living spaces.",
    },
  ];
}

export default function HomeLivingRoute() {
  return (
    <ProductListingPage
      eyebrow="Department Collection"
      title="Home &amp; living."
      description="Make room for quiet corners, honest textures, and objects that bring calm to open shelves and quiet rooms."
      defaultDepartment="Home & living"
    />
  );
}
