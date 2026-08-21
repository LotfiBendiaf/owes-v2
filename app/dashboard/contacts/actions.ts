"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { recordAudit } from "@/lib/audit";
import { requireRole } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";

export async function setContactResolved(formData: FormData) {
  const session = await requireRole("ADMIN");
  const parsed = z.object({ id: z.string().min(1), resolved: z.enum(["true", "false"]) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const resolved = parsed.data.resolved === "true";
  await prisma.$transaction(async (tx) => {
    await tx.contactMessage.update({ where: { id: parsed.data.id }, data: { resolved } });
    await recordAudit(tx, { actorId: session.user.id, action: resolved ? "contact.resolved" : "contact.reopened", entityType: "ContactMessage", entityId: parsed.data.id });
  });
  revalidatePath("/dashboard/contacts");
}
