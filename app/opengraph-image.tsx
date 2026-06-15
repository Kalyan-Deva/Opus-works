import { ImageResponse } from "next/og";
import { site, siteByline } from "@/lib/site";

export const alt = `${siteByline} — Collected works`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social-share card for the site.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf7",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              background: "#c2540c",
              color: "#fbfaf7",
              borderRadius: 12,
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            O
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#6f6a62" }}>
            {siteByline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              color: "#1a1815",
              lineHeight: 1.05,
            }}
          >
            Everything I make, in one place.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#6f6a62" }}>
            {site.description}
          </div>
        </div>

        <div style={{ display: "flex", height: 8, background: "#c2540c", width: 160, borderRadius: 4 }} />
      </div>
    ),
    { ...size },
  );
}
