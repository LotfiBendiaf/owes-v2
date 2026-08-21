import { ProfileForm } from "@/components/profile-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const session = await requireUser();
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { name: true, email: true, phone: true, clientProfile: { select: { company: true, address: true } } } });
  if (!user) return null;
  return <div><h1 className="text-3xl font-black">Paramètres</h1><Card className="mt-8 max-w-xl"><CardHeader><CardTitle>Profil</CardTitle></CardHeader><CardContent><ProfileForm profile={{ name: user.name, email: user.email, phone: user.phone ?? "", company: user.clientProfile?.company ?? "", address: user.clientProfile?.address ?? "" }} /></CardContent></Card></div>;
}
