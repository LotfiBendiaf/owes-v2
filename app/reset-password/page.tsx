import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { ResetPasswordForm } from "@/components/password-recovery-form";
import { OwesLogoSlog } from "@/components/owes-logo";

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return <main className="grid min-h-screen bg-[#f4f0e7] lg:grid-cols-[.7fr_1.3fr]"><section className="flex flex-col justify-between border-r border-brand-950/15 p-7 sm:p-12"><Link href="/"><OwesLogoSlog className="h-14" priority /></Link><div className="my-16"><span className="grid size-12 place-items-center rounded-full bg-[#e4f3ec] text-emerald-700"><LockKeyhole size={19} /></span><p className="mt-7 font-mono text-xs uppercase tracking-[.2em] text-brand-700">Accès — Sécurité</p><h1 className="mt-4 text-4xl font-extrabold leading-none tracking-[-.04em] text-brand-950 sm:text-5xl">Choisissez un nouveau mot de passe.</h1></div><Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold text-brand-950"><ArrowLeft size={15} />Retour à la connexion</Link></section><section className="grid place-items-center bg-[#fbfaf7] p-7"><div className="w-full max-w-lg border-y border-brand-950/15 py-10"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-brand-700">Nouveau mot de passe</p><div className="mt-8">{token ? <ResetPasswordForm token={token} /> : <p className="border-l-2 border-red-600 bg-red-50 p-4 text-sm text-red-700">Lien de réinitialisation invalide.</p>}</div></div></section></main>;
}
