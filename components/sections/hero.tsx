import { ArrowRight, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const hero = () => {
  return (
            <section className="px-4 pb-10 pt-28 sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-[76vh] max-w-7xl overflow-hidden rounded-4xl bg-[#101735] shadow-[0_30px_90px_rgba(23,32,79,.22)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(251,191,36,.16),transparent_32%),linear-gradient(120deg,#101735_20%,#1d2d69_100%)]" />
            <div className="relative grid min-h-[76vh] items-center gap-10 px-7 py-16 sm:px-12 lg:grid-cols-[1.08fr_.92fr] lg:px-16">
              <div className="relative z-10 max-w-3xl">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur">
                  <span className="size-2 animate-pulse rounded-full bg-rose-500" />
                  L&apos;espace professionnel qui avance avec vous
                </div>
                <h1 className="text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                  DONNEZ A VOTRE PROJET <span className="text-rose-500">UNE BASE SOLIDE.</span>
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

              <div className="relative hidden h-147.5 lg:block">
                <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/15">
                  <Image src="/legacy/images/bg1-1.webp" alt="Vue urbaine d'Alger" fill priority sizes="(min-width: 1024px) 42vw, 0px" className="object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#101735]/75 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-[#101735]/55 p-5 text-white backdrop-blur-xl">
                  <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-rose-500 text-[#17204f]"><MapPin size={18} /></span><div><p className="font-bold">Votre nouvelle adresse à Alger</p><p className="mt-0.5 text-xs text-slate-300">Professionnelle, accessible et bien accompagnée.</p></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

export default hero