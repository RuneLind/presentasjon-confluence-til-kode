import { useState, useEffect, useCallback } from "react";
import { PresentationProvider } from "./remotion-mock";
import { theme } from "./styles/theme";
import { IntroScene } from "./components/IntroScene";
import { ProblemScene } from "./components/ProblemScene";
import { BlankSlateScene } from "./components/BlankSlateScene";
import { TwoThingsScene } from "./components/TwoThingsScene";
import { ArchitectureScene } from "./components/ArchitectureScene";
import { DataQualityScene } from "./components/DataQualityScene";
import { HybridSearchScene } from "./components/HybridSearchScene";
import { MCPToolsScene } from "./components/MCPToolsScene";
import { MuninnHuginnScene } from "./components/MuninnHuginnScene";
import { KeyLearningsScene } from "./components/KeyLearningsScene";
import { ClosingScene } from "./components/ClosingScene";

const scenes: Array<{ name: string; component: React.FC }> = [
  { name: "Intro", component: IntroScene },
  { name: "Problemet", component: ProblemScene },
  { name: "Blankt ark", component: BlankSlateScene },
  { name: "To ting", component: TwoThingsScene },
  { name: "Arkitektur", component: ArchitectureScene },
  { name: "Datakvalitet", component: DataQualityScene },
  { name: "Hybrid søk", component: HybridSearchScene },
  { name: "MCP-verktøy", component: MCPToolsScene },
  { name: "Muninn & Huginn", component: MuninnHuginnScene },
  { name: "Hva vi lærte", component: KeyLearningsScene },
  { name: "Avslutning", component: ClosingScene },
];

export const Presentation: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [frame, setFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setFrame((f) => f + 1);
    }, 1000 / 30);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextScene = useCallback(() => {
    if (currentScene < scenes.length - 1) {
      setFrame(0);
      setIsPlaying(true);
      setCurrentScene((s) => s + 1);
    }
  }, [currentScene]);

  const prevScene = useCallback(() => {
    if (currentScene > 0) {
      setFrame(0);
      setIsPlaying(true);
      setCurrentScene((s) => s - 1);
    }
  }, [currentScene]);

  const goToScene = useCallback((index: number) => {
    setFrame(0);
    setIsPlaying(true);
    setCurrentScene(index);
    setShowSidebar(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleCmdArrow = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          e.stopPropagation();
          nextScene();
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          e.stopPropagation();
          prevScene();
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextScene();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevScene();
      }
      if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
      if (e.key === "p" || e.key === "P") {
        setIsPlaying((p) => !p);
      }
      if (e.key === "r" || e.key === "R") {
        setFrame(0);
      }
      if (e.key === "s" || e.key === "S") {
        setShowSidebar((s) => !s);
      }
      if (e.key === "Escape") {
        setShowSidebar(false);
      }
    };

    window.addEventListener("keydown", handleCmdArrow, true);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleCmdArrow, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextScene, prevScene, toggleFullscreen]);

  const CurrentSceneComponent = scenes[currentScene].component;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0a0a0a",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Scene container with 16:9 aspect ratio */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(100vw, 177.78vh)",
          height: "min(100vh, 56.25vw)",
          overflow: "hidden",
        }}
      >
        <PresentationProvider frame={frame} fps={30}>
          <CurrentSceneComponent />
        </PresentationProvider>
      </div>

      {/* Slide counter */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "#444",
          fontSize: 14,
          fontFamily: "'Inter', sans-serif",
          cursor: "pointer",
        }}
        onClick={() => setShowSidebar((s) => !s)}
      >
        {currentScene + 1}/{scenes.length}
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 280,
            height: "100vh",
            background: "rgba(10, 10, 10, 0.95)",
            borderRight: "1px solid #333",
            padding: "60px 16px 20px",
            zIndex: 100,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#666",
              fontFamily: "'Inter', sans-serif",
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Slides
          </div>
          {scenes.map((scene, i) => (
            <div
              key={i}
              onClick={() => goToScene(i)}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                cursor: "pointer",
                background: i === currentScene ? `${theme.primary}15` : "transparent",
                border: i === currentScene ? `1px solid ${theme.primary}30` : "1px solid transparent",
                marginBottom: 4,
                fontSize: 15,
                color: i === currentScene ? theme.primary : "#888",
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ color: "#555", marginRight: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {scene.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
