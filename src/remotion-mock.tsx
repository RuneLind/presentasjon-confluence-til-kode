import React, { createContext, useContext, ReactNode } from "react";

const FrameContext = createContext(0);
const FpsContext = createContext(30);

export const useCurrentFrame = () => useContext(FrameContext);

export const useVideoConfig = () => ({
  fps: useContext(FpsContext),
  width: 1920,
  height: 1080,
  durationInFrames: 1000,
});

export const interpolate = (
  input: number,
  inputRange: number[],
  outputRange: number[],
  options?: {
    extrapolateLeft?: "clamp" | "extend";
    extrapolateRight?: "clamp" | "extend";
  }
): number => {
  // Find the segment this input falls into
  if (input <= inputRange[0]) {
    if (options?.extrapolateLeft === "clamp") {
      return outputRange[0];
    }
    const slope = (outputRange[1] - outputRange[0]) / (inputRange[1] - inputRange[0]);
    return outputRange[0] + slope * (input - inputRange[0]);
  }

  if (input >= inputRange[inputRange.length - 1]) {
    if (options?.extrapolateRight === "clamp") {
      return outputRange[outputRange.length - 1];
    }
    const last = inputRange.length - 1;
    const slope = (outputRange[last] - outputRange[last - 1]) / (inputRange[last] - inputRange[last - 1]);
    return outputRange[last] + slope * (input - inputRange[last]);
  }

  // Find the right segment
  for (let i = 1; i < inputRange.length; i++) {
    if (input <= inputRange[i]) {
      const progress = (input - inputRange[i - 1]) / (inputRange[i] - inputRange[i - 1]);
      return outputRange[i - 1] + progress * (outputRange[i] - outputRange[i - 1]);
    }
  }

  return outputRange[outputRange.length - 1];
};

export const spring = ({
  frame,
  fps,
  config = {},
}: {
  frame: number;
  fps: number;
  config?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
}): number => {
  const { damping = 10, stiffness = 100, mass = 1 } = config;

  if (frame < 0) return 0;

  const omega = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const t = frame / fps;

  let value: number;

  if (zeta < 1) {
    const omegaD = omega * Math.sqrt(1 - zeta * zeta);
    value = 1 - Math.exp(-zeta * omega * t) * (Math.cos(omegaD * t) + (zeta * omega / omegaD) * Math.sin(omegaD * t));
  } else if (zeta === 1) {
    value = 1 - Math.exp(-omega * t) * (1 + omega * t);
  } else {
    const s1 = -omega * (zeta - Math.sqrt(zeta * zeta - 1));
    const s2 = -omega * (zeta + Math.sqrt(zeta * zeta - 1));
    value = 1 - (s1 * Math.exp(s2 * t) - s2 * Math.exp(s1 * t)) / (s1 - s2);
  }

  return Math.max(0, Math.min(1, value));
};

export const AbsoluteFill: React.FC<{
  children?: ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Sequence: React.FC<{
  children?: ReactNode;
  from?: number;
  durationInFrames?: number;
  style?: React.CSSProperties;
}> = ({ children, from = 0, style }) => {
  const frame = useCurrentFrame();

  if (frame < from) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const PresentationProvider: React.FC<{
  children: ReactNode;
  frame: number;
  fps?: number;
}> = ({ children, frame, fps = 30 }) => (
  <FrameContext.Provider value={frame}>
    <FpsContext.Provider value={fps}>{children}</FpsContext.Provider>
  </FrameContext.Provider>
);

export const Easing = {
  linear: (t: number) => t,
  ease: (t: number) => t * t * (3 - 2 * t),
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  cubic: (t: number) => t * t * t,
  bezier: (x1: number, y1: number, x2: number, y2: number) => {
    return (t: number) => {
      const cx = 3 * x1;
      const bx = 3 * (x2 - x1) - cx;
      const ax = 1 - cx - bx;
      const cy = 3 * y1;
      const by = 3 * (y2 - y1) - cy;
      const ay = 1 - cy - by;
      const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
      const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
      let guessT = t;
      for (let i = 0; i < 4; i++) {
        const currentX = sampleX(guessT) - t;
        if (Math.abs(currentX) < 0.001) break;
        const currentSlope = (3 * ax * guessT + 2 * bx) * guessT + cx;
        if (Math.abs(currentSlope) < 0.001) break;
        guessT -= currentX / currentSlope;
      }
      return sampleY(guessT);
    };
  },
  in: (easing: (t: number) => number) => easing,
  out: (easing: (t: number) => number) => (t: number) => 1 - easing(1 - t),
  inOut: (easing: (t: number) => number) => (t: number) =>
    t < 0.5 ? easing(t * 2) / 2 : 1 - easing((1 - t) * 2) / 2,
};

export const Composition: React.FC<unknown> = () => null;

export const registerRoot = () => {};

export const staticFile = (path: string) => path;

export const Video: React.FC<{
  src: string;
  style?: React.CSSProperties;
  muted?: boolean;
  volume?: number;
}> = ({ src, style, muted = true }) => (
  <video src={src} style={style} muted={muted} autoPlay loop playsInline />
);
