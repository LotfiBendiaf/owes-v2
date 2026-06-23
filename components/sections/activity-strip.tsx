const activities = [
  "Adresse",
  "Espace",
  "Réunion",
  "Formation",
  "Accompagnement",
];

export default function ActivityStrip() {
  return (
    <section className="overflow-hidden bg-white py-10">
      <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-brand-700">
        Un seul partenaire pour toute votre activité
      </p>
      <div className="mx-auto mt-7 flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-5 px-6 text-sm font-extrabold uppercase tracking-wider text-slate-400">
        {activities.map((activity) => (
          <span key={activity} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-rose-500" />
            {activity}
          </span>
        ))}
      </div>
    </section>
  );
}
