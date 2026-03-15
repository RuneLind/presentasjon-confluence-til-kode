import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Globe, Brain, MessageSquare, Rocket, ChevronRight } from "lucide-react";
import { theme } from "../styles/theme";
import { useStepNavigation } from "../hooks/useStepNavigation";

const phases = [
  {
    num: "1",
    title: "Fang oppgaven",
    desc: "Chrome-extension leser Jira-siden direkte fra nettleseren. Ingen API-nøkler.",
    Icon: Globe,
    color: theme.primary,
    detail: "DOM → Markdown → Muninn",
  },
  {
    num: "2",
    title: "Analysér med AI",
    desc: "Agenten søker automatisk i tre kunnskapskilder via MCP-verktøy.",
    Icon: Brain,
    color: theme.accent,
    detail: "Dokumentasjon + Graf + Kode",
  },
  {
    num: "3",
    title: "Innsikt i chatten",
    desc: "Sanntidsanalyse med oppfølgingsspørsmål. Se hvilke søk som gjøres.",
    Icon: MessageSquare,
    color: theme.success,
    detail: "Streaming + samtalehistorikk",
  },
  {
    num: "4",
    title: "Fra innsikt til handling",
    desc: "Samtalen destilleres til et arbeidsdokument for kode-agenten.",
    Icon: Rocket,
    color: theme.warning,
    detail: "Kontekst → Implementering",
  },
];

export const ArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const activeStep = useStepNavigation(phases.length);

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

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
          marginBottom: 60,
        }}
      >
        Arkitekturen: fire faser
      </h2>

      <div style={{ display: "flex", gap: 24, maxWidth: 1600, width: "100%" }}>
        {phases.map((phase, i) => {
          const isVisible = activeStep >= i;
          const isActive = activeStep === i;

          return (
            <div key={i} style={{ flex: 1, position: "relative" }}>
              {/* Connection arrow */}
              {i > 0 && (
                <div
                  style={{
                    position: "absolute",
                    left: -16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 24,
                    color: isVisible ? `${phase.color}80` : `${theme.text}15`,
                    transition: "color 0.3s ease-out",
                  }}
                >
                  <ChevronRight size={20} />
                </div>
              )}

              <div
                style={{
                  opacity: isVisible ? 1 : 0.15,
                  transform: `scale(${isVisible ? 1 : 0.95})`,
                  transition: "all 0.4s ease-out",
                  background: isActive ? `${phase.color}12` : `${theme.text}05`,
                  border: `2px solid ${isActive ? phase.color : isVisible ? `${phase.color}40` : `${theme.text}10`}`,
                  borderRadius: 20,
                  padding: "36px 28px",
                  textAlign: "center",
                  boxShadow: isActive ? `0 0 30px ${phase.color}20` : "none",
                }}
              >
                <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
                  <phase.Icon size={40} color={phase.color} strokeWidth={1.5} />
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: phase.color,
                    fontFamily: theme.monoFont,
                    marginBottom: 8,
                  }}
                >
                  FASE {phase.num}
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 12 }}>
                  {phase.title}
                </h3>
                <p style={{ fontSize: 17, color: theme.textMuted, lineHeight: 1.5, marginBottom: 16 }}>
                  {phase.desc}
                </p>

                {/* Detail badge */}
                {isVisible && (
                  <div
                    style={{
                      fontFamily: theme.monoFont,
                      fontSize: 14,
                      color: phase.color,
                      background: `${phase.color}15`,
                      padding: "6px 14px",
                      borderRadius: 8,
                      display: "inline-block",
                      opacity: isActive ? 1 : 0.6,
                      transition: "opacity 0.3s ease-out",
                    }}
                  >
                    {phase.detail}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation hint */}
      {activeStep < phases.length - 1 && (
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
          Space / → neste fase
        </div>
      )}
    </AbsoluteFill>
  );
};
