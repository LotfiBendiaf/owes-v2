"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { actionSuccess, validationFailure, type ActionResult } from "@/lib/action-result";
import { recordAudit } from "@/lib/audit";
import { requireUser } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";

const profileSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(30).optional(),
  company: z.string().trim().max(160).optional(),
  address: z.string().trim().max(300).optional(),
});

export async function updateProfile(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const session = await requireUser();
  const parsed = profileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);
  const input = parsed.data;

  await prisma.$transaction(async (tx) => {
    await tx.user.update({ where: { id: session.user.id }, data: { name: input.name, phone: input.phone || null } });
    await tx.clientProfile.upsert({ where: { userId: session.user.id }, update: { company: input.company || null, address: input.address || null }, create: { userId: session.user.id, company: input.company || null, address: input.address || null } });
    await recordAudit(tx, { actorId: session.user.id, action: "user.profile_updated", entityType: "User", entityId: session.user.id });
  });

  revalidatePath("/dashboard/settings");
  return actionSuccess("Votre profil a été mis à jour.");
}
