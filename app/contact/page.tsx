import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact", description: "Contactez OWES pour vos besoins professionnels à Alger." };
const details = [
  { label: "Téléphone", value: "+213 (0) 00 00 00 00", href: "tel:+213000000000", icon: Phone, color: "bg-[#e4f3ec] text-emerald-700" },
  { label: "E-mail", value: "contact@owes.dz", href: "mailto:contact@owes.dz", icon: Mail, color: "bg-[#e7edff] text-brand-700" },
  { label: "Adresse", value: "Alger, Algérie", icon: MapPin, color: "bg-[#f9e8e8] text-rose-700" },
  { label: "Horaires", value: "Dim. — Jeu. · 08h — 17h", icon: Clock, color: "bg-[#fff0d9] text-amber-700" },
];

export default function ContactPage() {
  return <><SiteHeader /><main className="bg-[#fbfaf7] pb-24 pt-32">
    <section className="mx-auto max-w-7xl px-6">
      <div className="grid border-b border-brand-950/15 pb-12 lg:grid-cols-[1.1fr_.7fr] lg:items-end">
        <div><p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Contact — Parlons-nous</p><h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-[.92] tracking-[-.055em] text-brand-950 sm:text-7xl">Votre projet commence par <span className="font-normal italic text-brand-500">une conversation.</span></h1></div>
        <p className="mt-8 max-w-lg border-l border-brand-950/15 pl-6 leading-7 text-slate-600 lg:mt-0 lg:justify-self-end">Domiciliation, coworking, réunion, formation ou création web : décrivez votre besoin, nous vous orienterons simplement.</p>
      </div>

      <div className="mt-10 grid lg:grid-cols-[.9fr_1.1fr]">
        <div className="lg:pr-10">
          <div className="relative min-h-[24rem] bg-slate-200"><Image src="/office/salle_reunion.jpg" alt="Salle de réunion OWES" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" /></div>
          <div className="grid divide-y divide-brand-950/15 border-x border-b border-brand-950/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {details.map(({ icon: Icon, ...item }) => { const content = <><span className={`grid size-9 place-items-center rounded-full ${item.color}`}><Icon size={15} /></span><p className="mt-4 font-mono text-[9px] uppercase tracking-[.18em] text-slate-400">{item.label}</p><p className="mt-1 text-sm font-bold text-brand-950">{item.value}</p></>; return item.href ? <a key={item.label} href={item.href} className="p-5 hover:bg-white">{content}</a> : <div key={item.label} className="p-5">{content}</div>; })}
          </div>
        </div>
        <div className="mt-10 border-y border-brand-950/15 py-8 lg:mt-0 lg:border-l lg:px-10"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-brand-700">Écrivez-nous — 01</p><h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-950">Décrivez votre besoin.</h2><p className="mt-2 text-sm text-slate-600">Nous revenons vers vous avec une réponse claire.</p><div className="mt-8"><ContactForm /></div></div>
      </div>
    </section>
  </main><SiteFooter /></>;
}
