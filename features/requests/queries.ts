import "server-only";

import type { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requestScope } from "@/features/requests/policies";

type RequestViewer = { id: string; role: Role };

export function getRecentRequests(viewer: RequestViewer, take = 8) {
  return prisma.serviceRequest.findMany({
    where: requestScope(viewer),
    select: {
      id: true,
      customerName: true,
      kind: true,
      status: true,
      total: true,
      createdAt: true,
      payments: { select: { amount: true, status: true } },
    },
    orderBy: { createdAt: "desc" },
    take,
  });
}

export function listAllRequests(viewer: RequestViewer) {
  return prisma.serviceRequest.findMany({
    where: requestScope(viewer),
    select: {
      id: true,
      subject: true,
      customerName: true,
      email: true,
      kind: true,
      status: true,
      total: true,
    },
    orderBy: { createdAt: "desc" },
  });
}
