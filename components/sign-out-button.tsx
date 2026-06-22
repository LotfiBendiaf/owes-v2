"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
export function SignOutButton() { const router = useRouter(); return <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-100" onClick={async () => { await authClient.signOut(); router.push("/"); router.refresh(); }}><LogOut size={17} />Déconnexion</button>; }
