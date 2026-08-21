"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { quoteServiceRequest, serviceSlugByKind } from "@/features/requests/catalog";
import { serviceRequestSchema } from "@/features/requests/schemas";
import { actionFailure, actionSuccess, validationFailure, type ActionResult } from "@/lib/action-result";
import { recordAudit } from "@/lib/audit";
import { getSession } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";
import { allowRequest } from "@/lib/rate-limit";

export type ActionState = ActionResult;

export async function createServiceRequest(_: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await allowRequest("service-request", 5, 10 * 60_000))) {
    return actionFailure("Trop de demandes. Veuillez réessayer dans quelques minutes.");
  }

  const parsed = serviceRequestSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);

  const input = parsed.data;
  const total = quoteServiceRequest(input);
  const session = await getSession();
  const service = await prisma.service.findUnique({ where: { slug: serviceSlugByKind[input.kind] }, select: { id: true, active: true } });
  if (!service?.active) return actionFailure("Ce service est momentanément indisponible.");

  await prisma.$transaction(async (tx) => {
    const request = await tx.serviceRequest.create({
      data: {
        kind: input.kind,
        customerName: input.name,
        email: input.email.toLowerCase(),
        phone: input.phone,
        subject: input.subject,
        scheduledFor: input.date ? new Date(`${input.date}T12:00:00Z`) : null,
        notes: input.notes,
        details: { option: input.option, people: input.people },
        total,
        clientId: session?.user.id,
        serviceId: service.id,
        payments: { create: { amount: total, method: "ON_SITE" } },
      },
    });
    await recordAudit(tx, { actorId: session?.user.id, action: "request.created", entityType: "ServiceRequest", entityId: request.id, metadata: { kind: input.kind, total } });
  });

  revalidatePath("/dashboard");
  return actionSuccess("Votre demande a bien été enregistrée.");
}

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email(),
  subject: z.string().trim().min(2).max(200),
  message: z.string().trim().min(10).max(5000),
});

export async function sendContact(_: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await allowRequest("contact", 5, 10 * 60_000))) {
    return actionFailure("Trop de messages. Veuillez réessayer dans quelques minutes.");
  }
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);
  await prisma.contactMessage.create({ data: parsed.data });
  return actionSuccess("Merci. Notre équipe vous répondra rapidement.");
}
