"use client";

import { useActionState, useState } from "react";
import { createServiceRequest, type ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Textarea, inputClass } from "@/components/ui/field";
import { coworkingTotal, pricing } from "@/lib/pricing";
import { money } from "@/lib/utils";

type Kind = "MEETING" | "COWORKING" | "TRAINING" | "DOMICILIATION" | "WEBSITE_BUILDING";

const optionsByKind: Record<Kind, readonly [string, string][]> = {
  MEETING: [["half", "Demi-journée"], ["full", "Journée"]],
  COWORKING: [["day", "Journée"], ["week", "Semaine"], ["month", "Mois"]],
  TRAINING: [["day", "Par jour"]],
  DOMICILIATION: [["standard", "Standard"], ["premium", "Premium"], ["exclusive", "Exclusive"]],
  WEBSITE_BUILDING: [["starter", "Site vitrine"], ["business", "Site professionnel"], ["ecommerce", "E-commerce"]],
};

export function ServiceRequestForm() {
  const [state, action, pending] = useActionState(createServiceRequest, {} as ActionState);
  const [kind, setKind] = useState<Kind>("MEETING");
  const [option, setOption] = useState("half");
  const [people, setPeople] = useState(1);
  const showQuantity = kind === "MEETING" || kind === "COWORKING" || kind === "TRAINING";
  const estimate = quote(kind, option, people);

  function changeKind(next: Kind) {
    setKind(next);
    setOption(optionsByKind[next][0][0]);
    setPeople(1);
  }

  return <Card className="mx-auto max-w-3xl"><CardHeader><CardTitle>Déposer une demande</CardTitle><p className="text-sm text-slate-600">Nous confirmerons la disponibilité et le montant avant règlement.</p></CardHeader><CardContent><form action={action} className="grid gap-5 sm:grid-cols-2"><Field label="Service"><select name="kind" value={kind} onChange={(event) => changeKind(event.target.value as Kind)} className={inputClass}><option value="MEETING">Salle de réunion</option><option value="COWORKING">Coworking</option><option value="TRAINING">Formation</option><option value="DOMICILIATION">Domiciliation</option><option value="WEBSITE_BUILDING">Création de site web</option></select></Field><Field label="Formule" error={state.errors?.option?.[0]}><select name="option" value={option} onChange={(event) => setOption(event.target.value)} className={inputClass}>{optionsByKind[kind].map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></Field><Field label="Nom complet" error={state.errors?.name?.[0]}><Input name="name" required /></Field><Field label="E-mail" error={state.errors?.email?.[0]}><Input name="email" type="email" autoComplete="email" required /></Field><Field label="Téléphone" error={state.errors?.phone?.[0]}><Input name="phone" type="tel" autoComplete="tel" required /></Field>{showQuantity ? <Field label={kind === "TRAINING" ? "Nombre de jours" : "Nombre de personnes"} error={state.errors?.people?.[0]}><Input name="people" type="number" value={people} onChange={(event) => setPeople(Math.max(1, Number(event.target.value)))} min="1" max="100" required /></Field> : <input type="hidden" name="people" value="1" />}<Field label="Date souhaitée" error={state.errors?.date?.[0]}><Input name="date" type="date" /></Field><Field label="Objet" error={state.errors?.subject?.[0]}><Input name="subject" required /></Field><div className="sm:col-span-2"><Field label="Précisions" error={state.errors?.notes?.[0]}><Textarea name="notes" /></Field></div><div className="sm:col-span-2 rounded-xl bg-brand-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-brand-700">Estimation</p><p className="mt-1 text-xl font-black text-brand-950">{money(estimate)}</p><p className="mt-1 text-xs text-slate-500">Montant indicatif confirmé par l’équipe OWES avant règlement.</p></div>{state.message && <p aria-live="polite" className={`sm:col-span-2 rounded-xl p-3 text-sm ${state.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}>{state.message}</p>}<Button disabled={pending} className="sm:col-span-2">{pending ? "Enregistrement…" : "Envoyer la demande"}</Button></form></CardContent></Card>;
}

function quote(kind: Kind, option: string, people: number) {
  if (kind === "MEETING") return option === "full" ? pricing.meeting.fullDay : pricing.meeting.halfDay;
  if (kind === "TRAINING") return pricing.trainingDay * people;
  if (kind === "DOMICILIATION") return pricing.domiciliation[option as keyof typeof pricing.domiciliation] ?? pricing.domiciliation.standard;
  if (kind === "WEBSITE_BUILDING") return pricing.websiteBuilding[option as keyof typeof pricing.websiteBuilding] ?? pricing.websiteBuilding.starter;
  return coworkingTotal(option as "day" | "week" | "month", people);
}
