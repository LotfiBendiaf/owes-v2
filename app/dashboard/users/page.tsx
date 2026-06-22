import { requireRole } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { updateUserAccess } from "@/app/dashboard/users/actions";
import { Button } from "@/components/ui/button";
import { inputClass } from "@/components/ui/field";
export const dynamic = "force-dynamic";
export default async function UsersPage() { await requireRole("ADMIN"); const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } }); return <div><h1 className="text-3xl font-black">Utilisateurs</h1><Card className="mt-8"><CardHeader><CardTitle>{users.length} compte(s)</CardTitle></CardHeader><CardContent><div className="grid gap-3">{users.map((u) => <div key={u.id} className="grid gap-4 rounded-xl border p-4 md:grid-cols-[1fr_auto]"><div><p className="font-semibold">{u.name}</p><p className="text-sm text-slate-500">{u.email}</p><Badge className="mt-2">{u.active ? u.role : "INACTIF"}</Badge></div><form action={updateUserAccess} className="flex flex-wrap items-center gap-2"><input type="hidden" name="userId" value={u.id} /><select name="role" defaultValue={u.role} className={inputClass}><option value="CLIENT">Client</option><option value="EXPERT">Expert</option><option value="ADMIN">Admin</option></select><select name="active" defaultValue={String(u.active)} className={inputClass}><option value="true">Actif</option><option value="false">Inactif</option></select><Button size="sm">Enregistrer</Button></form></div>)}</div></CardContent></Card></div>; }
