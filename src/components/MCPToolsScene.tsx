import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Library, Network, Code } from "lucide-react";
import { theme } from "../styles/theme";

const tools = [
  {
    name: "Kunnskapssøk",
    desc: "Kuraterte Confluence-dokumenter og Jira-saker via hybrid søkepipeline",
    example: "«Hva er reglene for årsavregning?»",
    Icon: Library,
    color: theme.primary,
    tags: ["Confluence", "Jira", "Hybrid søk"],
  },
  {
    name: "Kunnskapsgraf",
    desc: "Strukturerte relasjoner i domenet. Deterministiske svar, ingen hallusinasjon.",
    example: "«Hvilke SEDer tilhører LA_BUC_01?»",
    Icon: Network,
    color: theme.accent,
    tags: ["Regex", "Entiteter", "Deterministisk"],
  },
  {
    name: "Kodesøk",
    desc: "Kildekode i fire repoer via Serena MCP. Implementasjoner, tester, konfigurasjon.",
    example: "«Hvor er lovvalgshåndteringen implementert?»",
    Icon: Code,
    color: theme.success,
    tags: ["Serena", "4 repoer", "On-demand"],
  },
];

export const MCPToolsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
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
        Tre kunnskapskilder via MCP
      </h2>

      <p
        style={{
          opacity: subtitleOpacity,
          fontSize: 22,
          color: theme.textMuted,
          marginBottom: 50,
        }}
      >
        Agenten velger selv hvilket verktøy den bruker
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1300, width: "100%" }}>
        {tools.map((tool, i) => {
          const delay = 30 + i * 18;
          const cardOpacity = interpolate(frame - delay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const cardX = interpolate(frame - delay, [0, 15], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `translateX(${cardX}px)`,
                display: "flex",
                gap: 24,
                background: `${tool.color}08`,
                border: `1px solid ${tool.color}25`,
                borderRadius: 20,
                padding: "28px 36px",
                alignItems: "center",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: 44,
                  width: 70,
                  height: 70,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `${tool.color}15`,
                  borderRadius: 16,
                  flexShrink: 0,
                }}
              >
                <tool.Icon size={36} color={tool.color} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
                  <h3 style={{ fontSize: 26, fontWeight: 700, color: tool.color }}>
                    {tool.name}
                  </h3>
                  <div style={{ display: "flex", gap: 8 }}>
                    {tool.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        style={{
                          fontFamily: theme.monoFont,
                          fontSize: 12,
                          color: tool.color,
                          background: `${tool.color}15`,
                          padding: "3px 10px",
                          borderRadius: 6,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: 19, color: theme.textMuted, lineHeight: 1.4, marginBottom: 10 }}>
                  {tool.desc}
                </p>
                <div
                  style={{
                    fontFamily: theme.monoFont,
                    fontSize: 16,
                    color: `${tool.color}cc`,
                    fontStyle: "italic",
                  }}
                >
                  {tool.example}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
