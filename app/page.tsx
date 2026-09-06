import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionReveal } from "@/components/section-reveal";
import ActivityStrip from "@/components/sections/activity-strip";
import CallToAction from "@/components/sections/call-to-action";
import DomiciliationPlans from "@/components/sections/domiciliation-plans";
import EnterprisePack from "@/components/sections/enterprise-pack";
import Facilities from "@/components/sections/facilities";
import Hero from "@/components/sections/hero";
import FindUs from "@/components/sections/find-us";
import Process from "@/components/sections/process";
import Services from "@/components/sections/services";
import WhyUs from "@/components/sections/why-us";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-clip">
        <SectionReveal direction="left"><Hero /></SectionReveal>
        <SectionReveal direction="right"><ActivityStrip /></SectionReveal>
        <SectionReveal direction="left"><Services /></SectionReveal>
        <SectionReveal direction="left"><Facilities /></SectionReveal>
        <SectionReveal direction="right"><WhyUs /></SectionReveal>
        <SectionReveal direction="left"><DomiciliationPlans /></SectionReveal>
        <SectionReveal direction="right"><CallToAction /></SectionReveal>
        <SectionReveal direction="left"><EnterprisePack /></SectionReveal>
        <SectionReveal direction="right"><Process /></SectionReveal>
        <SectionReveal direction="left"><FindUs /></SectionReveal>
      </main>
      <SiteFooter />
    </>
  );
}
