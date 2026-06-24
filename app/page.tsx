import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import ActivityStrip from "@/components/sections/activity-strip";
import CallToAction from "@/components/sections/call-to-action";
import DomiciliationPlans from "@/components/sections/domiciliation-plans";
import Hero from "@/components/sections/hero";
import Process from "@/components/sections/process";
import Services from "@/components/sections/services";
import WhyUs from "@/components/sections/why-us";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ActivityStrip />
        <Services />
        <WhyUs />
        <DomiciliationPlans />
        <Process />
        <CallToAction />
      </main>
      <SiteFooter />
    </>
  );
}
