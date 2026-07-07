import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { createSeoMetadata } from "@/lib/seo";

const description =
  "Premium business websites for companies that need clear positioning, trust-building design and direct enquiry paths.";

export const metadata = createSeoMetadata({
  title: "Website Design and Development",
  description,
  path: "/services/websites",
});

export default function WebsitesServicePage() {
  return (
    <InnerPageShell eyebrow="Service" title="Websites that make trust easier to feel." description={description}>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        <RouteCard title="Clear message" description="Page structure built around what the business does, who it helps and why visitors should enquire." />
        <RouteCard title="Premium first impression" description="Dark-gold brand direction, responsive layout and polished details without adding visual clutter." />
        <RouteCard title="Lead-ready flow" description="Contact, WhatsApp, call and enquiry paths can stay visible and easy to use across devices." />
      </section>
    </InnerPageShell>
  );
}
