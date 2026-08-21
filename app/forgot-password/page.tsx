import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";
import { ForgotPasswordForm } from "@/components/password-recovery-form";
import { OwesLogoSlog } from "@/components/owes-logo";

export default function ForgotPasswordPage() {
  return <main className="grid min-h-screen bg-[#f4f0e7] lg:grid-cols-[.7fr_1.3fr]"><section className="flex flex-col justify-between border-r border-brand-950/15 p-7 sm:p-12"><Link href="/"><OwesLogoSlog className="h-14" priority /></Link><div className="my-16"><span className="grid size-12 place-items-center rounded-full bg-[#e7edff] text-brand-700"><KeyRound size={19} /></span><p className="mt-7 font-mono text-xs uppercase tracking-[.2em] text-brand-700">Accès — Récupération</p><h1 className="mt-4 text-4xl font-extrabold leading-none tracking-[-.04em] text-brand-950 sm:text-5xl">Retrouvez votre accès.</h1><p className="mt-5 max-w-md leading-7 text-slate-600">Indiquez votre adresse e-mail. Nous vous enverrons un lien sécurisé pour choisir un nouveau mot de passe.</p></div><Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold text-brand-950"><ArrowLeft size={15} />Retour à la connexion</Link></section><section className="grid place-items-center bg-[#fbfaf7] p-7"><div className="w-full max-w-lg border-y border-brand-950/15 py-10"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-brand-700">Adresse du compte</p><h2 className="mt-3 text-2xl font-extrabold text-brand-950">Recevoir le lien</h2><div className="mt-8"><ForgotPasswordForm /></div></div></section></main>;
}
