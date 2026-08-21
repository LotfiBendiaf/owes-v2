import { describe, expect, it } from "vitest";
import { allowedRequestTransitions, canTransitionRequest } from "@/features/requests/status";

describe("request status transitions", () => {
  it("allows the operational happy path", () => {
    expect(canTransitionRequest("SUBMITTED", "CONFIRMED")).toBe(true);
    expect(canTransitionRequest("CONFIRMED", "IN_PROGRESS")).toBe(true);
    expect(canTransitionRequest("IN_PROGRESS", "COMPLETED")).toBe(true);
  });

  it("blocks reopening terminal states", () => {
    expect(allowedRequestTransitions("COMPLETED")).toEqual([]);
    expect(canTransitionRequest("CANCELLED", "SUBMITTED")).toBe(false);
  });
});
