"use client";

import { useActionState } from "react";
import { requestPasswordReset, resetPassword } from "@/app/forgot-password/actions";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import type { ActionResult } from "@/lib/action-result";

const initialState: ActionResult = {};

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, initialState);
  return <form action={action} className="grid gap-5"><Field label="E-mail" error={state.errors?.email?.[0]}><Input name="email" type="email" autoComplete="email" required /></Field>{state.message && <p aria-live="polite" className={`rounded-xl p-3 text-sm ${state.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}>{state.message}</p>}<Button disabled={pending}>{pending ? "Envoi…" : "Envoyer le lien"}</Button></form>;
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetPassword, initialState);
  return <form action={action} className="grid gap-5"><input type="hidden" name="token" value={token} /><Field label="Nouveau mot de passe" error={state.errors?.password?.[0]}><Input name="password" type="password" minLength={8} autoComplete="new-password" required /></Field><Field label="Confirmer le mot de passe" error={state.errors?.confirmation?.[0]}><Input name="confirmation" type="password" minLength={8} autoComplete="new-password" required /></Field>{state.message && <p aria-live="polite" className={`rounded-xl p-3 text-sm ${state.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}>{state.message}</p>}<Button disabled={pending}>{pending ? "Mise à jour…" : "Réinitialiser"}</Button></form>;
}
