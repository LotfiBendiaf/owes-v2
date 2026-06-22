"use client";
import { useActionState } from "react";
import { sendContact, type ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
const initial: ActionState = {};
export function ContactForm() { const [state, action, pending] = useActionState(sendContact, initial); return <form action={action} className="grid gap-5"><Field label="Nom"><Input name="name" required /></Field><Field label="E-mail"><Input name="email" type="email" required /></Field><Field label="Objet"><Input name="subject" required /></Field><Field label="Message"><Textarea name="message" required /></Field>{state.message && <p className={`rounded-xl p-3 text-sm ${state.ok ? "bg-rose-50 text-rose-900" : "bg-red-50 text-red-700"}`}>{state.message}</p>}<Button disabled={pending}>{pending ? "Envoi…" : "Envoyer"}</Button></form>; }
