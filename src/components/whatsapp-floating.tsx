function CallIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="relative h-6 w-6" fill="currentColor">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="relative h-7 w-7" fill="currentColor">
      <path d="M16.02 3.2C8.96 3.2 3.22 8.92 3.22 15.96c0 2.27.6 4.48 1.74 6.42L3.1 29l6.79-1.78a12.75 12.75 0 0 0 6.13 1.56h.01c7.05 0 12.79-5.72 12.79-12.76S23.08 3.2 16.02 3.2Zm0 23.42h-.01c-1.93 0-3.82-.52-5.47-1.51l-.39-.23-4.03 1.06 1.08-3.92-.25-.4a10.54 10.54 0 0 1-1.62-5.66c0-5.85 4.76-10.6 10.61-10.6 2.84 0 5.5 1.1 7.5 3.11a10.52 10.52 0 0 1 3.11 7.49c0 5.85-4.76 10.6-10.53 10.6Zm5.83-7.94c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.52-.16-.74.16-.21.32-.85 1.04-1.04 1.25-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.21 0-.57.08-.86.4-.3.32-1.13 1.1-1.13 2.68s1.16 3.11 1.32 3.33c.16.21 2.28 3.48 5.53 4.88.77.33 1.37.53 1.84.68.77.24 1.48.21 2.04.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function WhatsAppFloating() {
  const text = encodeURIComponent("Hi TrustFirst Solutions, I want to discuss a website/app/software project.");
  const baseClass = "relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(201,155,71,.35)] bg-[var(--gold)] text-black shadow-[0_0_30px_rgba(201,155,71,.35)] transition hover:scale-105 motion-safe:animate-bounce motion-reduce:animate-none";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
      <a href="tel:+917665853321" aria-label="Call TrustFirst Solutions" className={baseClass}>
        <span className="absolute inset-0 rounded-full bg-[var(--gold)] opacity-25 motion-safe:animate-ping motion-reduce:animate-none" />
        <CallIcon />
      </a>

      <a href={"https://wa.me/917414853321?text=" + text} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className={baseClass}>
        <span className="absolute inset-0 rounded-full bg-[var(--gold)] opacity-30 motion-safe:animate-ping motion-reduce:animate-none" />
        <WhatsAppIcon />
      </a>
    </div>
  );
}
