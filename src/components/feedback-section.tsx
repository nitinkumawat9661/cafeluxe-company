"use client";

import { useState, type FormEvent } from "react";

const RATINGS = ["Excellent", "Good", "Needs Improvement"];

export function FeedbackSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Feedback failed");
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="feedback" className="mx-auto max-w-6xl px-5 py-10 md:px-6">
      <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Feedback</p>
        <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">Share your feedback with TrustFirst.</h2>
        <p className="mt-3 max-w-2xl text-[#d6c8ae]">Your feedback helps us improve project delivery, communication and client experience.</p>

        <form onSubmit={handleSubmit} className="mt-7 grid gap-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <input name="name" required minLength={2} maxLength={60} placeholder="Your name" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none" />
            <input name="phone" maxLength={13} placeholder="Phone optional" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none" />
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {RATINGS.map((rating) => (
              <label key={rating} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-bold text-[#f8efd9]">
                <input type="radio" name="rating" value={rating} required className="mr-2" />
                {rating}
              </label>
            ))}
          </div>

          <textarea name="message" required minLength={5} maxLength={500} placeholder="Write your feedback..." className="min-h-32 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none" />

          <button disabled={status === "sending"} type="submit" className="rounded-xl bg-[var(--gold)] px-5 py-3 text-sm font-black text-black disabled:opacity-60">
            {status === "sending" ? "Sending..." : "Send Feedback"}
          </button>

          {status === "sent" && <p className="text-sm font-bold text-[var(--gold)]">Feedback sent successfully.</p>}
          {status === "error" && <p className="text-sm font-bold text-red-300">Feedback send nahi hua. Telegram config ya Vercel access check karo.</p>}
        </form>
      </div>
    </section>
  );
}
