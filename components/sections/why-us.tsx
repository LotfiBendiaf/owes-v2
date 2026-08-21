import Image from "next/image";
import { Check, PanelsTopLeft, ShieldCheck, Users } from "lucide-react";

const checkpoints = [
  "Une adresse professionnelle claire et crédible", "Des espaces prêts pour travailler ou recevoir",
  "Un accompagnement administratif au quotidien", "Des offres lisibles, adaptées à chaque étape",
  "Un accès simple aux demandes et réservations", "Une équipe locale disponible et réactive",
];

const stats = [
  { value: "05", label: "Services essentiels", icon: PanelsTopLeft, color: "bg-[#e7edff] text-brand-700" },
  { value: "03", label: "Formules domiciliation", icon: ShieldCheck, color: "bg-[#f9e8e8] text-rose-700" },
  { value: "01", label: "Espace de suivi", icon: Users, color: "bg-[#e4f3ec] text-emerald-700" },
];

export default function WhyUs() {
  return (
    <section className="border-b border-brand-950/15 bg-white py-20 sm:py-28" id="why-us">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative min-h-[34rem] overflow-hidden bg-slate-200">
            <Image src="/office/bureau_prive.jpg" alt="Bureau privé OWES" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-brand-950/55 via-transparent to-transparent" />
            <p className="absolute bottom-7 left-7 max-w-xs text-xl font-bold leading-tight text-white sm:bottom-10 sm:left-10 sm:text-2xl">Un lieu pensé pour travailler, recevoir et développer.</p>
          </div>

          <div className="border-x border-brand-950/15 p-7 sm:p-10 lg:border-l-0 lg:p-12">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Pourquoi OWES — 02</p>
            <h2 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[.98] tracking-[-.045em] text-brand-950 sm:text-5xl">Un seul point d&apos;appui, <span className="font-normal italic text-brand-500">plusieurs façons d&apos;avancer.</span></h2>
            <p className="mt-6 max-w-2xl leading-7 text-slate-600">OWES réunit adresse, espaces et expertise dans un même lieu. Vous gagnez en crédibilité et en simplicité, sans multiplier les interlocuteurs.</p>

            <div className="mt-9 grid gap-x-8 gap-y-4 border-y border-brand-950/15 py-7 sm:grid-cols-2">
              {checkpoints.map((item) => <p key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700"><Check size={15} className="mt-1 shrink-0 text-rose-600" />{item}</p>)}
            </div>

            <div className="grid divide-y divide-brand-950/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {stats.map(({ icon: Icon, ...stat }) => <div key={stat.label} className="py-6 sm:px-5 sm:first:pl-0 sm:last:pr-0"><span className={`grid size-9 place-items-center rounded-full ${stat.color}`}><Icon size={15} /></span><p className="mt-4 font-mono text-2xl font-bold text-brand-950">{stat.value}</p><p className="mt-1 text-xs leading-5 text-slate-500">{stat.label}</p></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
