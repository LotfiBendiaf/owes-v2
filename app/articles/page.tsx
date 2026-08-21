import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Pagination } from "@/components/pagination";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedArticles } from "@/features/articles/queries";
import { normalizePage, totalPages } from "@/lib/pagination";

export const metadata: Metadata = { title: "Articles" };
export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = normalizePage((await searchParams).page); const { rows: articles, total, pageSize } = await getPublishedArticles(page);
  return <><SiteHeader /><main className="bg-[#fbfaf7] px-6 pb-24 pt-36"><div className="mx-auto max-w-7xl"><div className="grid gap-8 border-b border-brand-950/15 pb-12 lg:grid-cols-[1fr_.55fr] lg:items-end"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Le journal OWES</p><h1 className="mt-6 text-5xl font-extrabold leading-[.92] tracking-[-.055em] text-brand-950 sm:text-7xl">Idées, repères et <span className="font-normal italic text-brand-500">actualités.</span></h1></div><p className="leading-7 text-slate-600">Des ressources concrètes pour entreprendre, structurer votre présence et faire grandir votre activité.</p></div>{articles.length ? <><div className="divide-y divide-brand-950/15 border-b border-brand-950/15">{articles.map((article, index) => <article key={article.id} className="grid gap-5 py-9 sm:grid-cols-[4rem_1fr_1.2fr_auto] sm:items-start"><span className="font-mono text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span><p className="font-mono text-[10px] uppercase tracking-wider text-brand-700">{article.publication}<span className="mt-2 block text-slate-400">{article.publishedAt.toLocaleDateString("fr-DZ")}</span></p><div><h2 className="text-2xl font-extrabold tracking-tight text-brand-950 sm:text-3xl">{article.title}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{article.excerpt}</p></div><Link href={`/articles/${article.slug}`} className="grid size-11 place-items-center border border-brand-950/20 transition hover:bg-brand-950 hover:text-white" aria-label={`Lire ${article.title}`}><ArrowUpRight size={17} /></Link></article>)}</div><Pagination page={page} pages={totalPages(total, pageSize)} pathname="/articles" params={{}} /></> : <div className="border-b border-brand-950/15 py-20 text-center text-slate-500">Aucun article publié.</div>}</div></main><SiteFooter /></>;
}
