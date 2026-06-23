"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(formData: FormData) {
    setPending(true); setError("");
    const email = String(formData.get("email")); const password = String(formData.get("password"));
    const result = mode === "login" ? await authClient.signIn.email({ email, password }) : await authClient.signUp.email({ email, password, name: String(formData.get("name")), phone: String(formData.get("phone")) });
    setPending(false);
    if (result.error) return setError(result.error.message ?? "Une erreur est survenue.");
    router.push("/dashboard"); router.refresh();
  }
  return <form action={submit} className="grid gap-5">{mode === "register" && <><Field label="Nom complet"><Input name="name" minLength={2} required /></Field><Field label="Téléphone"><Input name="phone" /></Field></>}<Field label="E-mail"><Input name="email" type="email" autoComplete="email" required /></Field><Field label="Mot de passe"><Input name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} required /></Field>{error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<Button disabled={pending}>{pending ? "Veuillez patienter…" : mode === "login" ? "Se connecter" : "Créer mon compte"}</Button><p className="text-center text-sm text-slate-600">{mode === "login" ? "Pas encore de compte ?" : "Déjà un compte ?"} <Link className="font-semibold text-brand-700" href={mode === "login" ? "/register" : "/login"}>{mode === "login" ? "S'inscrire" : "Se connecter"}</Link></p></form>;
}
