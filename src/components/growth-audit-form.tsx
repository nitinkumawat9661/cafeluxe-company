"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

type GrowthAuditFormProps = {
  services: string[];
  title?: string;
  description?: string;
  compact?: boolean;
  testMode?: boolean;
};

type SubmitState = "idle" | "sending" | "success" | "error";

export function GrowthAuditForm({
  services,
  title = "Get My Free Growth Audit",
  description = "Clean details go directly to the TrustFirst lead flow.",
  compact = false,
  testMode = false,
}: GrowthAuditFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const statusId = useId();
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message) statusRef.current?.focus();
  }, [message]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "fetch",
        },
      });

      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setState("error");
        setMessage(result?.message || "Message could not be sent. Please check the details and try again.");
        return;
      }

      setState("success");
      setMessage(result?.message || "Message sent successfully. We received your request and will contact you soon.");
      form.reset();
    } catch {
      setState("error");
      setMessage("Network issue. Please try again or message us on WhatsApp.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={[
        "growth-audit-form rounded-[1.35rem] border border-white/10 bg-black/25 p-5",
        compact ? "md:p-6" : "",
      ].join(" ")}
      noValidate={false}
    >
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">{description}</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input
          required
          minLength={2}
          maxLength={60}
          name="name"
          defaultValue={testMode ? "TrustFirst UX Test" : undefined}
          placeholder="Full Name *"
          className="lead-input"
        />
        <input
          required
          minLength={10}
          maxLength={13}
          inputMode="numeric"
          pattern="[0-9]{10,13}"
          name="phone"
          placeholder="Phone / WhatsApp *"
          className="lead-input"
        />
        <select required name="service" defaultValue="" className="lead-input md:col-span-2">
          <option value="" disabled>
            What help do you need? *
          </option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        <textarea
          required
          minLength={10}
          maxLength={500}
          name="message"
          rows={compact ? 3 : 4}
          defaultValue={testMode ? "Async form submission verification. Please ignore." : undefined}
          placeholder="Short business challenge *"
          className="lead-input resize-none md:col-span-2"
        />
        <details className="rounded-xl border border-white/10 bg-white/[.035] p-4 md:col-span-2">
          <summary className="cursor-pointer text-sm font-black text-[var(--gold)]">Add more business details (optional)</summary>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input maxLength={70} name="business" placeholder="Business Name" className="lead-input" />
            <input maxLength={70} name="businessType" placeholder="Business Type" className="lead-input" />
            <input maxLength={70} name="location" placeholder="Location" className="lead-input" />
            <input maxLength={120} name="onlineUrl" placeholder="Website / Instagram URL" className="lead-input" />
            <select name="budget" className="lead-input md:col-span-2">
              <option value="">Budget range optional</option>
              <option>Not sure yet</option>
              <option>Under Rs. 15k</option>
              <option>Rs. 15k-Rs. 30k</option>
              <option>Rs. 30k-Rs. 50k</option>
              <option>Rs. 50k+</option>
            </select>
          </div>
        </details>

        <button
          type="submit"
          disabled={state === "sending"}
          aria-describedby={message ? statusId : undefined}
          className="lead-submit rounded-xl bg-[var(--gold)] px-6 py-4 font-black text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(201,155,71,.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-65 md:col-span-2"
        >
          {state === "sending" ? "Sending..." : "Get Free Growth Audit"}
        </button>
      </div>

      <div className="lead-status-slot">
        {message && (
        <div
          ref={statusRef}
          id={statusId}
          role={state === "error" ? "alert" : "status"}
          tabIndex={-1}
          className={[
            "rounded-2xl border px-5 py-4 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]",
            state === "success"
              ? "border-[rgba(201,155,71,.35)] bg-[rgba(201,155,71,.10)] text-[#f8efd9]"
              : "border-red-300/30 bg-red-500/10 text-red-100",
          ].join(" ")}
        >
          {message}
        </div>
        )}
      </div>
    </form>
  );
}
