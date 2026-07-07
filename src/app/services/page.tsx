import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { serviceCards, routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return createSeoMetadata({
    title: routePageContent.services.title,
    description: routePageContent.services.description,
    path: "/services",
  });
}

export default function ServicesPage() {
  return (
    <InnerPageShell eyebrow="Services" title={routePageContent.services.title} description={routePageContent.services.description}>
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {serviceCards.map((service) => (
            <RouteCard key={service.href} {...service} />
          ))}
        </div>
      </section>
    </InnerPageShell>
  );
}
