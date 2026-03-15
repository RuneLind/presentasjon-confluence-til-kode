import { useState, useEffect } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

const learnings = [
  {
    title: "Kontekstkvalitet sl\u00E5r modellst\u00F8rrelse",
    desc: "Et godt kuratert kunnskapss\u00F8k med hybrid retrieval gir bedre resultater enn en st\u00F8rre modell med d\u00E5rligere kontekst.",
    highlight: "Invest\u00E9r i dataene, ikke bare i modellen",
    color: theme.primary,
    icon: "\uD83C\uDFAF",
  },
  {
    title: "Kurat\u00E9r f\u00F8r du indekserer",
    desc: "Rens, tagg og struktur\u00E9r. St\u00F8y i indeksen = st\u00F8y i svarene.",
    highlight: "35% av chunks eliminert ved opprydding",
    color: theme.accent,
    icon: "\uD83E\uDDF9",
  },
  {
    title: "MCP er en game-changer",
    desc: "\u00C5pen standard som lar agenter bruke verkt\u00F8y p\u00E5 en konsistent m\u00E5te. Mer effektivt, mer presist, skalerer.",
    highlight: "La agenten hente det den trenger",
    color: theme.success,
    icon: "\uD83D\uDD0C",
  },
  {
    title: "Start med det som gir mest verdi",
    desc: "For oss: Confluence-dokumentasjon. For andre: Notion, interne wikier, kodes\u00F8k.",
    highlight: "Finn kunnskapskilden med st\u00F8rst effekt",
    color: theme.warning,
    icon: "\uD83D\uDE80",
  },
];

export const KeyLearningsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowRight") {
        if (activeStep < learnings.length - 1) {
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
        N\u00F8kkell\u00E6rdommer
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
          Space / \u2192 neste l\u00E6rdom
        </div>
      )}
    </AbsoluteFill>
  );
};
