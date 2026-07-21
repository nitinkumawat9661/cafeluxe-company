import { ArrowRight } from "lucide-react";
import { CmsImage } from "@/components/cms/cms-image";
import { PortableContent } from "@/components/cms/portable-content";
import { ServiceCard } from "@/components/services/service-card";
import type { Service, ServiceProcessStep } from "@/sanity/lib/types";

type ServiceDetailProps = {
  service: Service;
};

function compactStrings(items?: string[]) {
  return items?.filter((item): item is string => Boolean(item)) ?? [];
}

function processItems(service: Service): ServiceProcessStep[] {
  if (service.process?.length) {
    return service.process.filter((item) => item.title || item.description);
  }

  return compactStrings(service.processSteps).map((step) => ({ title: step }));
}

function BulletGrid({ title, items }: { title: string; items?: string[] }) {
  const cleanItems = compactStrings(items);
  if (cleanItems.length === 0) return null;

  return (
    <section>
      <h2 className="text-3xl font-black text-[#f8efd9]">{title}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {cleanItems.map((item) => (
          <article key={item} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-bold leading-6 text-[#e7dac1]">{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function serviceVisualKind(title?: string): [string, string[]] {
  const value = title?.toLowerCase() ?? "";
  if (value.includes("meta")) return ["Campaign Flow", ["Creative", "Audience", "Lead Form", "Follow-up"]];
  if (value.includes("google ads")) return ["Search Intent", ["Keyword", "Ad", "Landing Page", "Enquiry"]];
  if (value.includes("social")) return ["Content Rhythm", ["Reel", "Post", "Story", "DM"]];
  if (value.includes("business profile")) return ["Local Discovery", ["Maps", "Profile", "Calls", "Direction"]];
  if (value.includes("seo")) return ["Search Growth", ["Technical", "Content", "Local", "Authority"]];
  if (value.includes("landing")) return ["Conversion Page", ["Offer", "Proof", "Form", "WhatsApp"]];
  if (value.includes("website")) return ["Trust Website", ["Hero", "Services", "Proof", "Contact"]];
  if (value.includes("lead")) return ["Lead System", ["Ad", "Page", "Form", "WhatsApp"]];
  if (value.includes("automation")) return ["Follow-up Workflow", ["Capture", "Route", "Reply", "Review"]];
  if (value.includes("consultation")) return ["Growth Clarity", ["Audit", "Priority", "Plan", "Next Step"]];
  return ["Growth Capability", ["Audit", "System", "Action", "Improve"]];
}

function whoItIsFor(service: Service) {
  const title = service.title?.toLowerCase() ?? "";
  if (title.includes("meta") || title.includes("google ads")) return "For businesses ready to test offers, improve lead quality and connect paid traffic to a clear enquiry path.";
  if (title.includes("seo") || title.includes("business profile")) return "For local and service businesses that need stronger discovery before customers decide who to contact.";
  if (title.includes("social") || title.includes("content")) return "For businesses that need consistent visibility, trust-building content and clearer communication with their audience.";
  if (title.includes("website") || title.includes("landing")) return "For businesses sending traffic from ads, search or social and needing a clearer conversion experience.";
  if (title.includes("lead") || title.includes("automation")) return "For businesses losing enquiries because capture, routing or follow-up is not structured enough.";
  return "For business owners who want practical clarity before investing in growth activity.";
}

function ServiceVisual({ service }: { service: Service }) {
  const [title, steps] = serviceVisualKind(service.title);

  return (
    <section className="rounded-[1.5rem] border border-[rgba(201,155,71,.28)] bg-[linear-gradient(135deg,rgba(255,255,255,.055),rgba(201,155,71,.045),rgba(0,0,0,.32))] p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[.24em] text-[var(--gold)]">{title}</p>
          <h2 className="mt-3 text-3xl font-black text-[#f8efd9]">A practical system, not random activity.</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-4 md:min-w-[52%]">
          {steps.map((step, index) => (
            <div key={step} className="relative rounded-2xl border border-white/10 bg-black/30 p-4">
              <span className="text-xs font-black text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-2 text-sm font-black text-[#f8efd9]">{step}</p>
              {index < steps.length - 1 && <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-[var(--gold)] sm:block" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const steps = processItems(service);
  const faqs = service.faqs?.filter((faq) => faq.question && faq.answer) ?? [];
  const relatedServices = service.relatedServices ?? [];
  const ctaHref = service.ctaHref || "/#audit";
  const ctaLabel = service.ctaLabel || "Get Free Growth Audit";

  return (
    <>
      <article className="mx-auto max-w-5xl px-5 pb-16 md:px-6">
        <CmsImage image={service.heroImage} alt={service.heroImage?.alt || service.title} priority className="mb-8 aspect-[16/9] w-full rounded-[1.5rem] object-cover" />

        {service.serviceCategory && (
          <div className="mb-8">
            <span className="rounded-full border border-[rgba(201,155,71,.24)] px-3 py-2 text-xs font-black uppercase tracking-[.16em] text-[var(--gold)]">
              {service.serviceCategory}
            </span>
          </div>
        )}

        <ServiceVisual service={service} />

        <section className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
          <h2 className="text-3xl font-black text-[#f8efd9]">Overview</h2>
          <PortableContent value={service.fullDescription} fallback={service.shortDescription || "Service information coming soon."} />
        </section>

        <div className="mt-10 grid gap-10">
          <section>
            <h2 className="text-3xl font-black text-[#f8efd9]">Who it is for</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#d6c8ae]">{whoItIsFor(service)}</p>
          </section>
          <BulletGrid title="Features" items={service.features || service.deliverables} />
          <BulletGrid title="Benefits" items={service.benefits} />

          {steps.length > 0 && (
            <section>
              <h2 className="text-3xl font-black text-[#f8efd9]">Process</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {steps.map((step, index) => (
                  <article key={`${step.title}-${index}`} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-5">
                    <span className="text-sm font-black text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
                    {step.title && <h3 className="mt-3 text-lg font-black text-[#f8efd9]">{step.title}</h3>}
                    {step.description && <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">{step.description}</p>}
                  </article>
                ))}
              </div>
            </section>
          )}

          <BulletGrid title="Technologies" items={service.technologies} />

          {faqs.length > 0 && (
            <section>
              <h2 className="text-3xl font-black text-[#f8efd9]">FAQs</h2>
              <div className="mt-5 grid gap-3">
                {faqs.map((faq) => (
                  <article key={faq.question} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-5">
                    <h3 className="text-lg font-black text-[#f8efd9]">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        <section className="mt-10 rounded-[1.5rem] border border-[rgba(201,155,71,.3)] bg-black/20 p-6">
          <h2 className="text-3xl font-black text-[#f8efd9]">{service.ctaTitle || "Start with a free growth audit."}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#d6c8ae]">
            {service.ctaDescription || service.shortDescription || "Share the basics and we will help clarify the right growth priority."}
          </p>
          <a href={ctaHref} className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5">
            {ctaLabel} <ArrowRight size={17} />
          </a>
        </section>
      </article>

      {relatedServices.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
          <h2 className="mb-5 text-3xl font-black text-[#f8efd9]">Related services</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedServices.map((item) => (
              <ServiceCard key={item._id} service={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
