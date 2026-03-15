import { useCurrentFrame, interpolate } from "remotion";

interface StarfieldProps {
  count?: number;
  maxDistance?: number;
  colors?: string[];
}

export const Starfield: React.FC<StarfieldProps> = ({
  count = 50,
  maxDistance = 1200,
  colors = ["#ffffff", "#00d4ff", "#a855f7", "#ffffff", "#fbbf24"],
}) => {
  const frame = useCurrentFrame();
  const cycleDuration = 400;

  const stars = Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2 + i * 0.5;
    const timeOffset = (i * 7) % cycleDuration;
    const cycleFrame = (frame + timeOffset) % cycleDuration;
    const distance = interpolate(cycleFrame, [0, cycleDuration], [0, maxDistance], { extrapolateRight: "clamp" });
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const size = interpolate(cycleFrame, [0, cycleDuration], [1, 3], { extrapolateRight: "clamp" });
    const opacity = interpolate(cycleFrame, [0, 20, cycleDuration - 30, cycleDuration], [0, 0.4, 0.4, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const color = colors[i % colors.length];

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
          opacity,
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
