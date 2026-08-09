"use client";

import type { ReactNode } from "react";
import { BrandAnimation, type BrandAnimationMode } from "./BrandAnimation";
import styles from "./brand-state.module.css";

export type BrandStateKind =
  | "loading"
  | "not-found"
  | "server-error"
  | "runtime-error"
  | "offline"
  | "network-error"
  | "unauthorized"
  | "forbidden"
  | "session-expired"
  | "timeout"
  | "maintenance";

export type BrandStateAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type BrandStateScreenProps = {
  state?: BrandStateKind;
  title?: string;
  message?: string;
  statusCode?: string | number;
  primaryAction?: BrandStateAction | null;
  secondaryAction?: BrandStateAction | null;
  animationMode?: BrandAnimationMode;
  animationLoop?: boolean;
  overlay?: boolean;
  eyebrow?: string;
  footer?: ReactNode;
};

type Preset = {
  title: string;
  message: string;
  statusCode?: string | number;
  eyebrow: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export const BRAND_STATE_PRESETS: Record<BrandStateKind, Preset> = {
  loading: {
    title: "Loading",
    message: "Preparing your TrustFirst experience.",
    eyebrow: "TrustFirst Solutions",
  },
  "not-found": {
    title: "Page not found",
    message: "The page you requested does not exist or may have moved.",
    statusCode: 404,
    eyebrow: "Not Found",
    primaryLabel: "Go to home",
    secondaryLabel: "Go back",
  },
  "server-error": {
    title: "Server error",
    message: "The server could not complete this request. Please try again.",
    statusCode: 500,
    eyebrow: "Server Error",
    primaryLabel: "Try again",
    secondaryLabel: "Go to home",
  },
  "runtime-error": {
    title: "Something went wrong",
    message: "An unexpected error occurred while loading this part of the website.",
    eyebrow: "Application Error",
    primaryLabel: "Try again",
    secondaryLabel: "Go to home",
  },
  offline: {
    title: "You're offline",
    message: "Check your internet connection and retry when you're back online.",
    statusCode: "OFFLINE",
    eyebrow: "Connection Lost",
    primaryLabel: "Retry",
  },
  "network-error": {
    title: "Network request failed",
    message: "We couldn't reach the service needed for this request. Check your connection and retry.",
    statusCode: "NETWORK",
    eyebrow: "Network Error",
    primaryLabel: "Retry",
    secondaryLabel: "Go to home",
  },
  unauthorized: {
    title: "Authentication required",
    message: "You need an active authorized session to access this page.",
    statusCode: 401,
    eyebrow: "Unauthorized",
    primaryLabel: "Reload",
    secondaryLabel: "Go to home",
  },
  forbidden: {
    title: "Access denied",
    message: "You don't have permission to access this page.",
    statusCode: 403,
    eyebrow: "Forbidden",
    primaryLabel: "Go to home",
    secondaryLabel: "Go back",
  },
  "session-expired": {
    title: "Session expired",
    message: "Your session has expired. Reload the page to start a new session.",
    statusCode: "SESSION",
    eyebrow: "Session Expired",
    primaryLabel: "Reload",
    secondaryLabel: "Go to home",
  },
  timeout: {
    title: "Request timed out",
    message: "This request took longer than expected. Please try again.",
    statusCode: 408,
    eyebrow: "Timeout",
    primaryLabel: "Try again",
    secondaryLabel: "Go to home",
  },
  maintenance: {
    title: "We'll be back shortly",
    message: "TrustFirst Solutions is temporarily unavailable while maintenance is completed.",
    statusCode: 503,
    eyebrow: "Maintenance",
    primaryLabel: "Check again",
  },
};

function reloadPage() {
  window.location.reload();
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  window.location.assign("/");
}

function defaultPrimaryAction(state: BrandStateKind, preset: Preset): BrandStateAction | null {
  if (!preset.primaryLabel) return null;

  switch (state) {
    case "not-found":
    case "forbidden":
      return { label: preset.primaryLabel, href: "/" };
    default:
      return { label: preset.primaryLabel, onClick: reloadPage };
  }
}

function defaultSecondaryAction(state: BrandStateKind, preset: Preset): BrandStateAction | null {
  if (!preset.secondaryLabel) return null;

  if (state === "not-found" || state === "forbidden") {
    return { label: preset.secondaryLabel, onClick: goBack };
  }

  return { label: preset.secondaryLabel, href: "/" };
}

function Action({ action, primary }: { action: BrandStateAction; primary: boolean }) {
  const className = primary ? styles.actionPrimary : styles.actionSecondary;

  if (action.href) {
    return (
      <a className={className} href={action.href}>
        {action.label}
      </a>
    );
  }

  return (
    <button className={className} type="button" onClick={action.onClick}>
      {action.label}
    </button>
  );
}

export function BrandStateScreen({
  state = "loading",
  title,
  message,
  statusCode,
  primaryAction,
  secondaryAction,
  animationMode = "video",
  animationLoop = true,
  overlay = false,
  eyebrow,
  footer,
}: BrandStateScreenProps) {
  const preset = BRAND_STATE_PRESETS[state];
  const resolvedPrimary = primaryAction === undefined ? defaultPrimaryAction(state, preset) : primaryAction;
  const resolvedSecondary = secondaryAction === undefined ? defaultSecondaryAction(state, preset) : secondaryAction;
  const resolvedStatus = statusCode ?? preset.statusCode;
  const isLoading = state === "loading";

  return (
    <main
      className={[styles.screen, overlay ? styles.overlay : ""].filter(Boolean).join(" ")}
      role={isLoading ? "status" : "alert"}
      aria-live={isLoading ? "polite" : "assertive"}
      aria-busy={isLoading || undefined}
      data-brand-state={state}
      data-testid="brand-state-screen"
    >
      <section className={styles.card}>
        <BrandAnimation mode={animationMode} loop={animationLoop} />

        <p className={styles.eyebrow}>{eyebrow ?? preset.eyebrow}</p>

        {resolvedStatus !== undefined ? <p className={styles.code}>{resolvedStatus}</p> : null}

        <h1 className={styles.title}>{title ?? preset.title}</h1>
        <p className={styles.message}>{message ?? preset.message}</p>

        {resolvedPrimary || resolvedSecondary ? (
          <div className={styles.actions}>
            {resolvedPrimary ? <Action action={resolvedPrimary} primary /> : null}
            {resolvedSecondary ? <Action action={resolvedSecondary} primary={false} /> : null}
          </div>
        ) : null}

        {footer}
      </section>
    </main>
  );
}
