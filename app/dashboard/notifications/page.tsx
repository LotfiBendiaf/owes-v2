import Link from "next/link";
import { markAllNotificationsRead } from "@/app/dashboard/notifications/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireUser } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const session = await requireUser();
  const notifications = await prisma.notification.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, take: 100 });
  const unread = notifications.filter((notification) => !notification.readAt).length;
  return <div><div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-black">Notifications</h1><p className="mt-2 text-sm text-slate-500">{unread} non lue(s)</p></div>{unread > 0 && <form action={markAllNotificationsRead}><Button variant="outline">Tout marquer comme lu</Button></form>}</div><div className="mt-8 grid gap-3">{notifications.map((notification) => <Card key={notification.id} className={notification.readAt ? "opacity-70" : "border-brand-200"}><CardContent className="pt-6"><p className="font-semibold">{notification.title}</p><p className="mt-1 text-sm text-slate-500">{notification.body}</p><div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-400"><span>{notification.createdAt.toLocaleString("fr-DZ")}</span>{notification.href && <Link href={notification.href} className="font-semibold text-brand-700">Voir</Link>}</div></CardContent></Card>)}{!notifications.length && <Card><CardContent className="py-14 text-center text-slate-500">Vous êtes à jour.</CardContent></Card>}</div></div>;
}
