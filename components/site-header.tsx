import Link from "next/link";
import { ArrowRight, LogIn, Menu } from "lucide-react";
import { getSession } from "@/lib/authorization";
import { DesktopNav, MobileNavLinks } from "@/components/site-header-nav";
import { OwesLogoSlog } from "./owes-logo";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <header className="pointer-events-auto mx-auto max-w-7xl border border-brand-950/15 bg-[#fbfaf7]/95 shadow-[0_12px_40px_rgba(0,15,61,0.1)] backdrop-blur-xl">
        <div className="flex h-[4.5rem] items-stretch justify-between">
          <Link href="/" aria-label="Accueil OWES" className="flex min-w-0 items-center px-4 sm:px-6">
            <OwesLogoSlog className="h-14 w-auto" priority />
          </Link>

          <DesktopNav />

          <div className="hidden items-stretch md:flex">
            {session?.user ? (
              <Link href="/dashboard" className="group flex items-center gap-3 bg-brand-500 px-5 text-sm font-bold text-white transition-colors hover:bg-brand-950 lg:px-6">Mon espace <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
            ) : (
              <>
                <Link href="/login" className="hidden items-center gap-2 border-l border-brand-950/15 px-4 text-sm font-bold text-brand-950 transition-colors hover:bg-white lg:flex"><LogIn size={15} />Connexion</Link>
                <Link href="/register" className="group flex items-center gap-3 bg-brand-500 px-5 text-sm font-bold text-white transition-colors hover:bg-brand-950 lg:px-6">Commencer <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
              </>
            )}
          </div>

          <details className="group relative md:hidden">
            <summary className="grid h-full w-16 cursor-pointer list-none place-items-center border-l border-brand-950/15 text-brand-950 transition hover:bg-brand-950 hover:text-white" aria-label="Ouvrir le menu">
              <Menu size={21} />
            </summary>
            <nav className="absolute right-0 top-[calc(100%+1px)] grid w-[min(22rem,calc(100vw-1.5rem))] border border-brand-950/15 bg-[#fbfaf7] p-5 shadow-2xl">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[.2em] text-slate-500">Index — Navigation</p>
              <MobileNavLinks />
              <Link href={session?.user ? "/dashboard" : "/login"} className="mt-5 inline-flex items-center justify-between gap-2 bg-brand-950 px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-500">
                {session?.user ? <ArrowRight size={15} /> : <LogIn size={15} />}
                <span className="mr-auto">{session?.user ? "Mon espace" : "Connexion"}</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-200">Espace client</span>
              </Link>
            </nav>
          </details>
        </div>
      </header>
    </div>
  );
}
