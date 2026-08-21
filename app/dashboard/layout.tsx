import Link from "next/link";
import { DashboardBreadcrumbs } from "@/components/dashboard-breadcrumbs";
import { DesktopDashboardNavigation, MobileDashboardNavigation } from "@/components/dashboard-navigation";
import { SignOutButton } from "@/components/sign-out-button";
import { requireUser } from "@/lib/authorization";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireUser();
  const role = session.user.role;
  return <div className="min-h-screen bg-surface-subtle lg:grid lg:grid-cols-[260px_1fr]"><aside className="hidden border-r border-slate-200 bg-surface p-5 lg:flex lg:flex-col"><Link href="/" className="px-3 text-xl font-black">OWES</Link><p className="mt-8 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">Espace {role === "ADMIN" ? "admin" : "client"}</p><div className="mt-3"><DesktopDashboardNavigation role={role} /></div><div className="mt-auto border-t pt-4"><SignOutButton /></div></aside><div className="min-w-0"><header className="flex min-h-18 items-center justify-between gap-4 border-b border-slate-200 bg-surface px-4 py-3 sm:px-8"><div className="flex min-w-0 items-center gap-3"><MobileDashboardNavigation role={role} /><div className="min-w-0"><p className="truncate text-sm font-semibold">{session.user.name}</p><p className="truncate text-xs text-slate-500">{session.user.email}</p></div></div><span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-800">{role === "ADMIN" ? "ADMIN" : "CLIENT"}</span></header><main className="p-4 sm:p-8"><DashboardBreadcrumbs />{children}</main></div></div>;
}
