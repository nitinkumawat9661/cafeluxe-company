type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
      <h2 className="text-2xl font-black text-[#f8efd9]">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-[#d6c8ae]">{description}</p>
    </article>
  );
}
