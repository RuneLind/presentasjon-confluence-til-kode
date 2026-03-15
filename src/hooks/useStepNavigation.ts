import { useState, useEffect } from "react";
import { useCurrentFrame } from "../remotion-mock";

/**
 * Hook for step-by-step navigation within a scene.
 * Captures Space/ArrowRight to advance and ArrowLeft to go back.
 * Auto-starts at step 0 when frame > autoStartFrame.
 */
export const useStepNavigation = (maxSteps: number, autoStartFrame = 40) => {
  const frame = useCurrentFrame();
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowRight") {
        if (activeStep < maxSteps - 1) {
          e.preventDefault();
          e.stopPropagation();
          setActiveStep((s) => s + 1);
        }
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (activeStep > 0) {
          e.preventDefault();
          e.stopPropagation();
          setActiveStep((s) => s - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [activeStep, maxSteps]);

  useEffect(() => {
    if (frame > autoStartFrame && activeStep === -1) setActiveStep(0);
  }, [frame, activeStep, autoStartFrame]);

  return activeStep;
};
