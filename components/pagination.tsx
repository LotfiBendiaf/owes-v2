import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Pagination({ page, pages, pathname, params }: { page: number; pages: number; pathname: string; params: Record<string, string | undefined> }) {
  if (pages <= 1) return null;
  const href = (nextPage: number) => {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) if (value) search.set(key, value);
    search.set("page", String(nextPage));
    return `${pathname}?${search.toString()}`;
  };
  return <nav aria-label="Pagination" className="mt-6 flex items-center justify-between gap-4"><Link aria-disabled={page <= 1} className={cn(buttonVariants({ variant: "outline" }), page <= 1 && "pointer-events-none opacity-50")} href={href(Math.max(1, page - 1))}>Précédent</Link><span className="text-sm text-slate-500">Page {page} sur {pages}</span><Link aria-disabled={page >= pages} className={cn(buttonVariants(), page >= pages && "pointer-events-none opacity-50")} href={href(Math.min(pages, page + 1))}>Suivant</Link></nav>;
}
