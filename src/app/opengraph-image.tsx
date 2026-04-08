import { ImageResponse } from "next/og";

export const alt = "MediaGraphX - Idee. Konzept. Design. | Werbeagentur Altenkirchen";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#2A2A2A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative diagonal lines */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
          }}
        >
          <svg
            width="1200"
            height="630"
            viewBox="0 0 1200 630"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <path
              d="M-100 500 C200 200 400 600 700 300 S1100 50 1400 400"
              fill="none"
              stroke="#E8941A"
              strokeWidth="1.5"
              opacity="0.15"
            />
            <path
              d="M-50 550 C250 250 450 650 750 350 S1150 100 1450 450"
              fill="none"
              stroke="#8C8C8C"
              strokeWidth="1"
              opacity="0.1"
            />
          </svg>
        </div>

        {/* Orange accent bar top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #E8941A 0%, #F0A030 100%)",
            display: "flex",
          }}
        />

        {/* Corner fold */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 80,
            height: 80,
            background: "linear-gradient(225deg, #E8941A 0%, #C87A10 100%)",
            display: "flex",
          }}
        />

        {/* Logo icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 8,
            background: "linear-gradient(135deg, #F0A030, #E8941A, #C87A10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            boxShadow: "0 8px 32px rgba(232,148,26,0.3)",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: 48,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            X
          </span>
        </div>

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: -2,
            marginBottom: 16,
          }}
        >
          <span style={{ color: "#8C8C8C" }}>Media</span>
          <span style={{ color: "#E8941A" }}>Graph</span>
          <span style={{ color: "#D4D4D4" }}>X</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#E8941A",
            opacity: 0.8,
            marginBottom: 24,
            fontStyle: "italic",
            display: "flex",
          }}
        >
          Idee. Konzept. Design.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 18,
            color: "#8C8C8C",
            display: "flex",
          }}
        >
          Full-Service Werbeagentur aus Altenkirchen
        </div>

        {/* Orange accent bar bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #E8941A 0%, #F0A030 100%)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
