import { ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Parlons de votre besoin",
    text: "Décrivez votre activité et votre objectif. Notre équipe vous oriente vers la formule adaptée.",
  },
  {
    num: "02",
    title: "Choisissez votre formule",
    text: "Vous recevez une proposition claire, sans options opaques ni engagement inutile.",
  },
  {
    num: "03",
    title: "Installez-vous",
    text: "Nous préparons votre espace ou votre dossier et vous accompagnons dans les premières étapes.",
  },
  {
    num: "04",
    title: "Suivez tout en ligne",
    text: "Demandes, messages, réservations et notifications restent accessibles depuis votre espace client.",
  },
];

const benefits = [
  "Un interlocuteur dédié",
  "Des tarifs lisibles",
  "Un suivi depuis votre espace",
  "Des formules évolutives",
];

export default function Process() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">
            Notre méthode
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
            Simple du premier échange au suivi quotidien
          </h2>
          <div className="mt-10">
            {steps.map((step, index) => (
              <div key={step.num} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-brand-300 bg-brand-500 text-sm font-extrabold text-white">
                    {step.num}
                  </span>
                  {index < steps.length - 1 && (
                    <span className="my-2 w-px flex-1 bg-brand-200" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-extrabold text-brand-950">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          id="about"
          className="relative overflow-hidden rounded-4xl bg-brand-950 p-8 text-white sm:p-10"
        >
          <div className="absolute -right-16 -top-16 size-64 rounded-full bg-rose-500/15 blur-3xl" />
          <Sparkles className="text-rose-500" size={30} />
          <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-rose-400">
            A propos d&apos;OWES
          </p>
          <h2 className="mt-3 text-3xl font-extrabold">
            Une équipe locale. Une vision très concrète du service.
          </h2>
          <p className="mt-5 leading-7 text-slate-300">
            Nous réunissons espace, expertise et services administratifs pour
            permettre aux indépendants et aux entreprises de se concentrer sur
            leur métier.
          </p>
          <ul className="mt-8 grid gap-4 text-sm font-semibold sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full bg-rose-500 text-brand-950">
                  <Check size={14} strokeWidth={3} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-400"
          >
            Rencontrer notre équipe <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
