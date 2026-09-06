import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDownRight, BriefcaseBusiness, Building2, CalendarDays, Code2, GraduationCap, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServiceRequestForm } from "@/components/service-request-form";
import { money } from "@/lib/utils";
import { pricing } from "@/lib/pricing";

export const metadata: Metadata = { title: "Services" };

const items = [
  { id: "domiciliation", image: "/office/owes.jpg", icon: Building2, number: "01", title: "Domiciliation", kicker: "Votre adresse", text: "Adresse commerciale, réception de courrier et accompagnement administratif.", price: pricing.domiciliation.standard, color: "bg-[#e7edff] text-brand-700" },
  { id: "pack-entreprise", image: "/office/bureau_prive.jpg", icon: BriefcaseBusiness, number: "06", title: "Pack entreprise", kicker: "Votre lancement", text: "Un accompagnement pour créer votre entreprise : conseils, aide aux démarches et suivi de votre projet, étape par étape.", price: pricing.enterprisePack, color: "bg-[#f0eadf] text-amber-800" },
  { id: "coworking", image: "/office/coworking.jpg", icon: Users, number: "02", title: "Coworking", kicker: "Votre espace", text: "Postes flexibles pour une journée, une semaine ou un mois, dans un cadre professionnel.", price: pricing.coworking.day.small, color: "bg-[#e4f3ec] text-emerald-700" },
  { id: "meeting", image: "/office/salle_reunion.jpg", icon: CalendarDays, number: "03", title: "Salle de réunion", kicker: "Vos rendez-vous", text: "Une salle équipée à la demi-journée ou à la journée pour recevoir dans de bonnes conditions.", price: pricing.meeting.halfDay, color: "bg-[#f9e8e8] text-rose-700" },
  { id: "training", image: "/office/formation.jpg", icon: GraduationCap, number: "04", title: "Formation", kicker: "Vos compétences", text: "Des formations professionnelles ciblées, pratiques et directement opérationnelles.", price: pricing.trainingDay, color: "bg-[#fff0d9] text-amber-700" },
  { id: "website-building", image: "/office/bureau_prevatif.jpg", icon: Code2, number: "05", title: "Création de sites web", kicker: "Votre présence", text: "Sites vitrines, professionnels et e-commerce conçus autour de votre activité.", price: pricing.websiteBuilding.starter, color: "bg-[#eee8f8] text-violet-700" },
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
        <div className="grid gap-px border-y border-brand-950/15 bg-brand-950/15 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr]">
          {items.map(({ icon: Icon, ...item }, index) => {
            const featured = index === 0;

            return (
              <article
                key={item.id}
                id={item.id}
                className={`flex min-w-0 scroll-mt-32 flex-col bg-[#fbfaf7] py-8 sm:p-7 ${featured ? "sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:py-10 lg:pl-0 lg:pr-10" : item.id === "pack-entreprise" ? "sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:py-8 lg:pl-0 lg:pr-10" : "lg:p-8"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="relative size-20 shrink-0 overflow-hidden bg-slate-200">
                    <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <span className={`grid size-10 shrink-0 place-items-center ${item.color}`}><Icon size={18} strokeWidth={1.7} /></span>
                </div>
                <div className={featured ? "mt-8 lg:mt-14" : "mt-6"}>
                  <p className="font-mono text-[10px] uppercase tracking-[.18em] text-slate-500">{item.number} — {item.kicker}</p>
                  <h2 className={`mt-3 font-bold tracking-tight text-brand-950 ${featured ? "text-4xl sm:text-5xl lg:text-[2.75rem]" : "text-2xl"}`}>{item.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{item.text}</p>
                  {featured && (
                    <div className="mt-7 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-brand-700">
                      {["Standard", "Premium", "Exclusive"].map((plan) => (
                        <span key={plan} className="after:ml-3 after:text-slate-400 after:content-['·'] last:after:content-none">{plan}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-auto pt-7">
                  <div className="border-t border-brand-950/10 pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{item.id === "pack-entreprise" ? "Prix du pack" : "À partir de"}</p>
                    <p className={`mt-2 font-serif font-semibold italic tracking-[-.045em] text-brand-950 ${featured ? "text-4xl sm:text-5xl" : "text-3xl"}`}>{money(item.price)}</p>
                  </div>
                </div>
              </article>
            );
          })}
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
