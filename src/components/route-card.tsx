import { ArrowRight } from "lucide-react";
import Link from "next/link";

type RouteCardProps = {
  title: string;
  description: string;
  href?: string;
  points?: string[];
};

export function RouteCard({ title, description, href, points = [] }: RouteCardProps) {
  const content = (
    <article className="h-full rounded-[1.5rem] border border-white/10 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-[rgba(201,155,71,.42)]">
      <h2 className="text-xl font-black text-[#f8efd9]">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-[#d6c8ae]">{description}</p>
      {points.length > 0 && (
        <div className="mt-5 grid gap-2">
          {points.map((point) => (
            <span key={point} className="rounded-full border border-[rgba(201,155,71,.2)] px-3 py-2 text-xs font-bold text-[#f8efd9]">
              {point}
            </span>
          ))}
        </div>
      )}
      {href && (
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--gold)]">
          Open <ArrowRight size={16} />
        </span>
      )}
    </article>
  );

  if (!href) return content;

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}
