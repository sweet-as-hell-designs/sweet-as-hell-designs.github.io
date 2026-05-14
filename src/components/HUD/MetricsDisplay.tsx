import React from 'react';

export interface EvolutionMetricData {
  evolutionLevel: string | number;
  quantumSignature?: string;
}

interface EvolutionMetricProps {
  data: EvolutionMetricData;
}

export const EvolutionMetric: React.FC<EvolutionMetricProps> = ({ data }) => {
  const normalizedOpacity =
    data.evolutionLevel === 'TODO'
      ? 0.001
      : Math.max(0, Math.min(1, parseFloat(String(data.evolutionLevel ?? 1.0))));

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
