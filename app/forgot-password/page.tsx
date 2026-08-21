import Link from "next/link";
import { ForgotPasswordForm } from "@/components/password-recovery-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4"><Card className="w-full max-w-md"><CardHeader><CardTitle>Mot de passe oublié</CardTitle><p className="text-sm text-slate-600">Recevez un lien sécurisé pour choisir un nouveau mot de passe.</p></CardHeader><CardContent><ForgotPasswordForm /><Link href="/login" className="mt-5 block text-center text-sm font-semibold text-brand-700">Retour à la connexion</Link></CardContent></Card></main>;
}
