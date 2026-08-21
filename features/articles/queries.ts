import "server-only";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 9;

export const getPublishedArticles = unstable_cache(async (page: number) => {
  const [total, rows] = await prisma.$transaction([
    prisma.article.count({ where: { published: true } }),
    prisma.article.findMany({ where: { published: true }, select: { id: true, slug: true, title: true, publication: true, publishedAt: true, excerpt: true, coverImage: true }, orderBy: { publishedAt: "desc" }, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }),
  ]);
  return { total, rows, pageSize: PAGE_SIZE };
}, ["published-articles"], { revalidate: 3600, tags: ["articles"] });

export const getPublishedArticle = unstable_cache(async (slug: string) => prisma.article.findFirst({ where: { slug, published: true }, include: { sections: { orderBy: { position: "asc" } }, media: { orderBy: { position: "asc" } } } }), ["published-article"], { revalidate: 3600, tags: ["articles"] });
