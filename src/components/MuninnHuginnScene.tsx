import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

export const MuninnHuginnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  // Huginn card
  const huginnDelay = 30;
  const huginnScale = spring({
    frame: frame - huginnDelay,
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const huginnOpacity = interpolate(frame - huginnDelay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Muninn card
  const muninnDelay = 50;
  const muninnScale = spring({
    frame: frame - muninnDelay,
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const muninnOpacity = interpolate(frame - muninnDelay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Connection
  const connOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const connWidth = interpolate(frame, [70, 100], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fun fact
  const funFactOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Open source badge
  const osBadgeOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const floatY = Math.sin(frame * 0.03) * 5;

  return (
    <AbsoluteFill
      style={{
        background: theme.backgroundGradient,
        fontFamily: theme.fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      {/* Subtitle */}
      <p
        style={{
          opacity: titleOpacity,
          fontSize: 18,
          color: theme.textMuted,
          fontFamily: theme.monoFont,
          marginBottom: 10,
        }}
      >
        Odins to ravner fra norrøn mytologi
      </p>

      <h2
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: 52,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 60,
        }}
      >
        Muninn & Huginn
      </h2>

      <div
        style={{
          display: "flex",
          gap: 80,
          alignItems: "center",
          maxWidth: 1400,
          width: "100%",
        }}
      >
        {/* Huginn */}
        <div
          style={{
            flex: 1,
            opacity: huginnOpacity,
            transform: `scale(${huginnScale}) translateY(${floatY}px)`,
            background: `${theme.primary}08`,
            border: `2px solid ${theme.primary}40`,
            borderRadius: 24,
            padding: 40,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>{"🦅"}</div>
          <h3 style={{ fontSize: 32, fontWeight: 700, color: theme.primary, marginBottom: 8 }}>
            Huginn
          </h3>
          <p
            style={{
              fontSize: 18,
              color: theme.gold,
              fontStyle: "italic",
              marginBottom: 20,
            }}
          >
            «Tanke»
          </p>
          <p style={{ fontSize: 20, color: theme.textMuted, lineHeight: 1.5, marginBottom: 24 }}>
            Søkemotoren som indekserer og søker i dokumenter
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            {["Indeksering", "Hybrid søk", "Reranking", "Embeddings"].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: theme.monoFont,
                  fontSize: 15,
                  color: theme.primary,
                  background: `${theme.primary}15`,
                  padding: "5px 16px",
                  borderRadius: 8,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Connection */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: connOpacity,
          }}
        >
          <div
            style={{
              width: connWidth,
              height: 3,
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
              borderRadius: 2,
            }}
          />
          <span
            style={{
              fontFamily: theme.monoFont,
              fontSize: 16,
              color: theme.textMuted,
              background: `${theme.text}08`,
              padding: "6px 16px",
              borderRadius: 8,
            }}
          >
            MCP
          </span>
          <div
            style={{
              width: connWidth,
              height: 3,
              background: `linear-gradient(90deg, ${theme.accent}, ${theme.primary})`,
              borderRadius: 2,
            }}
          />
        </div>

        {/* Muninn */}
        <div
          style={{
            flex: 1,
            opacity: muninnOpacity,
            transform: `scale(${muninnScale}) translateY(${-floatY}px)`,
            background: `${theme.accent}08`,
            border: `2px solid ${theme.accent}40`,
            borderRadius: 24,
            padding: 40,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>{"🦅"}</div>
          <h3 style={{ fontSize: 32, fontWeight: 700, color: theme.accent, marginBottom: 8 }}>
            Muninn
          </h3>
          <p
            style={{
              fontSize: 18,
              color: theme.gold,
              fontStyle: "italic",
              marginBottom: 20,
            }}
          >
            «Hukommelse»
          </p>
          <p style={{ fontSize: 20, color: theme.textMuted, lineHeight: 1.5, marginBottom: 24 }}>
            AI-plattformen som håndterer samtaler, persona og MCP
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            {["Persona", "Hukommelse", "Samtaler", "MCP-kobling"].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: theme.monoFont,
                  fontSize: 15,
                  color: theme.accent,
                  background: `${theme.accent}15`,
                  padding: "5px 16px",
                  borderRadius: 8,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Fun fact */}
      <p
        style={{
          opacity: funFactOpacity,
          fontSize: 20,
          color: theme.textMuted,
          fontStyle: "italic",
          marginTop: 40,
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        Vi brukte Muninn til å spørre Huginn om hvordan søket burde fungere{" "}
        {"🤯"}
      </p>

      {/* Open source */}
      <div
        style={{
          opacity: osBadgeOpacity,
          marginTop: 20,
          fontFamily: theme.monoFont,
          fontSize: 16,
          color: theme.success,
          background: `${theme.success}15`,
          padding: "8px 24px",
          borderRadius: 20,
          border: `1px solid ${theme.success}30`,
        }}
      >
        Begge prosjektene er open source
      </div>
    </AbsoluteFill>
  );
};
