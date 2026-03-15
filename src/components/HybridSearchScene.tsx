import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

export const HybridSearchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  const techniques = [
    {
      title: "Semantisk s\u00F8k",
      desc: "Flerspr\u00E5klige embeddings som forst\u00E5r betydning",
      color: theme.primary,
      icon: "\uD83E\uDDE0",
      example: {
        query: "\u00ABRammeavtaler\u00BB",
        match: "\u00ABFramework agreements\u00BB",
        score: "0.83",
        scoreLabel: "cosine similarity",
      },
    },
    {
      title: "N\u00F8kkelords\u00F8k",
      desc: "Eksakte termer, artikkelnumre, forkortelser",
      color: theme.success,
      icon: "\uD83D\uDD0D",
      example: {
        query: "\u00ABLA_BUC_01\u00BB",
        match: "\u00ABLA_BUC_01\u00BB",
        score: "1.0",
        scoreLabel: "eksakt treff",
      },
    },
    {
      title: "Cross-encoder reranking",
      desc: "Leser sp\u00F8rring og dokument sammen for presise relevansvurderinger",
      color: theme.accent,
      icon: "\u2696\uFE0F",
      example: {
        query: "Sp\u00F8rring + Dokument",
        match: "Relevansscore",
        score: "\u2713",
        scoreLabel: "\u00E6rlig konfidens",
      },
    },
  ];

  // Merge arrow
  const mergeOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      <h2
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: 52,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 20,
        }}
      >
        Hybrid s\u00F8k
      </h2>

      <p
        style={{
          opacity: titleOpacity,
          fontSize: 24,
          color: theme.textMuted,
          marginBottom: 50,
        }}
      >
        Hvorfor \u00E9tt s\u00F8k ikke er nok
      </p>

      <div style={{ display: "flex", gap: 30, maxWidth: 1500, width: "100%" }}>
        {techniques.map((tech, i) => {
          const delay = 25 + i * 20;
          const cardScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 120 },
          });
          const cardOpacity = interpolate(frame - delay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: cardOpacity,
                transform: `scale(${cardScale})`,
                background: `${tech.color}08`,
                border: `1px solid ${tech.color}30`,
                borderRadius: 20,
                padding: 36,
                position: "relative",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{tech.icon}</div>
              <h3
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: tech.color,
                  marginBottom: 10,
                }}
              >
                {tech.title}
              </h3>
              <p style={{ fontSize: 18, color: theme.textMuted, lineHeight: 1.5, marginBottom: 24 }}>
                {tech.desc}
              </p>

              {/* Example */}
              <div
                style={{
                  background: `${tech.color}10`,
                  border: `1px solid ${tech.color}20`,
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontSize: 16, fontFamily: theme.monoFont, color: theme.text }}>
                    {tech.example.query}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 16, fontFamily: theme.monoFont, color: theme.textMuted }}>
                    {tech.example.match}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: theme.monoFont,
                      color: tech.color,
                      background: `${tech.color}20`,
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    {tech.example.score}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: theme.textMuted,
                    marginTop: 8,
                    fontFamily: theme.monoFont,
                  }}
                >
                  {tech.example.scoreLabel}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Merge indicator */}
      <div
        style={{
          opacity: mergeOpacity,
          marginTop: 40,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            height: 2,
            width: 100,
            background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
          }}
        />
        <span
          style={{
            fontFamily: theme.monoFont,
            fontSize: 18,
            color: theme.text,
            background: `${theme.text}10`,
            padding: "8px 20px",
            borderRadius: 10,
            border: `1px solid ${theme.text}20`,
          }}
        >
          Fusjon \u2192 Reranking \u2192 Beste resultater
        </span>
        <div
          style={{
            height: 2,
            width: 100,
            background: `linear-gradient(90deg, ${theme.accent}, ${theme.primary})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
