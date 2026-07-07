import { Mail, MessageCircle, PhoneCall } from "lucide-react";
import { InnerPageShell } from "@/components/inner-page-shell";
import { BudgetSlider } from "@/components/budget-slider";
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

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <InnerPageShell eyebrow="Contact" title="Start a focused project conversation." description={routePageContent.contact.description}>
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
          <h2 className="text-2xl font-black">Project enquiry</h2>
          <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">Share the basics. The same lead flow used on the homepage remains active here.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input required minLength={2} maxLength={60} name="name" placeholder="Full Name *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
            <input required minLength={10} maxLength={13} inputMode="numeric" pattern="[0-9]{10,13}" name="phone" placeholder="Phone / WhatsApp *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
            <input type="email" maxLength={80} name="email" placeholder="Email Address" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
            <input maxLength={70} name="business" placeholder="Business Name" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
            <div className="md:col-span-2">
              <p className="mb-3 text-sm font-black text-[var(--gold)]">Service Needed *</p>
              <div className="grid gap-3 sm:grid-cols-4">
                {["Website", "App Development", "Custom Software", "UI/UX Design"].map((service) => (
                  <label key={service} className="contact-service-card">
                    <input required type="radio" name="service" value={service} />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>
            <BudgetSlider />
            <textarea required minLength={10} maxLength={500} name="message" rows={4} placeholder="Describe your project in 10 to 500 characters *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none md:col-span-2" />
            <button className="rounded-xl bg-[var(--gold)] px-6 py-4 font-black text-black md:col-span-2">Send Message</button>
          </div>
        </form>
      </section>
    </InnerPageShell>
  );
}
