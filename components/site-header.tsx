import Link from "next/link";
import { ArrowRight, LogIn, Menu, UserPlus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/authorization";
import { DesktopNav, MobileNavLinks } from "@/components/site-header-nav";
import { OwesLogoSlog } from "./owes-logo";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 px-3 sm:top-6 sm:px-6">
      <header className="pointer-events-auto mx-auto max-w-7xl rounded-2xl border border-white/80 bg-white/90 shadow-[0_18px_50px_color-mix(in_srgb,var(--color-brand-950)_15%,transparent)] ring-1 ring-brand-100/70 backdrop-blur-xl sm:rounded-3xl">
        <div className="flex h-16 items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Accueil OWES"><OwesLogoSlog className="h-16" priority /></Link>

          <DesktopNav />

          <div className="hidden items-center gap-2 md:flex">
            {session?.user ? (
              <Link href="/dashboard" className={cn(buttonVariants({ size: "sm" }), "rounded-full bg-brand-500 px-5 hover:bg-brand-950")}>Mon espace <ArrowRight size={15} /></Link>
            ) : (
              <>
                <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}><LogIn size={15} />Connexion</Link>
                <Link href="/register" className={cn(buttonVariants({ size: "sm" }), "rounded-full bg-brand-500 px-5 hover:bg-brand-950")}><UserPlus size={15} />Commencer <ArrowRight size={15} /></Link>
              </>
            )}
          </div>

          <details className="group relative md:hidden">
            <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-full text-brand-950 transition hover:bg-rose-50" aria-label="Ouvrir le menu">
              <Menu size={21} />
            </summary>
            <nav className="absolute right-0 top-12 grid w-56 gap-1 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl">
              <MobileNavLinks />
              <div className="my-1 border-t border-slate-100" />
              <Link href={session?.user ? "/dashboard" : "/login"} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-3 py-2.5 text-center text-sm font-bold text-white">
                {session?.user ? <ArrowRight size={15} /> : <LogIn size={15} />}
                {session?.user ? "Mon espace" : "Connexion"}
              </Link>
            </nav>
          </details>
        </div>
      </header>
    </div>
  );
}
