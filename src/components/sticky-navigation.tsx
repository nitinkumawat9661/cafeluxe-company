export function StickyNavigation() {
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Work", href: "#work" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-[#070604]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="shrink-0 text-sm font-black tracking-[.22em] text-[var(--gold)]">
          TRUSTFIRST
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-[#d8c7a4] transition hover:bg-white/10 hover:text-[var(--gold)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full border border-[rgba(201,155,71,.4)] px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-[var(--gold)] transition hover:bg-[rgba(201,155,71,.12)]"
        >
          Enquire
        </a>
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-[11px] font-bold uppercase tracking-[.12em] text-[#d8c7a4]"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
