import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequestDetails } from "@/features/requests/queries";
import { requireUser } from "@/lib/authorization";
import { money } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function RequestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireUser();
  const { id } = await params;
  const request = await getRequestDetails({ id: session.user.id, role: session.user.role }, id);
  if (!request) notFound();

  return <div><Link href="/dashboard/requests" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700"><ArrowLeft size={16} />Toutes les demandes</Link><div className="mt-5 flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-semibold text-brand-700">{request.service?.name ?? request.kind}</p><h1 className="mt-1 text-3xl font-black">{request.subject}</h1><p className="mt-2 text-sm text-slate-500">Créée le {request.createdAt.toLocaleDateString("fr-DZ")}</p></div><Badge>{request.status}</Badge></div><div className="mt-8 grid gap-6 lg:grid-cols-[1fr_.75fr]"><div className="grid gap-6"><Card><CardHeader><CardTitle>Demande</CardTitle></CardHeader><CardContent className="grid gap-4 text-sm sm:grid-cols-2"><Detail label="Client" value={request.customerName} /><Detail label="E-mail" value={request.email} /><Detail label="Téléphone" value={request.phone} /><Detail label="Montant" value={money(request.total)} />{request.scheduledFor && <Detail label="Date souhaitée" value={request.scheduledFor.toLocaleDateString("fr-DZ")} />}{request.notes && <div className="sm:col-span-2"><Detail label="Précisions" value={request.notes} /></div>}</CardContent></Card><Card><CardHeader><CardTitle>Historique du statut</CardTitle></CardHeader><CardContent><div className="grid gap-4">{request.statusHistory.map((event) => <div key={event.id} className="border-l-2 border-brand-200 pl-4"><p className="text-sm font-semibold">{event.from} → {event.to}</p><p className="mt-1 text-xs text-slate-500">{event.createdAt.toLocaleString("fr-DZ")} · {event.actor?.name ?? "Système"}</p></div>)}{!request.statusHistory.length && <p className="text-sm text-slate-500">Aucun changement enregistré.</p>}</div></CardContent></Card></div><Card><CardHeader><CardTitle>Paiements</CardTitle></CardHeader><CardContent className="grid gap-3">{request.payments.map((payment) => <div key={payment.id} className="rounded-xl border p-3 text-sm"><div className="flex justify-between gap-3"><span className="font-semibold">{money(payment.amount)}</span><Badge>{payment.status}</Badge></div><p className="mt-2 text-xs text-slate-500">{payment.method} · {payment.createdAt.toLocaleDateString("fr-DZ")}</p></div>)}</CardContent></Card></div></div>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 font-medium text-slate-800">{value}</p></div>;
}
