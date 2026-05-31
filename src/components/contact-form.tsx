"use client";

import { FormEvent, useState } from "react";

const WHATSAPP_NUMBER = "917414853321";

function LeadForm() {
  const [status, setStatus] = useState("");

  function clean(value: FormDataEntryValue | null, limit: number) {
    return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, limit);
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    if (clean(form.get("website"), 80)) return;

    const name = clean(form.get("name"), 40);
    const phone = clean(form.get("phone"), 15).replace(/[^\d+]/g, "");
    const business = clean(form.get("business"), 60);
    const service = clean(form.get("service"), 60);
    const budget = clean(form.get("budget"), 30);
    const message = clean(form.get("message"), 400);

    if (!name || name.length < 2) return setStatus("Please enter a valid name.");
    if (!/^\+?\d{10,15}$/.test(phone)) return setStatus("Please enter a valid WhatsApp number.");
    if (!service) return setStatus("Please select a service.");
    if (!message || message.length < 20) return setStatus("Please write at least 20 characters.");

    const text =
      `New project inquiry%0A%0A` +
      `Name: ${name}%0A` +
      `Phone: ${phone}%0A` +
      `Business: ${business || "Not provided"}%0A` +
      `Service: ${service}%0A` +
      `Budget: ${budget || "Not provided"}%0A` +
      `Message: ${message}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
    setStatus("WhatsApp opened. Send the message to submit your inquiry.");
  }

  return (
    <form onSubmit={submit} className="mt-8 grid gap-4">
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-4 md:grid-cols-2">
        <input required maxLength={40} name="name" placeholder="Name *" className="contact-input" />
        <input required minLength={10} maxLength={15} name="phone" inputMode="tel" placeholder="WhatsApp number *" className="contact-input" />
        <input maxLength={60} name="business" placeholder="Business name" className="contact-input" />

        <select required name="service" className="contact-input">
          <option value="">Service needed *</option>
          <option>Business website</option>
          <option>Restaurant POS / QR ordering</option>
          <option>Admin dashboard</option>
          <option>App / custom software</option>
          <option>Other</option>
        </select>

        <input maxLength={30} name="budget" placeholder="Estimated budget, example: Rs. 15000" className="contact-input md:col-span-2" />
      </div>

      <textarea required minLength={20} maxLength={400} name="message" rows={5} placeholder="Project details *" className="contact-input resize-none" />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-black text-[#1a140d]">Your idea stays private.</p>
          <p className="mt-1 text-sm leading-6 text-[#6f6658]">
            Your business idea, workflow and project details are not shared or disclosed.
          </p>
        </div>

        <button type="submit" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#0b0704] px-7 py-3 text-sm font-black text-[var(--cream)]">
          Send inquiry
        </button>
      </div>

      {status && <p className="text-sm font-semibold text-[#6f6658]">{status}</p>}
    </form>
  );
}

export function ContactForm() {
  const [open, setOpen] = useState(false);

  return (
    <>
<button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-[9999] rounded-full bg-[var(--cream)] px-5 py-3 text-sm font-black text-[#0b0704] shadow-2xl">
        Start inquiry
      </button>

      {open && (
        <div className="fixed inset-0 z-[10000] grid place-items-center bg-black/70 px-4 backdrop-blur-md">
          <div className="cream-panel max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[2rem] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[.28em] text-[#7b5a1b]">Quick inquiry</p>
                <h3 className="mt-3 text-3xl font-black text-[#0b0704]">Start your project.</h3>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full bg-[#0b0704] px-4 py-2 text-sm font-black text-[var(--cream)]">
                Close
              </button>
            </div>

            <LeadForm />
          </div>
        </div>
      )}
    </>
  );
}


