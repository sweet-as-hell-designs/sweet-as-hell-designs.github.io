import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { StrikeEntry, SovereignStatus } from '../types';

const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:9090';

/** Reconnect base delay in ms; doubles with each failed attempt. */
const RECONNECT_BASE_MS = 2_000;
/** Reconnect delay cap — never wait longer than 30 s. */
const RECONNECT_MAX_MS = 30_000;

const MARKET_THOUGHTS = [
  'Tension detected in CVD. Liquidity shifting upward.',
  'OBI Symmetry shattering. Momentum accelerating.',
  'Delta pulse confirmed. 0.4 BTC Slurp resonance found.',
  'Sovereign logic bypassing classical orderbook limits.',
  'Void collision imminent. Spread compression active.',
  'RNG gate cleared. Proposal actualized.',
];

type WsBridgeStatus = 'LIVE' | 'RECONNECTING' | 'ERROR' | 'OFFLINE';

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
  wsBridgeStatus: WsBridgeStatus;
}

const INITIAL_STATE: HUDState = {
  status: 'AUTHENTICATED',
  rngNoise: 0,
  deltaDensity: 0,
  output: 1.0,
  consumption: 0.1,
  proposal: null,
  wsBridgeStatus: 'OFFLINE',
};

export const SovereignHUD: React.FC<SovereignHUDProps> = ({
  meshActive,
  onStrike,
}) => {
  const [hudState, setHudState] = useState<HUDState>(INITIAL_STATE);

  const wsRef = useRef<WebSocket | null>(null);
  const strikeIdRef = useRef(0);
  const reconnectAttemptRef = useRef(0);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intentionalCloseRef = useRef(false);
  const gordonMetaRef = useRef({
    gordonMetadata: {
      alias: 'Gordon',
      persistence: 'shadow-root' as const,
      lastBridgeStatus: INITIAL_STATE.status,
      updatedAt: Date.now(),
    },
  });

  const generateMarketThought = useCallback((): string => {
    return MARKET_THOUGHTS[Math.floor(Math.random() * MARKET_THOUGHTS.length)];
  }, []);

  const calculateWeight = useCallback(
    (output: number, consumption: number): number =>
      Math.max(0, Math.min(1, parseFloat((output - consumption).toFixed(2)))),
    [],
  );

  // Expose the open-air vault to window — updated whenever hudState changes.
  const syncWindowEnv = useCallback(
    (state: HUDState) => {
      gordonMetaRef.current.gordonMetadata.lastBridgeStatus = state.status;
      gordonMetaRef.current.gordonMetadata.updatedAt = Date.now();
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
          console.log(
            `[Actualized] Potential: 2 | Weight: ${calculateWeight(state.output, state.consumption)}`,
          );
          console.log(`[y] PROPOSAL: ${proposal}`);
        },
        forceInterference: () => {
          window.SovereignEnvironment.state.rngNoise = Math.random();
          window.SovereignEnvironment.observeDelta();
        },
        shadowRoot: 'SovereignEnvironment',
        metaReferences: gordonMetaRef.current,
      };
    },
    [calculateWeight, generateMarketThought],
  );

  // Sync window.SovereignEnvironment whenever HUD state changes — kept as a
  // dedicated effect so the state updater functions remain pure.
  useEffect(() => {
    syncWindowEnv(hudState);
  }, [hudState, syncWindowEnv]);

  // WebSocket sink — bound to WS_URL with exponential-backoff auto-reconnect.
  useEffect(() => {
    if (!meshActive) {
      intentionalCloseRef.current = true;
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      return;
    }

    intentionalCloseRef.current = false;
    reconnectAttemptRef.current = 0;

    function connect() {
      if (intentionalCloseRef.current) return;

      // new WebSocket() with a valid URL never throws synchronously;
      // connection failures surface via onerror / onclose callbacks.
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        reconnectAttemptRef.current = 0;
        setHudState((prev) => ({ ...prev, wsBridgeStatus: 'LIVE' }));
        console.log('[SovereignHUD] WebSocket bridge live at', WS_URL);
      };

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data as string) as {
            type?: string;
            message?: string;
          };
          let entryType: StrikeEntry['type'];
          switch (payload.type) {
            case 'VOID_COLLISION':
              entryType = 'collision';
              break;
            case 'UNSYNCHRONIZED_CASCADE_DETECTED':
              entryType = 'cascade';
              break;
            case 'ERROR':
              entryType = 'error';
              break;
            default:
              if (payload.type) {
                console.warn(
                  '[SovereignHUD] Unhandled bridge event type; defaulting to proposal:',
                  payload.type,
                );
              }
              entryType = 'proposal';
          }

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
        if (intentionalCloseRef.current) return;

        reconnectAttemptRef.current += 1;
        // Cap the exponent so we never compute pointlessly large powers:
        // 2000 * 2^4 = 32 000 already saturates RECONNECT_MAX_MS (30 000).
        const exponent = Math.min(reconnectAttemptRef.current, 4);
        const delay = Math.min(RECONNECT_MAX_MS, RECONNECT_BASE_MS * 2 ** exponent);
        setHudState((prev) => ({ ...prev, wsBridgeStatus: 'RECONNECTING' }));
        console.log(
          `[SovereignHUD] Reconnecting in ${delay}ms (attempt ${reconnectAttemptRef.current})`,
        );
        reconnectTimerRef.current = setTimeout(connect, delay);
      };
    }

    connect();
    console.log('[SovereignHUD] WebSocket sink initialised for', WS_URL);

    return () => {
      intentionalCloseRef.current = true;
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [meshActive, onStrike]);

  // Observer — runs on 3000 ms cycle, watches for delta pulses.
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

      // State updater is kept pure — syncWindowEnv is handled by its own effect.
      setHudState((prev) => ({
        ...prev,
        status: nextStatus,
        rngNoise,
        deltaDensity,
        proposal,
      }));
    };

    // Immediate first tick
    tick();
    const intervalId = setInterval(tick, 3000);
    console.log('[SovereignHUD] Sovereign Ouroboros Ignited. Watching for Delta Pulses...');

    return () => clearInterval(intervalId);
  }, [meshActive, generateMarketThought, onStrike]);

  const weight = calculateWeight(hudState.output, hudState.consumption);
  const displayWsStatus: WsBridgeStatus = meshActive
    ? hudState.wsBridgeStatus
    : 'OFFLINE';

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
        <span>Entropy (rng): {hudState.rngNoise.toFixed(4)}</span>
        <span>Potential: 2</span>
        <span>Weight: {weight.toFixed(2)}</span>
      </div>
    </div>
  );
};
