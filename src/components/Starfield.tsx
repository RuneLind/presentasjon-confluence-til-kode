import { useCurrentFrame, interpolate } from "../remotion-mock";

const STAR_COLORS = ["#ffffff", "#00d4ff", "#a855f7", "#ffffff", "#fbbf24"];

interface StarfieldProps {
  starCount?: number;
  cycleDuration?: number;
  maxDistance?: number;
  maxOpacity?: number;
}

export const Starfield: React.FC<StarfieldProps> = ({
  starCount = 50,
  cycleDuration = 400,
  maxDistance = 1200,
  maxOpacity = 0.4,
}) => {
  const frame = useCurrentFrame();

  const stars = Array.from({ length: starCount }).map((_, i) => {
    const angle = (i / starCount) * Math.PI * 2 + i * 0.5;
    const timeOffset = (i * 7) % cycleDuration;
    const cycleFrame = (frame + timeOffset) % cycleDuration;
    const distance = interpolate(cycleFrame, [0, cycleDuration], [0, maxDistance], {
      extrapolateRight: "clamp",
    });
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const size = interpolate(cycleFrame, [0, cycleDuration], [1, 3], {
      extrapolateRight: "clamp",
    });
    const opacity = interpolate(
      cycleFrame,
      [0, cycleDuration],
      [0, maxOpacity],
      { extrapolateRight: "clamp" }
    );
    // Fade in and out at edges
    const fadeIn = interpolate(cycleFrame, [0, 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const fadeOut = interpolate(cycleFrame, [cycleDuration - 30, cycleDuration], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const finalOpacity = opacity * fadeIn * fadeOut;
    const color = STAR_COLORS[i % STAR_COLORS.length];

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          opacity: finalOpacity,
          boxShadow: `0 0 ${size * 2}px ${color}`,
          pointerEvents: "none",
        }}
      />
    );
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative", width: 0, height: 0 }}>{stars}</div>
    </div>
  );
};
