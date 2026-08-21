export default function ArticlesLoading() {
  return <main className="mx-auto max-w-7xl px-6 pb-20 pt-32" aria-label="Chargement des articles"><div className="h-10 w-72 animate-pulse rounded bg-slate-200" /><div className="mt-10 grid gap-6 md:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-56 animate-pulse rounded-2xl bg-slate-200" />)}</div></main>;
}
