import { FestiveSection } from "@/components/site/FestiveSection";
import { ProductListingPage } from "@/components/site/ProductListingPage";

export function meta() {
  return [
    { title: "The Festive Edit · Form & Field Atelier" },
    {
      name: "description",
      content:
        "Handcrafted objects for winter dinners, golden evenings with loved ones, and slow gift-giving. Complimentary gift wrapping on all holiday orders.",
    },
  ];
}

export default function FestiveRoute() {
  return (
    <div className="flex flex-col">
      {/* Immersive Festive Banner & Bundles Section */}
      <FestiveSection />

      {/* Full Catalog Listing for Festive & Gifting */}
      <ProductListingPage
        eyebrow="The Celebration Edit"
        title="Objects for the Festive Table & Home"
        description="Pieces made to be gathered around. Wheel-thrown stoneware, pure beeswax tapers, and heirloom French linen that make holiday rituals warm and memorable."
      />
    </div>
  );
}
