import { updateUserAccess } from "@/app/dashboard/users/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { inputClass } from "@/components/ui/field";
import { Pagination } from "@/components/pagination";
import { listUsers } from "@/features/users/queries";
import { requireRole } from "@/lib/authorization";
import { normalizePage, totalPages } from "@/lib/pagination";

export const dynamic = "force-dynamic";

export default async function UsersPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  await requireRole("ADMIN");
  const params = await searchParams;
  const page = normalizePage(params.page);
  const query = params.q?.trim().slice(0, 100);
  const { rows: users, total } = await listUsers({ page, query });
  return <div><h1 className="text-3xl font-black">Utilisateurs</h1><form className="mt-6 flex gap-3"><input aria-label="Rechercher des utilisateurs" className={inputClass} name="q" defaultValue={query} placeholder="Nom ou e-mail…" /><Button type="submit">Rechercher</Button></form><Card className="mt-6"><CardHeader><CardTitle>{total} compte(s)</CardTitle></CardHeader><CardContent><div className="grid gap-3">{users.map((user) => <div key={user.id} className="grid gap-4 rounded-xl border p-4 md:grid-cols-[1fr_auto]"><div><p className="font-semibold">{user.name}</p><p className="text-sm text-slate-500">{user.email}</p><Badge className="mt-2">{user.active ? user.role : "INACTIF"}</Badge></div><form action={updateUserAccess} className="flex flex-wrap items-center gap-2"><input type="hidden" name="userId" value={user.id} /><select name="role" defaultValue={user.role} className={inputClass}><option value="CLIENT">Client</option><option value="ADMIN">Admin</option></select><select name="active" defaultValue={String(user.active)} className={inputClass}><option value="true">Actif</option><option value="false">Inactif</option></select><Button size="sm">Enregistrer</Button></form></div>)}</div><Pagination page={page} pages={totalPages(total)} pathname="/dashboard/users" params={{ q: query }} /></CardContent></Card></div>;
}
