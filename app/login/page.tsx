import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { AuthForm } from "@/components/auth-form";
import { OwesLogoSlog } from "@/components/owes-logo";

export const metadata: Metadata = { title: "Connexion" };

const highlights = [
  "Suivre vos demandes de service en cours",
  "Consulter vos paiements et documents",
  "Echanger avec l'equipe OWES depuis un espace centralise",
];

function getSafeCallbackUrl(value: string | string[] | undefined) {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/dashboard";
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string | string[]; error?: string | string[] }>;
}) {
  const params = await searchParams;
  const callbackUrl = getSafeCallbackUrl(params.callbackUrl);
  const isInactive = params.error === "inactive";

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(29,44,191,0.10),rgba(255,255,255,0)_45%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-brand-200 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <section className="hidden lg:block">
          <Link
            href="/"
            className="inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Accueil OWES"
          >
            <OwesLogoSlog className="h-16" priority />
          </Link>

          <div className="mt-12 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm shadow-slate-950/5 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Espace digital OWES
            </div>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-950 xl:text-5xl">
              Retrouvez votre tableau de bord.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Reprenez vos demandes, factures, messages et suivis depuis un
              espace clair, prive et organise.
            </p>
          </div>

          <div className="mt-10 grid max-w-xl gap-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-white/80 bg-white/75 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm shadow-slate-950/5 backdrop-blur"
              >
                <CheckCircle2
                  className="h-5 w-5 shrink-0 text-brand-500"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 inline-flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-semibold text-slate-950">
                Acces protege
              </span>
              Authentification par e-mail et mot de passe pour garder votre espace
              confidentiel.
            </span>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <div className="mb-8 flex justify-center lg:hidden">
            <Link
              href="/"
              className="inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Accueil OWES"
            >
              <OwesLogoSlog className="h-14" priority />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/10 sm:p-8">
            <div>
              <p className="text-sm font-semibold text-brand-600">
                Connexion au tableau de bord
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Connectez-vous a votre compte
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Nouveau chez OWES ?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  Creer un compte
                </Link>
              </p>
            </div>

            {isInactive && (
              <p className="mt-6 rounded-lg border border-rose-100 bg-rose-50 p-3 text-sm text-rose-900">
                Votre acces est en attente. Contactez notre equipe pour
                finaliser son activation.
              </p>
            )}

            <div className="mt-8">
              <AuthForm mode="login" redirectTo={callbackUrl} />
            </div>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-slate-500">
            Acces reserve aux clients et administrateurs OWES.
          </p>
        </section>
      </div>
    </main>
  );
}
