import Link from "next/link";
import { setContactResolved } from "@/app/dashboard/contacts/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/pagination";
import { requireRole } from "@/lib/authorization";
import { DEFAULT_PAGE_SIZE, normalizePage, totalPages } from "@/lib/pagination";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ContactsPage({ searchParams }: { searchParams: Promise<{ page?: string; state?: string }> }) {
  await requireRole("ADMIN");
  const params = await searchParams;
  const page = normalizePage(params.page);
  const state = params.state === "open" || params.state === "resolved" ? params.state : undefined;
  const where = state ? { resolved: state === "resolved" } : {};
  const [total, messages] = await prisma.$transaction([
    prisma.contactMessage.count({ where }),
    prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * DEFAULT_PAGE_SIZE, take: DEFAULT_PAGE_SIZE }),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-black">Messages de contact</h1>
      <p className="mt-2 text-slate-500">Traitez les demandes reçues depuis le site public.</p>
      <nav aria-label="Filtrer les messages" className="mt-5 flex flex-wrap gap-2 text-sm">
        <FilterLink href="/dashboard/contacts?state=open">À traiter</FilterLink>
        <FilterLink href="/dashboard/contacts?state=resolved">Traités</FilterLink>
        <FilterLink href="/dashboard/contacts">Tous</FilterLink>
      </nav>
      <Card className="mt-6">
        <CardHeader><CardTitle>{total} message(s)</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          {messages.map((message) => (
            <article key={message.id} className="rounded-xl border p-4">
              <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-semibold">{message.subject}</h2><p className="mt-1 text-xs text-slate-500">{message.name} · <a href={`mailto:${message.email}`} className="text-brand-700">{message.email}</a> · {message.createdAt.toLocaleString("fr-DZ")}</p></div><Badge>{message.resolved ? "TRAITÉ" : "À TRAITER"}</Badge></div>
              <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-700">{message.message}</p>
              <form action={setContactResolved} className="mt-4"><input type="hidden" name="id" value={message.id} /><input type="hidden" name="resolved" value={String(!message.resolved)} /><Button size="sm" variant="outline">{message.resolved ? "Rouvrir" : "Marquer comme traité"}</Button></form>
            </article>
          ))}
          {!messages.length && <p className="py-10 text-center text-slate-500">Aucun message.</p>}
          <Pagination page={page} pages={totalPages(total)} pathname="/dashboard/contacts" params={{ state }} />
        </CardContent>
      </Card>
    </div>
  );
}

function FilterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="rounded-full border bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50" href={href}>{children}</Link>;
}
