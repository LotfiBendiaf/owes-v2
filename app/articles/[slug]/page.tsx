import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedArticle } from "@/features/articles/queries";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const article = await getPublishedArticle((await params).slug); return article ? { title: article.title, description: article.excerpt } : {}; }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await getPublishedArticle((await params).slug); if (!article) notFound();
  return <><SiteHeader /><main className="bg-[#fbfaf7] pb-24 pt-36"><article className="mx-auto max-w-7xl px-6"><Link href="/articles" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-500"><ArrowLeft size={13} />Le journal</Link><header className="mt-8 grid gap-8 border-b border-brand-950/15 pb-12 lg:grid-cols-[1fr_.35fr] lg:items-end"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">{article.publication} — {article.publishedAt.toLocaleDateString("fr-DZ")}</p><h1 className="mt-6 max-w-5xl text-4xl font-extrabold leading-[.98] tracking-[-.045em] text-brand-950 sm:text-6xl">{article.title}</h1></div><p className="border-l border-brand-950/15 pl-6 font-mono text-[10px] uppercase tracking-wider text-slate-500">Texte par<span className="mt-2 block text-sm font-bold normal-case text-brand-950">{article.author}</span></p></header><div className="grid gap-10 pt-12 lg:grid-cols-[.3fr_1fr]"><aside><p className="font-mono text-[10px] uppercase tracking-[.2em] text-brand-700">À retenir</p><p className="mt-4 border-l-2 border-rose-600 pl-5 text-sm leading-6 text-slate-600">{article.excerpt}</p></aside><div className="max-w-3xl space-y-10 text-base leading-8 text-slate-700"><p className="text-lg leading-8 text-brand-950">{article.content}</p>{article.sections.map(section => <section key={section.id} className="border-t border-brand-950/15 pt-8">{section.heading && <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-brand-950">{section.heading}</h2>}<p className="whitespace-pre-line">{section.body}</p></section>)}</div></div></article></main><SiteFooter /></>;
}
