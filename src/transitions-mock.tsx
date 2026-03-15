/**
 * Mock implementation of @remotion/transitions for presentation mode.
 */

import React, { ReactNode } from "react";

export const TransitionSeries: React.FC<{ children?: ReactNode }> & {
  Sequence: React.FC<{ children?: ReactNode; durationInFrames?: number }>;
  Transition: React.FC<{ timing?: unknown; presentation?: unknown }>;
} = ({ children }) => <>{children}</>;

TransitionSeries.Sequence = ({ children }) => <>{children}</>;
TransitionSeries.Transition = () => null;

export const linearTiming = (options: { durationInFrames: number }) => options;
export const springTiming = (options: { durationInFrames: number }) => options;

export const fade = () => ({ component: () => null });
export const wipe = (options?: { direction?: string }) => ({ component: () => null });
export const slide = (options?: { direction?: string }) => ({ component: () => null });
