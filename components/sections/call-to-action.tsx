import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="border-t border-brand-950/15 bg-[#e7edff] px-6 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div><p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Votre prochaine étape</p><h2 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[.96] tracking-[-.045em] text-brand-950 sm:text-6xl">Donnez plus d&apos;espace à <span className="font-normal italic text-brand-500">votre projet.</span></h2></div>
        <Link href="/register" className="inline-flex h-13 items-center gap-4 bg-brand-950 px-7 text-sm font-bold text-white transition hover:bg-brand-500">Créer mon espace <ArrowRight size={17} /></Link>
      </div>
    </section>
  );
}
