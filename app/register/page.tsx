import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, MessagesSquare } from "lucide-react";
import { AuthForm } from "@/components/auth-form";
import { OwesLogoSlog } from "@/components/owes-logo";

export const metadata: Metadata = { title: "Inscription" };

const benefits = [
  { icon: FileText, title: "Vos demandes réunies", text: "Retrouvez chaque service et son avancement au même endroit.", color: "bg-[#e7edff] text-brand-700" },
  { icon: MessagesSquare, title: "Un suivi plus direct", text: "Gardez le fil des échanges avec l’équipe OWES.", color: "bg-[#f9e8e8] text-rose-700" },
  { icon: CheckCircle2, title: "Simple et sans frais", text: "Votre espace client est créé en quelques instants.", color: "bg-[#e4f3ec] text-emerald-700" },
];

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] p-3 sm:p-5">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-[1500px] overflow-hidden rounded-[2rem] border border-brand-950/10 bg-white shadow-[0_24px_80px_rgba(0,15,61,.1)] lg:grid-cols-[1.05fr_.95fr]">
        <section className="relative hidden min-h-[46rem] overflow-hidden bg-brand-950 lg:block">
          <Image src="/office/coworking.jpg" alt="Espace de coworking OWES" fill priority sizes="55vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-12 text-white xl:p-16">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-rose-200">L’espace client OWES</p>
            <h1 className="mt-5 max-w-xl text-5xl font-extrabold leading-[.95] tracking-[-.045em]">Votre activité mérite un suivi <span className="font-normal italic text-rose-200">aussi clair que vos ambitions.</span></h1>
          </div>
        </section>

        <section className="flex flex-col px-6 py-7 sm:px-12 sm:py-10 xl:px-20">
          <div className="flex items-center justify-between">
            <Link href="/" className="rounded-xl bg-white"><OwesLogoSlog className="h-14" priority /></Link>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-950"><ArrowLeft size={14} /> Accueil</Link>
          </div>
          <div className="my-auto py-12">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Nouveau chez OWES ?</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-.04em] text-brand-950 sm:text-5xl">Créer votre espace.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Quelques informations suffisent pour commencer.</p>
            <div className="mt-8"><AuthForm mode="register" /></div>
          </div>
          <div className="grid gap-3 border-t border-brand-950/10 pt-6 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, ...item }) => <div key={item.title}><span className={`grid size-8 place-items-center rounded-full ${item.color}`}><Icon size={14} /></span><p className="mt-3 text-xs font-bold text-brand-950">{item.title}</p><p className="mt-1 text-[11px] leading-4 text-slate-500">{item.text}</p></div>)}
          </div>
        </section>
      </div>
    </main>
  );
}
