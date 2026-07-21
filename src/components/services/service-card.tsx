import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CmsImage } from "@/components/cms/cms-image";
import type { Service } from "@/sanity/lib/types";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const href = `/services/${service.slug?.current}`;
  const badges = [service.serviceCategory, service.featured ? "Featured" : undefined].filter((item): item is string => Boolean(item));

  return (
    <Link href={href} className="block h-full">
      <article className="h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20 transition hover:-translate-y-1 hover:border-[rgba(201,155,71,.42)]">
        {service.heroImage?.asset?._ref ? (
          <CmsImage image={service.heroImage} alt={service.heroImage?.alt || service.title} className="aspect-[16/10] w-full object-cover" />
        ) : (
          <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_22%_18%,rgba(201,155,71,.22),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.06),rgba(0,0,0,.3))] p-5">
            <div className="absolute inset-x-6 top-6 h-2 rounded-full bg-[rgba(201,155,71,.28)]" />
            <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((item) => (
                <span key={item} className="h-12 rounded-xl border border-[rgba(201,155,71,.25)] bg-black/25" />
              ))}
            </div>
            <span className="absolute left-5 top-12 text-xs font-black uppercase tracking-[.2em] text-[var(--gold)]">{service.serviceCategory || "Growth"}</span>
          </div>
        )}
        <div className="p-5">
          {badges.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span key={badge} className="rounded-full border border-[rgba(201,155,71,.24)] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[.16em] text-[var(--gold)]">
                  {badge}
                </span>
              ))}
            </div>
          )}
          <h2 className="text-xl font-black text-[#f8efd9]">{service.title || "Untitled service"}</h2>
          <p className="mt-3 text-sm leading-6 text-[#d6c8ae]">{service.shortDescription || "Service information coming soon."}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--gold)]">
            {service.ctaLabel || "Open"} <ArrowRight size={16} />
          </span>
        </div>
      </article>
    </Link>
  );
}
