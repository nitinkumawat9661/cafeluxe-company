"use client";

import { useState } from "react";

function formatBudget(value: number) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

export function BudgetSlider() {
  const [budget, setBudget] = useState(25000);

  return (
    <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-4 md:col-span-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm font-bold text-[#f8efd9]">Monthly Growth Budget</label>
        <span className="text-xs font-black uppercase tracking-[.18em] text-[var(--gold)]">
          Selected: {formatBudget(budget)}
        </span>
      </div>

      <input
        name="budget"
        type="range"
        min="0"
        max="100000"
        step="1000"
        value={budget}
        onChange={(event) => setBudget(Number(event.target.value))}
        className="mt-5 h-3 w-full cursor-pointer accent-[var(--gold)]"
      />

      <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#d6c8ae]">
        <span>Rs. 0</span>
        <span>Rs. 50,000</span>
        <span>Rs. 1,00,000</span>
      </div>
    </div>
  );
}


