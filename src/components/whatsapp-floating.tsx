import { MessageCircle } from "lucide-react";

export function WhatsAppFloating() {
  const phone = "917414853321";
  const text = encodeURIComponent("Hi TrustFirst Solutions, I want to discuss a website/app/software project.");

  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(201,155,71,.35)] bg-[var(--gold)] text-black shadow-[0_0_30px_rgba(201,155,71,.35)] transition hover:scale-105"
    >
      <MessageCircle size={26} strokeWidth={2.5} />
    </a>
  );
}
