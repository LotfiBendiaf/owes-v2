"use client";

import { useActionState, useState } from "react";
import { createServiceRequest, type ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Textarea, inputClass } from "@/components/ui/field";

const initialState: ActionState = {};
export function ServiceRequestForm() {
  const [state, action, pending] = useActionState(createServiceRequest, initialState);
  const [kind, setKind] = useState("MEETING");
  const options = kind === "MEETING" ? [["half", "Demi-journée"], ["full", "Journée"]] : kind === "COWORKING" ? [["day", "Journée"], ["week", "Semaine"], ["month", "Mois"]] : kind === "DOMICILIATION" ? [["standard", "Standard"], ["premium", "Premium"], ["exclusive", "Exclusive"]] : kind === "WEBSITE_BUILDING" ? [["starter", "Site vitrine"], ["business", "Site professionnel"], ["ecommerce", "E-commerce"]] : [["day", "Par jour"]];
  return <Card className="mx-auto max-w-3xl"><CardHeader><CardTitle>Déposer une demande</CardTitle><p className="text-sm text-slate-600">Nous confirmerons la disponibilité et le montant avant règlement.</p></CardHeader><CardContent><form action={action} className="grid gap-5 sm:grid-cols-2"><Field label="Service"><select name="kind" value={kind} onChange={(e) => setKind(e.target.value)} className={inputClass}><option value="MEETING">Salle de réunion</option><option value="COWORKING">Coworking</option><option value="TRAINING">Formation</option><option value="DOMICILIATION">Domiciliation</option><option value="WEBSITE_BUILDING">Création de site web</option></select></Field><Field label="Formule"><select name="option" className={inputClass}>{options.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></Field><Field label="Nom complet" error={state.errors?.name?.[0]}><Input name="name" required /></Field><Field label="E-mail" error={state.errors?.email?.[0]}><Input name="email" type="email" required /></Field><Field label="Téléphone" error={state.errors?.phone?.[0]}><Input name="phone" required /></Field><Field label={kind === "TRAINING" ? "Nombre de jours" : "Nombre de personnes"} error={state.errors?.people?.[0]}><Input name="people" type="number" defaultValue="1" min="1" max="100" required /></Field><Field label="Date souhaitée" error={state.errors?.date?.[0]}><Input name="date" type="date" /></Field><Field label="Objet" error={state.errors?.subject?.[0]}><Input name="subject" required /></Field><div className="sm:col-span-2"><Field label="Précisions" error={state.errors?.notes?.[0]}><Textarea name="notes" /></Field></div>{state.message && <p aria-live="polite" className={`sm:col-span-2 rounded-xl p-3 text-sm ${state.ok ? "bg-rose-50 text-rose-900" : "bg-red-50 text-red-700"}`}>{state.message}</p>}<Button disabled={pending} className="sm:col-span-2">{pending ? "Enregistrement…" : "Envoyer la demande"}</Button></form></CardContent></Card>;
}
