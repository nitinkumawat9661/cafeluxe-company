"use client";

import { useRef } from "react";
import styles from "./software-hero.module.css";

const inputNodes = ["Billing", "Inventory", "Staff", "Orders"];
const outputNodes = ["Reports", "Sync", "Controls"];

export function SoftwareHeroVisual() {
  const frameRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    frame.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    frame.style.setProperty("--my", `${event.clientY - rect.top}px`);
    frame.style.setProperty("--glow-opacity", "1");
  }

  function handlePointerLeave() {
    const frame = frameRef.current;
    if (!frame) return;
    frame.style.setProperty("--glow-opacity", ".42");
  }

  return (
    <div
      ref={frameRef}
      className={styles.frame}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="TrustFirst software system architecture illustration"
    >
      <div className={styles.pointerGlow} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.scan} aria-hidden="true" />

      <div className={styles.topbar}>
        <div>
          <p className={styles.kicker}>TrustFirst engineering</p>
          <p className={styles.title}>Operational system map</p>
        </div>
        <div className={styles.status}>
          <span className={styles.statusDot} />
          production-minded
        </div>
      </div>

      <div className={styles.canvas}>
        <div className={styles.column}>
          <span className={styles.columnLabel}>Inputs</span>
          <div className={styles.nodeStack}>
            {inputNodes.map((node, index) => (
              <div key={node} className={styles.node} style={{ "--delay": `${index * 180}ms` } as React.CSSProperties}>
                <span className={styles.nodeIndex}>0{index + 1}</span>
                <span>{node}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.coreWrap}>
          <div className={styles.routeLines} aria-hidden="true">
            <span className={styles.routeLine} />
            <span className={styles.routeLine} />
            <span className={styles.routeLine} />
          </div>

          <div className={styles.core}>
            <span className={styles.coreEyebrow}>Core</span>
            <strong>Business Logic</strong>
            <p>rules · permissions · data</p>
            <span className={styles.corePulse} aria-hidden="true" />
          </div>

          <div className={styles.guardrail}>
            <span>Validation</span>
            <span>Auditability</span>
            <span>Safe state</span>
          </div>
        </div>

        <div className={styles.column}>
          <span className={styles.columnLabel}>Outputs</span>
          <div className={styles.nodeStack}>
            {outputNodes.map((node, index) => (
              <div key={node} className={styles.node} style={{ "--delay": `${(index + 2) * 180}ms` } as React.CSSProperties}>
                <span className={styles.nodeIndex}>0{index + 5}</span>
                <span>{node}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <span>workflow → data → controls → delivery</span>
        <span className={styles.footerMark}>TFS / SYSTEMS</span>
      </div>
    </div>
  );
}
