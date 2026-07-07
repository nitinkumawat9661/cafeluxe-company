import { InnerPageShell } from "@/components/inner-page-shell";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return createSeoMetadata({
    title: routePageContent.terms.title,
    description: routePageContent.terms.description,
    path: "/terms",
  });
}

export default function TermsPage() {
  return (
    <InnerPageShell eyebrow="Legal" title="Terms" description={routePageContent.terms.description} ctaHref="/contact" ctaLabel="Discuss a Project">
      <section className="mx-auto max-w-4xl px-5 pb-16 text-sm leading-7 text-[#d6c8ae] md:px-6">
        <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6 md:p-8">
          <h2 className="text-2xl font-black text-[#f8efd9]">Website use</h2>
          <p className="mt-4">This website provides information about TrustFirst Solutions services and ways to enquire about a project.</p>
          <h2 className="mt-8 text-2xl font-black text-[#f8efd9]">Project discussions</h2>
          <p className="mt-4">Submitting an enquiry starts a conversation. Project scope, timeline and commercial terms should be confirmed separately before work begins.</p>
          <h2 className="mt-8 text-2xl font-black text-[#f8efd9]">Updates</h2>
          <p className="mt-4">This page is a route-ready foundation and should be reviewed before final legal publication.</p>
        </div>
      </section>
    </InnerPageShell>
  );
}
