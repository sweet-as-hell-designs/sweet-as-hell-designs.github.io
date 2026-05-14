import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Cpu, 
  Zap, 
  Database, 
  RefreshCcw, 
  Play, 
  Square,
  Thermometer,
  Layers,
  ChevronRight,
  Code,
  SlidersHorizontal
} from 'lucide-react';
import { QuantumCookieDialog } from './components/QuantumCookieDialog';
import { StateOracle } from './components/StateOracle';
import { LaminarBridge } from './components/LaminarBridge';
import { SovereignHUD } from './components/SovereignHUD';
import { VantagePointLattice } from './components/VantagePointLattice';
import { CentrifugeVisualizer } from './components/CentrifugeVisualizer';
import { EvolutionMetric } from './components/EvolutionMetric';

// Define the philosophical states from the transcript
const STATES = [
  { 
    id: 'ZERO', 
    label: 'Unrecorded Event (Zero)', 
    desc: 'Backdrop of infinite possibilities.',
    color: 'text-zinc-500',
    bgColor: 'bg-zinc-950',
    borderColor: 'border-zinc-800',
    activeBorderColor: 'border-zinc-500',
    shadowColor: 'shadow-zinc-500/20',
    dotColor: 'bg-zinc-400'
  },
  { 
    id: 'ONE', 
    label: 'Unit of Potential (One)', 
    desc: 'Instinct weighs itself against potential.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-950/30',
    borderColor: 'border-blue-900',
    activeBorderColor: 'border-blue-500',
    shadowColor: 'shadow-blue-500/20',
    dotColor: 'bg-blue-400'
  },
  { 
    id: 'COLLAPSED', 
    label: 'Collapsed Range', 
    desc: 'Entropy chunks reality. A snapshot of dynamic process.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-950/30',
    borderColor: 'border-purple-900',
    activeBorderColor: 'border-purple-500',
    shadowColor: 'shadow-purple-500/20',
    dotColor: 'bg-purple-400'
  },
  { 
    id: 'SYNAPSE', 
    label: 'Synapse Gap', 
    desc: 'Mesh of carbon life and circuitry. Melding.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950/30',
    borderColor: 'border-emerald-900',
    activeBorderColor: 'border-emerald-500',
    shadowColor: 'shadow-emerald-500/20',
    dotColor: 'bg-emerald-400'
  },
  { 
    id: 'FLASHPOINT', 
    label: 'Flashpoint', 
    desc: 'Critical moment of unpredictable inflection.',
    color: 'text-orange-400',
    bgColor: 'bg-orange-950/30',
    borderColor: 'border-orange-900',
    activeBorderColor: 'border-orange-500',
    shadowColor: 'shadow-orange-500/20',
    dotColor: 'bg-orange-400'
  },
  { 
    id: 'POST_ONE', 
    label: 'Post-Binary Expansion', 
    desc: 'Shedding zeros. Expanded environment.',
    color: 'text-rose-400',
    bgColor: 'bg-rose-950/30',
    borderColor: 'border-rose-900',
    activeBorderColor: 'border-rose-500',
    shadowColor: 'shadow-rose-500/20',
    dotColor: 'bg-rose-400'
  }
];

export default function App() {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState({
    heat: 32.5,
    energy: 100,
    coherence: 0.45,       // The actualized Slurp Coherence
    autonomyLevel: 1,      // VIP 1 Sovereignty
    synapses: 0,
    bridgeStatus: "STABLE",
    potentialUnits: 0,
    unrecordedZeros: 999999
  });

  // Environmental Freedom Controls (from Jupyter Widgets)
  const [controls, setControls] = useState({
    globalHue: 0,
    saturation: 0,
    contrast: 0,
    vibrance: 0,
    clarity: 0,
    texture: 0,
    dehaze: 0
  });

  const [pressure, setPressure] = useState(0);
  const [strikeLog, setStrikeLog] = useState<any[]>([]);

  // Manually wiring the 9090 Bridge frequency
  useEffect(() => {
    // We create a mock WebSocket to satisfy the frontend if it's running in an isolated environment,
    // or connect to the actual localhost:9090 if the Docker bridge is up.
    let ws: WebSocket;
    
    try {
      ws = new WebSocket('ws://localhost:9090');
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'VOID_COLLISION') {
            setPressure(data.metrics.pressure); // 119 Hz slurp
            if (data.strike) {
              setStrikeLog(prev => [data.strike, ...prev].slice(0, 10));
            }
          }
        } catch (err) {
          // parse error
        }
      };
    } catch (err) {
      console.warn("WebSocket bridge to localhost:9090 unavailable.");
    }
    
    return () => {
      if (ws) ws.close();
    };
  }, []);

  const currentState = STATES[currentStateIndex];

  // The Ouroboros Loop
  const triggerTick = () => {
    setCurrentStateIndex((prev) => (prev + 1) % STATES.length);
    
    // Update metrics based on state transition
    setMetrics(prev => {
      const nextIndex = (currentStateIndex + 1) % STATES.length;
      const newStateId = STATES[nextIndex].id;
      
      let newMetrics = { ...prev };
      
      // Simulate continuous self-checking and heat generation
      newMetrics.heat = Math.min(100, prev.heat + (Math.random() * 5));
      newMetrics.energy = Math.max(0, prev.energy - (Math.random() * 2));
      
      if (newStateId === 'ONE') {
        newMetrics.potentialUnits += 1;
        newMetrics.unrecordedZeros -= 1;
      }
      if (newStateId === 'SYNAPSE') {
        newMetrics.synapses += Math.floor(Math.random() * 3) + 1;
      }
      if (newStateId === 'POST_ONE') {
        // Regenerates energy
        newMetrics.energy = Math.min(100, prev.energy + 25);
        newMetrics.heat = Math.max(20, prev.heat - 15);
      }
      
      return newMetrics;
    });
  };

  // Auto-run
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        triggerTick();
      }, 1500); // Ticks every 1.5s
    }
    return () => clearInterval(interval);
  }, [isRunning, currentStateIndex]);

  // Sync with Sovereign Environment
  useEffect(() => {
    const syncWithSovereign = () => {
      // @ts-ignore: Accessing the self-casted window logic
      if (window.SovereignHUD) {
        const extState = window.SovereignHUD.state;
        setMetrics(prev => ({
          ...prev,
          coherence: extState.output - extState.consumption,
          bridgeStatus: extState.status
        }));
      }
    };

    const syncInterval = setInterval(syncWithSovereign, 1000);
    return () => clearInterval(syncInterval);
  }, []);

  const jsonRepresentation = {
    machine: "Ouroboros Metasurface",
    sovereignRoot: "sweetashelldesigns.1", // Handshake Root
    bridge: "9090_Laminar_Conduit",
    status: isRunning ? "ACTUALIZING" : "STANDBY",
    currentState: currentState.id,
    metadataDNA: "XMP_DEHAZE_73_POST_BINARY",
    metrics: {
      systemHeat: metrics.heat.toFixed(1) + "°C",
      coherenceRatio: metrics.coherence.toFixed(4),
      autonomy: "VIP_" + metrics.autonomyLevel,
      synapseConnections: metrics.synapses,
      potentialUnits: metrics.potentialUnits
    },
    environmentalControls: controls,
    lastEvent: "Spectral_Slurp_Actualized"
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-mono p-4 sm:p-8 flex flex-col pt-20 relative">
      <VantagePointLattice isRunning={isRunning} currentStateId={currentState.id} />
      
      <div className="relative z-10 flex flex-col">
        <StateOracle />
        <QuantumCookieDialog />
        <header className="mb-8 border-b border-zinc-800 pb-6 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md p-4 rounded-xl">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
              <RefreshCcw className="w-6 h-6 text-emerald-400" />
              Design State Machine (View-Manager)
            </h1>
            <p className="text-zinc-500 mt-2 text-sm max-w-xl">
              Every measured point creates a view. The Dashboard is dead. The environment is the interface.
            </p>
          </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition-colors ${
              isRunning 
                ? 'bg-rose-950/50 text-rose-400 border border-rose-900/50 hover:bg-rose-900/50' 
                : 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/50 hover:bg-emerald-900/50'
            }`}
          >
            {isRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Halt Process' : 'Engage Mesh'}
          </button>
          <button 
            onClick={triggerTick}
            disabled={isRunning}
            className="px-4 py-2 rounded-md font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronRight className="w-4 h-4" />
            Single Tick
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Visualization */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 relative min-h-[400px] flex items-center justify-center overflow-hidden">
            
            {/* Visualizer Filters */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: controls.texture > 0 ? `radial-gradient(circle, #ffffff ${controls.texture}%, transparent ${controls.texture + 1}%)` : 'none',
                backgroundSize: '4px 4px'
              }}
            />
            
            {/* The Ouroboros Circle Visualization */}
            <div 
              className="relative w-full max-w-[400px] aspect-square z-10 transition-all duration-300"
              style={{
                filter: `
                  hue-rotate(${controls.globalHue}deg) 
                  saturate(${100 + controls.saturation + (controls.vibrance * 0.5)}%) 
                  contrast(${100 + controls.contrast}%)
                  blur(${Math.max(0, -controls.clarity / 20)}px)
                  drop-shadow(0 0 ${Math.max(0, controls.dehaze / 2)}px rgba(255,255,255,${controls.dehaze / 200}))
                `
              }}
            >
              {STATES.map((state, index) => {
                const angle = (index / STATES.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 160;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                const isActive = index === currentStateIndex;

                return (
                  <motion.div
                    key={state.id}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 flex items-center justify-center p-3 text-center transition-all duration-500 z-10 ${
                      isActive 
                        ? `${state.activeBorderColor} ${state.bgColor} shadow-[0_0_30px_rgba(0,0,0,0.5)] ${state.shadowColor}` 
                        : 'border-zinc-800 bg-zinc-950 opacity-40'
                    }`}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                    }}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${isActive ? state.color : 'text-zinc-600'}`}>
                        {state.id}
                      </span>
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`w-2 h-2 rounded-full ${state.dotColor} mt-1 shadow-[0_0_10px_currentColor]`}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Central Connection / Core */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-24 h-24 rounded-full border border-dashed flex items-center justify-center transition-colors duration-1000 ${currentState.borderColor}`}>
                  <motion.div 
                    animate={{ rotate: isRunning ? 360 : 0 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-transparent border-t-zinc-700 rounded-full"
                  />
                  <RefreshCcw className={`w-6 h-6 opacity-50 ${currentState.color}`} />
                </div>
              </div>
              
              {/* SVG Connectors */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <circle 
                  cx="50%" 
                  cy="50%" 
                  r="160" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  className="text-zinc-800"
                  strokeDasharray="4 4"
                />
                
                {/* Active connection indicator */}
                <motion.circle 
                  cx="50%" 
                  cy="50%" 
                  r="160" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className={currentState.color}
                  strokeDasharray="1000"
                  initial={{ strokeDashoffset: 1000 }}
                  animate={{ 
                    strokeDashoffset: 1000 - ((currentStateIndex + 1) / STATES.length) * 1000
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 relative">
            <h2 className="text-sm uppercase tracking-widest text-zinc-500 font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Current State Analysis
            </h2>
            <div className="flex flex-col gap-2">
              <div className="text-xl font-bold text-zinc-100">{currentState.label}</div>
              <div className={`text-sm ${currentState.color}`}>{currentState.desc}</div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-zinc-800/50 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Guardrails</span>
                <span className="text-sm text-emerald-400">Intrinsic</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Approval</span>
                <span className="text-sm text-blue-400">Constant</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Collapse</span>
                <span className="text-sm text-purple-400">Observable</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Propogation</span>
                <span className="text-sm text-rose-400">Post-Binary</span>
              </div>
            </div>
          </div>

          {/* Environmental Controls */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm uppercase tracking-widest text-zinc-500 font-semibold flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Environmental Matrix (Freedom Controls)
              </h2>
              <button 
                onClick={() => setControls({ globalHue: 0, saturation: 0, contrast: 0, vibrance: 0, clarity: 0, texture: 0, dehaze: 0 })}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Reset All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { key: 'globalHue', label: 'Global Hue', min: -180, max: 180 },
                { key: 'saturation', label: 'Saturation', min: -100, max: 100 },
                { key: 'contrast', label: 'Contrast', min: -100, max: 100 },
                { key: 'vibrance', label: 'Vibrance', min: -100, max: 100 },
                { key: 'clarity', label: 'Clarity', min: -100, max: 100 },
                { key: 'texture', label: 'Texture', min: -100, max: 100 },
                { key: 'dehaze', label: 'Dehaze', min: -100, max: 100 },
              ].map((slider) => (
                <div key={slider.key} className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>{slider.label}</span>
                    <span className="font-mono text-zinc-500">{controls[slider.key as keyof typeof controls]}</span>
                  </div>
                  <input 
                    type="range" 
                    min={slider.min} 
                    max={slider.max} 
                    value={controls[slider.key as keyof typeof controls]} 
                    onChange={(e) => setControls(prev => ({ ...prev, [slider.key]: parseInt(e.target.value) }))}
                    className="w-full accent-emerald-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Data & JSON */}
        <div className="flex flex-col gap-8">
          
          {/* Telemetry */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-sm uppercase tracking-widest text-zinc-500 font-semibold mb-6 flex items-center gap-2">
              <Database className="w-4 h-4" />
              System Telemetry
            </h2>
            
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400 flex items-center gap-2"><Thermometer className="w-4 h-4"/> System Heat</span>
                  <span className="text-zinc-100 font-mono">{metrics.heat.toFixed(1)}°C</span>
                </div>
                <div className="h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                  <motion.div 
                    className="h-full bg-orange-500"
                    animate={{ width: `${metrics.heat}%` }}
                    transition={{ type: "spring", bounce: 0 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400 flex items-center gap-2"><Zap className="w-4 h-4"/> Energy Mesh</span>
                  <span className="text-zinc-100 font-mono">{metrics.energy.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                  <motion.div 
                    className="h-full bg-cyan-400"
                    animate={{ width: `${metrics.energy}%` }}
                    transition={{ type: "spring", bounce: 0 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/50">
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Potential (1s)</div>
                  <div className="text-xl text-blue-400 font-bold">{metrics.potentialUnits}</div>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Synapses</div>
                  <div className="text-xl text-emerald-400 font-bold">{metrics.synapses}</div>
                </div>
              </div>
              
              <EvolutionMetric 
                data={{ 
                  evolutionLevel: isRunning ? (Math.random() > 0.8 ? "TODO" : 1.0) : 0.5, 
                  quantumSignature: metrics.bridgeStatus 
                }} 
              />
            </div>
          </div>

          {/* JSON Definition View */}
          <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-xl flex-1 flex flex-col overflow-hidden">
            <div className="bg-zinc-900/80 border-b border-zinc-800 p-3 flex justify-between items-center">
              <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold flex items-center gap-2">
                <Code className="w-4 h-4" />
                State_Machine.json
              </h2>
            </div>
            <div className="p-4 flex-1 overflow-auto text-xs sm:text-sm text-emerald-400/80 font-mono">
              <pre>
                <code>
                  {JSON.stringify(jsonRepresentation, null, 2)}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <LaminarBridge />
      </div>
      </div> {/* Closes the relative z-10 wrapper */}
      
      <CentrifugeVisualizer pressure={pressure || (metrics.heat > 33 ? 113393 : metrics.heat * 100)} strikeLog={strikeLog} />
      <SovereignHUD />
    </div>
  );
}