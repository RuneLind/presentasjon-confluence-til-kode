import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useStepNavigation } from "../hooks/useStepNavigation";

const learnings = [
  {
    title: "Dårlig kontekst ødelegger en god modell",
    desc: "Modellen er allerede smart nok. Men fyller du kontekstvinduet med støy, irrelevant innhold eller utdatert dokumentasjon, hjelper det ikke hvor god modellen er.",
    highlight: "Investér i konteksten, ikke bare modellen",
    color: theme.primary,
    icon: "🎯",
  },
  {
    title: "Kuratér før du indekserer",
    desc: "Rens, tagg og strukturér. Støy i indeksen = støy i svarene.",
    highlight: "35% av chunks eliminert ved opprydding",
    color: theme.accent,
    icon: "🧹",
  },
  {
    title: "MCP er en game-changer",
    desc: "Åpen standard som lar agenter bruke verktøy på en konsistent måte. Mer effektivt, mer presist, skalerer.",
    highlight: "La agenten hente det den trenger",
    color: theme.success,
    icon: "🔌",
  },
  {
    title: "Start med det som gir mest verdi",
    desc: "For oss: Confluence-dokumentasjon. For andre: Notion, interne wikier, kodesøk.",
    highlight: "Finn kunnskapskilden med størst effekt",
    color: theme.warning,
    icon: "🚀",
  },
];

export const KeyLearningsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const activeStep = useStepNavigation(learnings.length);

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
        padding: "60px 80px",
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
        Hva vi lærte
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          maxWidth: 1400,
          width: "100%",
        }}
      >
        {learnings.map((learning, i) => {
          const isVisible = activeStep >= i;
          const isActive = activeStep === i;

          return (
            <div
              key={i}
              style={{
                opacity: isVisible ? 1 : 0.12,
                transform: `scale(${isVisible ? 1 : 0.95})`,
                transition: "all 0.4s ease-out",
                background: isActive ? `${learning.color}12` : `${theme.text}05`,
                border: `2px solid ${isActive ? learning.color : isVisible ? `${learning.color}40` : `${theme.text}10`}`,
                borderRadius: 20,
                padding: "32px 36px",
                boxShadow: isActive ? `0 0 30px ${learning.color}15` : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <span style={{ fontSize: 32 }}>{learning.icon}</span>
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: isVisible ? learning.color : theme.textMuted,
                    transition: "color 0.3s ease-out",
                  }}
                >
                  {learning.title}
                </h3>
              </div>
              <p
                style={{
                  fontSize: 18,
                  color: theme.textMuted,
                  lineHeight: 1.5,
                  marginBottom: 16,
                }}
              >
                {learning.desc}
              </p>
              {isVisible && (
                <div
                  style={{
                    fontFamily: theme.monoFont,
                    fontSize: 15,
                    color: learning.color,
                    background: `${learning.color}15`,
                    padding: "8px 16px",
                    borderRadius: 10,
                    display: "inline-block",
                    opacity: isActive ? 1 : 0.7,
                    transition: "opacity 0.3s ease-out",
                  }}
                >
                  {learning.highlight}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation hint */}
      {activeStep < learnings.length - 1 && (
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
          Space / → neste lærdom
        </div>
      )}
    </AbsoluteFill>
  );
};
