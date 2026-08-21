"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, FileText, LayoutDashboard, Mail, Menu, Settings, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";

function links(role: "ADMIN" | "CLIENT") {
  return [{ label: "Vue d’ensemble", href: "/dashboard", icon: LayoutDashboard }, { label: "Demandes", href: "/dashboard/requests", icon: FileText }, { label: "Notifications", href: "/dashboard/notifications", icon: Bell }, ...(role === "ADMIN" ? [{ label: "Contacts", href: "/dashboard/contacts", icon: Mail }, { label: "Utilisateurs", href: "/dashboard/users", icon: Users }] : []), { label: "Paramètres", href: "/dashboard/settings", icon: Settings }];
}

function NavigationLinks({ role, onNavigate }: { role: "ADMIN" | "CLIENT"; onNavigate?: () => void }) {
  const pathname = usePathname();
  return <nav aria-label="Navigation du tableau de bord" className="grid gap-1">{links(role).map(({ label, href, icon: Icon }) => { const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href); return <Link onClick={onNavigate} aria-current={active ? "page" : undefined} key={href} href={href} className={cn("flex items-center gap-3 border-l-2 border-transparent px-3 py-2.5 text-sm font-medium text-slate-600 hover:border-brand-300 hover:text-brand-800", active && "border-brand-500 bg-white text-brand-800")}><Icon size={17} />{label}</Link>; })}</nav>;
}

export function DesktopDashboardNavigation({ role }: { role: "ADMIN" | "CLIENT" }) {
  return <NavigationLinks role={role} />;
}

export function MobileDashboardNavigation({ role }: { role: "ADMIN" | "CLIENT" }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <><button type="button" onClick={() => dialog.current?.showModal()} className="grid size-10 place-items-center rounded-xl border lg:hidden" aria-label="Ouvrir la navigation"><Menu size={20} /></button><dialog ref={dialog} className="m-0 h-full w-80 max-w-[88vw] bg-white p-5 shadow-2xl backdrop:bg-slate-950/40"><div className="mb-8 flex items-center justify-between"><Link href="/" className="text-xl font-black">OWES</Link><button type="button" onClick={() => dialog.current?.close()} className="grid size-10 place-items-center rounded-xl" aria-label="Fermer la navigation"><X size={20} /></button></div><NavigationLinks role={role} onNavigate={() => dialog.current?.close()} /></dialog></>;
}
