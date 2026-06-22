import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/authorization";

const links = [
  ["Services", "/services"],
  ["Articles", "/articles"],
  ["A propos", "/#about"],
  ["Contact", "/contact"],
] as const;

function Brand() {
  return (
    <Image src="/legacy/images/owes-logo2.png" alt="OWES - Office Web et Service" width={190} height={50} className="h-10 w-auto object-contain" priority />
  );
}

export async function SiteHeader() {
  const session = await getSession();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 px-3 sm:top-6 sm:px-6">
      <header className="pointer-events-auto mx-auto max-w-7xl rounded-2xl border border-white/80 bg-white/90 shadow-[0_18px_50px_rgba(23,32,79,0.15)] ring-1 ring-indigo-100/70 backdrop-blur-xl sm:rounded-3xl">
        <div className="flex h-16 items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Accueil OWES"><Brand /></Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-[#17204f]">
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {session?.user ? (
              <Link href="/dashboard" className={cn(buttonVariants({ size: "sm" }), "rounded-full bg-[#273b82] px-5 hover:bg-[#17204f]")}>Mon espace <ArrowRight size={15} /></Link>
            ) : (
              <>
                <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}>Connexion</Link>
                <Link href="/register" className={cn(buttonVariants({ size: "sm" }), "rounded-full bg-[#273b82] px-5 hover:bg-[#17204f]")}>Commencer <ArrowRight size={15} /></Link>
              </>
            )}
          </div>

          <details className="group relative md:hidden">
            <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-full text-[#17204f] transition hover:bg-rose-50" aria-label="Ouvrir le menu">
              <Menu size={21} />
            </summary>
            <nav className="absolute right-0 top-12 grid w-56 gap-1 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl">
              {links.map(([label, href]) => <Link key={href} href={href} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-rose-50">{label}</Link>)}
              <div className="my-1 border-t border-slate-100" />
              <Link href={session?.user ? "/dashboard" : "/login"} className="rounded-xl bg-[#273b82] px-3 py-2.5 text-center text-sm font-bold text-white">
                {session?.user ? "Mon espace" : "Connexion"}
              </Link>
            </nav>
          </details>
        </div>
      </header>
    </div>
  );
}
