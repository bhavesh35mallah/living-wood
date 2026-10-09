import { describe, it, expect } from "vitest";
import { processConciergeQuery } from "../app/lib/chatbot-engine";
import { products } from "../app/data/catalog";

describe("Atelier Concierge Chatbot Engine", () => {
  it("recommends gifts under $50 correctly", () => {
    const res = processConciergeQuery("Find me gifts under $50", products);
    expect(res.products).toBeDefined();
    expect(res.products!.length).toBeGreaterThan(0);
    expect(res.products!.every((p) => p.price <= 50)).toBe(true);
  });

  it("answers shipping questions accurately", () => {
    const res = processConciergeQuery("How long does shipping take?", products);
    expect(res.text).toContain("Complimentary Shipping");
    expect(res.text).toContain("3–5 business days");
  });

  it("answers return policy questions accurately", () => {
    const res = processConciergeQuery("What is your return policy?", products);
    expect(res.text).toContain("30-day return policy");
  });

  it("answers discount code questions accurately", () => {
    const res = processConciergeQuery("Do you have any discount codes?", products);
    expect(res.text).toContain("AUTUMN10");
    expect(res.text).toContain("FREESHIP");
  });

  it("finds ceramics and stoneware mugs", () => {
    const res = processConciergeQuery("Show me stoneware coffee mugs", products);
    expect(res.products).toBeDefined();
    const mug = res.products!.find((p) => p.id === "everyday-stoneware-mug");
    expect(mug).toBeDefined();
  });

  it("answers care and wash questions accurately", () => {
    const res = processConciergeQuery("How do I care for stoneware and linen?", products);
    expect(res.text).toContain("Dishwasher & microwave safe");
    expect(res.text).toContain("Pure Flax Linen");
  });
});
