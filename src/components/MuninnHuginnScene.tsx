import { useState, useEffect } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

const dialogue = [
  {
    from: "muninn",
    text: "Søk etter «årsavregning» — trenger regler og unntak.",
  },
  {
    from: "huginn",
    text: "3 treff via hybrid søk. Beste: «Rutiner for årsavregning» (score 0.91).",
  },
  {
    from: "muninn",
    text: "Norsk søk funker. Men «Framework agreements» gir 0 treff — prøv på tvers av språk.",
  },
  {
    from: "huginn",
    text: "Byttet til multilingual-e5-base. «Rammeavtaler» ↔ «Framework agreements»: 0.83.",
  },
  {
    from: "muninn",
    text: "Mye støy i resultatene. Tomme chunks og metadata-rester.",
  },
  {
    from: "huginn",
    text: "Ryddet indeks — 35% av chunks fjernet. Kun kuratert innhold igjen.",
  },
];

export const MuninnHuginnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && !isExpanded) {
        e.preventDefault();
        e.stopPropagation();
        setExpanded(true);
      }
      if (e.key === "ArrowUp" && isExpanded) {
        e.preventDefault();
        e.stopPropagation();
        setExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isExpanded]);

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  // ─── EXPANDED VIEW: Chat dialogue ───
  if (isExpanded) {
    return (
      <AbsoluteFill style={{ background: theme.backgroundGradient, fontFamily: theme.fontFamily }}>
        <div
          style={{
            position: "absolute",
            top: "3%",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 42, fontWeight: 700, color: theme.text }}>
            To systemer som{" "}
            <span style={{ color: theme.primary }}>forbedrer søket sammen</span>
          </h2>
        </div>

        <div
          style={{
            position: "absolute",
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 36,
            width: 1400,
            height: "78%",
          }}
        >
          {/* Left: Agent cards */}
          <div
            style={{
              width: 230,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              paddingTop: 10,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                background: `${theme.accent}08`,
                border: `1px solid ${theme.accent}25`,
                borderRadius: 14,
                padding: "16px 14px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 4 }}>{"🦅"}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: theme.accent }}>Muninn</div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>
                AI-plattform — bruker søket via MCP
              </div>
            </div>

            <div
              style={{
                background: `${theme.primary}08`,
                border: `1px solid ${theme.primary}25`,
                borderRadius: 14,
                padding: "16px 14px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 4 }}>{"🦅"}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: theme.primary }}>Huginn</div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>
                Søkemotor — forbedrer basert på feedback
              </div>
            </div>

            <div
              style={{
                background: `${theme.text}05`,
                border: `1px solid ${theme.text}15`,
                borderRadius: 14,
                padding: "12px 14px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, fontFamily: theme.monoFont }}>
                MCP
              </div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>
                Koblingen mellom dem
              </div>
            </div>
          </div>

          {/* Right: Chat messages */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              overflow: "hidden",
            }}
          >
            {dialogue.map((msg, i) => {
              const isMuninn = msg.from === "muninn";
              const color = isMuninn ? theme.accent : theme.primary;

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: isMuninn ? "flex-start" : "flex-end",
                    animation: "fadeSlideIn 0.3s ease-out both",
                    animationDelay: `${i * 0.08}s`,
                  }}
                >
                  <div
                    style={{
                      maxWidth: 620,
                      background: `${color}08`,
                      border: `1px solid ${color}20`,
                      borderRadius: isMuninn ? "14px 14px 14px 3px" : "14px 14px 3px 14px",
                      padding: "12px 18px",
                    }}
                  >
                    <div style={{ fontSize: 12, color, fontWeight: 600, marginBottom: 4 }}>
                      {"🦅"} {isMuninn ? "Muninn" : "Huginn"}
                    </div>
                    <div style={{ fontSize: 17, color: theme.text, lineHeight: 1.4 }}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Result badge */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
                animation: "fadeSlideIn 0.4s ease-out both",
                animationDelay: "0.6s",
              }}
            >
              <div
                style={{
                  background: `${theme.success}10`,
                  border: `1px solid ${theme.success}30`,
                  borderRadius: 12,
                  padding: "12px 28px",
                }}
              >
                <span style={{ fontSize: 17, fontWeight: 600, color: theme.success }}>
                  Agenten designet søkepipelinen som gir best kontekst
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CSS animation + hint */}
        <style>{`
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
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
          ↑ Pil opp for oversikt
        </div>
      </AbsoluteFill>
    );
  }

  // ─── DEFAULT VIEW: Two raven cards ───
  const huginnDelay = 30;
  const huginnScale = spring({ frame: frame - huginnDelay, fps, config: { damping: 12, stiffness: 120 } });
  const huginnOpacity = interpolate(frame - huginnDelay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const muninnDelay = 50;
  const muninnScale = spring({ frame: frame - muninnDelay, fps, config: { damping: 12, stiffness: 120 } });
  const muninnOpacity = interpolate(frame - muninnDelay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const connOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const connWidth = interpolate(frame, [70, 100], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const osBadgeOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const floatY = Math.sin(frame * 0.03) * 5;

  const hintBounce = Math.sin(frame * 0.1) * 3;

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
      <p
        style={{
          opacity: titleOpacity,
          fontSize: 18,
          color: theme.textMuted,
          fontFamily: theme.monoFont,
          marginBottom: 10,
        }}
      >
        Odins to ravner fra norrøn mytologi
      </p>

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
        Muninn & Huginn
      </h2>

      <div
        style={{
          display: "flex",
          gap: 80,
          alignItems: "center",
          maxWidth: 1400,
          width: "100%",
        }}
      >
        {/* Huginn */}
        <div
          style={{
            flex: 1,
            opacity: huginnOpacity,
            transform: `scale(${huginnScale}) translateY(${floatY}px)`,
            background: `${theme.primary}08`,
            border: `2px solid ${theme.primary}40`,
            borderRadius: 24,
            padding: 40,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>{"🦅"}</div>
          <h3 style={{ fontSize: 32, fontWeight: 700, color: theme.primary, marginBottom: 8 }}>
            Huginn
          </h3>
          <p style={{ fontSize: 18, color: theme.gold, fontStyle: "italic", marginBottom: 20 }}>
            «Tanke»
          </p>
          <p style={{ fontSize: 20, color: theme.textMuted, lineHeight: 1.5, marginBottom: 24 }}>
            Søkemotoren som indekserer og søker i dokumenter
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            {["Indeksering", "Hybrid søk", "Reranking", "Embeddings"].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: theme.monoFont,
                  fontSize: 15,
                  color: theme.primary,
                  background: `${theme.primary}15`,
                  padding: "5px 16px",
                  borderRadius: 8,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Connection */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: connOpacity,
          }}
        >
          <div
            style={{
              width: connWidth,
              height: 3,
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
              borderRadius: 2,
            }}
          />
          <span
            style={{
              fontFamily: theme.monoFont,
              fontSize: 16,
              color: theme.textMuted,
              background: `${theme.text}08`,
              padding: "6px 16px",
              borderRadius: 8,
            }}
          >
            MCP
          </span>
          <div
            style={{
              width: connWidth,
              height: 3,
              background: `linear-gradient(90deg, ${theme.accent}, ${theme.primary})`,
              borderRadius: 2,
            }}
          />
        </div>

        {/* Muninn */}
        <div
          style={{
            flex: 1,
            opacity: muninnOpacity,
            transform: `scale(${muninnScale}) translateY(${-floatY}px)`,
            background: `${theme.accent}08`,
            border: `2px solid ${theme.accent}40`,
            borderRadius: 24,
            padding: 40,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>{"🦅"}</div>
          <h3 style={{ fontSize: 32, fontWeight: 700, color: theme.accent, marginBottom: 8 }}>
            Muninn
          </h3>
          <p style={{ fontSize: 18, color: theme.gold, fontStyle: "italic", marginBottom: 20 }}>
            «Hukommelse»
          </p>
          <p style={{ fontSize: 20, color: theme.textMuted, lineHeight: 1.5, marginBottom: 24 }}>
            AI-plattformen som håndterer samtaler, persona og MCP
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            {["Persona", "Hukommelse", "Samtaler", "MCP-kobling"].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: theme.monoFont,
                  fontSize: 15,
                  color: theme.accent,
                  background: `${theme.accent}15`,
                  padding: "5px 16px",
                  borderRadius: 8,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Open source */}
      <div
        style={{
          opacity: osBadgeOpacity,
          marginTop: 40,
          fontFamily: theme.monoFont,
          fontSize: 16,
          color: theme.success,
          background: `${theme.success}15`,
          padding: "8px 24px",
          borderRadius: 20,
          border: `1px solid ${theme.success}30`,
        }}
      >
        Begge prosjektene er open source
      </div>

      {/* Hint to expand */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: `translateX(-50%) translateY(${hintBounce}px)`,
          color: theme.textMuted,
          fontSize: 15,
          fontFamily: theme.monoFont,
          opacity: osBadgeOpacity,
        }}
      >
        ↓ Pil ned for dialog
      </div>
    </AbsoluteFill>
  );
};
