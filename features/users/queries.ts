import "server-only";

import { prisma } from "@/lib/prisma";

export function listUsers() {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, active: true },
    orderBy: { createdAt: "desc" },
  });
}
