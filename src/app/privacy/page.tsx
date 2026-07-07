import { InnerPageShell } from "@/components/inner-page-shell";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return createSeoMetadata({
    title: routePageContent.privacy.title,
    description: routePageContent.privacy.description,
    path: "/privacy",
  });
}

export default function PrivacyPage() {
  return (
    <InnerPageShell eyebrow="Legal" title="Privacy Policy" description={routePageContent.privacy.description} ctaHref="/contact" ctaLabel="Contact Us">
      <section className="mx-auto max-w-4xl px-5 pb-16 text-sm leading-7 text-[#d6c8ae] md:px-6">
        <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6 md:p-8">
          <h2 className="text-2xl font-black text-[#f8efd9]">Data we receive</h2>
          <p className="mt-4">When someone sends an enquiry, TrustFirst Solutions receives the details submitted in the form, such as name, phone number, service need, budget range and project message.</p>
          <h2 className="mt-8 text-2xl font-black text-[#f8efd9]">How it is used</h2>
          <p className="mt-4">The information is used to respond to enquiries, understand project requirements and continue project communication.</p>
          <h2 className="mt-8 text-2xl font-black text-[#f8efd9]">Updates</h2>
          <p className="mt-4">This page is a route-ready foundation and should be reviewed before final legal publication.</p>
        </div>
      </section>
    </InnerPageShell>
  );
}
