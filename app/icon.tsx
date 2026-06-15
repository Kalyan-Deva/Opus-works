import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon: a warm amber tile with the Opus "O".
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c2540c",
          color: "#fbfaf7",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 7,
        }}
      >
        O
      </div>
    ),
    { ...size },
  );
}
