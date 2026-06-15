import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";
import { siteByline } from "@/lib/site";

export const alt = "Article on Opus";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Per-article social-share card showing the post title + category.
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let title = "Opus";
  let category = "Writing";
  try {
    const post = getPost(slug);
    title = post.title;
    category = post.category;
  } catch {
    // fall back to defaults
  }

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
          <div style={{ display: "flex", fontSize: 28, color: "#6f6a62" }}>
            {siteByline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              color: "#c2540c",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {category}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? 56 : 68,
              fontWeight: 700,
              color: "#1a1815",
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", height: 8, background: "#c2540c", width: 160, borderRadius: 4 }} />
      </div>
    ),
    { ...size },
  );
}
