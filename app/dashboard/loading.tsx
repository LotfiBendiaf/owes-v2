export default function DashboardLoading() {
  return <div aria-label="Chargement" className="animate-pulse"><div className="h-8 w-56 rounded bg-slate-200" /><div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <div key={index} className="h-28 rounded-2xl bg-slate-200" />)}</div><div className="mt-8 h-80 rounded-2xl bg-slate-200" /></div>;
}
