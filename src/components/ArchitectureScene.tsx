import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Globe, Brain, MessageSquare, Rocket, ChevronRight, FileText, Search, Network, Code } from "lucide-react";
import { theme } from "../styles/theme";
import { useStepNavigation } from "../hooks/useStepNavigation";

const phases = [
  {
    num: "1",
    title: "Hent oppgaven",
    desc: "Chrome-extension leser Jira-siden direkte fra nettleseren",
    Icon: Globe,
    color: theme.primary,
  },
  {
    num: "2",
    title: "Analysér med AI",
    desc: "Agenten søker i tre kunnskapskilder via MCP",
    Icon: Brain,
    color: theme.accent,
  },
  {
    num: "3",
    title: "Innsikt i chatten",
    desc: "Sanntidsanalyse med synlige verktøykall",
    Icon: MessageSquare,
    color: theme.success,
  },
  {
    num: "4",
    title: "Fra innsikt til handling",
    desc: "Samtalen destilleres til et arbeidsdokument",
    Icon: Rocket,
    color: theme.warning,
  },
];

/* ── Detail panel for each phase ── */

const Phase1Detail: React.FC = () => (
  <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
    {/* Left: Jira page with extension popup overlay */}
    <div
      style={{
        flex: 1,
        position: "relative",
        animation: "detailFadeIn 0.3s ease-out both",
      }}
    >
      {/* Simplified Jira page background */}
      <div
        style={{
          background: "#1a1a2e",
          border: `1px solid ${theme.text}15`,
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {/* Browser chrome bar */}
        <div
          style={{
            background: "#252540",
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: `1px solid ${theme.text}10`,
          }}
        >
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
          </div>
          <div
            style={{
              fontFamily: theme.monoFont,
              fontSize: 11,
              color: theme.textMuted,
              background: `${theme.text}08`,
              padding: "3px 10px",
              borderRadius: 4,
              flex: 1,
            }}
          >
            jira.adeo.no/browse/MELOSYS-7588
          </div>
          {/* Extension icon */}
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: theme.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "#fff",
              fontWeight: 700,
            }}
          >
            M
          </div>
        </div>

        {/* Jira page content (dimmed) */}
        <div style={{ padding: "16px 20px", opacity: 0.5 }}>
          <div style={{ fontSize: 13, color: theme.primary, marginBottom: 4 }}>Melosys / MELOSYS-7588</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 8 }}>
            Utvid datamodell for trygdeavgiftsperioder
          </div>
          <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 12 }}>
            Utvikle og teste · Deloppgave · Rune Lind
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: theme.textMuted }}>
            <span>Type: Deloppgave</span>
            <span>Prioritet: Ingen</span>
            <span>Løsning: Uløst</span>
          </div>
        </div>

        {/* Extension popup overlay */}
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 16,
            width: 280,
            background: "#1e1e36",
            borderRadius: 12,
            padding: "18px 20px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            animation: "detailFadeIn 0.4s ease-out 0.15s both",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: theme.primary, marginBottom: 12 }}>
            Send til analyse
          </div>
          <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: theme.monoFont, marginBottom: 4 }}>
            MELOSYS-7588
          </div>
          <div style={{ fontSize: 13, color: theme.text, fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>
            Utvid datamodell for trygdeavgiftsperioder
          </div>

          {/* Dropdowns */}
          {[
            { label: "Bruker:", value: "Rune (rune-tester-1)" },
            { label: "Modell:", value: "copilot-sdk opus-4-6" },
          ].map((field, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: theme.textMuted, minWidth: 48 }}>{field.label}</span>
              <div
                style={{
                  flex: 1,
                  background: `${theme.text}08`,
                  border: `1px solid ${theme.text}15`,
                  borderRadius: 6,
                  padding: "5px 10px",
                  fontSize: 12,
                  color: theme.text,
                }}
              >
                {field.value}
              </div>
            </div>
          ))}

          <div
            style={{
              background: theme.primary,
              color: theme.background,
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Send til analyse
          </div>
        </div>
      </div>
    </div>

    {/* Arrow */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        flexShrink: 0,
        animation: "detailFadeIn 0.3s ease-out 0.25s both",
      }}
    >
      <div style={{ fontFamily: theme.monoFont, fontSize: 12, color: theme.textMuted }}>DOM → Markdown</div>
      <div style={{ fontSize: 28, color: theme.primary }}>→</div>
      <div style={{ fontFamily: theme.monoFont, fontSize: 12, color: theme.textMuted }}>Ingen API-nøkler</div>
    </div>

    {/* Markdown output */}
    <div
      style={{
        flex: 1,
        background: `${theme.text}05`,
        border: `1px solid ${theme.text}15`,
        borderRadius: 14,
        padding: "20px 24px",
        fontFamily: theme.monoFont,
        fontSize: 13,
        color: theme.textMuted,
        lineHeight: 1.7,
        whiteSpace: "pre",
        animation: "detailFadeIn 0.3s ease-out 0.35s both",
      }}
    >
      {`# MELOSYS-7588
Status: Under utvikling
Type: Deloppgave | Assignee: Rune

## Beskrivelse
Utvid datamodell for trygdeavgifts-
perioder til å støtte flere…

## Kommentarer
### Per (15. jan)
Sjekk også edge caset med…`}
    </div>
  </div>
);

const Phase2Detail: React.FC = () => {
  const tools = [
    {
      Icon: Search,
      name: "Kunnskapssøk",
      query: "«årsavregning regler unntak»",
      result: "3 treff — beste: Rutiner for årsavregning (0.91)",
      color: theme.primary,
    },
    {
      Icon: Network,
      name: "Kunnskapsgraf",
      query: "«LA_BUC_01»",
      result: "Direkte svar: 4 SEDer tilhører denne BUCen",
      color: theme.accent,
    },
    {
      Icon: Code,
      name: "Kodesøk",
      query: "«lovvalgshåndtering implementasjon»",
      result: "LovvalgService.kt linje 42–89 i melosys-api",
      color: theme.success,
    },
  ];

  return (
    <div style={{ display: "flex", gap: 16 }}>
      {tools.map((tool, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: `${tool.color}08`,
            border: `1px solid ${tool.color}20`,
            borderRadius: 14,
            padding: "18px 20px",
            animation: `detailFadeIn 0.3s ease-out ${0.1 + i * 0.12}s both`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <tool.Icon size={20} color={tool.color} strokeWidth={1.5} />
            <span style={{ fontSize: 16, fontWeight: 700, color: tool.color }}>{tool.name}</span>
          </div>
          <div
            style={{
              fontFamily: theme.monoFont,
              fontSize: 13,
              color: theme.text,
              background: `${tool.color}10`,
              padding: "8px 12px",
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            {tool.query}
          </div>
          <div style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.4 }}>{tool.result}</div>
        </div>
      ))}
    </div>
  );
};

const Phase3Detail: React.FC = () => {
  const messages = [
    { from: "agent", text: "Søker i kunnskapsbasen etter «årsavregning»…", tool: "search_knowledge" },
    { from: "system", text: "3 treff — viser beste resultat (brief=true)", tool: null },
    { from: "agent", text: "Henter fullt dokument: Rutiner for årsavregning", tool: "get_document" },
    { from: "user", text: "Sjekk også om det finnes relevante tester", tool: null },
    { from: "agent", text: "Søker i kode: «årsavregning test»", tool: "call_tool → search" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: `${theme.text}03`,
        border: `1px solid ${theme.text}10`,
        borderRadius: 14,
        padding: "16px 20px",
      }}
    >
      {messages.map((msg, i) => {
        const isUser = msg.from === "user";
        const isSystem = msg.from === "system";
        const color = isUser ? theme.gold : isSystem ? theme.success : theme.accent;

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 14px",
              background: isUser ? `${color}08` : "transparent",
              borderRadius: 10,
              animation: `detailFadeIn 0.25s ease-out ${0.05 + i * 0.08}s both`,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color, minWidth: 50, fontFamily: theme.monoFont }}>
              {isUser ? "Du" : isSystem ? "→" : "Agent"}
            </span>
            <span style={{ fontSize: 15, color: theme.textMuted, flex: 1 }}>{msg.text}</span>
            {msg.tool && (
              <span
                style={{
                  fontFamily: theme.monoFont,
                  fontSize: 12,
                  color: theme.accent,
                  background: `${theme.accent}15`,
                  padding: "3px 10px",
                  borderRadius: 6,
                  flexShrink: 0,
                }}
              >
                {msg.tool}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

const Phase4Detail: React.FC = () => (
  <div style={{ display: "flex", gap: 24, alignItems: "stretch" }}>
    {/* Work document */}
    <div
      style={{
        flex: 2,
        background: `${theme.text}05`,
        border: `1px solid ${theme.text}15`,
        borderRadius: 14,
        padding: "20px 24px",
        fontFamily: theme.monoFont,
        fontSize: 13,
        color: theme.textMuted,
        lineHeight: 1.7,
        whiteSpace: "pre",
        animation: "detailFadeIn 0.3s ease-out 0.1s both",
      }}
    >
      {`# MELOSYS-7921: Fiks årsavregning

## Oppgave
Bug i årsavregning ved statusendring…

## Forskningsfunn
Rutiner for årsavregning (Confluence)
Artikkel 13 — forordning 883/2004

## Kodeanalyse
AarsavregningService.kt:166–201  ⭐⭐
AarsavregningController.kt:42   ⭐
3 eksisterende tester funnet

## Åpne spørsmål
Er NPE-en en backend-feil?`}
    </div>

    {/* Arrow + explanation */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        flexShrink: 0,
        animation: "detailFadeIn 0.3s ease-out 0.25s both",
      }}
    >
      <FileText size={28} color={theme.warning} strokeWidth={1.5} />
      <div style={{ fontSize: 28, color: theme.warning }}>→</div>
      <div style={{ fontFamily: theme.monoFont, fontSize: 13, color: theme.textMuted, textAlign: "center" }}>
        Klar for
        <br />
        kodeagenten
      </div>
    </div>

    {/* Code agent */}
    <div
      style={{
        flex: 1,
        background: `${theme.warning}08`,
        border: `1px solid ${theme.warning}20`,
        borderRadius: 14,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 14,
        animation: "detailFadeIn 0.3s ease-out 0.35s both",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: theme.warning }}>Claude Code</div>
      <div style={{ fontSize: 15, color: theme.textMuted, lineHeight: 1.5 }}>
        Starter implementering med komplett kontekst — domene, kode og åpne spørsmål samlet i ett dokument.
      </div>
      <div
        style={{
          fontFamily: theme.monoFont,
          fontSize: 13,
          color: theme.warning,
          background: `${theme.warning}10`,
          padding: "8px 12px",
          borderRadius: 8,
        }}
      >
        Ingen re-lesing av Jira
      </div>
    </div>
  </div>
);

const detailComponents = [Phase1Detail, Phase2Detail, Phase3Detail, Phase4Detail];

/* ── Main scene ── */

export const ArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const activeStep = useStepNavigation(phases.length);

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  const ActiveDetail = activeStep >= 0 ? detailComponents[activeStep] : null;

  return (
    <AbsoluteFill
      style={{
        background: theme.backgroundGradient,
        fontFamily: theme.fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px 80px",
      }}
    >
      <h2
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: 48,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 36,
        }}
      >
        Arbeidsflyten i fire steg
      </h2>

      {/* Compact phase cards */}
      <div style={{ display: "flex", gap: 16, maxWidth: 1500, width: "100%", marginBottom: 30 }}>
        {phases.map((phase, i) => {
          const isVisible = activeStep >= i;
          const isActive = activeStep === i;

          return (
            <div key={i} style={{ flex: 1, position: "relative" }}>
              {i > 0 && (
                <div
                  style={{
                    position: "absolute",
                    left: -12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: isVisible ? `${phase.color}80` : `${theme.text}15`,
                    transition: "color 0.3s ease-out",
                  }}
                >
                  <ChevronRight size={18} />
                </div>
              )}

              <div
                style={{
                  opacity: isVisible ? 1 : 0.15,
                  transform: `scale(${isVisible ? 1 : 0.97})`,
                  transition: "all 0.4s ease-out",
                  background: isActive ? `${phase.color}12` : `${theme.text}05`,
                  border: `2px solid ${isActive ? phase.color : isVisible ? `${phase.color}40` : `${theme.text}10`}`,
                  borderRadius: 16,
                  padding: "20px 18px",
                  textAlign: "center",
                  boxShadow: isActive ? `0 0 25px ${phase.color}20` : "none",
                  cursor: "default",
                }}
              >
                <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>
                  <phase.Icon size={30} color={phase.color} strokeWidth={1.5} />
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: phase.color,
                    fontFamily: theme.monoFont,
                    marginBottom: 6,
                  }}
                >
                  STEG {phase.num}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 6 }}>
                  {phase.title}
                </h3>
                <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.4 }}>{phase.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {ActiveDetail && (
        <div
          style={{
            maxWidth: 1500,
            width: "100%",
            flex: 1,
            animation: "detailFadeIn 0.35s ease-out",
          }}
        >
          <ActiveDetail />
        </div>
      )}

      {/* CSS animation */}
      <style>{`
        @keyframes detailFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Navigation hint */}
      {activeStep < phases.length - 1 && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            color: theme.textMuted,
            fontSize: 15,
            fontFamily: theme.monoFont,
          }}
        >
          Space / → neste steg
        </div>
      )}
    </AbsoluteFill>
  );
};
