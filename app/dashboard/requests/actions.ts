"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireRole } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";
import { canTransitionRequest } from "@/features/requests/status";
import { recordAudit } from "@/lib/audit";
import { AppError } from "@/lib/errors";

const schema = z.object({ requestId: z.string().min(1), status: z.enum(["SUBMITTED", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]) });
export async function updateRequestStatus(formData: FormData) {
  const session = await requireRole("ADMIN");
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new AppError("BUSINESS_RULE", "Mise à jour de statut invalide.");
  await prisma.$transaction(async (tx) => {
    const request = await tx.serviceRequest.findUnique({ where: { id: parsed.data.requestId }, select: { status: true } });
    if (!request) throw new AppError("NOT_FOUND", "Demande introuvable.");
    if (!canTransitionRequest(request.status, parsed.data.status)) throw new AppError("BUSINESS_RULE", "Cette transition de statut n’est pas autorisée.");
    await tx.serviceRequest.update({ where: { id: parsed.data.requestId }, data: { status: parsed.data.status } });
    await recordAudit(tx, { actorId: session.user.id, action: "request.status_changed", entityType: "ServiceRequest", entityId: parsed.data.requestId, metadata: { from: request.status, to: parsed.data.status } });
  });
  revalidatePath("/dashboard"); revalidatePath("/dashboard/requests");
}
