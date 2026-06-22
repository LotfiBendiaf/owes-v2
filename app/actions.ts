"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/authorization";
import { coworkingTotal, pricing } from "@/lib/pricing";

export type ActionState = { ok?: boolean; message?: string; errors?: Record<string, string[]> };

const requestSchema = z.object({
  kind: z.enum(["MEETING", "COWORKING", "TRAINING", "DOMICILIATION"]),
  name: z.string().trim().min(2), email: z.email(), phone: z.string().trim().min(6), subject: z.string().trim().min(2),
  date: z.string().optional(), notes: z.string().max(2000).optional(), option: z.string().min(1), people: z.coerce.number().int().min(1).max(100).default(1),
});

export async function createServiceRequest(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = requestSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors, message: "Vérifiez les champs du formulaire." };
  const d = parsed.data;
  const total = d.kind === "MEETING" ? (d.option === "full" ? pricing.meeting.fullDay : pricing.meeting.halfDay)
    : d.kind === "TRAINING" ? pricing.trainingDay * d.people
    : d.kind === "DOMICILIATION" ? pricing.domiciliation[d.option as keyof typeof pricing.domiciliation]
    : coworkingTotal(d.option as "day" | "week" | "month", d.people);
  const session = await getSession();
  await prisma.serviceRequest.create({ data: { kind: d.kind, customerName: d.name, email: d.email.toLowerCase(), phone: d.phone, subject: d.subject, scheduledFor: d.date ? new Date(`${d.date}T12:00:00Z`) : null, notes: d.notes, details: { option: d.option, people: d.people }, total, clientId: session?.user.id, payments: { create: { amount: total, method: "ON_SITE" } } } });
  revalidatePath("/dashboard");
  return { ok: true, message: "Votre demande a bien été enregistrée." };
}

const contactSchema = z.object({ name: z.string().trim().min(2), email: z.email(), subject: z.string().trim().min(2), message: z.string().trim().min(10).max(5000) });
export async function sendContact(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors, message: "Vérifiez les champs du formulaire." };
  await prisma.contactMessage.create({ data: parsed.data });
  return { ok: true, message: "Merci. Notre équipe vous répondra rapidement." };
}
