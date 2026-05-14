import { useState, useCallback, useEffect, useRef } from 'react';
import { SovereignHUD } from './components/SovereignHUD';
import { CentrifugeVisualizer } from './components/CentrifugeVisualizer';
import { EvolutionMetric } from './components/HUD/MetricsDisplay';
import { LaminarBridge } from './components/LaminarBridge';
import type { StrikeEntry } from './types';
import './App.css';

/** Cap the in-memory strike log to avoid unbounded memory growth. */
const MAX_STRIKES = 500;
const TWILIO_SMS_WEBHOOK_URL = import.meta.env.VITE_TWILIO_SMS_WEBHOOK_URL;

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
      // Do NOT call setDisplay here — doing so on an unmounted component
      // triggers a React warning. The caller uses `active ? display : '—'`
      // so stale display values are never shown when the mesh is off.
    };
  }, [active]);

  return active ? display : '—';
}

function App() {
  const [meshActive, setMeshActive] = useState(false);
  const [strikeLog, setStrikeLog] = useState<StrikeEntry[]>([]);
  const [bridgeStatus, setBridgeStatus] = useState<string>('OFFLINE');
  const lastTodoBroadcastRef = useRef<number>(0);
  const [cascadeCount, setCascadeCount] = useState(0);
  const uptime = useUptime(meshActive);

  const handleStrike = useCallback((entry: StrikeEntry) => {
    setStrikeLog((prev) => {
      const updated = [...prev, entry];
      return updated.length > MAX_STRIKES ? updated.slice(-MAX_STRIKES) : updated;
    });
    if (entry.type === 'cascade') {
      setBridgeStatus('UNSYNCHRONIZED_CASCADE_DETECTED');
      setCascadeCount((prev) => prev + 1);
      return;
    }
    setBridgeStatus(entry.type === 'collision' ? 'VOID_COLLISION' : 'ACTUALIZED');
  }, []);

  const evolutionData = {
    evolutionLevel: meshActive ? 0.9 : ('TODO' as const),
    quantumSignature: bridgeStatus,
  };

  useEffect(() => {
    if (evolutionData.evolutionLevel !== 'TODO' || !TWILIO_SMS_WEBHOOK_URL) {
      return;
    }

    const now = Date.now();
    if (now - lastTodoBroadcastRef.current < 60_000) {
      return;
    }

    lastTodoBroadcastRef.current = now;
    void fetch(TWILIO_SMS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'T=TODO_GHOST',
        bridgeStatus,
        timestamp: new Date(now).toISOString(),
      }),
    }).catch((error: unknown) => {
      console.warn('[TwilioGhostBroadcast] Twilio ghost broadcast failed', error);
    });
  }, [bridgeStatus, evolutionData.evolutionLevel]);

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
            <div className="telemetry-stats__row">
              <span className="telemetry-stats__label">Cascade Events</span>
              <span className="telemetry-stats__value">{cascadeCount}</span>
            </div>
          </div>
        </section>

        <LaminarBridge
          meshActive={meshActive}
          bridgeStatus={bridgeStatus}
          cascadeCount={cascadeCount}
        />
      </div>
    </div>
  );
}

export default App;
