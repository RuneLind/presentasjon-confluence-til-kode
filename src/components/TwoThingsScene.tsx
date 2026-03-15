import { useState, useEffect } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

const personaCode = [
  "# AGENT.md",
  "",
  "Du er en AI-assistent for Team Melosys.",
  "Domene: EU/E\u00D8S-trygdekoordinering.",
  "",
  "Du kjenner til:",
  "- BUC (Business Use Case)",
  "- SED (Structured Electronic Document)",
  "- Lovvalg og medlemskap",
];

export const TwoThingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowRight") {
        if (activeStep < 1) {
          e.preventDefault();
          e.stopPropagation();
          setActiveStep((s) => s + 1);
        }
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (activeStep > 0) {
          e.preventDefault();
          e.stopPropagation();
          setActiveStep((s) => s - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [activeStep]);

  useEffect(() => {
    if (frame > 40 && activeStep === -1) setActiveStep(0);
  }, [frame, activeStep]);

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  const cursorVisible = Math.floor(frame / 15) % 2 === 0;

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
        To ting agenten trenger
      </h2>

      <div style={{ display: "flex", gap: 40, maxWidth: 1500, width: "100%" }}>
        {/* Card 1: Persona */}
        <div
          style={{
            flex: 1,
            opacity: activeStep >= 0 ? 1 : 0.15,
            transform: `scale(${activeStep >= 0 ? 1 : 0.95})`,
            transition: "all 0.4s ease-out",
            background: `${theme.primary}08`,
            border: `2px solid ${activeStep === 0 ? theme.primary : `${theme.primary}30`}`,
            borderRadius: 20,
            padding: 40,
            boxShadow: activeStep === 0 ? `0 0 30px ${theme.primary}20` : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: theme.background,
                background: theme.primary,
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              1
            </span>
            <h3 style={{ fontSize: 32, fontWeight: 700, color: theme.primary }}>
              Persona
            </h3>
          </div>
          <p style={{ fontSize: 22, color: theme.textMuted, marginBottom: 24, lineHeight: 1.5 }}>
            Hvem er agenten? Domenekunnskap, fagterminologi, oppf\u00F8rsel.
          </p>

          {/* Code block */}
          {activeStep >= 0 && (
            <div
              style={{
                background: "#1a1a2e",
                border: `1px solid ${theme.text}15`,
                borderRadius: 12,
                padding: 24,
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", top: 12, left: 16, display: "flex", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
              </div>
              <div style={{ marginTop: 16 }}>
                {personaCode.map((line, i) => {
                  const lineDelay = 45 + i * 5;
                  const lineFrame = frame - lineDelay;
                  const charsToShow = Math.floor(
                    interpolate(lineFrame, [0, 12], [0, line.length], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  );
                  const displayedLine = line.substring(0, charsToShow);
                  let color = theme.textMuted;
                  if (line.startsWith("#")) color = theme.primary;
                  else if (line.startsWith("-")) color = "#a8d8a8";
                  else if (line.includes(":")) color = theme.text;
                  else color = theme.textMuted;

                  return (
                    <div
                      key={i}
                      style={{
                        fontFamily: theme.monoFont,
                        fontSize: 18,
                        color,
                        lineHeight: 1.6,
                        minHeight: 29,
                      }}
                    >
                      {displayedLine}
                      {lineFrame > 0 && lineFrame < 12 && cursorVisible && (
                        <span style={{ color: theme.primary }}>{"\u2588"}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Card 2: Tools */}
        <div
          style={{
            flex: 1,
            opacity: activeStep >= 1 ? 1 : 0.15,
            transform: `scale(${activeStep >= 1 ? 1 : 0.95})`,
            transition: "all 0.4s ease-out",
            background: `${theme.accent}08`,
            border: `2px solid ${activeStep === 1 ? theme.accent : `${theme.accent}30`}`,
            borderRadius: 20,
            padding: 40,
            boxShadow: activeStep === 1 ? `0 0 30px ${theme.accent}20` : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: theme.background,
                background: theme.accent,
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              2
            </span>
            <h3 style={{ fontSize: 32, fontWeight: 700, color: theme.accent }}>
              Verkt\u00F8y (MCP)
            </h3>
          </div>
          <p style={{ fontSize: 22, color: theme.textMuted, marginBottom: 24, lineHeight: 1.5 }}>
            Tilgang til ekstern kunnskap. Agenten henter det den trenger, n\u00E5r den trenger det.
          </p>

          {activeStep >= 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "\uD83D\uDD0D", label: "S\u00F8k i dokumentasjon", desc: "M\u00E5lrettede oppslag" },
                { icon: "\uD83D\uDD17", label: "Kunnskapsgraf", desc: "Strukturerte relasjoner" },
                { icon: "\uD83D\uDCBB", label: "Kodes\u00F8k", desc: "Fire repoer via Serena" },
              ].map((tool, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    background: `${theme.accent}10`,
                    border: `1px solid ${theme.accent}20`,
                    borderRadius: 12,
                    padding: "16px 20px",
                    opacity: activeStep >= 1 ? 1 : 0,
                    transform: `translateX(${activeStep >= 1 ? 0 : 20}px)`,
                    transition: `all 0.3s ease-out ${i * 0.1}s`,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{tool.icon}</span>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: theme.text }}>
                      {tool.label}
                    </div>
                    <div style={{ fontSize: 16, color: theme.textMuted }}>{tool.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation hint */}
      {activeStep < 1 && (
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            color: theme.textMuted,
            fontSize: 16,
            fontFamily: theme.monoFont,
          }}
        >
          Space / \u2192 neste
        </div>
      )}
    </AbsoluteFill>
  );
};
