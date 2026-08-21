import "server-only";

import type { Prisma, PrismaClient } from "@prisma/client";

type AuditClient = Pick<PrismaClient, "auditLog"> | Prisma.TransactionClient;

export function recordAudit(
  db: AuditClient,
  event: {
    actorId?: string;
    action: string;
    entityType: string;
    entityId: string;
    metadata?: Prisma.InputJsonValue;
  },
) {
  return db.auditLog.create({ data: event });
}
