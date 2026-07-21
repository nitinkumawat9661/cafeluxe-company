import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export async function generateMetadata() {
  return createSeoMetadata({
    title: routePageContent.about.title,
    description: routePageContent.about.description,
    path: "/about",
  });
}

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <InnerPageShell eyebrow="About" title="A growth agency built around clarity, trust and practical execution." description={routePageContent.about.description}>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        <RouteCard title="Location" description={settings.address} />
        <RouteCard title="Working style" description="Audit first, clear strategy, transparent execution and practical reporting." />
        <RouteCard title="Focus" description="Meta Ads, Google Ads, SEO, social media, Google Business Profile, websites, landing pages and lead generation systems." />
      </section>
    </InnerPageShell>
  );
}
