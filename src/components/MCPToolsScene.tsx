import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Minimize2, Search, FileText, ArrowRight } from "lucide-react";
import { theme } from "../styles/theme";

export const MCPToolsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Left card: tool proxy
  const proxyOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const proxyY = interpolate(frame, [30, 50], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right card: brief pattern
  const briefOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const briefY = interpolate(frame, [50, 70], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom insight
  const insightOpacity = interpolate(frame, [90, 110], [0, 1], {
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
        Spar kontekst med smarte verktøy
      </h2>

      <p
        style={{
          opacity: subtitleOpacity,
          fontSize: 22,
          color: theme.textMuted,
          marginBottom: 50,
        }}
      >
        Kontekstvinduet er dyrebart — ikke fyll det med ting agenten ikke trenger
      </p>

      <div style={{ display: "flex", gap: 40, maxWidth: 1400, width: "100%" }}>
        {/* Left: Tool Proxy */}
        <div
          style={{
            flex: 1,
            opacity: proxyOpacity,
            transform: `translateY(${proxyY}px)`,
          }}
        >
          <div
            style={{
              background: `${theme.accent}08`,
              border: `1px solid ${theme.accent}25`,
              borderRadius: 20,
              padding: 36,
              height: "100%",
            }}
          >
            <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
              <Minimize2 size={36} color={theme.accent} strokeWidth={1.5} />
              <h3 style={{ fontSize: 26, fontWeight: 700, color: theme.accent }}>
                Verktøy-proxy
              </h3>
            </div>
            <p style={{ fontSize: 19, color: theme.textMuted, lineHeight: 1.6, marginBottom: 20 }}>
              6 kode-servere med 20+ verktøy hver. Agenten ser bare to:
            </p>

            {/* The two tools */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  background: `${theme.accent}12`,
                  border: `1px solid ${theme.accent}20`,
                  borderRadius: 12,
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <Search size={22} color={theme.accent} strokeWidth={2} />
                <div>
                  <div style={{ fontFamily: theme.monoFont, fontSize: 17, color: theme.text, fontWeight: 600 }}>
                    search_tools
                  </div>
                  <div style={{ fontSize: 15, color: theme.textMuted, marginTop: 2 }}>
                    Finn riktig verktøy med nøkkelord
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: `${theme.accent}12`,
                  border: `1px solid ${theme.accent}20`,
                  borderRadius: 12,
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <ArrowRight size={22} color={theme.accent} strokeWidth={2} />
                <div>
                  <div style={{ fontFamily: theme.monoFont, fontSize: 17, color: theme.text, fontWeight: 600 }}>
                    call_tool
                  </div>
                  <div style={{ fontSize: 15, color: theme.textMuted, marginTop: 2 }}>
                    Kjør verktøyet på riktig server
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                fontFamily: theme.monoFont,
                fontSize: 14,
                color: theme.accent,
                background: `${theme.accent}10`,
                padding: "8px 14px",
                borderRadius: 8,
                textAlign: "center",
              }}
            >
              2 verktøy i stedet for 120+
            </div>
          </div>
        </div>

        {/* Right: Brief pattern */}
        <div
          style={{
            flex: 1,
            opacity: briefOpacity,
            transform: `translateY(${briefY}px)`,
          }}
        >
          <div
            style={{
              background: `${theme.primary}08`,
              border: `1px solid ${theme.primary}25`,
              borderRadius: 20,
              padding: 36,
              height: "100%",
            }}
          >
            <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
              <FileText size={36} color={theme.primary} strokeWidth={1.5} />
              <h3 style={{ fontSize: 26, fontWeight: 700, color: theme.primary }}>
                Søk i to steg
              </h3>
            </div>
            <p style={{ fontSize: 19, color: theme.textMuted, lineHeight: 1.6, marginBottom: 20 }}>
              Ikke last inn alt på en gang. Hent oversikt først, detaljer etterpå.
            </p>

            {/* Step 1 */}
            <div
              style={{
                background: `${theme.primary}12`,
                border: `1px solid ${theme.primary}20`,
                borderRadius: 12,
                padding: "14px 20px",
                marginBottom: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span
                  style={{
                    fontFamily: theme.monoFont,
                    fontSize: 13,
                    color: theme.background,
                    background: theme.primary,
                    padding: "2px 8px",
                    borderRadius: 4,
                    fontWeight: 700,
                  }}
                >
                  1
                </span>
                <span style={{ fontFamily: theme.monoFont, fontSize: 17, color: theme.text, fontWeight: 600 }}>
                  search_knowledge(brief=true)
                </span>
              </div>
              <div style={{ fontSize: 15, color: theme.textMuted }}>
                Titler, URLer og korte utdrag
              </div>
            </div>

            {/* Step 2 */}
            <div
              style={{
                background: `${theme.primary}12`,
                border: `1px solid ${theme.primary}20`,
                borderRadius: 12,
                padding: "14px 20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span
                  style={{
                    fontFamily: theme.monoFont,
                    fontSize: 13,
                    color: theme.background,
                    background: theme.primary,
                    padding: "2px 8px",
                    borderRadius: 4,
                    fontWeight: 700,
                  }}
                >
                  2
                </span>
                <span style={{ fontFamily: theme.monoFont, fontSize: 17, color: theme.text, fontWeight: 600 }}>
                  get_document(doc_id)
                </span>
              </div>
              <div style={{ fontSize: 15, color: theme.textMuted }}>
                Fullt innhold bare for det som er relevant
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                fontFamily: theme.monoFont,
                fontSize: 14,
                color: theme.primary,
                background: `${theme.primary}10`,
                padding: "8px 14px",
                borderRadius: 8,
                textAlign: "center",
              }}
            >
              Størrelsesordener mindre kontekst per søk
            </div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div
        style={{
          opacity: insightOpacity,
          marginTop: 40,
          padding: "16px 36px",
          background: `${theme.gold}10`,
          border: `1px solid ${theme.gold}30`,
          borderRadius: 16,
        }}
      >
        <p style={{ fontSize: 22, color: theme.gold, fontWeight: 500, textAlign: "center" }}>
          Progressive disclosure gjelder for MCP også — oversikt først, detaljer på forespørsel
        </p>
      </div>
    </AbsoluteFill>
  );
};
