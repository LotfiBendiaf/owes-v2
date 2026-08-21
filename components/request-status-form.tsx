"use client";

import { useState } from "react";
import type { RequestStatus } from "@prisma/client";
import { updateRequestStatus } from "@/app/dashboard/requests/actions";
import { Button } from "@/components/ui/button";
import { inputClass } from "@/components/ui/field";
import { allowedRequestTransitions } from "@/features/requests/status";

const labels: Record<RequestStatus, string> = { DRAFT: "Brouillon", SUBMITTED: "Reçue", CONFIRMED: "Confirmée", IN_PROGRESS: "En cours", COMPLETED: "Terminée", CANCELLED: "Annulée" };

export function RequestStatusForm({ requestId, current }: { requestId: string; current: RequestStatus }) {
  const choices = allowedRequestTransitions(current);
  const [status, setStatus] = useState<RequestStatus>(choices[0] ?? current);
  if (!choices.length) return null;
  return <form action={updateRequestStatus} onSubmit={(event) => { if (status === "CANCELLED" && !window.confirm("Confirmer l’annulation de cette demande ?")) event.preventDefault(); }} className="flex gap-2"><input type="hidden" name="requestId" value={requestId} /><select aria-label="Nouveau statut" name="status" value={status} onChange={(event) => setStatus(event.target.value as RequestStatus)} className={inputClass}>{choices.map((choice) => <option key={choice} value={choice}>{labels[choice]}</option>)}</select><Button size="sm">Mettre à jour</Button></form>;
}
