import { setContactResolved } from "@/app/dashboard/contacts/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  await requireRole("ADMIN");
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return <div><h1 className="text-3xl font-black">Messages de contact</h1><p className="mt-2 text-slate-500">Traitez les demandes reçues depuis le site public.</p><Card className="mt-8"><CardHeader><CardTitle>{messages.length} message(s)</CardTitle></CardHeader><CardContent className="grid gap-4">{messages.map((message) => <article key={message.id} className="rounded-xl border p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-semibold">{message.subject}</h2><p className="mt-1 text-xs text-slate-500">{message.name} · <a href={`mailto:${message.email}`} className="text-brand-700">{message.email}</a> · {message.createdAt.toLocaleString("fr-DZ")}</p></div><Badge>{message.resolved ? "TRAITÉ" : "À TRAITER"}</Badge></div><p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-700">{message.message}</p><form action={setContactResolved} className="mt-4"><input type="hidden" name="id" value={message.id} /><input type="hidden" name="resolved" value={String(!message.resolved)} /><Button size="sm" variant="outline">{message.resolved ? "Rouvrir" : "Marquer comme traité"}</Button></form></article>)}{!messages.length && <p className="py-10 text-center text-slate-500">Aucun message.</p>}</CardContent></Card></div>;
}
