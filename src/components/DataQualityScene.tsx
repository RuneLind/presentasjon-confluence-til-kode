import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Download, Eraser, Scissors, Tag, Database, Bird, ChevronRight } from "lucide-react";
import { theme } from "../styles/theme";
import { useStepNavigation } from "../hooks/useStepNavigation";

const pipelineSteps = [
  { Icon: Download, title: "Hent", desc: "Confluence, Notion, Jira", color: theme.primary },
  { Icon: Eraser, title: "Rens", desc: "Fjern støy og irrelevant innhold", color: theme.secondary },
  { Icon: Scissors, title: "Chunk", desc: "Del opp etter overskrifter", color: theme.accent },
  { Icon: Tag, title: "Tagg", desc: "Auto-klassifisering med taksonomi", color: theme.success },
  { Icon: Database, title: "Indekser", desc: "Flerspråklige embeddings, lokalt", color: theme.warning },
];

/* ── Detail panels ── */

const HentDetail: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", gap: 20 }}>
    {[
      {
        name: "Confluence",
        detail: "Playwright for SSO-pålogging, lagrer cookies, deretter REST API direkte. HTML konverteres til markdown med BeautifulSoup.",
        tech: "SSO → REST API → Markdown · ~300 sider",
        color: "#2684FF",
      },
      {
        name: "Jira",
        detail: "Samme SSO-tilnærming. Henter issues med beskrivelse, kommentarer og epic-kobling. PII redakteres automatisk.",
        tech: "~2 100 issues indeksert",
        color: "#0052CC",
      },
      {
        name: "Notion",
        detail: "Notion API med token-autentisering. Inkrementelle oppdateringer, trestruktur bevart.",
        tech: "~8 300 dokumenter",
        color: "#999",
      },
    ].map((src, i) => (
      <div
        key={i}
        style={{
          flex: 1,
          background: `${src.color}10`,
          border: `1px solid ${src.color}30`,
          borderRadius: 14,
          padding: "18px 20px",
          animation: `pipelineFadeIn 0.6s ease-out ${0.5 + i * 0.2}s both`,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700, color: src.color, marginBottom: 8 }}>{src.name}</div>
        <div style={{ fontSize: 16, color: theme.textMuted, lineHeight: 1.5, marginBottom: 10 }}>{src.detail}</div>
        <div
          style={{
            fontFamily: theme.monoFont,
            fontSize: 14,
            color: theme.textMuted,
            background: `${theme.text}08`,
            padding: "5px 10px",
            borderRadius: 6,
          }}
        >
          {src.tech}
        </div>
      </div>
    ))}
    </div>
    <div
      style={{
        padding: "12px 20px",
        background: `${theme.gold}10`,
        border: `1px solid ${theme.gold}25`,
        borderRadius: 10,
        animation: "pipelineFadeIn 0.6s ease-out 1.1s both",
      }}
    >
      <p style={{ fontSize: 16, color: theme.gold, fontWeight: 500 }}>
        Sidehierarki fra Confluence-ancestors bevares som breadcrumb i hvert dokument. Denne konteksten gjør at søk kan skille mellom like seksjoner fra ulike deler av wikien.
      </p>
    </div>
  </div>
);

const RensDetail: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", gap: 20 }}>
    <div
      style={{
        flex: 1,
        background: `${theme.secondary}08`,
        border: `1px solid ${theme.secondary}20`,
        borderRadius: 14,
        padding: "18px 20px",
        animation: "pipelineFadeIn 0.6s ease-out 0.5s both",
      }}
    >
      <div style={{ fontSize: 16, color: theme.textMuted, marginBottom: 8 }}>
        Chunks = tekstseksjonene dokumentene deles opp i for søk
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: theme.secondary, marginBottom: 10 }}>
        22 325 → 14 481 chunks (−35 %)
      </div>
      {[
        { label: "Tomme chunks (kun breadcrumb-sti)", count: "8 223 fjernet" },
        { label: "For korte chunks (under 100 tegn)", count: "3 832 fjernet" },
        { label: "Bilder og interne URLer", count: "~500 fjernet" },
      ].map((row, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 0",
            borderBottom: i < 2 ? `1px solid ${theme.text}08` : "none",
            fontSize: 15,
            animation: `pipelineFadeIn 0.5s ease-out ${0.6 + i * 0.1}s both`,
          }}
        >
          <span style={{ color: theme.textMuted }}>{row.label}</span>
          <span style={{ fontFamily: theme.monoFont, color: theme.secondary }}>{row.count}</span>
        </div>
      ))}
    </div>

    <div
      style={{
        flex: 1,
        background: `${theme.text}05`,
        border: `1px solid ${theme.text}15`,
        borderRadius: 14,
        padding: "18px 20px",
        animation: "pipelineFadeIn 0.6s ease-out 0.7s both",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 10 }}>Mye arbeid i markdown-kvalitet</div>
      {[
        "Confluence-HTML → ren markdown tok mange iterasjoner",
        "Møtereferater og arkivert innhold filtrert bort",
        "Kodeblokker fjernet — Mermaid/ER ga falske treff",
        "Confluence-layout og makroer strippes",
        "Dårlig input → dårlige søkeresultater uansett modell",
      ].map((item, i) => (
        <div
          key={i}
          style={{
            fontSize: 15,
            color: theme.textMuted,
            lineHeight: 1.5,
            marginBottom: 6,
            paddingLeft: 12,
            borderLeft: `2px solid ${theme.secondary}30`,
            animation: `pipelineFadeIn 0.5s ease-out ${0.8 + i * 0.08}s both`,
          }}
        >
          {item}
        </div>
      ))}
    </div>
    </div>
    <div
      style={{
        padding: "12px 20px",
        background: `${theme.gold}10`,
        border: `1px solid ${theme.gold}25`,
        borderRadius: 10,
        animation: "pipelineFadeIn 0.6s ease-out 1.2s both",
      }}
    >
      <p style={{ fontSize: 16, color: theme.gold, fontWeight: 500 }}>
        En LLM skiller ikke mellom støy og fakta — den leser alt som sannhet. Når en tredjedel av søkeresultatene er støy, hjelper det ikke å skrive bedre prompts. Kvaliteten settes av det svakeste leddet i pipelinen, og det er nesten alltid dataen.
      </p>
    </div>
  </div>
);

const ChunkDetail: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", gap: 20 }}>
    <div
      style={{
        flex: 1,
        background: `${theme.secondary}08`,
        border: `1px solid ${theme.secondary}20`,
        borderRadius: 14,
        padding: "18px 20px",
        animation: "pipelineFadeIn 0.6s ease-out 0.5s both",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: theme.secondary, marginBottom: 8 }}>Før: vilkårlig oppdeling</div>
      <div
        style={{
          fontFamily: theme.monoFont,
          fontSize: 14,
          color: theme.textMuted,
          background: `${theme.text}08`,
          padding: "12px 14px",
          borderRadius: 8,
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
        }}
      >
        {`...ompetanse\\n\\nViktige arkitektur
dokumenter:\\n\\n- Saksgang - fra
journalfø...`}
      </div>
      <div style={{ fontSize: 14, color: theme.textMuted, marginTop: 8, fontStyle: "italic" }}>
        Kutter midt i setninger og avsnitt
      </div>
    </div>

    <div
      style={{
        flex: 1,
        background: `${theme.success}08`,
        border: `1px solid ${theme.success}20`,
        borderRadius: 14,
        padding: "18px 20px",
        animation: "pipelineFadeIn 0.6s ease-out 0.7s both",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: theme.success, marginBottom: 8 }}>Nå: overskriftsbasert</div>
      <div
        style={{
          fontFamily: theme.monoFont,
          fontSize: 14,
          color: theme.textMuted,
          background: `${theme.text}08`,
          padding: "12px 14px",
          borderRadius: 8,
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
        }}
      >
        {`[Team MELOSYS > Arkitektur]
## Viktige arkitekturdokumenter
Saksgang - fra journalføring
til vedtak...`}
      </div>
      <div style={{ fontSize: 14, color: theme.textMuted, marginTop: 8, fontStyle: "italic" }}>
        Logiske seksjoner med kontekst. 73 % heading-basert.
      </div>
    </div>

    <div
      style={{
        width: 220,
        background: `${theme.accent}08`,
        border: `1px solid ${theme.accent}20`,
        borderRadius: 14,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        animation: "pipelineFadeIn 0.6s ease-out 0.9s both",
      }}
    >
      <div style={{ fontFamily: theme.monoFont, fontSize: 15, color: theme.accent, marginBottom: 6 }}>Algoritme</div>
      <div style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6 }}>
        1. Splitt ved H1–H3 (H4+ beholdes)
        <br />
        2. &gt; 1000 tegn → RecursiveCharacterTextSplitter
        <br />
        3. Ingen overskrifter → fallback
      </div>
    </div>
    </div>
    <div
      style={{
        padding: "12px 20px",
        background: `${theme.gold}10`,
        border: `1px solid ${theme.gold}25`,
        borderRadius: 10,
        animation: "pipelineFadeIn 0.6s ease-out 1.1s both",
      }}
    >
      <p style={{ fontSize: 16, color: theme.gold, fontWeight: 500 }}>
        Hver chunk blir én vektor — ett punkt i et flerdimensjonalt rom. En chunk som blander arkitektur og kompetanse havner midt mellom begge temaene og matcher dårlig på begge. Breadcrumb-prefikset gir kontekst om hvor innholdet hører hjemme.
      </p>
    </div>
  </div>
);

const TaggDetail: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", gap: 20 }}>
    <div
      style={{
        flex: 1,
        background: `${theme.success}08`,
        border: `1px solid ${theme.success}20`,
        borderRadius: 14,
        padding: "18px 20px",
        animation: "pipelineFadeIn 0.6s ease-out 0.5s both",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: theme.success, marginBottom: 10 }}>Taksonomi-basert tagging</div>
      <div style={{ fontSize: 15, color: theme.textMuted, lineHeight: 1.5, marginBottom: 12 }}>
        15 parallelle Claude Haiku-agenter tagger ~300 filer på 2–3 minutter. Hver fil får 1–5 tags fra en fast taksonomi (59 tags i tre kategorier).
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["lovvalg", "medlemskap", "trygdeavgift", "eessi", "arkitektur", "kafka", "database", "api", "rutiner", "onboarding"].map(
          (tag, i) => (
            <span
              key={i}
              style={{
                fontFamily: theme.monoFont,
                fontSize: 11,
                color: theme.success,
                background: `${theme.success}15`,
                padding: "3px 10px",
                borderRadius: 6,
                animation: `pipelineFadeIn 0.4s ease-out ${0.7 + i * 0.06}s both`,
              }}
            >
              {tag}
            </span>
          )
        )}
      </div>
    </div>

    <div
      style={{
        flex: 1,
        background: `${theme.text}05`,
        border: `1px solid ${theme.text}15`,
        borderRadius: 14,
        padding: "18px 20px",
        animation: "pipelineFadeIn 0.6s ease-out 0.7s both",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 10 }}>To-stegs prosess</div>
      {[
        { step: "1. Oppdagelse", desc: "Fri tagging på et utvalg for å finne naturlige emner" },
        { step: "2. Klassifisering", desc: "Agentene velger fra fast taksonomi — ingen frie tags" },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            marginBottom: 12,
            animation: `pipelineFadeIn 0.5s ease-out ${0.8 + i * 0.15}s both`,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 600, color: theme.success }}>{item.step}</div>
          <div style={{ fontSize: 15, color: theme.textMuted, lineHeight: 1.5 }}>{item.desc}</div>
        </div>
      ))}
      <div
        style={{
          fontFamily: theme.monoFont,
          fontSize: 14,
          color: theme.textMuted,
          background: `${theme.text}08`,
          padding: "8px 12px",
          borderRadius: 8,
          animation: "pipelineFadeIn 0.5s ease-out 1.1s both",
        }}
      >
        ?tags=lovvalg,eessi → filtrert søk via API
      </div>
    </div>
    </div>
    <div
      style={{
        padding: "12px 20px",
        background: `${theme.gold}10`,
        border: `1px solid ${theme.gold}25`,
        borderRadius: 10,
        animation: "pipelineFadeIn 0.6s ease-out 1.3s both",
      }}
    >
      <p style={{ fontSize: 16, color: theme.gold, fontWeight: 500 }}>
        Tags prepended til chunk-teksten før embedding, slik at selve vektoren «vet» hva innholdet handler om. I tillegg kan agenten filtrere søkerommet ned fra 289 til 35 dokumenter med tags — et spørsmål om lovvalg trenger ikke konkurrere med onboarding-guider om plass i resultatene.
      </p>
    </div>
  </div>
);

const IndekserDetail: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", gap: 20 }}>
    <div
      style={{
        flex: 1,
        background: `${theme.warning}08`,
        border: `1px solid ${theme.warning}20`,
        borderRadius: 14,
        padding: "18px 20px",
        animation: "pipelineFadeIn 0.6s ease-out 0.5s both",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: theme.warning, marginBottom: 10 }}>Flerspråklig embedding</div>
      <div style={{ fontSize: 15, color: theme.textMuted, lineHeight: 1.5, marginBottom: 12 }}>
        Byttet fra <span style={{ fontFamily: theme.monoFont, fontSize: 14, color: theme.textMuted }}>all-MiniLM-L6-v2</span> til <span style={{ fontFamily: theme.monoFont, fontSize: 14, color: theme.accent }}>multilingual-e5-base</span> — den viktigste enkelendringen.
      </div>
      {[
        { pair: "«Rammeavtaler» ↔ «Framework agreements»", before: "0.02", after: "0.83" },
        { pair: "«feriepenger» ↔ «holiday pay»", before: "0.17", after: "0.89" },
        { pair: "«ansettelsesforhold» ↔ «employment»", before: "0.13", after: "0.85" },
      ].map((row, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 0",
            borderBottom: i < 2 ? `1px solid ${theme.text}08` : "none",
            fontSize: 14,
            animation: `pipelineFadeIn 0.5s ease-out ${0.7 + i * 0.12}s both`,
          }}
        >
          <span style={{ color: theme.textMuted }}>{row.pair}</span>
          <div style={{ display: "flex", gap: 8, fontFamily: theme.monoFont }}>
            <span style={{ color: theme.secondary }}>{row.before}</span>
            <span style={{ color: theme.success }}>{row.after}</span>
          </div>
        </div>
      ))}
    </div>

    <div
      style={{
        flex: 1,
        background: `${theme.text}05`,
        border: `1px solid ${theme.text}15`,
        borderRadius: 14,
        padding: "18px 20px",
        animation: "pipelineFadeIn 0.6s ease-out 0.7s both",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 10 }}>Alt kjører lokalt</div>
      {[
        { label: "FAISS", desc: "Vektorindeks (IndexFlatL2) — semantisk søk" },
        { label: "BM25", desc: "Nøkkelordindeks (BM25Okapi) — eksakte termer" },
        { label: "RRF", desc: "Reciprocal Rank Fusion — fusjonerer rangeringene" },
        { label: "Cross-encoder", desc: "bge-reranker-v2-m3 — bimodal scoring" },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 10,
            animation: `pipelineFadeIn 0.5s ease-out ${0.8 + i * 0.12}s both`,
          }}
        >
          <span
            style={{
              fontFamily: theme.monoFont,
              fontSize: 14,
              color: theme.warning,
              background: `${theme.warning}15`,
              padding: "3px 10px",
              borderRadius: 6,
              minWidth: 80,
              textAlign: "center",
            }}
          >
            {item.label}
          </span>
          <span style={{ fontSize: 15, color: theme.textMuted }}>{item.desc}</span>
        </div>
      ))}
      <div
        style={{
          fontFamily: theme.monoFont,
          fontSize: 14,
          color: theme.textMuted,
          marginTop: 6,
          animation: "pipelineFadeIn 0.5s ease-out 1.3s both",
        }}
      >
        Søk: ~15–25ms | Med reranking: ~500–900ms
      </div>
    </div>
    </div>
    <div
      style={{
        padding: "12px 20px",
        background: `${theme.gold}10`,
        border: `1px solid ${theme.gold}25`,
        borderRadius: 10,
        animation: "pipelineFadeIn 0.6s ease-out 1.5s both",
      }}
    >
      <p style={{ fontSize: 16, color: theme.gold, fontWeight: 500 }}>
        Vektorsøk forstår at «rammeavtaler» betyr «framework agreements» — men finner aldri «LA_BUC_01». Nøkkelord finner eksakte termer, men forstår ikke at «sykefravær» og «sick leave» er det samme. Hybrid søk kombinerer begge. Reranking gir +14 % MRR på Confluence og +10 % på Jira.
      </p>
    </div>
  </div>
);

const detailComponents = [HentDetail, RensDetail, ChunkDetail, TaggDetail, IndekserDetail];

/* ── Main scene ── */

export const DataQualityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const activeStep = useStepNavigation(pipelineSteps.length);

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  const badgeOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          marginBottom: 8,
        }}
      >
        Slik bygger vi kunnskapsbasen
      </h2>

      <div
        style={{
          opacity: badgeOpacity,
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 30,
        }}
      >
        <Bird size={20} color={theme.primary} strokeWidth={1.5} />
        <span style={{ fontSize: 16, color: theme.textMuted }}>Huginn — indeksering av kunnskap</span>
        <span
          style={{
            fontFamily: theme.monoFont,
            fontSize: 14,
            color: theme.primary,
            background: `${theme.primary}15`,
            padding: "3px 10px",
            borderRadius: 6,
          }}
        >
          github.com/RuneLind/huginn
        </span>
      </div>

      {/* Compact pipeline cards */}
      <div style={{ display: "flex", gap: 12, maxWidth: 1500, width: "100%", marginBottom: 24 }}>
        {pipelineSteps.map((step, i) => {
          const isVisible = activeStep >= i;
          const isActive = activeStep === i;

          return (
            <div key={i} style={{ flex: 1, position: "relative" }}>
              {i > 0 && (
                <div
                  style={{
                    position: "absolute",
                    left: -10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: isVisible ? `${step.color}80` : `${theme.text}15`,
                    transition: "color 0.3s ease-out",
                  }}
                >
                  <ChevronRight size={16} />
                </div>
              )}
              <div
                style={{
                  opacity: isVisible ? 1 : 0.15,
                  transform: `scale(${isVisible ? 1 : 0.97})`,
                  transition: "all 0.4s ease-out",
                  background: isActive ? `${step.color}12` : `${theme.text}05`,
                  border: `2px solid ${isActive ? step.color : isVisible ? `${step.color}40` : `${theme.text}10`}`,
                  borderRadius: 14,
                  padding: "16px 14px",
                  textAlign: "center",
                  boxShadow: isActive ? `0 0 25px ${step.color}20` : "none",
                }}
              >
                <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>
                  <step.Icon size={36} color={step.color} strokeWidth={1.5} />
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: step.color, marginBottom: 6 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 16, color: theme.textMuted, lineHeight: 1.4 }}>{step.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {ActiveDetail && (
        <div
          key={activeStep}
          style={{
            maxWidth: 1500,
            width: "100%",
            flex: 1,
            animation: "pipelineFadeIn 0.5s ease-out 0.5s both",
          }}
        >
          <ActiveDetail />
        </div>
      )}

      <style>{`
        @keyframes pipelineFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Navigation hint */}
      {activeStep < pipelineSteps.length - 1 && (
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
