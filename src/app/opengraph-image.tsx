import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Usman Kadai – Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #0f0a1e 50%, #0a0a0a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Available badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "999px",
            padding: "8px 16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#34d399",
            }}
          />
          <span style={{ color: "#818cf8", fontSize: "16px", fontWeight: 600 }}>
            Available for hire
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "white",
            lineHeight: 1.1,
            marginBottom: "16px",
            letterSpacing: "-2px",
          }}
        >
          Usman Kadai
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: 600,
            background: "linear-gradient(90deg, #818cf8, #a78bfa, #f472b6)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "24px",
          }}
        >
          Full Stack Developer
        </div>

        {/* Bio */}
        <div
          style={{
            fontSize: "20px",
            color: "#9ca3af",
            maxWidth: "700px",
            lineHeight: 1.5,
            marginBottom: "48px",
          }}
        >
          Building beautiful, scalable web experiences with React, Next.js, and Node.js. Based in London.
        </div>

        {/* Tech pills */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["React", "Next.js", "TypeScript", "Node.js", "Python", "WordPress", "Vue.js", "SQL"].map((tech) => (
            <div
              key={tech}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "8px 16px",
                color: "#d1d5db",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontSize: "18px",
            color: "#4f46e5",
            fontWeight: 600,
          }}
        >
          usmankadai.dev
        </div>
      </div>
    ),
    { ...size }
  );
}

