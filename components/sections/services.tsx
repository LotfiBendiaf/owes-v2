import { ArrowUpRight, Building2, CalendarDays, Code2, GraduationCap, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featured = {
  icon: Building2,
  number: "01",
  title: "Domiciliation",
  text: "Une adresse professionnelle crédible, la réception de votre courrier et un suivi administratif simple. Trois formules pensées pour accompagner chaque étape de votre activité.",
  href: "#domiciliation-plans",
  image: "/office/owes.jpg",
};

const services = [
  { icon: Users, number: "02", title: "Coworking", text: "Un poste équipé dans un cadre calme et stimulant.", href: "/services#coworking", image: "/office/coworking.jpg", color: "bg-[#e4f3ec] text-emerald-700" },
  { icon: CalendarDays, number: "03", title: "Salles de réunion", text: "Des espaces prêts pour vos clients, équipes et ateliers.", href: "/services#meeting", image: "/office/salle_reunion.jpg", color: "bg-[#f9e8e8] text-rose-700" },
  { icon: GraduationCap, number: "04", title: "Formation", text: "Des programmes pratiques animés par des spécialistes.", href: "/services#training", image: "/office/formation.jpg", color: "bg-[#fff0d9] text-amber-700" },
  { icon: Code2, number: "05", title: "Création de sites web", text: "Une présence claire, distinctive et conçue pour convertir.", href: "/services#website-building", image: "/office/bureau_prevatif.jpg", color: "bg-[#eee8f8] text-violet-700" },
];

export default function Services() {
  const FeaturedIcon = featured.icon;

  return (
    <section className="bg-[#fbfaf7] py-20 sm:py-28" id="services">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 border-b border-brand-950/15 pb-10 lg:grid-cols-[1fr_.65fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Le catalogue — 01/05</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[.98] tracking-[-.045em] text-brand-950 sm:text-6xl">Tout ce qu&apos;il faut pour <span className="font-normal italic text-brand-500">faire avancer</span> votre activité.</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600 lg:justify-self-end">Une sélection resserrée de services concrets. Chaque formule est lisible, modulable et accompagnée par notre équipe.</p>
        </div>

        <div className="mt-10 grid border-b border-brand-950/15 lg:grid-cols-[1.08fr_.92fr]">
          <Link href={featured.href} className="group flex flex-col border-brand-950/15 pb-10 lg:border-r lg:pb-0 lg:pr-10">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
              <Image src={featured.image} alt="Accueil et espace OWES" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-linear-to-t from-brand-950/30 via-transparent to-transparent" />
              <span className="absolute left-0 top-0 grid size-16 place-items-center bg-[#e7edff] text-brand-700"><FeaturedIcon size={23} strokeWidth={1.6} /></span>
            </div>
            <div className="grid gap-6 border-x border-brand-950/15 p-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-500">{featured.number} — Service principal</p>
                <h3 className="mt-3 text-4xl font-extrabold tracking-[-.04em] text-brand-950 sm:text-5xl">{featured.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">{featured.text}</p>
                <div className="mt-6 flex gap-2 font-mono text-[10px] uppercase tracking-wider text-brand-700"><span>Standard</span><span>·</span><span>Premium</span><span>·</span><span>Exclusive</span></div>
              </div>
              <span className="grid size-12 place-items-center border border-brand-950/20 text-brand-950 transition group-hover:bg-brand-950 group-hover:text-white"><ArrowUpRight size={18} /></span>
            </div>
          </Link>

          <div className="divide-y divide-brand-950/15 lg:pl-10">
            {services.map(({ icon: Icon, ...service }) => (
              <Link key={service.title} href={service.href} className="group grid grid-cols-[5rem_1fr_auto] gap-5 py-6 first:pt-10 lg:first:pt-0">
                <div className="relative aspect-square overflow-hidden bg-slate-200">
                  <Image src={service.image} alt="" fill sizes="80px" className="object-cover grayscale-[15%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className={`grid size-8 shrink-0 place-items-center rounded-full ${service.color}`}><Icon size={14} strokeWidth={1.7} /></span>
                    <span className="font-mono text-[10px] text-slate-400">{service.number}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold tracking-tight text-brand-950 transition group-hover:text-brand-500 sm:text-2xl">{service.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">{service.text}</p>
                </div>
                <ArrowUpRight size={17} className="mt-1 text-slate-400 transition group-hover:text-brand-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
