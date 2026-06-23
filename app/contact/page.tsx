import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export const metadata: Metadata = { title: "Contact" };
export default function ContactPage() { return <><SiteHeader /><main className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><section><p className="text-sm font-bold uppercase tracking-widest text-brand-500">Contact</p><h1 className="mt-3 text-4xl font-black">Parlons de votre projet.</h1><p className="mt-4 leading-7 text-slate-600">Une question sur nos formules ? Notre équipe vous répond dans les meilleurs délais.</p><div className="mt-10 grid gap-5 text-sm"><p className="flex gap-3"><MapPin className="text-brand-500" /> Alger, Algérie</p><p className="flex gap-3"><Mail className="text-brand-500" /> contact@owes.dz</p><p className="flex gap-3"><Phone className="text-brand-500" /> +213 (0) 00 00 00 00</p></div></section><Card><CardHeader><CardTitle>Écrivez-nous</CardTitle></CardHeader><CardContent><ContactForm /></CardContent></Card></main><SiteFooter /></>; }
