import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

export const BlankSlateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  // Consultant analogy
  const analogyOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const analogyY = interpolate(frame, [30, 50], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Context window visualization
  const windowOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Key insight
  const insightOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [20, 40]);

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
      {/* Title */}
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
        Agentens grunnproblem
      </h2>

      <div style={{ display: "flex", gap: 60, alignItems: "flex-start", maxWidth: 1400 }}>
        {/* Left: Consultant analogy */}
        <div
          style={{
            flex: 1,
            opacity: analogyOpacity,
            transform: `translateY(${analogyY}px)`,
          }}
        >
          <div
            style={{
              background: `${theme.primary}08`,
              border: `1px solid ${theme.primary}25`,
              borderRadius: 20,
              padding: 40,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 20 }}>
              {"\uD83E\uDD14"}
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 600, color: theme.primary, marginBottom: 16 }}>
              Som en ny konsulent p\u00E5 dag 1
            </h3>
            <p style={{ fontSize: 22, color: theme.textMuted, lineHeight: 1.6 }}>
              Uansett hvor smart vedkommende er, trenger de to ting for \u00E5 bli nyttig:
            </p>
            <ul
              style={{
                listStyle: "none",
                marginTop: 20,
                padding: 0,
              }}
            >
              <li style={{ fontSize: 22, color: theme.text, marginBottom: 12, paddingLeft: 24 }}>
                <span style={{ color: theme.primary, marginRight: 12 }}>{"\u25B6"}</span>
                Vite hvem de er og hva de kan
              </li>
              <li style={{ fontSize: 22, color: theme.text, paddingLeft: 24 }}>
                <span style={{ color: theme.primary, marginRight: 12 }}>{"\u25B6"}</span>
                Tilgang til systemer og dokumentasjon
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Context window */}
        <div style={{ flex: 1, opacity: windowOpacity }}>
          <div
            style={{
              background: `${theme.accent}08`,
              border: `1px solid ${theme.accent}25`,
              borderRadius: 20,
              padding: 40,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 20 }}>
              {"\uD83E\uDDE0"}
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 600, color: theme.accent, marginBottom: 16 }}>
              Kontekstvinduet
            </h3>
            <p style={{ fontSize: 22, color: theme.textMuted, lineHeight: 1.6 }}>
              Et begrenset arbeidsminne. Blankt ark hver gang. Ingen hukommelse fra forrige samtale.
            </p>
            <div
              style={{
                marginTop: 24,
                background: `${theme.accent}10`,
                borderRadius: 12,
                padding: 20,
                border: `1px solid ${theme.accent}20`,
              }}
            >
              <div style={{ fontSize: 16, color: theme.textMuted, fontFamily: theme.monoFont }}>
                Kapasitet: begrenset
              </div>
              <div
                style={{
                  height: 8,
                  background: `${theme.text}10`,
                  borderRadius: 4,
                  marginTop: 10,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "15%",
                    background: `linear-gradient(90deg, ${theme.accent}, ${theme.primary})`,
                    borderRadius: 4,
                  }}
                />
              </div>
              <div style={{ fontSize: 14, color: theme.textMuted, marginTop: 8 }}>
                Fyll den riktig \u2014 ikke med alt
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div
        style={{
          opacity: insightOpacity,
          marginTop: 50,
          padding: "20px 48px",
          background: `${theme.gold}10`,
          border: `1px solid ${theme.gold}30`,
          borderRadius: 16,
          textShadow: `0 0 ${glowPulse}px ${theme.gold}20`,
        }}
      >
        <p style={{ fontSize: 26, color: theme.gold, fontWeight: 600, textAlign: "center" }}>
          Verdien ligger ikke i modellen \u2014 den ligger i konteksten den f\u00E5r
        </p>
      </div>
    </AbsoluteFill>
  );
};
