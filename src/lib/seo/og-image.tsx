import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export const ogImageSize = {
  width: 1200,
  height: 630,
};

type OgImageInput = {
  title?: string;
  eyebrow?: string;
};

export async function createTrustFirstOgImage({ title, eyebrow }: OgImageInput) {
  const settings = await getSiteSettings();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #050504 0%, #110d07 52%, #211506 100%)",
          color: "#f8efd9",
          padding: 64,
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* next/image is not supported inside next/og ImageResponse trees. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${settings.url}/trustfirst-logo.svg`}
            alt=""
            width={72}
            height={72}
            style={{ borderRadius: 18, border: "1px solid rgba(201,155,71,.55)" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 32, fontWeight: 900 }}>{settings.name}</div>
            <div style={{ marginTop: 6, fontSize: 18, letterSpacing: 4, color: "#c99b47", textTransform: "uppercase" }}>
              {eyebrow || settings.tagline}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <div style={{ width: 120, height: 4, background: "#c99b47", marginBottom: 30 }} />
          <h1 style={{ margin: 0, fontSize: 72, lineHeight: 0.95, fontWeight: 900, letterSpacing: -3 }}>
            {title || settings.defaultSeoTitle || settings.name}
          </h1>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#d6c8ae", fontSize: 22 }}>
          <span>Premium websites, apps and digital systems</span>
          <span style={{ color: "#c99b47" }}>trustfirstsolutions.in</span>
        </div>
      </div>
    ),
    ogImageSize,
  );
}
