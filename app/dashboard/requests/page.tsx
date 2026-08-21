import { updateRequestStatus } from "@/app/dashboard/requests/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { inputClass } from "@/components/ui/field";
import { canManageRequests } from "@/features/requests/policies";
import { listAllRequests } from "@/features/requests/queries";
import { requireUser } from "@/lib/authorization";
import { money } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function RequestsPage() {
  const session = await requireUser();
  const rows = await listAllRequests({ id: session.user.id, role: session.user.role });
  const canManage = canManageRequests(session.user.role);

  return <div><h1 className="text-3xl font-black">Demandes</h1><p className="mt-2 text-slate-500">Suivez les réservations et prestations de bout en bout.</p><Card className="mt-8"><CardHeader><CardTitle>{rows.length} demande(s)</CardTitle></CardHeader><CardContent><div className="grid gap-3">{rows.map((request) => <div key={request.id} className="grid gap-3 rounded-xl border p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"><div><p className="font-semibold">{request.subject}</p><p className="mt-1 text-xs text-slate-500">{request.customerName} · {request.email} · {request.kind}</p></div><p className="font-bold">{money(request.total)}</p>{canManage ? <form action={updateRequestStatus} className="flex gap-2"><input type="hidden" name="requestId" value={request.id} /><select name="status" defaultValue={request.status} className={inputClass}><option value="SUBMITTED">Reçue</option><option value="CONFIRMED">Confirmée</option><option value="IN_PROGRESS">En cours</option><option value="COMPLETED">Terminée</option><option value="CANCELLED">Annulée</option></select><Button size="sm">OK</Button></form> : <Badge>{request.status}</Badge>}</div>)}{!rows.length && <p className="py-10 text-center text-slate-500">Aucune demande.</p>}</div></CardContent></Card></div>;
}
