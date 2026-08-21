import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { pricing } from "@/lib/pricing";
import { money } from "@/lib/utils";

const plans = [
  { title: "Standard", price: pricing.domiciliation.standard, features: ["Bureau aménagé semi fermé", "Contrat notarié trimestriel", "Secrétariat", "Déclaration fiscal-parafiscal", "Tarif préférentiel salle de réunion"] },
  { title: "Premium", price: pricing.domiciliation.premium, highlighted: true, features: ["Bureau privatif et équipé", "Contrat notarié trimestriel", "Secrétariat", "Déclaration fiscal-parafiscal", "Tarif préférentiel salle de réunion"] },
  { title: "Exclusive", price: pricing.domiciliation.exclusive, prefix: "À partir de", features: ["Domiciliation complète", "Tenue de comptabilité"] },
];

export default function DomiciliationPlans() {
  return (
    <section className="bg-[#f4f0e7] py-20 sm:py-28" id="domiciliation-plans">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 border-b border-brand-950/15 pb-10 lg:grid-cols-[1fr_.65fr] lg:items-end">
          <div><p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Domiciliation — 03</p><h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[.98] tracking-[-.045em] text-brand-950 sm:text-6xl">Trois formules. <span className="font-normal italic text-brand-500">Une adresse qui compte.</span></h2></div>
          <p className="max-w-xl leading-7 text-slate-600 lg:justify-self-end">Des modalités trimestrielles et des services complémentaires pour choisir précisément le niveau d&apos;accompagnement dont vous avez besoin.</p>
        </div>

        <div className="grid border-b border-brand-950/15 lg:grid-cols-3 lg:divide-x lg:divide-brand-950/15">
          {plans.map((plan, index) => (
            <article key={plan.title} className={`flex flex-col gap-7 border-t border-brand-950/15 px-5 py-9 sm:px-7 lg:min-h-[34rem] lg:border-t-0 lg:px-8 ${plan.highlighted ? "bg-[#e7edff]" : ""}`}>
              <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
              <div><div className="flex flex-wrap items-center gap-3"><h3 className="text-3xl font-extrabold uppercase tracking-[-.035em] text-brand-950">{plan.title}</h3>{plan.highlighted && <span className="bg-brand-950 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white">Le plus choisi</span>}</div><p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-brand-700">Domiciliation OWES</p></div>
              <div><p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">{plan.prefix ?? "Prix mensuel"}</p><p className="mt-2 font-serif text-4xl font-semibold italic tracking-[-.045em] text-brand-950">{money(plan.price)} <span className="font-sans text-xs font-medium not-italic tracking-normal text-slate-500">/ mois</span></p></div>
              <ul className="grid gap-2 text-sm leading-5 text-slate-600 sm:grid-cols-2 lg:grid-cols-1">{plan.features.map((feature) => <li key={feature} className="flex gap-2"><Check size={13} className="mt-1 shrink-0 text-rose-600" />{feature}</li>)}</ul>
              <Link href="/services#domiciliation" className="mt-auto grid size-12 place-items-center self-end border border-brand-950/20 text-brand-950 transition hover:bg-brand-950 hover:text-white" aria-label={`Choisir l'offre ${plan.title}`}><ArrowUpRight size={18} /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
