import { ImageResponse } from "next/og";

export const alt = "CustomeAI: Tell us the problem, we build the fix";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(83,58,253,0.35), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#533afd",
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#8a93a6",
            }}
          >
            CustomeAI
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#ffffff",
            maxWidth: 980,
          }}
        >
          Tell us the problem, we build the fix.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 32,
            color: "#b7bdc9",
            maxWidth: 880,
          }}
        >
          Custom websites and AI systems for small businesses. Live in 7 to 21 days.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
