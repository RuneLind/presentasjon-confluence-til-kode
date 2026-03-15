import { AbsoluteFill } from "remotion";
import { IntroScene } from "./components/IntroScene";

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <IntroScene />
    </AbsoluteFill>
  );
};
