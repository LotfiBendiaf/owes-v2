import { ArrowUpRight, Clock, MapPin, Navigation, Phone } from "lucide-react";

const googleMapsUrl =
  "https://www.google.com/maps/place/OWES/@36.6977562,3.0422517,17z/data=!3m1!4b1!4m6!3m5!1s0x128fad2bc6e9af2d:0x2f65f33af31cd320!8m2!3d36.6977562!4d3.0422517!16s%2Fg%2F11ld6q58ds?entry=ttu";

const mapEmbedUrl =
  "https://www.google.com/maps?q=36.6977562,3.0422517&z=17&output=embed";

const details = [
  {
    label: "Adresse",
    value: "OWES, Alger",
    icon: MapPin,
  },
  {
    label: "Coordonnees",
    value: "36.6977562, 3.0422517",
    icon: Navigation,
  },
  {
    label: "Horaires",
    value: "Dim. - Jeu. : 08h - 17h",
    icon: Clock,
  },
  {
    label: "Telephone",
    value: "+213 (0) 00 00 00 00",
    icon: Phone,
  },
];

export default function FindUs() {
  return (
    <section className="bg-white py-20 sm:py-24" id="find-us">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-stretch">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">
                Comment nous trouver
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
                Retrouvez OWES facilement a Alger
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-slate-600">
                Planifiez votre visite, lancez l&apos;itineraire depuis Google
                Maps et rejoignez notre espace pour votre rendez-vous, votre
                journee de coworking ou votre formation.
              </p>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {details.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 rounded-lg border border-brand-100 bg-surface-subtle p-4"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-white text-rose-500 shadow-sm">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-brand-700">
                      {label}
                    </span>
                    <span className="mt-1 block text-sm font-semibold leading-6 text-slate-700">
                      {value}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-brand-100 bg-surface-subtle shadow-[0_26px_80px_color-mix(in_srgb,var(--color-brand-950)_12%,transparent)]">
            <div className="aspect-4/3 min-h-96 w-full lg:aspect-auto lg:h-full">
              <iframe
                title="Localisation OWES sur Google Maps"
                src={mapEmbedUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="flex flex-col gap-4 border-t border-brand-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold leading-6 text-slate-600">
                Ouvrez la fiche Google Maps pour voir l&apos;itineraire et les
                options de navigation.
              </p>
              <a
                aria-label="Localisation OWES sur Google Maps"
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-500"
              >
                Google Maps
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
