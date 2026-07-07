import { draftMode } from "next/headers";

export async function PreviewBanner() {
  const draft = await draftMode();

  if (!draft.isEnabled) return null;

  return (
    <div className="fixed left-1/2 top-3 z-[100000] flex -translate-x-1/2 items-center gap-3 rounded-full border border-[rgba(201,155,71,.35)] bg-[#070604]/95 px-4 py-2 text-xs font-black text-[#f8efd9] shadow-[0_18px_50px_rgba(0,0,0,.45)] backdrop-blur-xl">
      <span className="text-[var(--gold)]">Preview Mode Enabled</span>
      <a href="/api/draft/disable" className="rounded-full bg-[var(--gold)] px-3 py-1 text-black transition hover:-translate-y-0.5">
        Exit Preview
      </a>
    </div>
  );
}
