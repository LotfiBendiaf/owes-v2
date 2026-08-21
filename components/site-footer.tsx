import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { OwesLogoSlog } from "@/components/owes-logo";

const links = [
  { label: "Services", href: "/services" }, { label: "Articles", href: "/articles" },
  { label: "À propos", href: "/#about" }, { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-950/15 bg-[#f4f0e7] text-brand-950">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 border-b border-brand-950/15 pb-14 lg:grid-cols-[1.15fr_.85fr]">
          <div><p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Une idée à faire avancer ?</p><h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[.95] tracking-[-.045em] sm:text-6xl">Prenons le temps d&apos;en parler <span className="font-normal italic text-brand-500">simplement.</span></h2></div>
          <div className="flex items-end lg:justify-end"><Link href="/contact" className="group inline-flex items-center gap-5 bg-brand-950 py-1 pl-7 pr-1 text-sm font-bold text-white transition hover:bg-brand-500">Démarrer une conversation <span className="grid size-10 place-items-center bg-white text-brand-950"><ArrowUpRight size={17} className="transition group-hover:rotate-45" /></span></Link></div>
        </div>
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.15fr_.65fr_1fr]">
          <div><Link href="/" className="inline-flex"><OwesLogoSlog className="h-14" /></Link><p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">Office et Web Services accompagne les entrepreneurs algériens avec des espaces, une adresse et des outils pensés pour durer.</p></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-500">Index</p><nav className="mt-5 grid gap-3">{links.map((link, index) => <Link key={link.href} href={link.href} className="group flex items-center gap-3 text-sm font-bold"><span className="font-mono text-[10px] text-slate-400">0{index + 1}</span><span className="transition group-hover:text-brand-500">{link.label}</span></Link>)}</nav></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-500">Nous trouver</p><div className="mt-5 grid gap-4 text-sm text-slate-600"><p className="flex gap-3"><MapPin size={16} className="shrink-0 text-rose-600" />Alger, Algérie</p><a href="mailto:contact@owes.dz" className="flex gap-3 hover:text-brand-500"><Mail size={16} className="shrink-0 text-brand-500" />contact@owes.dz</a><p className="flex gap-3"><Phone size={16} className="shrink-0 text-emerald-700" />+213 (0) 00 00 00 00</p><p className="flex gap-3"><Clock size={16} className="shrink-0 text-amber-700" />Dim. — Jeu. · 08h — 17h</p></div></div>
        </div>
        <div className="flex flex-col gap-3 border-t border-brand-950/15 pt-6 font-mono text-[10px] uppercase tracking-wider text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} OWES — Tous droits réservés</p><p>Office &amp; Web Services · Alger</p></div>
      </div>
    </footer>
  );
}
