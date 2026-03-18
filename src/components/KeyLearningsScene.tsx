import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Target, Filter, Plug, Rocket, BarChart3 } from "lucide-react";
import { theme } from "../styles/theme";
import { useStepNavigation } from "../hooks/useStepNavigation";

const learnings = [
  {
    title: "Dårlig kontekst ødelegger en god modell",
    desc: "Modellen er allerede smart nok. Men fyller du kontekstvinduet med støy, irrelevant innhold eller utdatert dokumentasjon, hjelper det ikke hvor god modellen er.",
    highlight: "Investér i konteksten, ikke bare modellen",
    color: theme.primary,
    Icon: Target,
  },
  {
    title: "Kuratér før du indekserer",
    desc: "Rens, tagg og strukturér. Støy i indeksen = støy i svarene.",
    highlight: "35% av chunks eliminert ved opprydding",
    color: theme.accent,
    Icon: Filter,
  },
  {
    title: "MCP fungerer — om verktøyene sparer kontekst",
    desc: "Mange MCP-verktøy dumper alt i konteksten. Vi løste det med brief-søk og verktøy-proxy — agenten henter bare det den trenger.",
    highlight: "Protokollen er god, designet av verktøyene avgjør",
    color: theme.success,
    Icon: Plug,
  },
  {
    title: "Domenekunnskap gjør kodeagenten nyttig",
    desc: "Vi så enorm forbedring da kodeagenten fikk tilgang til dokumentasjonen vår. Riktig kontekst er forskjellen mellom en agent som gjetter og en som leverer.",
    highlight: "Alt handler om å gi agenten nok og riktig kontekst",
    color: theme.warning,
    Icon: Rocket,
  },
  {
    title: "Mål søkekvaliteten, ikke bare bygg den",
    desc: "Uten benchmark vet du ikke om endringene hjelper. Reranking ga +14 % MRR selv om det ikke syntes i enklere tester. Vi oppdaget også at cross-encoder kollapser på engelske spørringer mot norsk innhold.",
    highlight: "Du trenger en feedback-loop, ikke bare en pipeline",
    color: theme.gold,
    Icon: BarChart3,
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
          marginBottom: 40,
        }}
      >
        Hva vi lærte
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
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
                transition: "all 0.4s ease-out",
                background: isActive ? `${learning.color}12` : `${theme.text}05`,
                border: `2px solid ${isActive ? learning.color : isVisible ? `${learning.color}40` : `${theme.text}10`}`,
                borderRadius: 20,
                padding: "24px 28px",
                boxShadow: isActive ? `0 0 30px ${learning.color}15` : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <learning.Icon size={32} color={isVisible ? learning.color : theme.textMuted} strokeWidth={1.5} />
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
