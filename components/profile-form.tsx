"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/dashboard/settings/actions";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import type { ActionResult } from "@/lib/action-result";

export function ProfileForm({ profile }: { profile: { name: string; email: string; phone: string; company: string; address: string } }) {
  const [state, action, pending] = useActionState(updateProfile, {} as ActionResult);
  return <form action={action} className="grid gap-5"><Field label="Nom complet" error={state.errors?.name?.[0]}><Input name="name" defaultValue={profile.name} required /></Field><Field label="E-mail"><Input value={profile.email} disabled /></Field><Field label="Téléphone" error={state.errors?.phone?.[0]}><Input name="phone" defaultValue={profile.phone} /></Field><Field label="Entreprise" error={state.errors?.company?.[0]}><Input name="company" defaultValue={profile.company} /></Field><Field label="Adresse" error={state.errors?.address?.[0]}><Input name="address" defaultValue={profile.address} /></Field>{state.message && <p aria-live="polite" className={`rounded-xl p-3 text-sm ${state.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}>{state.message}</p>}<Button disabled={pending}>{pending ? "Enregistrement…" : "Enregistrer"}</Button></form>;
}
