import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Headphones,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez OWES pour une domiciliation, un espace de coworking, une salle de reunion ou une formation professionnelle.",
};

const highlights = [
  {
    title: "Reponse rapide",
    description: "Notre equipe revient vers vous avec une reponse claire.",
    icon: CheckCircle2,
    tone: "bg-white/10",
  },
  {
    title: "Devis gratuit",
    description: "Une estimation simple pour cadrer votre besoin.",
    icon: FileText,
    tone: "bg-rose-500/15",
  },
  {
    title: "Suivi continu",
    description: "Un accompagnement attentif avant et apres votre demande.",
    icon: Headphones,
    tone: "bg-rose-500/15",
  },
  {
    title: "Equipe locale",
    description: "Un interlocuteur proche pour vos projets a Alger.",
    icon: MapPin,
    tone: "bg-white/10",
  },
];

const contactDetails = [
  {
    label: "Telephone",
    value: "+213 (0) 00 00 00 00",
    href: "tel:+213000000000",
    icon: Phone,
  },
  {
    label: "Email",
    value: "contact@owes.dz",
    href: "mailto:contact@owes.dz",
    icon: Mail,
  },
  {
    label: "Adresse",
    value: "Alger, Algerie",
    icon: Building2,
  },
  {
    label: "Horaires",
    value: "Dim. - Jeu. : 08h - 17h",
    icon: Clock,
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden bg-brand-950 pt-28 text-white sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--color-rose-500)_18%,transparent),transparent_34%),linear-gradient(135deg,color-mix(in_srgb,var(--color-brand-950)_100%,transparent)_0%,color-mix(in_srgb,var(--color-brand-800)_72%,var(--color-brand-950))_52%,color-mix(in_srgb,var(--color-secondary-600)_52%,var(--color-brand-950))_100%)]" />
        <Image
          src="/OWES-Icon.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none -z-10 object-contain object-right-bottom opacity-[0.045]"
        />

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
            <section className="order-2 lg:order-1">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-rose-300">
                  Contactez-nous
                </p>
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Parlons de votre projet et trouvons le bon espace pour avancer.
                </h1>
                <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                  Domiciliation, coworking, salle de reunion ou formation :
                  notre equipe vous aide a choisir la solution adaptee a votre
                  activite.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {highlights.map(({ title, description, icon: Icon, tone }) => (
                    <div
                      key={title}
                      className={`rounded-lg border border-white/10 p-5 shadow-[0_18px_60px_rgba(0,15,61,0.22)] backdrop-blur ${tone}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-lg bg-white text-brand-500">
                          <Icon size={19} />
                        </span>
                        <h2 className="text-base font-bold">{title}</h2>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-300">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-[0_24px_80px_rgba(0,15,61,0.24)] backdrop-blur">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {contactDetails.map(({ label, value, href, icon: Icon }) => {
                      const content = (
                        <>
                          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-rose-500/15 text-rose-300">
                            <Icon size={19} />
                          </span>
                          <span>
                            <span className="block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                              {label}
                            </span>
                            <span className="mt-2 block text-sm leading-6 text-slate-100">
                              {value}
                            </span>
                          </span>
                        </>
                      );

                      return href ? (
                        <a
                          key={label}
                          href={href}
                          className="flex items-start gap-4 transition hover:text-rose-300"
                        >
                          {content}
                        </a>
                      ) : (
                        <div key={label} className="flex items-start gap-4">
                          {content}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section className="order-1 lg:order-2">
              <div className="rounded-lg border border-white/10 bg-white p-6 text-brand-950 shadow-[0_34px_110px_rgba(0,15,61,0.28)] sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-500">
                  Message
                </p>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight">
                  Ecrivez-nous
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Decrivez votre besoin, nous vous orienterons vers la bonne
                  offre.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
