import React from 'react';

/**
 * evolutionLevel accepts either a numeric opacity [0–1] or the sentinel value
 * 'TODO', which the backend emits when the data is not yet actualized.
 * When 'TODO' is received the component renders in stealth phase (opacity 0.001)
 * instead of crashing the CSS parser with a non-numeric string.
 */
export type EvolutionLevel = number | 'TODO' | null | undefined;

export interface EvolutionMetricData {
  evolutionLevel: EvolutionLevel;
  quantumSignature?: string;
}

interface EvolutionMetricProps {
  data: EvolutionMetricData;
}

const STEALTH_OPACITY = 0.001;
const DEFAULT_OPACITY = 1.0;

export const EvolutionMetric: React.FC<EvolutionMetricProps> = ({ data }) => {
  let normalizedOpacity: number;
  if (data.evolutionLevel === 'TODO' || data.evolutionLevel == null) {
    normalizedOpacity = STEALTH_OPACITY;
  } else {
    normalizedOpacity = Math.max(0, Math.min(1, data.evolutionLevel));
  }

  return (
    <div
      className="hud-panel"
      style={{
        opacity: normalizedOpacity,
        transition: 'opacity 100ms cubic-bezier(0.0, 0.0, 0.2, 1)',
      }}
    >
      <h3 className="hud-panel__title">System Metabolism Status</h3>
      <p className="hud-panel__body">
        Active Observer Horizon:{' '}
        <span className="hud-panel__value">
          {data.quantumSignature || 'Scanning...'}
        </span>
      </p>
    </div>
  );
};

// Re-export DEFAULT_OPACITY for consumers that need to pass a sensible default.
export { DEFAULT_OPACITY };
