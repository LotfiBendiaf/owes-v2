"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireRole } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";
import { recordAudit } from "@/lib/audit";
import { AppError } from "@/lib/errors";

const updateUserSchema = z.object({ userId: z.string().min(1), role: z.enum(["ADMIN", "CLIENT"]), active: z.enum(["true", "false"]) });

export async function updateUserAccess(formData: FormData) {
  const session = await requireRole("ADMIN");
  const parsed = updateUserSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new AppError("BUSINESS_RULE", "Mise à jour d’accès invalide.");
  if (parsed.data.userId === session.user.id && (parsed.data.role !== "ADMIN" || parsed.data.active === "false")) throw new AppError("BUSINESS_RULE", "Vous ne pouvez pas retirer votre propre accès administrateur.");
  await prisma.$transaction(async (tx) => {
    const current = await tx.user.findUnique({ where: { id: parsed.data.userId }, select: { role: true, active: true } });
    if (!current) throw new AppError("NOT_FOUND", "Utilisateur introuvable.");
    const active = parsed.data.active === "true";
    await tx.user.update({ where: { id: parsed.data.userId }, data: { role: parsed.data.role, active } });
    await recordAudit(tx, { actorId: session.user.id, action: "user.access_changed", entityType: "User", entityId: parsed.data.userId, metadata: { fromRole: current.role, toRole: parsed.data.role, fromActive: current.active, toActive: active } });
  });
  revalidatePath("/dashboard/users");
}
