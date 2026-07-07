import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { footerGroups } from "@/lib/routes";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 px-5 py-10 md:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 text-sm text-[#d6c8ae] md:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <b className="text-xl text-white">
            <span>
              <span className="trust-shimmer">{settings.name.split(" ")[0]}</span>{settings.name.split(" ").slice(1).join(" ") ? ` ${settings.name.split(" ").slice(1).join(" ")}` : ""}
            </span>
          </b>
          <p className="mt-3 max-w-xs">{settings.tagline}</p>
          <div className="mt-4 grid gap-3">
            <a
              href={settings.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,155,71,.3)] px-4 py-3 text-[#f7ecd2]"
            >
              <PhoneCall size={17} strokeWidth={1.9} /> Call Now
            </a>
            <a
              href={settings.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,155,71,.3)] px-4 py-3 text-[#f7ecd2]"
            >
              <MessageCircle size={17} strokeWidth={1.9} /> WhatsApp
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,155,71,.3)] px-4 py-3 text-[#f7ecd2]"
            >
              <Mail size={17} strokeWidth={1.9} /> Email Us
            </a>
            {settings.address && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,155,71,.3)] px-4 py-3 text-[#f7ecd2]">
                <MapPin size={17} strokeWidth={1.9} /> {settings.address}
              </span>
            )}
            {settings.socialLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,155,71,.3)] px-4 py-3 text-[#f7ecd2]"
              >
                {link.label} <ArrowUpRight size={15} strokeWidth={1.9} />
              </a>
            ))}
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <b className="text-[#f8efd9]">{group.title}</b>
            <div className="mt-3 grid gap-2">
              {group.links.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-[var(--gold)]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-[#d6c8ae]">© {year} {settings.name}. All rights reserved.</p>
    </footer>
  );
}
