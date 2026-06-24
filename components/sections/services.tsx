import {
  ArrowRight,
  Building2,
  CalendarDays,
  GraduationCap,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    icon: Building2,
    title: "Domiciliation",
    text: "Une adresse professionnelle crédible, la réception de votre courrier et un suivi administratif simple.",
    href: "#domiciliation-plans",
    tag: "Votre adresse",
    image: "/office/owes.jpg",
  },
  {
    icon: Users,
    title: "Coworking",
    text: "Un poste équipé dans un environnement calme, flexible et propice aux rencontres professionnelles.",
    href: "/services#coworking",
    tag: "Votre espace",
    image: "/office/coworking.jpg",
  },
  {
    icon: CalendarDays,
    title: "Salles de réunion",
    text: "Des salles prêtes à recevoir vos clients, vos équipes et vos ateliers dans les meilleures conditions.",
    href: "/services#meeting",
    tag: "Vos rendez-vous",
    image: "/office/salle_reunion.jpg",
  },
  {
    icon: GraduationCap,
    title: "Formation",
    text: "Des programmes pratiques, ciblés et animés par des spécialistes pour faire progresser votre activité.",
    href: "/services#training",
    tag: "Vos compétences",
    image: "/office/formation.jpg",
  },
];

const [domiciliationService, ...secondaryServices] = services;
const domiciliationPlanLabels = ["Standard", "Premium", "Exclusive"];

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
              Quatre services, chacun à sa place
            </h2>
          </div>
          <p className="max-w-2xl leading-7 text-slate-600 lg:justify-self-end">
            La domiciliation reste l&apos;offre centrale, avec trois formules
            détaillées plus bas. Coworking, salle de réunion et formation
            restent accessibles rapidement selon votre besoin du moment.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <Link
            href={domiciliationService.href}
            className="group relative isolate flex min-h-[32rem] overflow-hidden rounded-lg border border-white/70 bg-brand-950 p-7 text-white shadow-[0_24px_70px_color-mix(in_srgb,var(--color-brand-950)_16%,transparent)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_color-mix(in_srgb,var(--color-brand-950)_24%,transparent)]"
          >
            <Image
              src={domiciliationService.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="-z-20 object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-brand-950)_92%,transparent)_0%,color-mix(in_srgb,var(--color-brand-950)_62%,transparent)_48%,color-mix(in_srgb,var(--color-brand-950)_22%,transparent)_100%)]" />


            <div className="flex items-start justify-between gap-4">
              <span className="grid size-14 place-items-center rounded-lg bg-white/95 text-brand-500 shadow-lg shadow-brand-950/15 transition group-hover:bg-rose-500 group-hover:text-white">
                <Building2 size={26} />
              </span>
              <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                {domiciliationService.tag}
              </span>
            </div>
            <div className="mt-auto">
              <h3 className="max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                {domiciliationService.title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-200">
                {domiciliationService.text}
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-white">
                {domiciliationPlanLabels.map((plan) => (
                  <span
                    key={plan}
                    className="rounded-full border border-white/15 bg-white/15 px-4 py-2 backdrop-blur-md"
                  >
                    {plan}
                  </span>
                ))}
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-rose-300">
                Voir les plans <ArrowRight size={16} />
              </span>
            </div>
          </Link>

          <div className="grid gap-5">
            {secondaryServices.map(({ icon: Icon, ...service }) => (
              <Link
                key={service.title}
                href={service.href}
                className="group relative isolate flex min-h-40 overflow-hidden rounded-lg border border-white/70 bg-brand-950 p-5 text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_color-mix(in_srgb,var(--color-brand-950)_18%,transparent)]"
              >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="-z-20 object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-brand-950)_86%,transparent)_0%,color-mix(in_srgb,var(--color-brand-950)_62%,transparent)_54%,color-mix(in_srgb,var(--color-brand-950)_24%,transparent)_100%)]" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/70 via-transparent to-white/5" />

                <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-white/95 text-brand-500 shadow-lg shadow-brand-950/15 transition group-hover:bg-rose-500 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <div className="ml-5 flex min-w-0 flex-1 flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-rose-200">
                    {service.tag}
                  </span>
                  <h3 className="mt-2 text-xl font-extrabold">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-200">
                    {service.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-rose-300">
                    En savoir plus <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
