const activities = [
  "Adresse",
  "Espace",
  "Réunion",
  "Formation",
  "Web",
  "Accompagnement",
];

export default function ActivityStrip() {
  return (
    <section className="overflow-hidden border-y border-brand-950/10 bg-[#e9efff] py-8">
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.24em] text-brand-700">
        Un seul partenaire pour toute votre activité
      </p>
      <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 font-mono text-xs font-semibold uppercase tracking-wider text-brand-950/70">
        {activities.map((activity) => (
          <span key={activity} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-rose-600" />
            {activity}
          </span>
        ))}
      </div>
    </section>
  );
}
