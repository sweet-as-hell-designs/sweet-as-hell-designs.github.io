import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitBranch, 
  Globe, 
  ShieldAlert, 
  Terminal, 
  Wifi, 
  Radio, 
  Cpu, 
  PenTool, 
  Server
} from 'lucide-react';

const ATTACK_LORE = [
  { type: 'Logical', source: 'Sentinel Node A', desc: 'Attempted to spoof UUID.', outcome: 'Filtered by Density', time: '1s ago', color: 'text-amber-400' },
  { type: 'Corrosive', source: 'Legacy Politics', desc: 'Introduced Entropy/Dissonance.', outcome: 'Broadcasted as Lore', time: '12s ago', color: 'text-rose-400' },
  { type: 'Logical', source: 'Arbitrator Script', desc: 'High-frequency front-run.', outcome: 'Failed to Snap', time: '45s ago', color: 'text-amber-400' }
];

export function LaminarBridge() {
  const [pulse, setPulse] = useState(false);
  const [attacks, setAttacks] = useState(ATTACK_LORE);

  // The 1 and done flap / 119 Hz heartbeat simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
      
      // Occasionally add a new attack to the broadcast lore
      if (Math.random() > 0.7) {
        const isLogical = Math.random() > 0.5;
        const newAttack = {
          type: isLogical ? 'Logical' : 'Corrosive',
          source: isLogical ? 'Sentinel Probe' : 'Bicycle Path Politics',
          desc: isLogical ? 'Attempted heavy-logic exploit.' : 'Attempted to scuttle legitimacy.',
          outcome: isLogical ? 'Filtered by Density' : 'Broadcasted as Lore',
          time: 'Just now',
          color: isLogical ? 'text-amber-400' : 'text-rose-400'
        };
        setAttacks(prev => [newAttack, ...prev.slice(0, 4)]);
      }
    }, 1500); // Tied to the 1.5s tick (1 and done flap)
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 border border-zinc-800 bg-zinc-900/50 rounded-xl p-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMzZjNmNDYiLz48L3N2Zz4=')] opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-3">
              <GitBranch className="w-5 h-5 text-purple-400" />
              Laminar Deployment Bridge (9090 Bridge)
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Figma-to-GH Trinity • Zero-Gravity Hosting • Constant Separation Record
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-800">
              <Radio className={\`w-3 h-3 \${pulse ? 'text-emerald-400' : 'text-zinc-600'} transition-colors\`} />
              <span className="text-zinc-400">FREQ:</span> 
              <span className="text-emerald-400">119 Hz</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-800">
              <span className="text-zinc-400">COHERENCE:</span> 
              <span className="text-blue-400">0.45 (Stable)</span>
            </div>
          </div>
        </div>

        {/* The Trinity Pipeline Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Animated Connecting Lines */}
          <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-px bg-zinc-800 -translate-y-1/2 z-0">
            <motion.div 
              className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              animate={{ left: ['-33%', '133%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Node 1: Figma Canvas */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5 relative z-10 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-orange-950/50 border border-orange-900/50 flex items-center justify-center mb-3">
              <PenTool className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">Figma Canvas</h3>
            <p className="text-xs text-zinc-500 mt-1">The Oracle's Canvas</p>
            <div className="mt-3 text-[10px] text-orange-400/80 uppercase">Polarized Intent</div>
          </div>

          {/* Node 2: GitHub Vault */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5 relative z-10 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mb-3">
              <Server className="w-6 h-6 text-zinc-300" />
            </div>
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">GitHub Vault</h3>
            <p className="text-xs text-zinc-500 mt-1">The Metal-Bound Record</p>
            <div className="mt-3 text-[10px] text-zinc-400 uppercase">Structural Immunity</div>
          </div>

          {/* Node 3: github.io Atmosphere */}
          <div className="bg-zinc-950 border-2 border-purple-900/50 rounded-lg p-5 relative z-10 flex flex-col items-center text-center shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            <div className="w-12 h-12 rounded-full bg-purple-950/50 border border-purple-500 flex items-center justify-center mb-3 relative">
              <motion.div 
                animate={{ scale: pulse ? 1.4 : 1, opacity: pulse ? 0 : 0.5 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-full bg-purple-500"
              />
              <Globe className="w-6 h-6 text-purple-400 relative z-10" />
            </div>
            <h3 className="text-sm font-bold text-purple-100 uppercase tracking-widest">github.io</h3>
            <p className="text-xs text-purple-400/60 mt-1">The Broadcast Atmosphere</p>
            <div className="mt-3 text-[10px] text-purple-400 uppercase font-bold tracking-wider">Zero-Gravity Hosting</div>
          </div>

        </div>

        {/* Attack Lore Broadcast Panel */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 justify-center">
            <h3 className="text-sm text-zinc-300 uppercase tracking-widest font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              Hostile Substrate Validation
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              In the legacy internet, an attack is a failure. In the Post-Binary Reach, an attack is the energy harvested to trigger the Snap. We broadcast attacks to validate the Bedrock. Structural Integrity is a law of nature the attack cannot rewrite.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 h-48 overflow-y-auto font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-500 mb-3 pb-2 border-b border-zinc-800/50 uppercase tracking-widest text-[10px]">
              <Terminal className="w-3 h-3" />
              Live Lore Broadcast (Attacks & Work)
            </div>
            <AnimatePresence>
              {attacks.map((attack, idx) => (
                <motion.div 
                  key={idx + attack.time}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-3 last:mb-0 flex flex-col gap-1 border-l-2 border-zinc-800 pl-3"
                  style={{ borderLeftColor: attack.type === 'Logical' ? '#fbbf24' : '#fb7185' }}
                >
                  <div className="flex justify-between items-center text-[10px]">
                    <span className={attack.color}>[{attack.type} Displacement]</span>
                    <span className="text-zinc-600">{attack.time}</span>
                  </div>
                  <div className="text-zinc-300">
                    <span className="text-zinc-500">Source:</span> {attack.source}
                  </div>
                  <div className="text-zinc-400">
                    {attack.desc} <span className="text-emerald-400 font-bold ml-2">→ {attack.outcome}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}