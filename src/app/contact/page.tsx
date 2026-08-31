import { Mail, MessageCircle, PhoneCall } from "lucide-react";
import { GrowthAuditForm } from "@/components/growth-audit-form";
import { InnerPageShell } from "@/components/inner-page-shell";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export async function generateMetadata() {
  return createSeoMetadata({
    title: routePageContent.contact.title,
    description: routePageContent.contact.description,
    path: "/contact",
  });
}

const contactServices = [
  "Not sure yet / Need guidance",
  "Custom Business Software",
  "Web Application",
  "ERP / POS / Billing System",
  "Business Automation",
  "Mobile Application",
  "AI Integration",
  "Premium Business Website",
  "Existing Software Improvement",
];

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <InnerPageShell
      eyebrow="Contact"
      title="Tell us what the business needs the software to do."
      description={routePageContent.contact.description}
      ctaHref={settings.whatsappHref}
      ctaLabel="WhatsApp Us"
    >
      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-16 md:px-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="grid content-start gap-3">
          <a href={settings.phoneHref} className="flex items-center gap-3 rounded-2xl border border-[rgba(201,155,71,.25)] bg-white/[.035] p-5">
            <PhoneCall className="text-[var(--gold)]" size={20} />
            <span>
              <b className="block text-[#f8efd9]">Call</b>
              <span className="text-sm text-[#d6c8ae]">{settings.phone}</span>
            </span>
          </a>
          <a href={settings.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-[rgba(201,155,71,.25)] bg-white/[.035] p-5">
            <MessageCircle className="text-[var(--gold)]" size={20} />
            <span>
              <b className="block text-[#f8efd9]">WhatsApp</b>
              <span className="text-sm text-[#d6c8ae]">{settings.whatsappDisplay}</span>
            </span>
          </a>
          <a href={"mailto:" + settings.email} className="flex items-center gap-3 rounded-2xl border border-[rgba(201,155,71,.25)] bg-white/[.035] p-5">
            <Mail className="text-[var(--gold)]" size={20} />
            <span>
              <b className="block text-[#f8efd9]">Email</b>
              <span className="text-sm text-[#d6c8ae]">{settings.email}</span>
            </span>
          </a>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-xs font-black uppercase tracking-[.18em] text-[var(--gold)]">Useful project context</p>
            <p className="mt-3 text-sm leading-6 text-[#d6c8ae]">
              Existing workflow, number of users, current software, must-have features and the biggest operational problem are enough for a useful first discussion.
            </p>
          </div>
        </div>

        <GrowthAuditForm
          services={contactServices}
          title="Project enquiry"
          description="Share the problem and current workflow. We will use it to understand the scope before discussing a build."
          submitLabel="Send Project Enquiry"
          servicePlaceholder="What are you looking to build? *"
          messagePlaceholder="What should the software solve or improve? *"
          compact
        />
      </section>
    </InnerPageShell>
  );
}
