import Link from "next/link";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { inputClass } from "@/components/ui/field";
import { Pagination } from "@/components/pagination";
import { RequestStatusForm } from "@/components/request-status-form";
import { canManageRequests } from "@/features/requests/policies";
import { listRequests } from "@/features/requests/queries";
import { requireUser } from "@/lib/authorization";
import { normalizePage, totalPages } from "@/lib/pagination";
import { money } from "@/lib/utils";

export const dynamic = "force-dynamic";
const statusSchema = z.enum(["DRAFT", "SUBMITTED", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]);

export default async function RequestsPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; status?: string }> }) {
  const session = await requireUser();
  const params = await searchParams;
  const page = normalizePage(params.page);
  const query = params.q?.trim().slice(0, 100);
  const parsedStatus = statusSchema.safeParse(params.status);
  const { rows, total } = await listRequests({ id: session.user.id, role: session.user.role }, { page, query, status: parsedStatus.success ? parsedStatus.data : undefined });
  const canManage = canManageRequests(session.user.role);

  return (
    <div>
      <h1 className="text-3xl font-black">Demandes</h1>
      <p className="mt-2 text-slate-500">Suivez les réservations et prestations de bout en bout.</p>
      <form className="mt-6 grid gap-3 rounded-2xl border bg-white p-4 sm:grid-cols-[1fr_220px_auto]"><input aria-label="Rechercher des demandes" className={inputClass} name="q" defaultValue={query} placeholder="Client, e-mail ou objet…" /><select aria-label="Filtrer par statut" className={inputClass} name="status" defaultValue={parsedStatus.success ? parsedStatus.data : ""}><option value="">Tous les statuts</option><option value="SUBMITTED">Reçues</option><option value="CONFIRMED">Confirmées</option><option value="IN_PROGRESS">En cours</option><option value="COMPLETED">Terminées</option><option value="CANCELLED">Annulées</option></select><Button type="submit">Filtrer</Button></form>
      <Card className="mt-6"><CardHeader><CardTitle>{total} demande(s)</CardTitle></CardHeader><CardContent><div className="grid gap-3">{rows.map((request) => <article key={request.id} className="grid gap-4 rounded-xl border p-4 lg:grid-cols-[1fr_auto] lg:items-center"><div><div className="flex flex-wrap items-center gap-3"><Link href={`/dashboard/requests/${request.id}`} className="font-semibold text-brand-950 hover:text-brand-600">{request.subject}</Link><Badge>{request.status}</Badge></div><p className="mt-1 text-xs text-slate-500">{request.customerName} · {request.email} · {request.kind}</p><p className="mt-3 font-bold">{money(request.total)}</p></div>{canManage && <RequestStatusForm requestId={request.id} current={request.status} />}</article>)}{!rows.length && <p className="py-10 text-center text-slate-500">Aucun résultat.</p>}</div><Pagination page={page} pages={totalPages(total)} pathname="/dashboard/requests" params={{ q: query, status: parsedStatus.success ? parsedStatus.data : undefined }} /></CardContent></Card>
    </div>
  );
}
