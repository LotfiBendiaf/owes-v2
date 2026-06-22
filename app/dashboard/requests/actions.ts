"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireRole } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";

const schema = z.object({ requestId: z.string().min(1), status: z.enum(["SUBMITTED", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]) });
export async function updateRequestStatus(formData: FormData) {
  const session = await requireRole("ADMIN", "EXPERT");
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error("Invalid request status update");
  const request = await prisma.serviceRequest.findUnique({ where: { id: parsed.data.requestId }, select: { expertId: true } });
  if (!request || (session.user.role === "EXPERT" && request.expertId !== session.user.id)) throw new Error("Forbidden");
  await prisma.serviceRequest.update({ where: { id: parsed.data.requestId }, data: { status: parsed.data.status } });
  revalidatePath("/dashboard"); revalidatePath("/dashboard/requests");
}
