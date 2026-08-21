import type { Role } from "@prisma/client";

export function requestScope(user: { id: string; role: Role }) {
  return user.role === "ADMIN" ? {} : { clientId: user.id };
}

export function canManageRequests(role: Role) {
  return role === "ADMIN";
}
