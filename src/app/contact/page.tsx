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
  "Free Digital Growth Audit / Not Sure",
  "Meta Ads",
  "Google Ads",
  "Social Media Management",
  "SEO",
  "Google Business Profile",
  "Website / Landing Page",
  "Lead Generation / Automation",
  "Business Growth Consultation",
];

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <InnerPageShell eyebrow="Contact" title="Request your free digital growth audit." description={routePageContent.contact.description}>
      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-16 md:px-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="grid gap-3">
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
          <a href={`mailto:${settings.email}`} className="flex items-center gap-3 rounded-2xl border border-[rgba(201,155,71,.25)] bg-white/[.035] p-5">
            <Mail className="text-[var(--gold)]" size={20} />
            <span>
              <b className="block text-[#f8efd9]">Email</b>
              <span className="text-sm text-[#d6c8ae]">{settings.email}</span>
            </span>
          </a>
        </div>

        <GrowthAuditForm
          services={contactServices}
          title="Growth audit enquiry"
          description="Share the basics. The same Telegram lead flow used on the homepage remains active here."
          compact
        />
      </section>
    </InnerPageShell>
  );
}
