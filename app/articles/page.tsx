import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
export const metadata: Metadata = { title: "Articles" };
export const dynamic = "force-dynamic";
export default async function ArticlesPage() { const articles = await prisma.article.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } }).catch(() => []); return <><SiteHeader /><main className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8"><p className="text-sm font-bold uppercase tracking-widest text-brand-500">Ressources</p><h1 className="mt-3 text-4xl font-black">Conseils et actualités</h1>{articles.length ? <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <Card key={article.id}><CardContent className="pt-6"><p className="text-xs font-semibold text-brand-500">{article.publication} · {article.publishedAt.toLocaleDateString("fr-DZ")}</p><h2 className="mt-3 text-xl font-bold">{article.title}</h2><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{article.excerpt}</p><Link href={`/articles/${article.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-500">Lire <ArrowRight size={15} /></Link></CardContent></Card>)}</div> : <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">Les articles seront disponibles après l’import des données historiques.</div>}</main><SiteFooter /></>; }
