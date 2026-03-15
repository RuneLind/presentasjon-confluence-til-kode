import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Download, Eraser, Scissors, Tag, Database, Bird, X } from "lucide-react";
import { theme } from "../styles/theme";

const pipelineSteps = [
  { Icon: Download, title: "Hent", desc: "Confluence, Notion, Jira" },
  { Icon: Eraser, title: "Rens", desc: "Fjern støy, sensitiv data" },
  { Icon: Scissors, title: "Chunk", desc: "Del opp i søkbare biter" },
  { Icon: Tag, title: "Tagg", desc: "50 emner, auto-klassifisert" },
  { Icon: Database, title: "Indekser", desc: "Vektorembeddings, lokalt" },
];

export const DataQualityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  // Huginn badge
  const badgeOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stat counter - 35%
  const statFrame = frame - 85;
  const statOpacity = interpolate(statFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const statScale = spring({
    frame: statFrame,
    fps,
    config: { damping: 10, stiffness: 150 },
  });
  const countUp = Math.floor(
    interpolate(statFrame, [0, 30], [0, 35], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Insight
  const insightOpacity = interpolate(frame, [120, 140], [0, 1], {
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
        padding: "60px 80px",
      }}
    >
      {/* Title */}
      <h2
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: 52,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 12,
        }}
      >
        Datakvalitet er alt
      </h2>

      {/* Huginn badge */}
      <div
        style={{
          opacity: badgeOpacity,
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 40,
        }}
      >
        <Bird size={22} color={theme.primary} strokeWidth={1.5} />
        <span style={{ fontSize: 18, color: theme.textMuted }}>
          Huginn — indeksering av kunnskap
        </span>
        <span
          style={{
            fontFamily: theme.monoFont,
            fontSize: 13,
            color: theme.primary,
            background: `${theme.primary}15`,
            padding: "3px 12px",
            borderRadius: 6,
            marginLeft: 4,
          }}
        >
          github.com/RuneLind/huginn
        </span>
      </div>

      {/* Horizontal pipeline */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          marginBottom: 50,
        }}
      >
        {pipelineSteps.map((step, i) => {
          const delay = 30 + i * 12;
          const cardScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 120 },
          });
          const cardOpacity = interpolate(frame - delay, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const arrowOpacity = interpolate(frame - delay - 6, [0, 10], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              {/* Arrow */}
              {i > 0 && (
                <div
                  style={{
                    opacity: arrowOpacity,
                    color: theme.primary,
                    fontSize: 20,
                    padding: "0 12px",
                    fontFamily: theme.monoFont,
                  }}
                >
                  →
                </div>
              )}

              {/* Card */}
              <div
                style={{
                  opacity: cardOpacity,
                  transform: `scale(${cardScale})`,
                  background: `${theme.primary}06`,
                  border: `1px solid ${theme.primary}20`,
                  borderRadius: 16,
                  padding: "24px 28px",
                  textAlign: "center",
                  minWidth: 190,
                }}
              >
                <div style={{ marginBottom: 10, display: "flex", justifyContent: "center" }}>
                  <step.Icon size={36} color={theme.primary} strokeWidth={1.5} />
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: theme.primary,
                    marginBottom: 6,
                  }}
                >
                  {step.title}
                </div>
                <div style={{ fontSize: 15, color: theme.textMuted, lineHeight: 1.3 }}>
                  {step.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom: stat + what was removed */}
      <div
        style={{
          display: "flex",
          gap: 30,
          maxWidth: 1200,
          width: "100%",
          alignItems: "stretch",
        }}
      >
        {/* Big stat */}
        <div
          style={{
            flex: 1,
            opacity: statOpacity,
            transform: `scale(${statScale})`,
            background: `${theme.secondary}10`,
            border: `1px solid ${theme.secondary}30`,
            borderRadius: 20,
            padding: "30px 40px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: theme.secondary,
              textShadow: `0 0 40px ${theme.secondary}30`,
              lineHeight: 1,
            }}
          >
            {countUp}%
          </div>
          <div style={{ fontSize: 20, color: theme.textMuted, marginTop: 10 }}>
            av chunks eliminert ved opprydding
          </div>
        </div>

        {/* What was removed */}
        <div
          style={{
            flex: 1,
            opacity: statOpacity,
            background: `${theme.text}05`,
            border: `1px solid ${theme.text}15`,
            borderRadius: 16,
            padding: "24px 30px",
          }}
        >
          <h4 style={{ fontSize: 18, fontWeight: 600, color: theme.text, marginBottom: 14 }}>
            Hva ble fjernet?
          </h4>
          {["Tomme chunks", "Metadata-støy", "Irrelevante kodeblokker", "Duplikater"].map(
            (item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                  fontSize: 17,
                  color: theme.textMuted,
                }}
              >
                <X size={18} color={theme.secondary} strokeWidth={2} />
                {item}
              </div>
            )
          )}
        </div>
      </div>

      {/* Insight */}
      <div
        style={{
          opacity: insightOpacity,
          marginTop: 30,
          padding: "16px 36px",
          background: `${theme.gold}10`,
          border: `1px solid ${theme.gold}30`,
          borderRadius: 16,
        }}
      >
        <p style={{ fontSize: 20, color: theme.gold, fontWeight: 500, textAlign: "center" }}>
          Reranking kan ikke redde dårlige data
        </p>
      </div>
    </AbsoluteFill>
  );
};
