import { z } from "zod";

const commonRequestFields = {
  name: z.string().trim().min(2).max(120),
  email: z.email(),
  phone: z.string().trim().min(6).max(30),
  subject: z.string().trim().min(2).max(200),
  date: z.string().refine((value) => !value || !Number.isNaN(Date.parse(`${value}T12:00:00Z`)), "Date invalide").optional(),
  notes: z.string().trim().max(2000).optional(),
  people: z.coerce.number().int().min(1).max(100).default(1),
};

export const serviceRequestSchema = z.discriminatedUnion("kind", [
  z.object({ ...commonRequestFields, kind: z.literal("MEETING"), option: z.enum(["half", "full"]) }),
  z.object({ ...commonRequestFields, kind: z.literal("COWORKING"), option: z.enum(["day", "week", "month"]) }),
  z.object({ ...commonRequestFields, kind: z.literal("TRAINING"), option: z.literal("day") }),
  z.object({ ...commonRequestFields, kind: z.literal("DOMICILIATION"), option: z.enum(["standard", "premium", "exclusive"]) }),
  z.object({ ...commonRequestFields, kind: z.literal("WEBSITE_BUILDING"), option: z.enum(["starter", "business", "ecommerce"]) }),
]);

export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;
