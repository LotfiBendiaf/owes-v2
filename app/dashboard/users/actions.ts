"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireRole } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";

const updateUserSchema = z.object({ userId: z.string().min(1), role: z.enum(["ADMIN", "EXPERT", "CLIENT"]), active: z.enum(["true", "false"]) });

export async function updateUserAccess(formData: FormData) {
  const session = await requireRole("ADMIN");
  const parsed = updateUserSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error("Invalid user access update");
  if (parsed.data.userId === session.user.id && (parsed.data.role !== "ADMIN" || parsed.data.active === "false")) throw new Error("You cannot remove your own administrator access");
  await prisma.user.update({ where: { id: parsed.data.userId }, data: { role: parsed.data.role, active: parsed.data.active === "true" } });
  revalidatePath("/dashboard/users");
}
