import { describe, expect, it } from "vitest";
import { requestScope } from "@/features/requests/policies";
import { serviceRequestSchema } from "@/features/requests/schemas";
import { actionFailure, actionSuccess, validationFailure } from "@/lib/action-result";

describe("request validation and authorization boundary", () => {
  it("scopes clients to their own records and leaves administrators unscoped", () => {
    expect(requestScope({ id: "client-1", role: "CLIENT" })).toEqual({ clientId: "client-1" });
    expect(requestScope({ id: "admin-1", role: "ADMIN" })).toEqual({});
  });

  it("rejects a pricing option from another service kind", () => {
    const result = serviceRequestSchema.safeParse({ kind: "WEBSITE_BUILDING", option: "month", name: "Client Test", email: "client@example.com", phone: "0550000000", subject: "Site", people: 1 });
    expect(result.success).toBe(false);
  });

  it("returns stable, serializable server-action result contracts", () => {
    expect(actionSuccess("Créée")).toEqual({ ok: true, message: "Créée" });
    expect(actionFailure("Refusée")).toEqual({ ok: false, message: "Refusée" });
    expect(validationFailure({ email: ["E-mail invalide"] })).toEqual({
      ok: false,
      errors: { email: ["E-mail invalide"] },
      message: "Vérifiez les champs du formulaire.",
    });
  });
});
