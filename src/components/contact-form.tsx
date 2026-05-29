"use client";

import { FormEvent, useState } from "react";

const WHATSAPP_NUMBER = "917414853321";

export function ContactForm() {
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

    const text = `New project inquiry%0A%0AName: ${name}%0APhone: ${phone}%0ABusiness: ${business || "Not provided"}%0AService: ${service}%0ABudget: ${budget || "Not provided"}%0AMessage: ${message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
    setStatus("WhatsApp opened. Send the message to submit your inquiry.");
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <div className="cream-panel rounded-[2.5rem] p-7 md:p-10">
        <p className="text-xs font-black uppercase tracking-[.32em] text-[#7b5a1b]">Start your build</p>
        <h2 className="mt-5 section-title">Tell us what you want to launch.</h2>

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

          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-black text-[#1a140d]">Your idea stays private.</p>
              <p className="mt-1 text-sm leading-6 text-[#6f6658]">
                We treat every inquiry as confidential. Your business idea, workflow and project details are not shared or disclosed.
              </p>
            </div>
            <button type="submit" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#0b0704] px-7 py-3 text-sm font-black text-[var(--cream)] transition hover:opacity-90">
              Send inquiry
            </button>
          </div>

          {status && <p className="mt-4 text-sm font-semibold text-[#6f6658]">{status}</p>}
        </form>
      </div>
    </section>
  );
}

