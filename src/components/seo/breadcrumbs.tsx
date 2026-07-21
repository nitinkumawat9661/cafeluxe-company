import Link from "next/link";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { absoluteUrl } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export async function Breadcrumbs({ items }: BreadcrumbsProps) {
  const settings = await getSiteSettings();
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href, settings.url),
    })),
  };

  return (
    <>
      <nav className="mx-auto max-w-6xl px-5 pb-6 text-xs font-bold uppercase tracking-[.14em] text-[#d6c8ae] md:px-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span className="text-[rgba(201,155,71,.55)]">/</span>}
              {index === items.length - 1 ? (
                <span className="text-[var(--gold)]">{item.label}</span>
              ) : (
                <Link href={item.href} className="transition hover:text-[var(--gold)]">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLdScript data={schema} />
    </>
  );
}
