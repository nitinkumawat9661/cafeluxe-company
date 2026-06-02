"use client";

import { useEffect, useState } from "react";

export function LeadSuccess() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setSent(new URLSearchParams(window.location.search).get("lead") === "sent");
  }, []);

  if (!sent) return null;

  return (
    <div className="mt-5 rounded-2xl border border-[rgba(201,155,71,.35)] bg-[rgba(201,155,71,.10)] px-5 py-4 font-bold text-[#f8efd9]">
      Message sent successfully. We received your request and will contact you soon.
    </div>
  );
}
