import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TrustFirst Solutions",
    short_name: "TrustFirst",
    description: "TrustFirst Solutions digital growth and software services.",
    start_url: "/",
    display: "standalone",
    background_color: "#030302",
    theme_color: "#080706",
    icons: [
      {
        src: "/trustfirst-logo-original.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
