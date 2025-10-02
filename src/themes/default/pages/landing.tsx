import { getTranslations } from "next-intl/server";
import {
  Hero,
  CTA,
  Testimonials,
  FAQ,
  Subscribe,
  Stats,
  Features,
  Logos,
  FeaturesAccordion,
  FeaturesStep,
  FeaturesList,
} from "@/themes/default/blocks";

export default async function LandingPage() {
  const t = await getTranslations("landing");

  return (
    <div>
      <Hero hero={t.raw("hero")} />
      <Logos logos={t.raw("logos")} />
      <FeaturesList features={t.raw("introduce")} />
      <FeaturesAccordion features={t.raw("benefits")} />
      <FeaturesStep features={t.raw("usage")} />
      <Features features={t.raw("features")} />
      <Stats stats={t.raw("stats")} className="bg-muted" />
      <Testimonials testimonials={t.raw("testimonials")} />
      <Subscribe subscribe={t.raw("subscribe")} className="bg-muted" />
      <FAQ faq={t.raw("faq")} />
      <CTA cta={t.raw("cta")} className="bg-muted" />
    </div>
  );
}
