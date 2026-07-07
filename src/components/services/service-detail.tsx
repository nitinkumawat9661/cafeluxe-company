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

export function ServiceDetail({ service }: ServiceDetailProps) {
  const steps = processItems(service);
  const faqs = service.faqs?.filter((faq) => faq.question && faq.answer) ?? [];
  const relatedServices = service.relatedServices ?? [];
  const ctaHref = service.ctaHref || "/contact";
  const ctaLabel = service.ctaLabel || "Start a Project";

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

        <section className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
          <h2 className="text-3xl font-black text-[#f8efd9]">Overview</h2>
          <PortableContent value={service.fullDescription} fallback={service.shortDescription || "Service information coming soon."} />
        </section>

        <div className="mt-10 grid gap-10">
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
          <h2 className="text-3xl font-black text-[#f8efd9]">{service.ctaTitle || "Start a focused project conversation."}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#d6c8ae]">
            {service.ctaDescription || service.shortDescription || "Share the basics and we will help clarify the right next step."}
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
