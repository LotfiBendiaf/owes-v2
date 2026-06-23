import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export const metadata: Metadata = { title: "Inscription" };
export default function RegisterPage() { return <main className="grid min-h-screen place-items-center bg-brand-950 px-4 py-12"><div className="w-full max-w-md"><Link href="/" className="mb-6 block text-center text-2xl font-black text-white">OWES</Link><Card><CardHeader><CardTitle>Créer un compte client</CardTitle><p className="text-sm text-slate-600">Centralisez vos réservations et paiements.</p></CardHeader><CardContent><AuthForm mode="register" /></CardContent></Card></div></main>; }
