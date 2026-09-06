import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { pricing } from "@/lib/pricing";
import { money } from "@/lib/utils";

const features = [
  "Conseils pour préparer votre projet",
  "Aide aux démarches de création",
  "Accompagnement étape par étape",
];

export default function EnterprisePack() {
  return (
    <section id="pack-entreprise" className="bg-[#fbfaf7] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Pack entreprise — Création d’entreprise</p>
        <div className="mt-8 grid border-y border-brand-950/15 lg:grid-cols-[1fr_.65fr]">
          <div className="py-9 lg:border-r lg:border-brand-950/15 lg:py-12 lg:pr-12">
            <div className="relative size-20 overflow-hidden bg-slate-200">
              <Image src="/office/bureau_prive.jpg" alt="" fill sizes="80px" className="object-cover" />
            </div>
            <h2 className="mt-7 max-w-2xl text-4xl font-extrabold leading-[.98] tracking-[-.045em] text-brand-950 sm:text-6xl">Votre entreprise, <span className="font-normal italic text-brand-500">bien accompagnée dès le départ.</span></h2>
            <p className="mt-6 max-w-xl leading-7 text-slate-600">Vous souhaitez créer votre entreprise ? OWES vous accompagne dans la préparation de votre projet et vous aide dans vos démarches, étape par étape.</p>
          </div>
          <div className="flex flex-col border-t border-brand-950/15 py-9 lg:border-t-0 lg:py-12 lg:pl-12">
            <h3 className="text-3xl font-extrabold uppercase tracking-[-.035em] text-brand-950">Pack entreprise</h3>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-wider text-slate-500">Prix du pack</p>
            <p className="mt-2 font-serif text-5xl font-semibold italic tracking-[-.045em] text-brand-950">{money(pricing.enterprisePack)}</p>
            <ul className="mt-8 grid gap-3 text-sm leading-6 text-slate-600">
              {features.map((feature) => <li key={feature} className="flex gap-3"><Check size={14} className="mt-1 shrink-0 text-rose-600" />{feature}</li>)}
            </ul>
            <Link href="/services#pack-entreprise" className="mt-10 inline-flex items-center justify-between gap-4 border-t border-brand-950/15 pt-5 text-sm font-bold text-brand-950 transition hover:text-brand-500 lg:mt-auto">
              Découvrir le pack entreprise <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
