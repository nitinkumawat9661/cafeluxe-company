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
    <InnerPageShell eyebrow="About" title="Built around clarity, trust and careful delivery." description={routePageContent.about.description}>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        <RouteCard title="Location" description={settings.address} />
        <RouteCard title="Working style" description="Clear scope, practical communication and premium UI direction before development goes deep." />
        <RouteCard title="Focus" description="Websites, web apps, dashboards, custom software and digital systems for growing businesses." />
      </section>
    </InnerPageShell>
  );
}
