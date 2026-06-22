/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, Check, GraduationCap, MapPin, Sparkles, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const services = [
  { icon: Building2, title: "Domiciliation", text: "Une adresse professionnelle crédible, la réception de votre courrier et un suivi administratif simple.", href: "/services#domiciliation", tag: "Votre adresse" },
  { icon: Users, title: "Coworking", text: "Un poste équipé dans un environnement calme, flexible et propice aux rencontres professionnelles.", href: "/services#coworking", tag: "Votre espace" },
  { icon: CalendarDays, title: "Salles de réunion", text: "Des salles prêtes à recevoir vos clients, vos équipes et vos ateliers dans les meilleures conditions.", href: "/services#meeting", tag: "Vos rendez-vous" },
  { icon: GraduationCap, title: "Formation", text: "Des programmes pratiques, ciblés et animés par des spécialistes pour faire progresser votre activité.", href: "/services#training", tag: "Vos compétences" },
];

const steps = [
  { num: "01", title: "Parlons de votre besoin", text: "Décrivez votre activité et votre objectif. Notre équipe vous oriente vers la formule adaptée." },
  { num: "02", title: "Choisissez votre formule", text: "Vous recevez une proposition claire, sans options opaques ni engagement inutile." },
  { num: "03", title: "Installez-vous", text: "Nous préparons votre espace ou votre dossier et vous accompagnons dans les premières étapes." },
  { num: "04", title: "Suivez tout en ligne", text: "Demandes, messages, réservations et notifications restent accessibles depuis votre espace client." },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-4 pb-10 pt-28 sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-[76vh] max-w-7xl overflow-hidden rounded-[2rem] bg-[#101735] shadow-[0_30px_90px_rgba(23,32,79,.22)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(251,191,36,.16),transparent_32%),linear-gradient(120deg,#101735_20%,#1d2d69_100%)]" />
            <div className="relative grid min-h-[76vh] items-center gap-10 px-7 py-16 sm:px-12 lg:grid-cols-[1.08fr_.92fr] lg:px-16">
              <div className="relative z-10 max-w-3xl">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur">
                  <span className="size-2 animate-pulse rounded-full bg-amber-400" />
                  L'espace professionnel qui avance avec vous
                </div>
                <h1 className="text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                  DONNEZ A VOTRE PROJET <span className="text-amber-400">UNE BASE SOLIDE.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">OWES réunit domiciliation, coworking, salles de réunion et formation au même endroit, avec une équipe qui connaît les réalités des entrepreneurs en Algérie.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/services" className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold uppercase text-[#273b82] transition hover:bg-slate-100">Découvrir nos services <ArrowRight size={17} /></Link>
                  <Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/35 px-6 text-sm font-bold uppercase text-white transition hover:bg-white/10">Parler à un conseiller</Link>
                </div>
                <div className="mt-11 grid max-w-xl grid-cols-3 gap-5 border-t border-white/20 pt-6">
                  <div><p className="text-2xl font-extrabold text-white">4</p><p className="mt-1 text-xs text-slate-400">services essentiels</p></div>
                  <div><p className="text-2xl font-extrabold text-white">100%</p><p className="mt-1 text-xs text-slate-400">flexible</p></div>
                  <div><p className="text-2xl font-extrabold text-white">1</p><p className="mt-1 text-xs text-slate-400">équipe à vos côtés</p></div>
                </div>
              </div>

              <div className="relative hidden h-[590px] lg:block">
                <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/15">
                  <Image src="/seleor/Images/wallpaper2.png" alt="Architecture contemporaine d'un espace professionnel" fill priority sizes="(min-width: 1024px) 42vw, 0px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101735]/75 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-[#101735]/55 p-5 text-white backdrop-blur-xl">
                  <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-amber-400 text-[#17204f]"><MapPin size={18} /></span><div><p className="font-bold">Votre nouvelle adresse à Alger</p><p className="mt-0.5 text-xs text-slate-300">Professionnelle, accessible et bien accompagnée.</p></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-white py-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-[#41558f]">Un seul partenaire pour toute votre activité</p>
          <div className="mx-auto mt-7 flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-5 px-6 text-sm font-extrabold uppercase tracking-wider text-slate-400">
            {["Adresse", "Espace", "Réunion", "Formation", "Accompagnement"].map((item) => <span key={item} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-amber-400" />{item}</span>)}
          </div>
        </section>

        <section className="bg-[#faf9f6] py-20 sm:py-24" id="services">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
              <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#41558f]">Tout pour avancer</p><h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight text-[#17204f] sm:text-4xl">Des services conçus autour de votre activité</h2></div>
              <p className="max-w-2xl leading-7 text-slate-600 lg:justify-self-end">Choisissez exactement ce dont vous avez besoin aujourd'hui. Chaque service peut évoluer avec votre entreprise, sans complexité inutile.</p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map(({ icon: Icon, ...service }) => (
                <article key={service.title} className="group flex min-h-80 flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_20px_50px_rgba(23,32,79,.10)]">
                  <div className="flex items-center justify-between"><span className="grid size-12 place-items-center rounded-xl bg-indigo-50 text-[#273b82] transition group-hover:bg-amber-400 group-hover:text-[#17204f]"><Icon size={22} /></span><span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{service.tag}</span></div>
                  <h3 className="mt-7 text-xl font-extrabold text-[#17204f]">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{service.text}</p>
                  <Link href={service.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#273b82]">En savoir plus <ArrowRight size={15} /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#41558f]">Notre méthode</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#17204f] sm:text-4xl">Simple du premier échange au suivi quotidien</h2>
              <div className="mt-10">
                {steps.map((step, index) => <div key={step.num} className="flex gap-5"><div className="flex flex-col items-center"><span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-indigo-300 bg-[#273b82] text-sm font-extrabold text-white">{step.num}</span>{index < steps.length - 1 && <span className="my-2 w-px flex-1 bg-indigo-200" />}</div><div className="pb-8"><h3 className="font-extrabold text-[#17204f]">{step.title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{step.text}</p></div></div>)}
              </div>
            </div>
            <div id="about" className="relative overflow-hidden rounded-[2rem] bg-[#17204f] p-8 text-white sm:p-10">
              <div className="absolute -right-16 -top-16 size-64 rounded-full bg-amber-400/15 blur-3xl" />
              <Sparkles className="text-amber-400" size={30} />
              <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-amber-300">A propos d'OWES</p>
              <h2 className="mt-3 text-3xl font-extrabold">Une équipe locale. Une vision très concrète du service.</h2>
              <p className="mt-5 leading-7 text-slate-300">Nous réunissons espace, expertise et services administratifs pour permettre aux indépendants et aux entreprises de se concentrer sur leur métier.</p>
              <ul className="mt-8 grid gap-4 text-sm font-semibold sm:grid-cols-2">
                {["Un interlocuteur dédié", "Des tarifs lisibles", "Un suivi depuis votre espace", "Des formules évolutives"].map((item) => <li key={item} className="flex items-center gap-3"><span className="grid size-6 place-items-center rounded-full bg-amber-400 text-[#17204f]"><Check size={14} strokeWidth={3} /></span>{item}</li>)}
              </ul>
              <Link href="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-[#17204f] transition hover:bg-amber-300">Rencontrer notre équipe <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-[2rem] bg-amber-400 p-8 text-[#17204f] sm:p-10 lg:flex-row lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.22em]">Votre prochaine étape</p><h2 className="mt-2 text-3xl font-extrabold">Prêt à donner plus d'espace à votre projet ?</h2></div><Link href="/register" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#17204f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#273b82]">Créer mon espace <ArrowRight size={16} /></Link></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
