import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VantagePoint {
  id: string;
  x: number;
  y: number;
  stateId: string;
  type: 'FLAP' | 'ATTACK' | 'SYNC';
  timestamp: string;
}

export function VantagePointLattice({ isRunning, currentStateId }: { isRunning: boolean, currentStateId: string }) {
  const [views, setViews] = useState<VantagePoint[]>([]);

  // The 119 Hz pulse / 1.5s tick generates a View
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setViews(prev => {
        const types: ('FLAP' | 'ATTACK' | 'SYNC')[] = ['FLAP', 'FLAP', 'FLAP', 'SYNC', 'ATTACK'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        const newView: VantagePoint = {
          id: `${Date.now()}-${Math.random()}`,
          x: Math.random() * 90 + 5, // 5% to 95%
          y: Math.random() * 90 + 5,
          stateId: currentStateId,
          type,
          timestamp: new Date().toISOString().split('T')[1].slice(0, 12)
        };

        // Keep the last 20 views to maintain the holographic substrate without memory bloat
        return [...prev, newView].slice(-20);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isRunning, currentStateId]);

  const getColorForType = (type: string) => {
    switch (type) {
      case 'ATTACK': return 'border-rose-500/50 bg-rose-500/10 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]';
      case 'SYNC': return 'border-blue-500/50 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]';
      default: return 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {views.map((view) => (
          <motion.div
            key={view.id}
            initial={{ opacity: 0, scale: 0, z: -100 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`absolute w-32 backdrop-blur-sm border rounded-lg p-2 font-mono text-[8px] uppercase tracking-wider ${getColorForType(view.type)}`}
            style={{ 
              left: `${view.x}%`, 
              top: `${view.y}%`,
              transform: `translate(-50%, -50%)`
            }}
          >
            <div className="flex justify-between border-b border-current pb-1 mb-1 opacity-70">
              <span>{view.type}</span>
              <span>{view.timestamp}</span>
            </div>
            <div className="opacity-90">COORD: {view.x.toFixed(2)}x, {view.y.toFixed(2)}y</div>
            <div className="opacity-90">LENS: {view.stateId}</div>
            {view.type === 'ATTACK' && (
              <div className="mt-1 bg-current text-zinc-950 px-1 font-bold">LORE GENERATED</div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}