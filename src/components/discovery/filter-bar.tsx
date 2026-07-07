type FilterOption = {
  label: string;
  name: string;
  value: string;
  options: string[];
};

type FilterBarProps = {
  action: string;
  filters: FilterOption[];
};

export function FilterBar({ action, filters }: FilterBarProps) {
  if (filters.every((filter) => filter.options.length === 0)) return null;

  return (
    <form action={action} className="mx-auto mb-6 grid max-w-6xl gap-3 px-5 md:grid-cols-4 md:px-6">
      {filters.map((filter) => (
        <label key={filter.name} className="grid gap-2 text-xs font-black uppercase tracking-[.16em] text-[var(--gold)]">
          {filter.label}
          <select name={filter.name} defaultValue={filter.value} className="rounded-xl border border-white/10 bg-[#070604] px-4 py-3 text-sm font-bold normal-case tracking-normal text-[#f8efd9] outline-none">
            <option value="">All</option>
            {filter.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      ))}
      <div className="flex items-end gap-2">
        <button className="rounded-xl bg-[var(--gold)] px-5 py-3 text-sm font-black text-black">Apply</button>
        <a href={action} className="rounded-xl border border-[rgba(201,155,71,.35)] px-5 py-3 text-sm font-black text-[var(--gold)]">
          Reset
        </a>
      </div>
    </form>
  );
}
