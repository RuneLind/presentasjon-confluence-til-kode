import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Scale, Globe, FileText, Database } from "lucide-react";
import { theme } from "../styles/theme";

const domainFacts = [
  {
    Icon: Scale,
    title: "EU-forordninger og lovvalg",
    desc: "Artikkel 11–16 i forordning 883/2004 styrer hvem som skal betale trygdeavgift hvor",
    color: theme.primary,
  },
  {
    Icon: Globe,
    title: "SED-utveksling med 30 land",
    desc: "Strukturerte dokumenter sendes mellom trygdemyndigheter via EESSI",
    color: theme.accent,
  },
  {
    Icon: FileText,
    title: "Hundrevis av Confluence-sider",
    desc: "Regelverk, rutiner, arkitektur, mappinger og testdokumentasjon",
    color: theme.success,
  },
  {
    Icon: Database,
    title: "11 kodebaser, ~500k linjer kode, 20+ integrasjoner",
    desc: "Backend, frontend, EESSI, trygdeavgift, fakturering, brev, mock, skjema, inngangsvilkår og E2E-tester",
    color: theme.warning,
  },
];

export const ContextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const insightOpacity = interpolate(frame, [100, 120], [0, 1], {
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
      <h2
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: 52,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 10,
        }}
      >
        Melosys — medlemskap og lovvalg i Nav
      </h2>

      <p
        style={{
          opacity: subtitleOpacity,
          fontSize: 24,
          color: theme.textMuted,
          marginBottom: 50,
          maxWidth: 900,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        Hvem skal være omfattet av norsk folketrygd når folk jobber på tvers av landegrenser?
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          maxWidth: 1300,
          width: "100%",
        }}
      >
        {domainFacts.map((fact, i) => {
          const delay = 30 + i * 12;
          const cardScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 120 },
          });
          const cardOpacity = interpolate(frame - delay, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `scale(${cardScale})`,
                background: `${fact.color}08`,
                border: `1px solid ${fact.color}25`,
                borderRadius: 16,
                padding: "24px 28px",
                display: "flex",
                alignItems: "flex-start",
                gap: 18,
              }}
            >
              <div
                style={{
                  background: `${fact.color}15`,
                  borderRadius: 12,
                  padding: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <fact.Icon size={28} color={fact.color} strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: fact.color, marginBottom: 6 }}>
                  {fact.title}
                </div>
                <div style={{ fontSize: 16, color: theme.textMuted, lineHeight: 1.4 }}>
                  {fact.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          opacity: insightOpacity,
          marginTop: 40,
          padding: "16px 36px",
          background: `${theme.gold}10`,
          border: `1px solid ${theme.gold}30`,
          borderRadius: 16,
          maxWidth: 900,
        }}
      >
        <p style={{ fontSize: 22, color: theme.gold, fontWeight: 500, textAlign: "center" }}>
          Komplekst domene og kompleks kode krever tett samarbeid mellom fag og utviklere. Skal agentene klare seg her må de ha god faglig forståelse.
        </p>
      </div>
    </AbsoluteFill>
  );
};
