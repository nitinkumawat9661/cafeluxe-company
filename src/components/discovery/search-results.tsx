import { ContentCard } from "@/components/cms/content-card";
import type { DiscoveryItem, DiscoveryItemType } from "@/lib/discovery";

type SearchResultsProps = {
  results: DiscoveryItem[];
};

const groups: DiscoveryItemType[] = ["Blog", "Case Study", "Resource", "Service"];

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 md:px-6">
      {groups.map((group) => {
        const items = results.filter((item) => item.type === group);
        if (items.length === 0) return null;

        return (
          <section key={group}>
            <h2 className="mb-5 text-3xl font-black text-[#f8efd9]">{group}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {items.map((item) => (
                <ContentCard
                  key={`${item.type}-${item.id}`}
                  href={item.href}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  meta={item.meta}
                  badges={item.badges}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
