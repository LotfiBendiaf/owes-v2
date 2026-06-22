import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-4xl bg-rose-500 p-8 text-[#17204f] sm:p-10 lg:flex-row lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em]">
            Votre prochaine étape
          </p>
          <h2 className="mt-2 text-3xl font-extrabold">
            Prêt à donner plus d&apos;espace à votre projet ?
          </h2>
        </div>
        <Link
          href="/register"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#17204f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#273b82]"
        >
          Créer mon espace <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
