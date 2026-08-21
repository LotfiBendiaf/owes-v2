"use client";

import { Button } from "@/components/ui/button";

export default function ArticlesError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="grid min-h-screen place-items-center px-6 text-center"><div><h1 className="text-2xl font-bold">Les articles sont momentanément indisponibles</h1><Button className="mt-5" onClick={reset}>Réessayer</Button></div></main>;
}
