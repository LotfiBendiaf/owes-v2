"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/authorization";
import { coworkingTotal, pricing } from "@/lib/pricing";
import { allowRequest } from "@/lib/rate-limit";

export type ActionState = { ok?: boolean; message?: string; errors?: Record<string, string[]> };

const commonRequestFields = {
  name: z.string().trim().min(2),
  email: z.email(),
  phone: z.string().trim().min(6).max(30),
  subject: z.string().trim().min(2).max(200),
  date: z.string().refine((value) => !value || !Number.isNaN(Date.parse(`${value}T12:00:00Z`)), "Date invalide").optional(),
  notes: z.string().trim().max(2000).optional(),
  people: z.coerce.number().int().min(1).max(100).default(1),
};

const requestSchema = z.discriminatedUnion("kind", [
  z.object({ ...commonRequestFields, kind: z.literal("MEETING"), option: z.enum(["half", "full"]) }),
  z.object({ ...commonRequestFields, kind: z.literal("COWORKING"), option: z.enum(["day", "week", "month"]) }),
  z.object({ ...commonRequestFields, kind: z.literal("TRAINING"), option: z.literal("day") }),
  z.object({ ...commonRequestFields, kind: z.literal("DOMICILIATION"), option: z.enum(["standard", "premium", "exclusive"]) }),
  z.object({ ...commonRequestFields, kind: z.literal("WEBSITE_BUILDING"), option: z.enum(["starter", "business", "ecommerce"]) }),
]);

export async function createServiceRequest(_: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await allowRequest("service-request", 5, 10 * 60_000))) {
    return { message: "Trop de demandes. Veuillez réessayer dans quelques minutes." };
  }
  const parsed = requestSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors, message: "Vérifiez les champs du formulaire." };
  const d = parsed.data;
  const total = d.kind === "MEETING" ? (d.option === "full" ? pricing.meeting.fullDay : pricing.meeting.halfDay)
    : d.kind === "TRAINING" ? pricing.trainingDay * d.people
    : d.kind === "DOMICILIATION" ? pricing.domiciliation[d.option as keyof typeof pricing.domiciliation]
    : d.kind === "WEBSITE_BUILDING" ? pricing.websiteBuilding[d.option]
    : coworkingTotal(d.option as "day" | "week" | "month", d.people);
  const session = await getSession();
  await prisma.serviceRequest.create({ data: { kind: d.kind, customerName: d.name, email: d.email.toLowerCase(), phone: d.phone, subject: d.subject, scheduledFor: d.date ? new Date(`${d.date}T12:00:00Z`) : null, notes: d.notes, details: { option: d.option, people: d.people }, total, clientId: session?.user.id, payments: { create: { amount: total, method: "ON_SITE" } } } });
  revalidatePath("/dashboard");
  return { ok: true, message: "Votre demande a bien été enregistrée." };
}

const contactSchema = z.object({ name: z.string().trim().min(2), email: z.email(), subject: z.string().trim().min(2), message: z.string().trim().min(10).max(5000) });
export async function sendContact(_: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await allowRequest("contact", 5, 10 * 60_000))) {
    return { message: "Trop de messages. Veuillez réessayer dans quelques minutes." };
  }
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors, message: "Vérifiez les champs du formulaire." };
  await prisma.contactMessage.create({ data: parsed.data });
  return { ok: true, message: "Merci. Notre équipe vous répondra rapidement." };
}
