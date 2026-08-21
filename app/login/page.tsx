import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { AuthForm } from "@/components/auth-form";
import { OwesLogoSlog } from "@/components/owes-logo";

export const metadata: Metadata = { title: "Connexion" };
function safeUrl(value: string | string[] | undefined) { return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard"; }

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string | string[]; error?: string | string[] }> }) {
  const params = await searchParams;
  return <main className="min-h-screen bg-[#fbfaf7] p-3 sm:p-5"><div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-[1500px] overflow-hidden border border-brand-950/15 bg-white lg:grid-cols-[1.05fr_.95fr]">
    <section className="relative hidden min-h-[46rem] bg-brand-950 lg:block"><Image src="/office/bureau_prive.jpg" alt="Bureau privé OWES" fill priority sizes="55vw" className="object-cover" /><div className="absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/15 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-12 text-white xl:p-16"><p className="font-mono text-xs uppercase tracking-[.2em] text-rose-200">Espace digital OWES</p><h1 className="mt-5 max-w-xl text-5xl font-extrabold leading-[.95] tracking-[-.045em]">Retrouvez vos projets, <span className="font-normal italic text-rose-200">sans perdre le fil.</span></h1><div className="mt-8 flex flex-wrap gap-5 text-xs">{["Demandes", "Mises à jour", "Suivi sécurisé"].map(x => <span key={x} className="flex gap-2"><Check size={13} />{x}</span>)}</div></div></section>
    <section className="flex flex-col px-6 py-7 sm:px-12 sm:py-10 xl:px-20"><div className="flex items-center justify-between"><Link href="/"><OwesLogoSlog className="h-14" priority /></Link><Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500"><ArrowLeft size={14} />Accueil</Link></div><div className="my-auto py-12"><p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Votre espace</p><h2 className="mt-4 text-4xl font-extrabold tracking-[-.04em] text-brand-950 sm:text-5xl">Bon retour.</h2><p className="mt-3 text-sm text-slate-600">Connectez-vous pour reprendre là où vous vous êtes arrêté.</p>{params.error === "inactive" && <p className="mt-6 border-l-2 border-rose-600 bg-rose-50 p-3 text-sm text-rose-900">Votre accès est en attente d&apos;activation.</p>}<div className="mt-8"><AuthForm mode="login" redirectTo={safeUrl(params.callbackUrl)} /></div></div><p className="border-t border-brand-950/10 pt-5 font-mono text-[10px] uppercase tracking-wider text-slate-400">Accès réservé aux clients et administrateurs OWES</p></section>
  </div></main>;
}
