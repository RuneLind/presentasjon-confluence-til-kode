import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

export const DataQualityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  // Huginn card
  const huginnOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pipeline steps
  const steps = [
    "Hent dokumenter",
    "Rydd opp",
    "Del i chunks",
    "Tagg med emner",
    "Generer embeddings",
  ];

  // Stat counter - 35%
  const statFrame = frame - 80;
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
  const insightOpacity = interpolate(frame, [110, 130], [0, 1], {
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
          marginBottom: 50,
        }}
      >
        Datakvalitet er alt
      </h2>

      <div style={{ display: "flex", gap: 50, maxWidth: 1400, width: "100%", alignItems: "stretch" }}>
        {/* Left: Huginn pipeline */}
        <div
          style={{
            flex: 1,
            opacity: huginnOpacity,
            background: `${theme.text}05`,
            border: `1px solid ${theme.text}15`,
            borderRadius: 20,
            padding: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 30 }}>
            <span style={{ fontSize: 36 }}>{"\uD83E\uDD85"}</span>
            <div>
              <h3 style={{ fontSize: 28, fontWeight: 700, color: theme.primary }}>Huginn</h3>
              <p style={{ fontSize: 16, color: theme.textMuted }}>Indeksering av kunnskap</p>
            </div>
          </div>

          {steps.map((step, i) => {
            const delay = 40 + i * 10;
            const stepOpacity = interpolate(frame - delay, [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const stepX = interpolate(frame - delay, [0, 15], [30, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div key={i}>
                <div
                  style={{
                    opacity: stepOpacity,
                    transform: `translateX(${stepX}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "12px 20px",
                    background: `${theme.primary}08`,
                    border: `1px solid ${theme.primary}15`,
                    borderRadius: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: theme.monoFont,
                      fontSize: 14,
                      color: theme.primary,
                      background: `${theme.primary}20`,
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 20, color: theme.text }}>{step}</span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      opacity: stepOpacity * 0.4,
                      textAlign: "center",
                      color: theme.primary,
                      fontSize: 16,
                      padding: "4px 0",
                    }}
                  >
                    {"\u2193"}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Results */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 30 }}>
          {/* Big stat */}
          <div
            style={{
              opacity: statOpacity,
              transform: `scale(${statScale})`,
              background: `${theme.secondary}10`,
              border: `1px solid ${theme.secondary}30`,
              borderRadius: 20,
              padding: 40,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 96,
                fontWeight: 800,
                color: theme.secondary,
                textShadow: `0 0 40px ${theme.secondary}30`,
                lineHeight: 1,
              }}
            >
              {countUp}%
            </div>
            <div style={{ fontSize: 22, color: theme.textMuted, marginTop: 12 }}>
              av chunks eliminert ved opprydding
            </div>
          </div>

          {/* What was removed */}
          <div
            style={{
              opacity: statOpacity,
              background: `${theme.text}05`,
              border: `1px solid ${theme.text}15`,
              borderRadius: 16,
              padding: 30,
            }}
          >
            <h4 style={{ fontSize: 20, fontWeight: 600, color: theme.text, marginBottom: 16 }}>
              Hva ble fjernet?
            </h4>
            {["Tomme chunks", "Metadata-st\u00F8y", "Irrelevante kodeblokker", "Duplikater"].map(
              (item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 10,
                    fontSize: 18,
                    color: theme.textMuted,
                  }}
                >
                  <span style={{ color: theme.secondary }}>{"\u2717"}</span>
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Insight */}
      <div
        style={{
          opacity: insightOpacity,
          marginTop: 40,
          padding: "18px 40px",
          background: `${theme.gold}10`,
          border: `1px solid ${theme.gold}30`,
          borderRadius: 16,
        }}
      >
        <p style={{ fontSize: 22, color: theme.gold, fontWeight: 500, textAlign: "center" }}>
          Ingen mengde reranking fikser d\u00E5rlig inputdata
        </p>
      </div>
    </AbsoluteFill>
  );
};
