import Image from "next/image";
import { CheckCircle2, PanelsTopLeft, ShieldCheck, Star, Users } from "lucide-react";

const stats = [
  { value: "4", label: "Services essentiels", icon: PanelsTopLeft },
  { value: "3", label: "Formules domiciliation", icon: Star },
  { value: "1", label: "Espace de suivi en ligne", icon: Users },
];

const checkpoints = [
  "Une adresse professionnelle claire et crédible",
  "Des espaces prêts pour travailler ou recevoir",
  "Un accompagnement administratif au quotidien",
  "Des offres lisibles, adaptées à chaque étape",
  "Un accès simple aux demandes et réservations",
  "Une équipe locale disponible et réactive",
];

export default function WhyUs() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24" id="why-us">
      <Image
        src="/OWES-Icon.svg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-contain object-right opacity-[0.035]"
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_.78fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">
              Pourquoi nous
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
              Faites avancer votre activité avec OWES
            </h2>
            <p className="mt-6 max-w-3xl leading-7 text-slate-600">
              OWES réunit domiciliation, coworking, salles de réunion et
              formation dans un même lieu. Vous gagnez une présence
              professionnelle, un cadre de travail fiable et un suivi simple
              pour gérer vos besoins sans multiplier les interlocuteurs.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {checkpoints.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-rose-500"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-brand-100 bg-surface-subtle p-6 shadow-[0_22px_70px_color-mix(in_srgb,var(--color-brand-950)_10%,transparent)] sm:p-7">
            <div className="flex items-start gap-4 border-b border-brand-100 pb-6">
              <span className="grid size-13 shrink-0 place-items-center rounded-lg bg-brand-500 text-white shadow-lg shadow-brand-950/15">
                <ShieldCheck size={26} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
                  Service intégré
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-brand-950">
                  Un point d&apos;appui pour vos journées de travail
                </h3>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {stats.map(({ icon: Icon, ...stat }) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white bg-white px-3 py-5 text-center shadow-sm"
                >
                  <div className="mb-3 flex justify-center">
                    <Icon size={26} className="text-rose-500" aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-black text-brand-950">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-semibold leading-snug text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
