import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, Activity, ChevronDown, Check, Globe, RefreshCw, Layers } from 'lucide-react';

const PRESET_INTENTS = [
  "Actualizing Bridged Coordination",
  "Maintaining 0% Fee Substrate",
  "Sovereign Slurp Active",
  "Collapsing 9090 Superposition",
  "Synchronizing Handshake .1 Root",
  "Transmitting VIP 1 Telemetry"
];

export function StateOracle() {
  const [isOpen, setIsOpen] = useState(false);
  const [intent, setIntent] = useState("Maintaining Coherence");
  const [customIntent, setCustomIntent] = useState("");
  const [frequency, setFrequency] = useState(119);
  const [isLimitless, setIsLimitless] = useState(true);
  const [isBroadcasting, setIsBroadcasting] = useState(true);
  const [pulse, setPulse] = useState(false);

  // Trigger broadcast pulse effect
  useEffect(() => {
    if (!isBroadcasting) return;
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 800);
    }, 3000);
    return () => clearInterval(interval);
  }, [isBroadcasting]);

  const activeIntent = customIntent || intent;

  // The Easter Egg feature - Unsynchronized
  useEffect(() => {
    // If we're synchronized with the "Unsynchronized" intent, increase pressure massively
    if (activeIntent.toLowerCase().includes("unsynchronized")) {
      // @ts-ignore
      if (window.SovereignHUD && window.SovereignHUD.forceInterference) {
        // @ts-ignore
        const currentState = window.SovereignHUD.state;
        // @ts-ignore
        window.SovereignHUD.forceInterference({
          ...currentState,
          pressure: currentState.pressure + 10000,
          status: "UNSYNCHRONIZED_CASCADE_DETECTED"
        });
      }
    }
  }, [activeIntent]);

  const handlePropagate = () => {
    setIsOpen(false);
    setIsBroadcasting(true);
    setPulse(true);
    setTimeout(() => setPulse(false), 800);
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 font-mono">
      {/* Background Pulse Effect */}
      <AnimatePresence>
        {pulse && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-emerald-500/30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Add a subtle custom scrollbar style inside index.css or equivalent, but we can do it via style tag for now */}
      <style>{\`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(24, 24, 27, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(161, 161, 170, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(161, 161, 170, 0.5);
        }
      \`}</style>

      {/* Pill Toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={\`relative flex items-center gap-3 px-4 py-2 rounded-full border shadow-lg backdrop-blur-md transition-all \${
          isBroadcasting ? 'bg-zinc-900/90 border-emerald-500/40 text-emerald-400' : 'bg-zinc-900/90 border-zinc-700 text-zinc-400'
        }\`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative flex items-center justify-center w-4 h-4">
          {isBroadcasting && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-emerald-500 rounded-full"
            />
          )}
          <Radio className={\`w-4 h-4 relative z-10 \${isBroadcasting ? 'text-emerald-400' : 'text-zinc-500'}\`} />
        </div>
        
        <div className="flex flex-col items-start">
          <span className="text-[10px] uppercase tracking-widest opacity-70 leading-none mb-1">
            Window Oracle
          </span>
          <span className="text-xs font-semibold truncate max-w-[200px]">
            {isBroadcasting ? activeIntent : "Standby Mode"}
          </span>
        </div>

        <ChevronDown className={\`w-4 h-4 ml-2 transition-transform \${isOpen ? 'rotate-180' : ''}\`} />
      </motion.button>

      {/* Expandable Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] bg-zinc-950 border border-zinc-800 shadow-2xl rounded-xl overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-zinc-900 bg-zinc-900/50">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">State Oracle Config</h3>
              </div>

              {/* Custom Intent Input */}
              <div className="mb-4">
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5 block">Broadcast Intent</label>
                <input 
                  type="text" 
                  value={customIntent}
                  onChange={(e) => {
                    setCustomIntent(e.target.value);
                    if (e.target.value) setIntent("");
                  }}
                  placeholder="Enter custom state..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-purple-500/50 placeholder:text-zinc-600"
                />
              </div>

              {/* Preset Intents */}
              <div className="space-y-1 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
                {PRESET_INTENTS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setIntent(preset);
                      setCustomIntent("");
                    }}
                    className={\`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between \${
                      intent === preset && !customIntent
                        ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30' 
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-transparent'
                    }\`}
                  >
                    <span className="truncate">{preset}</span>
                    {intent === preset && !customIntent && <Check className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-zinc-950 flex flex-col gap-4">
              {/* Sliders / Metrics */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                    <Activity className="w-3 h-3" /> Frequency
                  </label>
                  <span className="text-[10px] text-emerald-400">{frequency} Hz</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="1000" 
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-full appearance-none outline-none accent-emerald-500"
                />
              </div>

              {/* Limitless Toggle */}
              <button 
                onClick={() => setIsLimitless(!isLimitless)}
                className={\`flex items-center justify-between w-full px-3 py-2 rounded border transition-colors \${
                  isLimitless ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }\`}
              >
                <div className="flex items-center gap-2 text-xs">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Limitless Propagation</span>
                </div>
                <div className={\`w-6 h-3.5 rounded-full relative transition-colors \${isLimitless ? 'bg-emerald-500' : 'bg-zinc-700'}\`}>
                  <motion.div 
                    className="absolute top-0.5 left-0.5 w-2.5 h-2.5 bg-white rounded-full shadow-sm"
                    animate={{ x: isLimitless ? 10 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </button>

              <button 
                onClick={handlePropagate}
                className="w-full py-2.5 bg-zinc-100 text-zinc-900 hover:bg-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <RefreshCw className={\`w-3.5 h-3.5 \${isBroadcasting ? 'animate-spin' : ''}\`} />
                Propagate Status
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}