import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { pricing } from "@/lib/pricing";
import { money } from "@/lib/utils";

const plans = [
  {
    title: "Standard",
    price: pricing.domiciliation.standard,
    href: "/services#domiciliation",
    features: [
      "Bureau aménagé semi fermé.",
      "Contrat notarié avec un paiement trimestriel.",
      "Secrétariat.",
      "Dépôt de déclaration fiscal-parafiscal.",
      "Tarifs préférentiels sur la salle de réunion.",
    ],
  },
  {
    title: "Premium",
    price: pricing.domiciliation.premium,
    href: "/services#domiciliation",
    highlighted: true,
    features: [
      "Bureau privatif et équipé avec chaises d'accueil.",
      "Contrat notarié avec un paiement trimestriel.",
      "Secrétariat.",
      "Dépôt de déclaration fiscal-parafiscal.",
      "Tarifs préférentiels sur la salle de réunion.",
    ],
  },
  {
    title: "Exclusive",
    price: pricing.domiciliation.exclusive,
    href: "/services#domiciliation",
    prefix: "À partir de",
    features: ["Domiciliation.", "Tenue de comptabilité."],
  },
];

export default function DomiciliationPlans() {
  return (
    <section className="bg-white py-20 sm:py-24" id="domiciliation-plans">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">
              Plans domiciliation
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
              Des formules de domiciliation prêtes à choisir
            </h2>
          </div>
          <p className="max-w-2xl leading-7 text-slate-600 lg:justify-self-end">
            Retrouvez les offres historiques OWES avec leurs avantages
            essentiels, leurs modalités trimestrielles et l&apos;accès aux
            services complémentaires du centre.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.title}
              className={`flex min-h-96 flex-col rounded-lg border bg-surface-subtle p-6 shadow-sm ${
                plan.highlighted
                  ? "border-brand-500 shadow-[0_24px_70px_color-mix(in_srgb,var(--color-brand-950)_12%,transparent)]"
                  : "border-stone-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-500">
                    Domiciliation
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold text-brand-950">
                    {plan.title}
                  </h3>
                </div>
                {plan.highlighted ? (
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
                    Populaire
                  </span>
                ) : null}
              </div>

              <ul className="mt-7 flex flex-1 flex-col gap-3 text-sm leading-6 text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-brand-500"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="text-sm font-semibold text-slate-500">
                  {plan.prefix ?? "Prix mensuel"}
                </p>
                <p className="mt-1 text-3xl font-black text-brand-950">
                  {money(plan.price)}
                  <span className="text-sm font-bold text-slate-500">
                    {" "}
                    / mois
                  </span>
                </p>
              </div>

              <Link
                href={plan.href}
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-950"
              >
                Choisir l&apos;offre <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
