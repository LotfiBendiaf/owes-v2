import { describe, expect, it } from "vitest";
import { quoteServiceRequest } from "@/features/requests/catalog";

describe("service request pricing", () => {
  it("quotes every active offer from server-owned rules", () => {
    const common = { name: "Client Test", email: "client@example.com", phone: "0550000000", subject: "Test", people: 1 };
    expect(quoteServiceRequest({ ...common, kind: "MEETING", option: "full" })).toBe(8_000);
    expect(quoteServiceRequest({ ...common, kind: "COWORKING", option: "week", people: 3 })).toBe(8_001);
    expect(quoteServiceRequest({ ...common, kind: "TRAINING", option: "day", people: 2 })).toBe(18_000);
    expect(quoteServiceRequest({ ...common, kind: "DOMICILIATION", option: "standard" })).toBe(15_000);
    expect(quoteServiceRequest({ ...common, kind: "WEBSITE_BUILDING", option: "business" })).toBe(150_000);
  });
});
