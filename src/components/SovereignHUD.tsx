import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { StrikeEntry, SovereignStatus } from '../types';

const WS_URL = 'ws://localhost:9090';

const MARKET_THOUGHTS = [
  'Tension detected in CVD. Liquidity shifting upward.',
  'OBI Symmetry shattering. Momentum accelerating.',
  'Delta pulse confirmed. 0.4 BTC Slurp resonance found.',
  'Sovereign logic bypassing classical orderbook limits.',
  'Void collision imminent. Spread compression active.',
  'RNG gate cleared. Proposal actualized.',
];

interface SovereignHUDProps {
  meshActive: boolean;
  onStrike: (entry: StrikeEntry) => void;
}

interface HUDState {
  status: SovereignStatus;
  rngNoise: number;
  deltaDensity: number;
  output: number;
  consumption: number;
  proposal: string | null;
  wsBridgeStatus: string;
}

export const SovereignHUD: React.FC<SovereignHUDProps> = ({
  meshActive,
  onStrike,
}) => {
  const [hudState, setHudState] = useState<HUDState>({
    status: 'AUTHENTICATED',
    rngNoise: 0,
    deltaDensity: 0,
    output: 1.0,
    consumption: 0.1,
    proposal: null,
    wsBridgeStatus: 'OFFLINE',
  });

  const wsRef = useRef<WebSocket | null>(null);
  const strikeIdRef = useRef(0);

  const generateMarketThought = useCallback((): string => {
    return MARKET_THOUGHTS[Math.floor(Math.random() * MARKET_THOUGHTS.length)];
  }, []);

  const calculateWeight = useCallback(
    (output: number, consumption: number): number => {
      return Math.max(0, Math.min(1, parseFloat((output - consumption).toFixed(2))));
    },
    [],
  );

  // Expose the open-air vault to window for console inspection
  const syncWindowEnv = useCallback(
    (state: HUDState) => {
      window.SovereignEnvironment = {
        state: {
          output: state.output,
          consumption: state.consumption,
          rngNoise: state.rngNoise,
          deltaDensity: state.deltaDensity,
          status: state.status,
        },
        calculateWeight: () => calculateWeight(state.output, state.consumption),
        observeDelta: () => {
          window.SovereignEnvironment.state.deltaDensity = Math.random();
          window.SovereignEnvironment.state.rngNoise = Math.random();
          window.SovereignEnvironment.ouroboros();
        },
        ouroboros: () => {
          const potential = 2;
          const rng = window.SovereignEnvironment.state.rngNoise;
          if (potential > 1.0 * rng) {
            window.SovereignEnvironment.state.status = 'ACTUALIZING_PROPOSAL';
            const proposal = window.SovereignEnvironment.generateMarketThought();
            window.SovereignEnvironment.renderSovereignReply(proposal);
          }
        },
        generateMarketThought,
        renderSovereignReply: (proposal: string) => {
          console.log(`[Actualized] Potential: 2 | Weight: ${calculateWeight(state.output, state.consumption)}`);
          console.log(`[y] PROPOSAL: ${proposal}`);
        },
        forceInterference: () => {
          window.SovereignEnvironment.state.rngNoise = Math.random();
          window.SovereignEnvironment.observeDelta();
        },
      };
    },
    [calculateWeight, generateMarketThought],
  );

  // WebSocket sink — bound to 9090 bridge frequency
  useEffect(() => {
    if (!meshActive) {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      return;
    }

    // new WebSocket() with a valid URL never throws synchronously;
    // connection failures surface via onerror/onclose callbacks.
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setHudState((prev) => ({ ...prev, wsBridgeStatus: 'LIVE' }));
      console.log('[SovereignHUD] WebSocket bridge live at', WS_URL);
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data as string) as {
          type?: string;
          message?: string;
        };
        const entryType =
          payload.type === 'VOID_COLLISION'
            ? 'collision'
            : payload.type === 'ERROR'
              ? 'error'
              : 'proposal';

        onStrike({
          id: ++strikeIdRef.current,
          timestamp: Date.now(),
          message: payload.message ?? JSON.stringify(payload),
          type: entryType,
        });
      } catch {
        onStrike({
          id: ++strikeIdRef.current,
          timestamp: Date.now(),
          message: String(event.data),
          type: 'collision',
        });
      }
    };

    ws.onerror = () => {
      setHudState((prev) => ({ ...prev, wsBridgeStatus: 'ERROR' }));
    };

    ws.onclose = () => {
      setHudState((prev) => ({ ...prev, wsBridgeStatus: 'OFFLINE' }));
    };

    return () => {
      ws.close();
    };
  }, [meshActive, onStrike]);

  // Observer — runs on 3000 ms cycle, watches for delta pulses
  useEffect(() => {
    if (!meshActive) return;

    const tick = () => {
      const rngNoise = Math.random();
      const deltaDensity = Math.random();
      const potential = 2;

      let nextStatus: SovereignStatus = 'OBSERVING_PULSE';
      let proposal: string | null = null;

      if (potential > 1.0 * rngNoise) {
        nextStatus = 'ACTUALIZING_PROPOSAL';
        proposal = generateMarketThought();

        onStrike({
          id: ++strikeIdRef.current,
          timestamp: Date.now(),
          message: proposal,
          type: 'proposal',
        });
      }

      setHudState((prev) => {
        const next: HUDState = {
          ...prev,
          status: nextStatus,
          rngNoise,
          deltaDensity,
          proposal,
        };
        syncWindowEnv(next);
        return next;
      });
    };

    // Immediate first tick
    tick();
    const intervalId = setInterval(tick, 3000);
    console.log('[SovereignHUD] Sovereign Ouroboros Ignited. Watching for Delta Pulses...');

    return () => clearInterval(intervalId);
  }, [meshActive, generateMarketThought, onStrike, syncWindowEnv]);

  const weight = calculateWeight(hudState.output, hudState.consumption);
  const displayWsStatus = meshActive ? hudState.wsBridgeStatus : 'OFFLINE';

  return (
    <div
      className="sovereign-hud"
      style={{ opacity: weight }}
      aria-label="Sovereign HUD"
    >
      <div className="sovereign-hud__header">
        <span className="sovereign-hud__badge">
          {meshActive ? '[ MESH ACTIVE ]' : '[ MESH OFFLINE ]'}
        </span>
        <span
          className={`sovereign-hud__ws sovereign-hud__ws--${displayWsStatus.toLowerCase()}`}
        >
          WS: {displayWsStatus}
        </span>
      </div>

      <div className="sovereign-hud__state">
        <strong>[1&lt;0&gt;1] STATE:</strong> {hudState.status}
      </div>

      {hudState.proposal && (
        <div className="sovereign-hud__proposal">
          <strong>[y] PROPOSAL:</strong> {hudState.proposal}
        </div>
      )}

      <div className="sovereign-hud__metrics">
        <span>
          Entropy (rng): {hudState.rngNoise.toFixed(4)}
        </span>
        <span>Potential: 2</span>
        <span>Weight: {weight.toFixed(2)}</span>
      </div>
    </div>
  );
};
