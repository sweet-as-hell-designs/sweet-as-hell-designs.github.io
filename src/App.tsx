import { useState, useCallback, useEffect } from 'react';
import { SovereignHUD } from './components/SovereignHUD';
import { CentrifugeVisualizer } from './components/CentrifugeVisualizer';
import { EvolutionMetric } from './components/HUD/MetricsDisplay';
import type { StrikeEntry } from './types';
import './App.css';

/** Cap the in-memory strike log to avoid unbounded memory growth. */
const MAX_STRIKES = 500;

function useUptime(active: boolean): string {
  // Only updated from inside the setInterval callback — never synchronously
  // inside the effect body — to satisfy react-hooks/set-state-in-effect.
  const [display, setDisplay] = useState('00:00');

  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const ss = String(elapsed % 60).padStart(2, '0');
      setDisplay(`${mm}:${ss}`);
    }, 1000);
    return () => {
      clearInterval(id);
      setDisplay('00:00');
    };
  }, [active]);

  return active ? display : '—';
}

function App() {
  const [meshActive, setMeshActive] = useState(false);
  const [strikeLog, setStrikeLog] = useState<StrikeEntry[]>([]);
  const [bridgeStatus, setBridgeStatus] = useState<string>('OFFLINE');
  const uptime = useUptime(meshActive);

  const handleStrike = useCallback((entry: StrikeEntry) => {
    setStrikeLog((prev) => {
      const updated = [...prev, entry];
      return updated.length > MAX_STRIKES ? updated.slice(-MAX_STRIKES) : updated;
    });
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
            <div className="telemetry-stats__row">
              <span className="telemetry-stats__label">Mesh Uptime</span>
              <span className="telemetry-stats__value">{uptime}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
