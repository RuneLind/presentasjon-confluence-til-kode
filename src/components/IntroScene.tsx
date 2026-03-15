import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { Starfield } from "./Starfield";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Subtitle
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [30, 50], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative line
  const lineWidth = interpolate(frame, [55, 80], [0, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Speaker info
  const speakerOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const speakerY = interpolate(frame, [70, 90], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Event badge (appears first, before the title)
  const badgeOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowIntensity = interpolate(Math.sin(frame * 0.06), [-1, 1], [15, 35]);

  return (
    <AbsoluteFill
      style={{
        background: theme.backgroundGradient,
        fontFamily: theme.fontFamily,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Starfield />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {/* Event badge */}
        <div
          style={{
            opacity: badgeOpacity,
            fontFamily: theme.monoFont,
            fontSize: 18,
            color: theme.gold,
            background: `${theme.gold}15`,
            padding: "8px 24px",
            borderRadius: 20,
            border: `1px solid ${theme.gold}30`,
            marginBottom: 40,
            letterSpacing: 1,
          }}
        >
          AI-fagsamling: Bygg det som funker!
        </div>

        {/* Title */}
        <h1
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: 72,
            fontWeight: 800,
            color: theme.text,
            textShadow: `0 0 ${glowIntensity}px ${theme.primary}40`,
            lineHeight: 1.1,
            maxWidth: 1200,
          }}
        >
          Fra Confluence til kode
        </h1>

        {/* Subtitle */}
        <p
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            fontSize: 32,
            color: theme.primary,
            marginTop: 20,
            fontWeight: 400,
          }}
        >
          Hvordan koble en AI-agent til teamets kunnskap
        </p>

        {/* Line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
            marginTop: 40,
          }}
        />

        {/* Speaker */}
        <div
          style={{
            opacity: speakerOpacity,
            transform: `translateY(${speakerY}px)`,
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 26, fontWeight: 600, color: theme.text }}>
            Rune Lind
          </span>
          <span style={{ fontSize: 20, color: theme.textMuted }}>
            Seniorkonsulent, Capra Consulting
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
