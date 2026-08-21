"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";

export async function markAllNotificationsRead() {
  const session = await requireUser();
  await prisma.notification.updateMany({ where: { userId: session.user.id, readAt: null }, data: { readAt: new Date() } });
  revalidatePath("/dashboard/notifications");
}
