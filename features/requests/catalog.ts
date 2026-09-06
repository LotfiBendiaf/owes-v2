import type { RequestKind } from "@prisma/client";
import type { ServiceRequestInput } from "@/features/requests/schemas";
import { coworkingTotal, pricing } from "@/lib/pricing";

export const serviceSlugByKind = {
  DOMICILIATION: "domiciliation",
  WEBSITE_BUILDING: "website-building",
  COWORKING: "coworking",
  MEETING: "meeting",
  TRAINING: "training",
  ENTERPRISE_PACK: "pack-entreprise",
} satisfies Record<RequestKind, string>;

export function quoteServiceRequest(input: ServiceRequestInput) {
  switch (input.kind) {
    case "ENTERPRISE_PACK":
      return pricing.enterprisePack;
    case "MEETING":
      return input.option === "full" ? pricing.meeting.fullDay : pricing.meeting.halfDay;
    case "TRAINING":
      return pricing.trainingDay * input.people;
    case "DOMICILIATION":
      return pricing.domiciliation[input.option];
    case "WEBSITE_BUILDING":
      return pricing.websiteBuilding[input.option];
    case "COWORKING":
      return coworkingTotal(input.option, input.people);
  }
}
