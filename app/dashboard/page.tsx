import { Banknote, CheckCircle2, Clock3, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardData } from "@/features/requests/queries";
import { requireUser } from "@/lib/authorization";
import { money } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await requireUser();
  const role = session.user.role;
  const dashboard = await getDashboardData({ id: session.user.id, role });
  const requests = dashboard.recent;
  const cards = [
    { label: "Demandes", value: dashboard.count, icon: FileText },
    { label: "En cours", value: dashboard.inProgress, icon: Clock3 },
    { label: "Terminées", value: dashboard.completed, icon: CheckCircle2 },
    { label: role === "CLIENT" ? "Montant engagé" : "Chiffre suivi", value: money(role === "CLIENT" ? dashboard.total : dashboard.paid), icon: Banknote },
  ];

  return (
    <div>
      <p className="text-sm font-semibold text-brand-700">Bonjour {session.user.name.split(" ")[0]}</p>
      <h1 className="mt-1 text-3xl font-black">Vue d&apos;ensemble</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ icon: Icon, ...card }) => (
          <Card key={card.label}><CardContent className="flex items-center justify-between pt-6"><div><p className="text-sm text-slate-500">{card.label}</p><p className="mt-2 text-2xl font-black">{card.value}</p></div><span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Icon size={20} /></span></CardContent></Card>
        ))}
      </div>
      <Card className="mt-8">
        <CardHeader><CardTitle>Demandes récentes</CardTitle></CardHeader>
        <CardContent>
          {requests.length ? <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b text-xs uppercase text-slate-400"><tr><th className="py-3">Client</th><th>Service</th><th>Date</th><th>Montant</th><th>Statut</th></tr></thead><tbody>{requests.map((request) => <tr key={request.id} className="border-b last:border-0"><td className="py-4 font-medium">{request.customerName}</td><td>{request.kind}</td><td>{request.createdAt.toLocaleDateString("fr-DZ")}</td><td>{money(request.total)}</td><td><Badge>{request.status}</Badge></td></tr>)}</tbody></table></div> : <p className="py-10 text-center text-slate-500">Aucune demande pour le moment.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
