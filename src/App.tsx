import { useState, useCallback } from 'react';
import { SovereignHUD } from './components/SovereignHUD';
import { CentrifugeVisualizer } from './components/CentrifugeVisualizer';
import { EvolutionMetric } from './components/HUD/MetricsDisplay';
import type { StrikeEntry } from './types';
import './App.css';

function App() {
  const [meshActive, setMeshActive] = useState(false);
  const [strikeLog, setStrikeLog] = useState<StrikeEntry[]>([]);
  const [bridgeStatus, setBridgeStatus] = useState<string>('OFFLINE');

  const handleStrike = useCallback((entry: StrikeEntry) => {
    setStrikeLog((prev) => [...prev, entry]);
    setBridgeStatus(entry.type === 'collision' ? 'VOID_COLLISION' : 'ACTUALIZED');
  }, []);

  const evolutionData = {
    evolutionLevel: meshActive ? 0.9 : ('TODO' as const),
    quantumSignature: bridgeStatus,
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1 className="app-header__title">SOVEREIGN ENVIRONMENT</h1>
        <p className="app-header__subtitle">Design State Machine 1.0 — Open-Air Vault</p>
      </header>

      <div className="app-controls">
        <button
          type="button"
          className={`engage-btn ${meshActive ? 'engage-btn--active' : ''}`}
          onClick={() => setMeshActive((v) => !v)}
        >
          {meshActive ? 'DISENGAGE MESH' : 'ENGAGE MESH'}
        </button>
        <span className="app-controls__status">
          {meshActive ? 'MESH ACTIVE — 119 Hz Slurp Live' : 'MESH OFFLINE'}
        </span>
      </div>

      <div className="app-grid">
        <section className="app-grid__panel app-grid__panel--hud">
          <SovereignHUD meshActive={meshActive} onStrike={handleStrike} />
        </section>

        <section className="app-grid__panel app-grid__panel--centrifuge">
          <CentrifugeVisualizer strikeLog={strikeLog} spinning={meshActive} />
        </section>

        <section className="app-grid__panel app-grid__panel--telemetry">
          <h2 className="panel-title">System Telemetry</h2>
          <EvolutionMetric data={evolutionData} />
          <div className="telemetry-stats">
            <div className="telemetry-stats__row">
              <span className="telemetry-stats__label">Strike Count</span>
              <span className="telemetry-stats__value">{strikeLog.length}</span>
            </div>
            <div className="telemetry-stats__row">
              <span className="telemetry-stats__label">Bridge Status</span>
              <span className="telemetry-stats__value">{bridgeStatus}</span>
            </div>
            <div className="telemetry-stats__row">
              <span className="telemetry-stats__label">Mesh Frequency</span>
              <span className="telemetry-stats__value">
                {meshActive ? '119 Hz' : '—'}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
