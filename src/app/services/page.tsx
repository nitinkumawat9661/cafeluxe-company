import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { ServiceCard } from "@/components/services/service-card";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";
import { fetchSanity } from "@/sanity/lib/fetch";
import { serviceListQuery } from "@/sanity/lib/queries";
import type { Service } from "@/sanity/lib/types";

export async function generateMetadata() {
  return createSeoMetadata({
    title: routePageContent.services.title,
    description: routePageContent.services.description,
    path: "/services",
  });
}

export default async function ServicesPage() {
  const services = (await fetchSanity<Service[]>(serviceListQuery)) ?? [];

  return (
    <InnerPageShell eyebrow="Services" title={routePageContent.services.title} description={routePageContent.services.description}>
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {services.length > 0 ? (
            services.map((service) => <ServiceCard key={service._id} service={service} />)
          ) : (
            <RouteCard title="Service information coming soon." description="Service details will appear here after they are published from TrustFirst Studio." />
          )}
        </div>
      </section>
    </InnerPageShell>
  );
}
