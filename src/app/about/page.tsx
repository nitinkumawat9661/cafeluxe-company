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
    <InnerPageShell
      eyebrow="About"
      title="We build software around the way a business actually operates."
      description={routePageContent.about.description}
    >
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        <RouteCard
          title="What we build"
          description="Custom software, web applications, ERP and POS systems, mobile apps, automation and premium business platforms."
        />
        <RouteCard
          title="How we work"
          description="Understand the workflow first, define scope clearly, build in reviewable stages and verify the system before release."
        />
        <RouteCard
          title="Where we work"
          description={settings.address + ". We work with businesses in Rajasthan and across India."}
        />
      </section>
    </InnerPageShell>
  );
}
