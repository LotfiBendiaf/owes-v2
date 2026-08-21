import { ArrowRight, Check, MapPin } from "lucide-react";
import Link from "next/link";

import { HeroCarousel } from "./hero-carousel";

export default function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden bg-brand-950">
      <HeroCarousel />

      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-brand-950/35 via-transparent to-transparent" />

      <div className="relative z-20 mx-auto flex min-h-svh max-w-7xl items-end px-4 pb-28 pt-20 sm:px-6 sm:pb-32 lg:px-8">
        <div className="pointer-events-auto w-full bg-white/0 p-7 text-brand-950 sm:p-10 lg:p-12">
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-white drop-shadow-[0_1px_5px_rgba(0,15,61,0.9)]">
               Office &amp; Web Services
            </p>

          <h1 className="text-[clamp(2.8rem,7vw,6.2rem)] font-extrabold leading-[.86] tracking-[-.065em]">
            <span className="block text-white mix-blend-difference drop-shadow-[0_3px_14px_rgba(0,15,61,0.95)]">Une base
              <span className="text-brand-100 shadow-white"> solide
                </span> </span>
            <span className="mt-2 block font-normal italic text-white drop-shadow-[0_3px_14px_rgba(0,15,61,0.95)]">pour aller plus loin.</span>
          </h1>

          <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="max-w-xl text-sm leading-6 text-white drop-shadow-[0_1px_5px_rgba(0,15,61,0.9)] sm:text-base sm:leading-7">
                Domiciliation, espaces de travail et solutions web réunis sous une même adresse, avec une équipe qui connaît les réalités des entrepreneurs en Algérie.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5 text-[11px] font-semibold text-white">
                {["5 services essentiels", "Formules flexibles", "Suivi sur mesure"].map((item) => (
                  <span key={item} className="inline-flex min-h-9 items-center gap-2 rounded-full bg-brand-950/5 px-3.5 shadow-[0_4px_14px_rgba(0,15,61,0.22)] backdrop-blur-xs">
                    <span className="grid size-4 shrink-0 place-items-center rounded-full bg-rose-500 text-white">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

            <div className="flex flex-wrap gap-3 uppercase text-white drop-shadow- my-7">
              <Link href="/services" className="inline-flex h-12 items-center gap-3 rounded-full bg-brand-700 px-6 text-sm font-bold text-white transition hover:bg-brand-500">Nos services <ArrowRight size={17} /></Link>
              <Link href="/contact" className="inline-flex h-12 items-center rounded-full border border-brand-950/20 px-6 text-sm font-bold transition bg-brand-50/50 hover:bg-white hover:text-brand-800">Nous contacter</Link>
            </div>
                        <p className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-white drop-shadow-[0_1px_5px_rgba(0,15,61,0.9)]">
              <MapPin size={13} className="text-rose-500" /> Alger, Algérie
            </p>
        </div>
      </div>
    </section>
  );
}
