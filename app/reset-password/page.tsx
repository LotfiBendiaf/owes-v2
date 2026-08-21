import Link from "next/link";
import { ResetPasswordForm } from "@/components/password-recovery-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4"><Card className="w-full max-w-md"><CardHeader><CardTitle>Nouveau mot de passe</CardTitle></CardHeader><CardContent>{token ? <ResetPasswordForm token={token} /> : <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">Lien de réinitialisation invalide.</p>}<Link href="/login" className="mt-5 block text-center text-sm font-semibold text-brand-700">Retour à la connexion</Link></CardContent></Card></main>;
}
