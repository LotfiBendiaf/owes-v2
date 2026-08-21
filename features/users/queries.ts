import "server-only";

import { prisma } from "@/lib/prisma";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination";

export async function listUsers({ page, query }: { page: number; query?: string }) {
  const where = query ? { OR: [{ name: { contains: query, mode: "insensitive" as const } }, { email: { contains: query, mode: "insensitive" as const } }] } : {};
  const [total, rows] = await prisma.$transaction([
    prisma.user.count({ where }),
    prisma.user.findMany({ where, select: { id: true, name: true, email: true, role: true, active: true }, orderBy: { createdAt: "desc" }, skip: (page - 1) * DEFAULT_PAGE_SIZE, take: DEFAULT_PAGE_SIZE }),
  ]);
  return { total, rows };
}
