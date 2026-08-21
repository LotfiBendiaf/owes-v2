import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedArticle } from "@/features/articles/queries";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = await getPublishedArticle((await params).slug);
  return article ? { title: article.title, description: article.excerpt } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await getPublishedArticle((await params).slug);
  if (!article) notFound();
  return <><SiteHeader /><article className="mx-auto max-w-3xl px-4 pb-20 pt-32"><p className="text-sm font-bold text-brand-500">{article.publication} · {article.publishedAt.toLocaleDateString("fr-DZ")}</p><h1 className="mt-4 text-4xl font-black leading-tight">{article.title}</h1><p className="mt-4 text-slate-500">Par {article.author}</p><div className="mt-10 space-y-8 text-base leading-8 text-slate-700"><p>{article.content}</p>{article.sections.map((section) => <section key={section.id}>{section.heading && <h2 className="mb-3 text-2xl font-bold text-slate-950">{section.heading}</h2>}<p className="whitespace-pre-line">{section.body}</p></section>)}</div></article><SiteFooter /></>;
}
