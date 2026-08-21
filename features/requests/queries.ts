import "server-only";

import type { Prisma, RequestStatus, Role } from "@prisma/client";
import { requestScope } from "@/features/requests/policies";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination";
import { prisma } from "@/lib/prisma";

type RequestViewer = { id: string; role: Role };

export async function getDashboardData(viewer: RequestViewer) {
  const scope = requestScope(viewer);
  const [count, inProgress, completed, total, paid, recent] = await prisma.$transaction([
    prisma.serviceRequest.count({ where: scope }),
    prisma.serviceRequest.count({ where: { ...scope, status: { notIn: ["COMPLETED", "CANCELLED"] } } }),
    prisma.serviceRequest.count({ where: { ...scope, status: "COMPLETED" } }),
    prisma.serviceRequest.aggregate({ where: scope, _sum: { total: true } }),
    prisma.payment.aggregate({ where: { status: "PAID", request: scope }, _sum: { amount: true } }),
    prisma.serviceRequest.findMany({ where: scope, select: { id: true, customerName: true, kind: true, status: true, total: true, createdAt: true }, orderBy: { createdAt: "desc" }, take: 8 }),
  ]);
  return { count, inProgress, completed, total: Number(total._sum.total ?? 0), paid: Number(paid._sum.amount ?? 0), recent };
}

export async function listRequests(viewer: RequestViewer, filters: { page: number; query?: string; status?: RequestStatus }) {
  const search: Prisma.ServiceRequestWhereInput = filters.query ? { OR: [
    { subject: { contains: filters.query, mode: "insensitive" } },
    { customerName: { contains: filters.query, mode: "insensitive" } },
    { email: { contains: filters.query, mode: "insensitive" } },
  ] } : {};
  const where: Prisma.ServiceRequestWhereInput = { ...requestScope(viewer), ...search, ...(filters.status ? { status: filters.status } : {}) };
  const [total, rows] = await prisma.$transaction([
    prisma.serviceRequest.count({ where }),
    prisma.serviceRequest.findMany({ where, select: { id: true, subject: true, customerName: true, email: true, kind: true, status: true, total: true }, orderBy: { createdAt: "desc" }, skip: (filters.page - 1) * DEFAULT_PAGE_SIZE, take: DEFAULT_PAGE_SIZE }),
  ]);
  return { total, rows };
}

export function getRequestDetails(viewer: RequestViewer, id: string) {
  return prisma.serviceRequest.findFirst({
    where: { id, ...requestScope(viewer) },
    include: {
      service: { select: { name: true, slug: true } },
      payments: { orderBy: { createdAt: "desc" } },
      statusHistory: { include: { actor: { select: { name: true } } }, orderBy: { createdAt: "desc" } },
      files: { orderBy: { createdAt: "desc" } },
    },
  });
}
