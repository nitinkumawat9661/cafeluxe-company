"use client";

import { type CSSProperties, useEffect, useState } from "react";

const BRAND = [
  { l: "T", x: "-42vw", y: "-34vh", r: "-28deg" },
  { l: "r", x: "34vw", y: "-38vh", r: "22deg" },
  { l: "u", x: "-46vw", y: "28vh", r: "18deg" },
  { l: "s", x: "42vw", y: "30vh", r: "-24deg" },
  { l: "t", x: "0vw", y: "-48vh", r: "16deg" },
  { l: "F", x: "-28vw", y: "42vh", r: "-18deg" },
  { l: "i", x: "26vw", y: "44vh", r: "20deg" },
  { l: "r", x: "-52vw", y: "0vh", r: "28deg" },
  { l: "s", x: "52vw", y: "-4vh", r: "-26deg" },
  { l: "t", x: "8vw", y: "52vh", r: "14deg" },
];

const SERVICES = ["Website", "Apps", "Software", "UI/UX", "Automation", "Secure", "Premium", "Support"];

export function SplashIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), 5600);
    return () => window.clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="splash-intro">
      <div className="splash-river" aria-hidden="true" />

      <div className="splash-center">
        <p className="splash-mini">Welcome to</p>

        <h1 className="splash-brand" aria-label="TrustFirst">
          {BRAND.map((item, index) => (
            <span
              key={`${item.l}-${index}`}
              className="splash-letter"
              style={{
                "--x": item.x,
                "--y": item.y,
                "--r": item.r,
                animationDelay: `${index * 0.08}s`,
              } as CSSProperties}
            >
              {item.l}
            </span>
          ))}
        </h1>

        <div className="splash-service-words">
          {SERVICES.map((word, index) => (
            <span key={word} style={{ animationDelay: `${1.55 + index * 0.08}s` }}>
              {word}
            </span>
          ))}
        </div>

        <b>Premium websites, apps and software systems</b>
      </div>
    </div>
  );
}
