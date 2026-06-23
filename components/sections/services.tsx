import {
  ArrowRight,
  Building2,
  CalendarDays,
  GraduationCap,
  Users,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Building2,
    title: "Domiciliation",
    text: "Une adresse professionnelle crédible, la réception de votre courrier et un suivi administratif simple.",
    href: "/services#domiciliation",
    tag: "Votre adresse",
  },
  {
    icon: Users,
    title: "Coworking",
    text: "Un poste équipé dans un environnement calme, flexible et propice aux rencontres professionnelles.",
    href: "/services#coworking",
    tag: "Votre espace",
  },
  {
    icon: CalendarDays,
    title: "Salles de réunion",
    text: "Des salles prêtes à recevoir vos clients, vos équipes et vos ateliers dans les meilleures conditions.",
    href: "/services#meeting",
    tag: "Vos rendez-vous",
  },
  {
    icon: GraduationCap,
    title: "Formation",
    text: "Des programmes pratiques, ciblés et animés par des spécialistes pour faire progresser votre activité.",
    href: "/services#training",
    tag: "Vos compétences",
  },
];

export default function Services() {
  return (
    <section className="bg-surface-subtle py-20 sm:py-24" id="services">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">
              Tout pour avancer
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
              Des services conçus autour de votre activité
            </h2>
          </div>
          <p className="max-w-2xl leading-7 text-slate-600 lg:justify-self-end">
            Choisissez exactement ce dont vous avez besoin aujourd&apos;hui.
            Chaque service peut évoluer avec votre entreprise, sans complexité
            inutile.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, ...service }) => (
            <article
              key={service.title}
              className="group flex min-h-80 flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_20px_50px_color-mix(in_srgb,var(--color-brand-950)_10%,transparent)]"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-500 transition group-hover:bg-rose-500 group-hover:text-brand-950">
                  <Icon size={22} />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {service.tag}
                </span>
              </div>
              <h3 className="mt-7 text-xl font-extrabold text-brand-950">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                {service.text}
              </p>
              <Link
                href={service.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-500"
              >
                En savoir plus <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
