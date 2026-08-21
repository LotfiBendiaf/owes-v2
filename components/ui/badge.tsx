import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  const value = typeof children === "string" ? children : "";
  const statuses: Record<string, { label: string; tone: string }> = {
    DRAFT: { label: "Brouillon", tone: "bg-slate-100 text-slate-700" }, SUBMITTED: { label: "Reçue", tone: "bg-blue-50 text-blue-800" }, CONFIRMED: { label: "Confirmée", tone: "bg-indigo-50 text-indigo-800" }, IN_PROGRESS: { label: "En cours", tone: "bg-amber-50 text-amber-900" }, COMPLETED: { label: "Terminée", tone: "bg-emerald-50 text-emerald-800" }, CANCELLED: { label: "Annulée", tone: "bg-red-50 text-red-800" }, PENDING: { label: "En attente", tone: "bg-amber-50 text-amber-900" }, PAID: { label: "Payé", tone: "bg-emerald-50 text-emerald-800" }, FAILED: { label: "Échoué", tone: "bg-red-50 text-red-800" }, REFUNDED: { label: "Remboursé", tone: "bg-slate-100 text-slate-700" }, INACTIF: { label: "Inactif", tone: "bg-red-50 text-red-800" }, ADMIN: { label: "Administrateur", tone: "bg-indigo-50 text-indigo-800" }, CLIENT: { label: "Client", tone: "bg-blue-50 text-blue-800" },
  };
  const status = statuses[value];
  return <span className={cn("inline-flex rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-900", status?.tone, className)}>{status?.label ?? children}</span>;
}
