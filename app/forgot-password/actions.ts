"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { actionFailure, actionSuccess, validationFailure, type ActionResult } from "@/lib/action-result";
import { isEmailDeliveryConfigured } from "@/lib/email";
import { allowRequest } from "@/lib/rate-limit";

export async function requestPasswordReset(_: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!(await allowRequest("password-reset", 3, 15 * 60_000))) return actionFailure("Veuillez patienter avant de réessayer.");
  const parsed = z.object({ email: z.email() }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);
  if (!isEmailDeliveryConfigured()) return actionFailure("La récupération par e-mail n’est pas encore configurée. Contactez l’équipe OWES.");

  await auth.api.requestPasswordReset({ body: { email: parsed.data.email, redirectTo: "/reset-password" } });
  return actionSuccess("Si ce compte existe, un lien de réinitialisation vient d’être envoyé.");
}

export async function resetPassword(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = z.object({ token: z.string().min(1), password: z.string().min(8).max(128), confirmation: z.string() }).refine((data) => data.password === data.confirmation, { path: ["confirmation"], message: "Les mots de passe ne correspondent pas." }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);

  try {
    await auth.api.resetPassword({ body: { token: parsed.data.token, newPassword: parsed.data.password } });
    return actionSuccess("Votre mot de passe a été réinitialisé. Vous pouvez vous connecter.");
  } catch {
    return actionFailure("Ce lien est invalide ou a expiré.");
  }
}
