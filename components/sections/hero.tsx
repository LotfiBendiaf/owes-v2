import { ArrowRight, Check, MapPin } from "lucide-react";
import Link from "next/link";

import { HeroCarousel } from "./hero-carousel";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-brand-950">
      <HeroCarousel />

      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-brand-950/35 via-transparent to-transparent" />

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-7xl items-end px-4 pb-8 pt-28 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">
        <div className="pointer-events-auto w-full max-w-3xl bg-white/0 p-7 text-brand-950 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-brand-700">
              <span className="h-px w-9 bg-rose-500" /> Office &amp; Web Services
            </p>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-slate-500">
              <MapPin size={13} className="text-rose-600" /> Alger, Algérie
            </p>
          </div>

          <h1 className="mt-7 text-[clamp(2.8rem,7vw,6.2rem)] font-extrabold leading-[.86] tracking-[-.065em]">
            Une base solide
            <span className="mt-2 block font-normal italic text-brand-500">pour aller plus loin.</span>
          </h1>

          <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                Domiciliation, espaces de travail et solutions web réunis sous une même adresse, avec une équipe qui connaît les réalités des entrepreneurs en Algérie.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-slate-600">
                {["5 services essentiels", "Formules flexibles", "Suivi sur mesure"].map((item) => (
                  <span key={item} className="flex items-center gap-2"><Check size={13} className="text-rose-600" />{item}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/services" className="inline-flex h-12 items-center gap-3 rounded-full bg-brand-950 px-6 text-sm font-bold text-white transition hover:bg-brand-500">Nos services <ArrowRight size={17} /></Link>
              <Link href="/contact" className="inline-flex h-12 items-center rounded-full border border-brand-950/20 px-6 text-sm font-bold transition hover:bg-white">Nous parler</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
