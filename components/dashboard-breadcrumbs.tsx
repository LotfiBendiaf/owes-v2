"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labels: Record<string, string> = { dashboard: "Tableau de bord", requests: "Demandes", notifications: "Notifications", contacts: "Contacts", users: "Utilisateurs", settings: "Paramètres" };

export function DashboardBreadcrumbs() {
  const parts = usePathname().split("/").filter(Boolean);
  if (parts.length <= 1) return null;
  return <nav aria-label="Fil d’Ariane" className="mb-5 flex flex-wrap gap-2 text-xs text-slate-500">{parts.map((part, index) => { const href = `/${parts.slice(0, index + 1).join("/")}`; const label = labels[part] ?? (index === parts.length - 1 ? "Détail" : part); return <span key={href} className="flex gap-2">{index > 0 && <span aria-hidden="true">/</span>}{index === parts.length - 1 ? <span aria-current="page">{label}</span> : <Link href={href}>{label}</Link>}</span>; })}</nav>;
}
