import { Mail, MessageCircle, PhoneCall } from "lucide-react";
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

        <form action="/api/contact" method="POST" className="rounded-[2rem] border border-[rgba(201,155,71,.35)] bg-white/[.035] p-6 md:p-8">
          <h2 className="text-2xl font-black">Growth audit enquiry</h2>
          <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">Share the basics. The same Telegram lead flow used on the homepage remains active here.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input required minLength={2} maxLength={60} name="name" placeholder="Full Name *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
            <input required minLength={10} maxLength={13} inputMode="numeric" pattern="[0-9]{10,13}" name="phone" placeholder="Phone / WhatsApp *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
            <select required name="service" defaultValue="" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none md:col-span-2">
              <option value="" disabled>What help do you need? *</option>
              {contactServices.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            <textarea required minLength={10} maxLength={500} name="message" rows={4} placeholder="Short business challenge *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none md:col-span-2" />
            <details className="rounded-xl border border-white/10 bg-white/[.035] p-4 md:col-span-2">
              <summary className="cursor-pointer text-sm font-black text-[var(--gold)]">Add more business details (optional)</summary>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input maxLength={70} name="business" placeholder="Business Name" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
                <input maxLength={70} name="businessType" placeholder="Business Type" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
                <input maxLength={70} name="location" placeholder="Location" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
                <input maxLength={120} name="onlineUrl" placeholder="Website / Instagram URL" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
                <select name="budget" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none md:col-span-2">
                  <option value="">Budget range optional</option>
                  <option>Not sure yet</option>
                  <option>Under ₹15k</option>
                  <option>₹15k-₹30k</option>
                  <option>₹30k-₹50k</option>
                  <option>₹50k+</option>
                </select>
              </div>
            </details>
            <button className="rounded-xl bg-[var(--gold)] px-6 py-4 font-black text-black md:col-span-2">Get Free Growth Audit</button>
          </div>
        </form>
      </section>
    </InnerPageShell>
  );
}
