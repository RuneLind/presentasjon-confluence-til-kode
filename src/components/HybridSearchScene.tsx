import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Brain, Search, Scale } from "lucide-react";
import { theme } from "../styles/theme";

export const HybridSearchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  const techniques = [
    {
      title: "Semantisk søk",
      desc: "Flerspråklige embeddings som forstår betydning",
      color: theme.primary,
      Icon: Brain,
      example: {
        query: "«Rammeavtaler»",
        match: "«Framework agreements»",
        score: "0.83",
        scoreLabel: "cosine similarity",
      },
    },
    {
      title: "Nøkkelordsøk",
      desc: "Eksakte termer, artikkelnumre, forkortelser",
      color: theme.success,
      Icon: Search,
      example: {
        query: "«LA_BUC_01»",
        match: "«LA_BUC_01»",
        score: "1.0",
        scoreLabel: "eksakt treff",
      },
    },
    {
      title: "Cross-encoder reranking",
      desc: "Leser spørring og dokument sammen for presise relevansvurderinger",
      color: theme.accent,
      Icon: Scale,
      example: {
        query: "Spørring + Dokument",
        match: "Relevansscore",
        score: "✓",
        scoreLabel: "presis relevans",
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
        Hybrid søk
      </h2>

      <p
        style={{
          opacity: titleOpacity,
          fontSize: 24,
          color: theme.textMuted,
          marginBottom: 50,
        }}
      >
        Hvorfor étt søk ikke er nok
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
              <div style={{ marginBottom: 12 }}>
                <tech.Icon size={36} color={tech.color} strokeWidth={1.5} />
              </div>
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
          Fusjon → Reranking → Beste resultater
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
