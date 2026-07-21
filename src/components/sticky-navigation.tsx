import Image from "next/image";
import Link from "next/link";
import { MobileNavigation } from "@/components/mobile-navigation";
import { publicRoutes } from "@/lib/routes";
import { getSiteSettings } from "@/sanity/lib/site-settings";

function splitBrandName(name: string) {
  const [first, ...rest] = name.split(" ");
  return {
    first: first || name,
    rest: rest.join(" "),
  };
}

export async function StickyNavigation() {
  const settings = await getSiteSettings();
  const brand = splitBrandName(settings.name);

  return (
    <div className="fixed left-0 right-0 top-0 z-[90000] border-b border-white/10 bg-[#070604]/90 shadow-[0_18px_60px_rgba(0,0,0,.35)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-2xl border border-[rgba(201,155,71,.45)] bg-[rgba(201,155,71,.1)] shadow-[0_0_30px_rgba(201,155,71,.14)]">
            <Image src={settings.logoUrl} alt={`${settings.name} logo`} width={40} height={40} className="h-full w-full object-cover" />
          </span>

          <span className="leading-none">
            <span className="block bg-[linear-gradient(90deg,#fff7df,#c99b47,#fff1c3)] bg-clip-text text-[15px] font-black tracking-[-.03em] text-transparent md:text-lg">
              {brand.first}
            </span>
            {brand.rest && <span className="block text-[9px] font-black uppercase tracking-[.28em] text-[#d6c8ae]">{brand.rest}</span>}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {publicRoutes.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-[#d8c7a4] transition hover:bg-white/10 hover:text-[var(--gold)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#audit"
          className="hidden items-center gap-2 rounded-full border border-[rgba(201,155,71,.4)] px-3 py-2 text-[11px] font-black uppercase tracking-[.14em] text-[var(--gold)] transition hover:bg-[rgba(201,155,71,.12)] sm:inline-flex md:px-4 md:text-xs"
        >
          <span className="grid h-7 w-7 place-items-center overflow-hidden rounded-full border border-[rgba(201,155,71,.45)] bg-black">
            <Image src={settings.logoUrl} alt="" width={28} height={28} className="h-full w-full object-cover" />
          </span>
          Free Growth Audit
        </Link>

        <MobileNavigation routes={publicRoutes} settings={settings} />
      </div>
    </div>
  );
}
