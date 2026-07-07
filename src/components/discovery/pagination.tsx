import Link from "next/link";
import { buildHref, type SearchParamsInput } from "@/lib/discovery";

type PaginationProps = {
  pathname: string;
  params: SearchParamsInput;
  page: number;
  totalPages: number;
};

export function Pagination({ pathname, params, page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 pb-16 md:px-6" aria-label="Pagination">
      {page > 1 ? (
        <Link href={buildHref(pathname, params, { page: page - 1 })} className="rounded-full border border-[rgba(201,155,71,.35)] px-5 py-3 text-sm font-black text-[var(--gold)]">
          Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="text-sm font-bold text-[#d6c8ae]">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link href={buildHref(pathname, params, { page: page + 1 })} className="rounded-full border border-[rgba(201,155,71,.35)] px-5 py-3 text-sm font-black text-[var(--gold)]">
          Next
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
