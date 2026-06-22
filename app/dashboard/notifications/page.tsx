import { requireUser } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
export const dynamic = "force-dynamic";
export default async function NotificationsPage() { const session = await requireUser(); const notifications = await prisma.notification.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" } }); return <div><h1 className="text-3xl font-black">Notifications</h1><div className="mt-8 grid gap-3">{notifications.map((n) => <Card key={n.id}><CardContent className="pt-6"><p className="font-semibold">{n.title}</p><p className="mt-1 text-sm text-slate-500">{n.body}</p></CardContent></Card>)}{!notifications.length && <Card><CardContent className="py-14 text-center text-slate-500">Vous êtes à jour.</CardContent></Card>}</div></div>; }
