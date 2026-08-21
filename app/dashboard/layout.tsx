import Link from "next/link";
import { DashboardBreadcrumbs } from "@/components/dashboard-breadcrumbs";
import { DesktopDashboardNavigation, MobileDashboardNavigation } from "@/components/dashboard-navigation";
import { SignOutButton } from "@/components/sign-out-button";
import { requireUser } from "@/lib/authorization";
import { OwesLogoSlog } from "@/components/owes-logo";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireUser();
  const role = session.user.role;
  return <div className="editorial-dashboard min-h-screen bg-[#fbfaf7] lg:grid lg:grid-cols-[270px_1fr]"><aside className="hidden border-r border-brand-950/15 bg-[#f4f0e7] p-6 lg:flex lg:flex-col"><Link href="/" className="border-b border-brand-950/15 px-2 pb-6 text-2xl font-black tracking-tight"><OwesLogoSlog className="h-14 w-auto" priority /></Link><p className="mt-8 px-2 font-mono text-[10px] uppercase tracking-[.2em] text-brand-700">Espace {role === "ADMIN" ? "administration" : "client"}</p><div className="mt-5"><DesktopDashboardNavigation role={role} /></div><div className="mt-auto border-t border-brand-950/15 pt-4"><SignOutButton /></div></aside><div className="min-w-0"><header className="flex min-h-20 items-center justify-between gap-4 border-b border-brand-950/15 bg-white px-4 py-3 sm:px-8"><div className="flex min-w-0 items-center gap-3"><MobileDashboardNavigation role={role} /><div className="min-w-0"><p className="truncate text-sm font-bold text-brand-950">{session.user.name}</p><p className="truncate font-mono text-[10px] text-slate-500">{session.user.email}</p></div></div><span className="bg-[#e7edff] px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-brand-800">{role === "ADMIN" ? "ADMIN" : "CLIENT"}</span></header><main className="mx-auto max-w-[1500px] p-4 sm:p-8 lg:p-10"><DashboardBreadcrumbs />{children}</main></div></div>;
}
