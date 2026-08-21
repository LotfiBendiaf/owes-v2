import Link from "next/link";

export default function RequestNotFound() {
  return <div className="rounded-2xl border border-dashed p-10 text-center"><h1 className="text-2xl font-bold">Demande introuvable</h1><p className="mt-2 text-sm text-slate-500">Cette demande n’existe pas ou vous n’avez pas accès à celle-ci.</p><Link href="/dashboard/requests" className="mt-5 inline-flex font-semibold text-brand-700">Retour aux demandes</Link></div>;
}
