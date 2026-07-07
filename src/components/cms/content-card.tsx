import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CmsImage } from "@/components/cms/cms-image";
import type { SanityImage } from "@/sanity/lib/types";

type ContentCardProps = {
  href: string;
  title: string;
  description: string;
  image?: SanityImage;
  imageAlt?: string;
  meta?: string[];
  badges?: string[];
};

export function ContentCard({ href, title, description, image, imageAlt, meta = [], badges = [] }: ContentCardProps) {
  return (
    <Link href={href} className="block h-full">
      <article className="h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20 transition hover:-translate-y-1 hover:border-[rgba(201,155,71,.42)]">
        <CmsImage image={image} alt={imageAlt || title} className="aspect-[16/10] w-full object-cover" />
        <div className="p-5">
          {meta.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {meta.map((item) => (
                <span key={item} className="rounded-full border border-[rgba(201,155,71,.24)] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[.16em] text-[var(--gold)]">
                  {item}
                </span>
              ))}
            </div>
          )}
          <h2 className="text-xl font-black text-[#f8efd9]">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-[#d6c8ae]">{description}</p>
          {badges.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span key={badge} className="rounded-full bg-white/[.06] px-3 py-2 text-xs font-bold text-[#f8efd9]">
                  {badge}
                </span>
              ))}
            </div>
          )}
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--gold)]">
            Open <ArrowRight size={16} />
          </span>
        </div>
      </article>
    </Link>
  );
}
