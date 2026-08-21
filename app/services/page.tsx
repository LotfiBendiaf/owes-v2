import type { Metadata } from "next";
import { ArrowDownRight, Building2, CalendarDays, Code2, GraduationCap, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServiceRequestForm } from "@/components/service-request-form";
import { money } from "@/lib/utils";
import { pricing } from "@/lib/pricing";

export const metadata: Metadata = { title: "Services" };

const items = [
  { id: "domiciliation", icon: Building2, number: "01", title: "Domiciliation", kicker: "Votre adresse", text: "Adresse commerciale, réception de courrier et accompagnement administratif.", price: pricing.domiciliation.standard, color: "bg-[#e7edff] text-brand-700" },
  { id: "coworking", icon: Users, number: "02", title: "Coworking", kicker: "Votre espace", text: "Postes flexibles pour une journée, une semaine ou un mois, dans un cadre professionnel.", price: pricing.coworking.day.small, color: "bg-[#e4f3ec] text-emerald-700" },
  { id: "meeting", icon: CalendarDays, number: "03", title: "Salle de réunion", kicker: "Vos rendez-vous", text: "Une salle équipée à la demi-journée ou à la journée pour recevoir dans de bonnes conditions.", price: pricing.meeting.halfDay, color: "bg-[#f9e8e8] text-rose-700" },
  { id: "training", icon: GraduationCap, number: "04", title: "Formation", kicker: "Vos compétences", text: "Des formations professionnelles ciblées, pratiques et directement opérationnelles.", price: pricing.trainingDay, color: "bg-[#fff0d9] text-amber-700" },
  { id: "website-building", icon: Code2, number: "05", title: "Création de sites web", kicker: "Votre présence", text: "Sites vitrines, professionnels et e-commerce conçus autour de votre activité.", price: pricing.websiteBuilding.starter, color: "bg-[#eee8f8] text-violet-700" },
];

export default function ServicesPage() {
  return (
    <><SiteHeader /><main className="bg-[#fbfaf7]">
      <section className="px-6 pb-16 pt-36 sm:pb-24">
        <div className="mx-auto max-w-7xl border-b border-brand-950/15 pb-14">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.55fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Catalogue OWES — Édition 2026</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-[.92] tracking-[-.055em] text-brand-950 sm:text-7xl lg:text-8xl">Les bons services, <span className="font-normal italic text-brand-500">au bon moment.</span></h1>
            </div>
            <div className="border-l border-brand-950/15 pl-6">
              <p className="text-base leading-7 text-slate-600">Des offres simples à comprendre, des tarifs de départ visibles et une équipe disponible avant chaque engagement.</p>
              <a href="#demande" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-950">Composer ma demande <ArrowDownRight size={17} className="text-rose-600" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="divide-y divide-brand-950/15 border-b border-brand-950/15">
          {items.map(({ icon: Icon, ...item }) => (
            <article key={item.id} id={item.id} className="scroll-mt-32 grid gap-6 py-10 md:grid-cols-[4rem_1fr_1.2fr_auto] md:items-start">
              <span className="font-mono text-xs text-slate-400">{item.number}</span>
              <div>
                <span className={`grid size-12 place-items-center rounded-full ${item.color}`}><Icon size={19} strokeWidth={1.7} /></span>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[.18em] text-slate-500">{item.kicker}</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-950">{item.title}</h2>
              </div>
              <p className="max-w-lg text-base leading-7 text-slate-600">{item.text}</p>
              <div className="min-w-40 md:text-right"><p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">À partir de</p><p className="mt-2 text-lg font-extrabold text-brand-950">{money(item.price)}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section id="demande" className="border-t border-brand-950/10 bg-[#e9efff] px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.55fr_1fr] lg:items-start">
          <div className="lg:sticky lg:top-32"><p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Votre projet</p><h2 className="mt-5 text-4xl font-extrabold leading-none tracking-[-.04em] text-brand-950 sm:text-5xl">Parlons de ce dont vous avez <span className="font-normal italic text-brand-500">vraiment besoin.</span></h2><p className="mt-6 max-w-md leading-7 text-slate-600">Une demande ne vous engage pas. Notre équipe vérifie la disponibilité et confirme le montant avec vous.</p></div>
          <ServiceRequestForm />
        </div>
      </section>
    </main><SiteFooter /></>
  );
}
