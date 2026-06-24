import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { OwesLogoSlog } from "@/components/owes-logo";

const trustItems = [
  { label: "Equipe locale", icon: MapPin },
  { label: "Suivi transparent", icon: CheckCircle2 },
  { label: "Services flexibles", icon: ShieldCheck },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_.75fr_.75fr_1.15fr] lg:gap-12">
          <div>
            <Link href="/" className="inline-flex rounded-xl bg-white px-4 py-3 shadow-sm">
              <OwesLogoSlog className="h-12" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">Office et Web Services accompagne les entrepreneurs algériens avec des espaces, une adresse professionnelle et des services conçus pour avancer.</p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {trustItems.map(({ label, icon: Icon }) => <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200"><Icon size={14} className="text-rose-500" />{label}</span>)}
            </div>
          </div>

          <div><h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">Explorer</h3><nav className="flex flex-col gap-3 text-sm text-slate-200"><Link href="/services">Services</Link><Link href="/articles">Articles</Link><Link href="/#about">A propos</Link></nav></div>
          <div><h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">Votre espace</h3><nav className="flex flex-col gap-3 text-sm text-slate-200"><Link href="/login">Connexion</Link><Link href="/register">Creer un compte</Link><Link href="/dashboard">Tableau de bord</Link></nav></div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">Contact</h3>
            <div className="flex flex-col gap-4 text-sm text-slate-200">
              <p className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-rose-500" />Alger, Algerie</p>
              <a href="mailto:contact@owes.dz" className="flex items-center gap-3 hover:text-rose-400"><Mail size={16} className="text-rose-500" />contact@owes.dz</a>
              <p className="flex items-center gap-3"><Phone size={16} className="text-rose-500" />+213 (0) 00 00 00 00</p>
              <p className="flex items-start gap-3"><Clock size={16} className="mt-0.5 text-rose-500" />Dim. - Jeu. : 08h - 17h</p>
              <Link href="/contact" className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-rose-500 px-5 py-3 font-bold text-brand-950 transition hover:bg-rose-400">Nous contacter <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-center text-xs text-slate-400 sm:flex-row"><p>© {new Date().getFullYear()} OWES. Tous droits reserves.</p><p>Office & Web Services, Alger</p></div></div>
    </footer>
  );
}
