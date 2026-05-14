import React, { useEffect, useRef, useState } from 'react';

interface LaminarBridgeProps {
  meshActive: boolean;
  bridgeStatus: string;
  cascadeCount: number;
}

const TARGET_HZ = 119;
const PULSE_TOLERANCE_HZ = 5;
const PULSE_INTERVAL_MS = 1000 / TARGET_HZ;

export const LaminarBridge: React.FC<LaminarBridgeProps> = ({
  meshActive,
  bridgeStatus,
  cascadeCount,
}) => {
  const [pulseCount, setPulseCount] = useState(0);
  const [observedHz, setObservedHz] = useState(0);
  const pulseTicksRef = useRef(0);
  const lastWindowRef = useRef(Date.now());

  useEffect(() => {
    if (!meshActive) {
      setObservedHz(0);
      return;
    }

    const pulseId = window.setInterval(() => {
      pulseTicksRef.current += 1;
      setPulseCount((prev) => prev + 1);
    }, PULSE_INTERVAL_MS);

    const monitorId = window.setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - lastWindowRef.current;
      const hz = elapsedMs > 0 ? (pulseTicksRef.current * 1000) / elapsedMs : 0;
      setObservedHz(Math.round(hz));
      pulseTicksRef.current = 0;
      lastWindowRef.current = now;
    }, 1000);

    return () => {
      window.clearInterval(pulseId);
      window.clearInterval(monitorId);
    };
  }, [meshActive]);

  const pulseHealth = meshActive
    ? Math.abs(observedHz - TARGET_HZ) <= PULSE_TOLERANCE_HZ
      ? 'SYNCED'
      : 'DRIFT'
    : 'OFFLINE';

  return (
    <section className="app-grid__panel laminar-bridge" aria-label="Laminar bridge monitor">
      <h2 className="panel-title">Laminar Deployment Bridge (9090)</h2>
      <div className="laminar-bridge__row">
        <span className="laminar-bridge__label">Bridge Event</span>
        <span className="laminar-bridge__value">{bridgeStatus}</span>
      </div>
      <div className="laminar-bridge__row">
        <span className="laminar-bridge__label">Pulse Monitor</span>
        <span className="laminar-bridge__value">
          {meshActive ? `${observedHz} Hz (${pulseHealth})` : 'OFFLINE'}
        </span>
      </div>
      <div className="laminar-bridge__row">
        <span className="laminar-bridge__label">Pulse Ticks</span>
        <span className="laminar-bridge__value">{pulseCount}</span>
      </div>
      <div className="laminar-bridge__row">
        <span className="laminar-bridge__label">Cascade Events</span>
        <span className="laminar-bridge__value">{cascadeCount}</span>
      </div>
    </section>
  );
};
