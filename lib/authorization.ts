import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireUser() {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  const access = await prisma.user.findUnique({ where: { id: session.user.id }, select: { active: true } });
  if (!access?.active) redirect("/login?error=inactive");
  return session;
}

export async function requireRole(...roles: Role[]) {
  const session = await requireUser();
  const role = session.user.role as Role;
  if (!roles.includes(role)) redirect("/dashboard");
  return session;
}
