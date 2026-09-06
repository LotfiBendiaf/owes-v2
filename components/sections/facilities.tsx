import { Coffee, Presentation, Printer, Tv, Wifi } from "lucide-react";

const facilities = [
  { icon: Wifi, title: "Wi-Fi haut débit", description: "Pour travailler, échanger et rester connecté." },
  { icon: Coffee, title: "Coffee shop", description: "Une pause café, une conversation, une nouvelle idée." },
  { icon: Printer, title: "Service d’impression", description: "Vos documents et supports à portée de main." },
  { icon: Tv, title: "TV 4K", description: "Un affichage net pour vos présentations." },
  { icon: Presentation, title: "Tableaux blancs", description: "De la place pour réfléchir et construire ensemble." },
];

export default function Facilities() {
  return (
    <section aria-labelledby="facilities-title" className="border-y border-brand-950/10 bg-brand-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">À votre disposition</p>
            <h2 id="facilities-title" className="mt-4 text-3xl font-extrabold leading-tight tracking-[-.04em] text-brand-950 sm:text-4xl">
              Bien équipé. <span className="font-normal italic text-brand-500">Bien installé.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600 lg:justify-self-end">
            Du premier café à la dernière présentation, des équipements et services pour faciliter votre journée chez OWES.
          </p>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-8 border-t border-brand-950/15 pt-8 sm:grid-cols-2 lg:grid-cols-5">
          {facilities.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <Icon aria-hidden="true" size={28} strokeWidth={1.5} className="text-brand-700" />
              <h3 className="mt-5 text-base font-semibold tracking-tight text-brand-950">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
