import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

import { HeroCarousel } from "./hero-carousel";

export default function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden bg-brand-950">
      <HeroCarousel />

      <div className="pointer-events-none absolute inset-0 z-10 bg-brand-700/15" />

      <div className="relative z-20 mx-auto flex min-h-svh max-w-7xl items-end px-4 pb-28 pt-20 sm:px-6 sm:pb-32 lg:px-8">
        <div className="pointer-events-auto w-full py-7 text-white sm:p-10 lg:p-12">
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-white [text-shadow:0_1px_3px_rgba(0,15,61,0.9),0_2px_10px_rgba(0,15,61,0.5)]">
               Office &amp; Web Services
            </p>

          <h1 className="text-[clamp(2.8rem,7vw,6.2rem)] font-extrabold leading-[1.02] tracking-[-.065em] [text-shadow:0_2px_4px_rgba(0,15,61,0.65),0_6px_24px_rgba(0,15,61,0.45)]">
            <span className="block text-brand-200">Une base solide</span>
            <span className="mt-2 block font-normal italic text-white">pour aller plus loin.</span>
          </h1>

          <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="max-w-xl text-sm leading-6 text-white [text-shadow:0_1px_3px_rgba(0,15,61,0.9),0_2px_10px_rgba(0,15,61,0.5)] sm:text-base sm:leading-7">
                Domiciliation, espaces de travail et solutions web réunis sous une même adresse, avec une équipe qui connaît les réalités des entrepreneurs en Algérie.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-white [text-shadow:0_1px_3px_rgba(0,15,61,0.9),0_2px_10px_rgba(0,15,61,0.5)]">
                {["5 services essentiels", "Formules flexibles", "Suivi sur mesure"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="h-3 w-px bg-brand-200" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="my-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/services" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-brand-600 bg-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:border-brand-700 hover:bg-brand-700 focus-visible:outline-white">
              Nos services <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/70 bg-white px-7 py-3 text-sm font-semibold text-brand-950 shadow-sm transition-colors hover:border-brand-100 hover:bg-brand-100 focus-visible:outline-white">
              Nous contacter
            </Link>
          </div>
          <p className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-white [text-shadow:0_1px_3px_rgba(0,15,61,0.9),0_2px_10px_rgba(0,15,61,0.5)]">
              <MapPin size={13} className="text-rose-300" /> Alger, Algérie
            </p>
        </div>
      </div>
    </section>
  );
}
