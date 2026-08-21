"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center"><h1 className="text-xl font-bold text-red-900">Impossible de charger cette page</h1><p className="mt-2 text-sm text-red-700">Réessayez. Si le problème persiste, contactez l’équipe OWES.</p><Button className="mt-5" onClick={reset}>Réessayer</Button></div>;
}
