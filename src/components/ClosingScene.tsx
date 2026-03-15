import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { Starfield } from "./Starfield";

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const quoteOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const quoteScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });

  const lineWidth = interpolate(frame, [30, 55], [0, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const resourcesOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const speakerOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowIntensity = interpolate(Math.sin(frame * 0.06), [-1, 1], [15, 30]);

  const resources = [
    { name: "Muninn", desc: "AI-plattform", url: "github.com/RuneLind/muninn" },
    { name: "Huginn", desc: "Kunnskapssøk", url: "github.com/RuneLind/huginn" },
    { name: "MCP", desc: "Model Context Protocol", url: "modelcontextprotocol.io" },
  ];

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
      <Starfield starCount={40} maxDistance={1000} />

      {/* Main quote */}
      <div
        style={{
          opacity: quoteOpacity,
          transform: `scale(${quoteScale})`,
          textAlign: "center",
          zIndex: 1,
          maxWidth: 1100,
        }}
      >
        <p
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: theme.text,
            lineHeight: 1.4,
            textShadow: `0 0 ${glowIntensity}px ${theme.primary}30`,
          }}
        >
          Den som bygger gode kunnskapskilder i dag,
          <br />
          <span style={{ color: theme.primary }}>
            får de smarteste agentene i morgen
          </span>
        </p>
      </div>

      {/* Line */}
      <div
        style={{
          width: lineWidth,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${theme.primary}80, transparent)`,
          marginTop: 40,
          marginBottom: 40,
          zIndex: 1,
        }}
      />

      {/* Resources */}
      <div
        style={{
          opacity: resourcesOpacity,
          display: "flex",
          gap: 24,
          zIndex: 1,
          marginBottom: 40,
        }}
      >
        {resources.map((res, i) => (
          <div
            key={i}
            style={{
              background: `${theme.text}08`,
              border: `1px solid ${theme.text}15`,
              borderRadius: 14,
              padding: "16px 28px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 600, color: theme.primary, marginBottom: 4 }}>
              {res.name}
            </div>
            <div style={{ fontSize: 15, color: theme.textMuted, marginBottom: 8 }}>
              {res.desc}
            </div>
            <div
              style={{
                fontFamily: theme.monoFont,
                fontSize: 13,
                color: theme.textMuted,
                background: `${theme.text}08`,
                padding: "4px 12px",
                borderRadius: 6,
              }}
            >
              {res.url}
            </div>
          </div>
        ))}
      </div>

      {/* Speaker */}
      <div
        style={{
          opacity: speakerOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 1,
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 600, color: theme.text }}>Rune Lind</span>
        <span style={{ fontSize: 18, color: theme.textMuted }}>
          Seniorkonsulent, Capra Consulting
        </span>
      </div>
    </AbsoluteFill>
  );
};
