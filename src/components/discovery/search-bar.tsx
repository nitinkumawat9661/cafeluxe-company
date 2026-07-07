type SearchBarProps = {
  defaultQuery?: string;
};

export function SearchBar({ defaultQuery = "" }: SearchBarProps) {
  return (
    <form action="/search" className="mx-auto mb-8 flex max-w-3xl gap-3 px-5 md:px-6">
      <input
        name="q"
        defaultValue={defaultQuery}
        placeholder="Search blog, work, resources and services"
        className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold text-[#f8efd9] outline-none"
      />
      <button className="rounded-xl bg-[var(--gold)] px-5 py-3 text-sm font-black text-black">Search</button>
    </form>
  );
}
