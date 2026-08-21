import { ArrowUpRight, Clock, MapPin, Navigation, Phone } from "lucide-react";

const googleMapsUrl = "https://www.google.com/maps/place/OWES/@36.6977562,3.0422517,17z/data=!3m1!4b1!4m6!3m5!1s0x128fad2bc6e9af2d:0x2f65f33af31cd320!8m2!3d36.6977562!4d3.0422517!16s%2Fg%2F11ld6q58ds?entry=ttu";
const mapEmbedUrl = "https://www.google.com/maps?q=36.6977562,3.0422517&z=17&output=embed";
const details = [
  { label: "Adresse", value: "OWES, Alger", icon: MapPin, color: "bg-[#f9e8e8] text-rose-700" },
  { label: "Coordonnées", value: "36.6977562, 3.0422517", icon: Navigation, color: "bg-[#e7edff] text-brand-700" },
  { label: "Horaires", value: "Dim. — Jeu. · 08h — 17h", icon: Clock, color: "bg-[#fff0d9] text-amber-700" },
  { label: "Téléphone", value: "+213 (0) 00 00 00 00", icon: Phone, color: "bg-[#e4f3ec] text-emerald-700" },
];

export default function FindUs() {
  return (
    <section className="bg-white py-20 sm:py-28" id="find-us">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[.7fr_1.3fr]">
          <div className="border-y border-brand-950/15 py-9 lg:border-r lg:pr-10">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-brand-700">Nous trouver — 05</p>
            <h2 className="mt-5 text-4xl font-extrabold leading-[.98] tracking-[-.045em] text-brand-950 sm:text-5xl">Votre prochain rendez-vous, <span className="font-normal italic text-brand-500">à Alger.</span></h2>
            <p className="mt-6 max-w-md leading-7 text-slate-600">Rejoignez notre espace pour un rendez-vous, une journée de coworking ou votre prochaine formation.</p>
            <div className="mt-9 divide-y divide-brand-950/15 border-b border-brand-950/15">
              {details.map(({ icon: Icon, ...detail }) => <div key={detail.label} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4"><span className={`grid size-9 place-items-center rounded-full ${detail.color}`}><Icon size={15} /></span><div><p className="font-mono text-[9px] uppercase tracking-[.18em] text-slate-400">{detail.label}</p><p className="mt-1 text-sm font-semibold text-brand-950">{detail.value}</p></div></div>)}
            </div>
          </div>

          <div className="lg:pl-10">
            <div className="h-[32rem] bg-slate-100 lg:h-full lg:min-h-[42rem]"><iframe title="Localisation OWES sur Google Maps" src={mapEmbedUrl} className="h-full w-full border-0 grayscale-[15%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
            <div className="flex flex-col gap-4 border-x border-b border-brand-950/15 p-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-slate-600">Consultez l&apos;itinéraire et les options de navigation.</p><a href={googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-950 hover:text-brand-500">Ouvrir Google Maps <ArrowUpRight size={16} /></a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
