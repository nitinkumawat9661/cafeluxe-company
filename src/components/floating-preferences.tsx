"use client";

import { useEffect, useState } from "react";

type VisualMode = "dark" | "gray";

export function FloatingPreferences() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<VisualMode>("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-visual-mode", mode);
  }, [mode]);

  return (
    <div className="fixed bottom-5 left-5 z-[90000]">
      {open && (
        <div className="mode-panel mb-3 w-72 rounded-[1.7rem] p-4">
          <p className="mode-kicker">Display mode</p>
          <p className="mt-1 text-xs leading-5 text-[#d6c8ae]">Choose the visual tone that feels best while browsing.</p>

          <div className="mt-4 grid gap-2">
            <button onClick={() => setMode("dark")} className={mode === "dark" ? "mode-option mode-option-active" : "mode-option"}>
              <span>
                <b>Dark Gold</b>
                <small>Premium black and champagne tone</small>
              </span>
              <i />
            </button>

            <button onClick={() => setMode("gray")} className={mode === "gray" ? "mode-option mode-option-active" : "mode-option"}>
              <span>
                <b>Platinum Gray</b>
                <small>Softer gray-black interface tone</small>
              </span>
              <i />
            </button>
          </div>
        </div>
      )}

      <button onClick={() => setOpen(!open)} className="mode-trigger">
        Mode
      </button>
    </div>
  );
}
