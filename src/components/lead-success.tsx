"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (typeof window === "undefined") return "";
  return window.location.search;
}

export function LeadSuccess() {
  const search = useSyncExternalStore(subscribe, getSnapshot, () => "");
  const sent = new URLSearchParams(search).get("lead") === "sent";

  if (!sent) return null;

  return (
    <div className="mt-5 rounded-2xl border border-[rgba(201,155,71,.35)] bg-[rgba(201,155,71,.10)] px-5 py-4 font-bold text-[#f8efd9]">
      Message sent successfully. We received your request and will contact you soon.
    </div>
  );
}
