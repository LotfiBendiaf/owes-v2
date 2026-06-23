import type { Metadata } from "next";
import { Building2, CalendarDays, GraduationCap, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServiceRequestForm } from "@/components/service-request-form";
import { Card, CardContent } from "@/components/ui/card";
import { money } from "@/lib/utils";
import { pricing } from "@/lib/pricing";

export const metadata: Metadata = { title: "Services" };

const items = [
  { id: "domiciliation", icon: Building2, title: "Domiciliation", text: "Adresse commerciale, réception de courrier et accompagnement.", price: pricing.domiciliation.standard },
  { id: "coworking", icon: Users, title: "Coworking", text: "Postes flexibles pour une journée, une semaine ou un mois.", price: pricing.coworking.day.small },
  { id: "meeting", icon: CalendarDays, title: "Salle de réunion", text: "Une salle équipée à la demi-journée ou à la journée.", price: pricing.meeting.halfDay },
  { id: "training", icon: GraduationCap, title: "Formation", text: "Formations professionnelles ciblées et opérationnelles.", price: pricing.trainingDay },
];

export default function ServicesPage() {
  return <><SiteHeader /><main><section className="bg-brand-950 px-4 pb-20 pt-36 text-center text-white"><p className="text-sm font-bold uppercase tracking-widest text-rose-400">Catalogue OWES</p><h1 className="mt-4 text-4xl font-black sm:text-5xl">Un service adapté à chaque étape</h1><p className="mx-auto mt-4 max-w-2xl text-slate-300">Tarifs clairs, demande en ligne et suivi depuis votre espace.</p></section><section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="grid gap-6 md:grid-cols-2">{items.map(({ icon: Icon, ...item }) => <Card key={item.id} id={item.id}><CardContent className="flex gap-5 pt-6"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-500"><Icon /></span><div><h2 className="text-xl font-bold">{item.title}</h2><p className="mt-2 text-slate-600">{item.text}</p><p className="mt-4 text-sm font-semibold text-brand-500">À partir de {money(item.price)}</p></div></CardContent></Card>)}</div><div className="mt-16"><ServiceRequestForm /></div></section></main><SiteFooter /></>;
}
