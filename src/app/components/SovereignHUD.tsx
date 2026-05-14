import React, { useState, useEffect, useRef } from 'react';
import { CentrifugeVisualizer } from './CentrifugeVisualizer';

interface Strike {
  p: number;
  e: string;
  t: number;
}

const MARKET_THOUGHTS = [
  "Tension detected in CVD. Liquidity shifting upward.",
  "OBI Symmetry shattering. Momentum accelerating.",
  "Delta pulse confirmed. 0.4 BTC Slurp resonance found.",
  "Sovereign logic bypassing classical orderbook limits."
];

export function SovereignHUD() {
  const [state, setState] = useState({
    output: 1.0,
    consumption: 0.1,
    status: "OBSERVING_PULSE",
    pressure: 0,
    rngNoise: 0.5,
    deltaDensity: 0,
    strikeLog: [] as Strike[],
    proposal: "Awaiting Phase 2 Initialization..."
  });

  const stateRef = useRef(state);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    console.log('[SOVEREIGN] Ouroboros Ignited. Watching for Delta Pulses...');
    
    // 1. High-Frequency Centrifuge Rotation (Visual pressure)
    const spinCentrifuge = () => {
      const prevState = stateRef.current;
      const nextPressure = prevState.pressure + 1;
      
      setState(s => ({ ...s, pressure: nextPressure }));
      frameRef.current = requestAnimationFrame(spinCentrifuge);
    };
    frameRef.current = requestAnimationFrame(spinCentrifuge);

    // 2. Phase 2 Post-Binary Actualization: The Observer (t.showDelta)
    const observeDelta = setInterval(() => {
      setState(prevState => {
        const nextRngNoise = Math.random();
        const nextDeltaDensity = Math.random();
        const potential = 2; // Fixed unit of potential
        
        let nextStatus = "OBSERVING_PULSE";
        let nextProposal = prevState.proposal;

        // Gate: (*(*)*) = 2 > 1rng (Collapse the Superposition)
        if (potential > (1.0 * nextRngNoise)) {
          nextStatus = "ACTUALIZING_PROPOSAL";
          nextProposal = MARKET_THOUGHTS[Math.floor(Math.random() * MARKET_THOUGHTS.length)];
          console.log(\`[Actualized] Potential: 2 | Weight: \${(prevState.output - prevState.consumption).toFixed(2)} | Proposal: \${nextProposal}\`);
        }

        const newState = {
          ...prevState,
          rngNoise: nextRngNoise,
          deltaDensity: nextDeltaDensity,
          status: nextStatus,
          proposal: nextProposal,
          // Log the strike
          strikeLog: [
            ...prevState.strikeLog, 
            { p: prevState.pressure, e: nextRngNoise.toFixed(4), t: Date.now() }
          ].slice(-10) // Keep last 10
        };

        // Open-Air-Vault Transparency: Expose shadow root directly to the global window
        // @ts-ignore
        window.SovereignEnvironment = { 
            state: newState, 
            forceInterference: setState,
            // Expose logic block for true transparency
            shadowRoot: "SovereignEnvironment",
            postBinary: "1 < 0 > 1"
        };
        // Keep old reference for backwards compatibility with App.tsx
        // @ts-ignore
        window.SovereignHUD = window.SovereignEnvironment;

        return newState;
      });
    }, 3000);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      clearInterval(observeDelta);
    };
  }, []);

  // Safe opacity calculation (Weightless Monitor)
  const weight = state.output - state.consumption;
  const opacity = Math.max(0.1, Math.min(1.0, weight));
  const logStr = state.strikeLog.map(s => \`[\${s.p}:\${s.e}]\`).join(' ');

  return (
    <>
      <CentrifugeVisualizer pressure={state.pressure} strikeLog={state.strikeLog} />
      <div 
        id="sovereign-hud"
        style={{ opacity }}
        className="fixed bottom-[30px] right-[30px] text-[#00ff41] bg-black/95 p-4 border-2 border-[#00ff41] font-mono shadow-[0_0_15px_#00ff41] z-[100000] max-w-[450px] whitespace-pre-wrap break-words text-xs pointer-events-none"
      >
        <div className="border-b border-[#00ff41]/50 pb-1 mb-2">
          <strong>[1&lt;0&gt;1] STATE: {state.status}</strong>
        </div>
        <div>
          <strong>[y] PROPOSAL:</strong> <span className="text-[#00ff41]/90">{state.proposal}</span>
        </div>
        <div className="mt-3 pt-2 border-t border-[#00ff41]/30 text-[#f2ff00]/90 text-[10px] flex justify-between">
          <span>Entropy (rng): {state.rngNoise.toFixed(4)}</span>
          <span>Potential: 2</span>
        </div>
        <div className="mt-1 text-[#00ff41]/40 text-[9px] leading-tight opacity-50">
          LOG: {logStr || 'Watching...'}
        </div>
      </div>
    </>
  );
}