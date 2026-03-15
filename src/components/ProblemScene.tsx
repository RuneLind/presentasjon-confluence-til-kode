import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BookOpen, ClipboardList, Code } from "lucide-react";
import { theme } from "../styles/theme";

const systems = [
  { name: "Confluence", Icon: BookOpen, desc: "Dokumentasjon, retningslinjer, regelverk", color: "#2684FF" },
  { name: "Jira", Icon: ClipboardList, desc: "Oppgaver, akseptansekriterier, kommentarer", color: "#0052CC" },
  { name: "Kildekode", Icon: Code, desc: "Implementasjon, tester, konfigurasjon", color: "#27ae60" },
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  const quoteOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const quoteY = interpolate(frame, [20, 40], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const problemOpacity = interpolate(frame, [100, 120], [0, 1], {
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
      {/* Title */}
      <h2
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: 56,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 30,
        }}
      >
        Kunnskapen finnes allerede
      </h2>

      {/* Quote */}
      <p
        style={{
          opacity: quoteOpacity,
          transform: `translateY(${quoteY}px)`,
          fontSize: 26,
          color: theme.textMuted,
          fontStyle: "italic",
          marginBottom: 60,
          maxWidth: 900,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        &laquo;Hvor var den Confluence-siden som forklarte dette?&raquo;
      </p>

      {/* Three systems */}
      <div style={{ display: "flex", gap: 40, marginBottom: 50 }}>
        {systems.map((sys, i) => {
          const delay = 45 + i * 15;
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
                opacity: cardOpacity,
                transform: `scale(${cardScale})`,
                background: `${sys.color}12`,
                border: `1px solid ${sys.color}40`,
                borderRadius: 20,
                padding: "40px 50px",
                textAlign: "center",
                minWidth: 280,
              }}
            >
              <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
                <sys.Icon size={48} color={sys.color} strokeWidth={1.5} />
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: sys.color,
                  marginBottom: 10,
                }}
              >
                {sys.name}
              </div>
              <div style={{ fontSize: 18, color: theme.textMuted, lineHeight: 1.4 }}>
                {sys.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* Problem statement */}
      <div
        style={{
          opacity: problemOpacity,
          background: `${theme.secondary}10`,
          border: `1px solid ${theme.secondary}30`,
          borderRadius: 16,
          padding: "24px 48px",
          maxWidth: 900,
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 24, color: theme.text, lineHeight: 1.5 }}>
          Spredt over tre systemer, hundrevis av sider, og{" "}
          <span style={{ color: theme.secondary, fontWeight: 600 }}>
            årevis med historikk
          </span>
        </p>
      </div>
    </AbsoluteFill>
  );
};
