import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const steps = [
  { num: "01", title: "Parlons de votre besoin", text: "Décrivez votre activité. Notre équipe vous oriente vers la formule adaptée." },
  { num: "02", title: "Choisissez votre formule", text: "Vous recevez une proposition claire, sans option opaque ni engagement inutile." },
  { num: "03", title: "Installez-vous", text: "Nous préparons votre espace ou votre dossier et facilitons les premières étapes." },
  { num: "04", title: "Suivez tout en ligne", text: "Demandes, messages et notifications restent accessibles depuis votre espace client." },
];

export default function Process() {
  return (
    <section className="border-b border-brand-950/15 bg-[#fbfaf7] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[.95fr_1.05fr]">
          <div className="border-y border-brand-950/15 py-9 lg:border-r lg:pr-12">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Notre méthode — 04</p>
            <h2 className="mt-5 max-w-xl text-4xl font-extrabold leading-[.98] tracking-[-.045em] text-brand-950 sm:text-5xl">Simple, du premier échange au <span className="font-normal italic text-brand-500">suivi quotidien.</span></h2>
            <div className="mt-10 divide-y divide-brand-950/15 border-b border-brand-950/15">
              {steps.map((step) => <article key={step.num} className="grid grid-cols-[3rem_1fr] gap-4 py-6"><span className="font-mono text-xs text-rose-600">{step.num}</span><div><h3 className="text-lg font-bold text-brand-950">{step.title}</h3><p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">{step.text}</p></div></article>)}
            </div>
          </div>

          <div id="about" className="lg:pl-12">
            <div className="relative min-h-[28rem] overflow-hidden bg-slate-200">
              <Image src="/office/formation.jpg" alt="Équipe et espace de formation OWES" fill sizes="(max-width:1024px) 100vw, 53vw" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-brand-950/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[.2em] text-rose-200">À propos d&apos;OWES</p>
                <h3 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl">Une équipe locale. Une vision très concrète du service.</h3>
              </div>
            </div>
            <div className="grid border-x border-b border-brand-950/15 p-7 sm:grid-cols-[1fr_auto] sm:items-end sm:p-9">
              <div><p className="max-w-xl text-sm leading-6 text-slate-600">Nous réunissons espace, expertise et services administratifs pour permettre aux indépendants et aux entreprises de se concentrer sur leur métier.</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-600">{["Interlocuteur dédié", "Tarifs lisibles", "Formules évolutives"].map((item) => <span key={item} className="flex items-center gap-2"><Check size={13} className="text-emerald-700" />{item}</span>)}</div></div>
              <Link href="/contact" className="mt-6 grid size-12 place-items-center border border-brand-950/20 text-brand-950 transition hover:bg-brand-950 hover:text-white sm:mt-0" aria-label="Rencontrer notre équipe"><ArrowUpRight size={18} /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
