import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Strike {
  p: number;
  e: string;
  t: number;
  isHostile?: boolean;
  x?: number;
  y?: number;
}

interface CentrifugeVisualizerProps {
  pressure: number;
  strikeLog: Strike[];
}

export function CentrifugeVisualizer({ pressure, strikeLog }: CentrifugeVisualizerProps) {
  // Tie the pressure variable directly to the rotation speed and opacity.
  const baseRotationSpeed = Math.min(pressure / 1000, 360); 
  const isHighPressure = pressure > 10000;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
      <AnimatePresence>
        {strikeLog.map((strike, i) => {
          // Calculate dynamic properties based on the strike and pressure
          // We map entropy (e) to position and scale
          const entropy = parseFloat(strike.e);
          const isHostile = entropy > 0.85; // High entropy simulates "Red-Shift Attacks"
          const x = strike.x || (entropy * 100); 
          const y = strike.y || ((parseFloat(strike.e.split('').reverse().join('')) * 100) % 100);
          
          return (
            <motion.div
              key={`\${strike.p}-\${strike.t}`}
              initial={{ opacity: 0, scale: 0.1, rotate: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0.1, 2 + entropy, 0.1], 
                rotate: 360 + baseRotationSpeed
              }}
              exit={{ opacity: 0, scale: 0, filter: 'blur(20px)' }}
              transition={{ 
                duration: isHostile ? 0.5 : 2 + (1 - entropy),
                ease: "circOut" 
              }}
              className="absolute flex items-center justify-center"
              style={{
                left: `\${x}%`,
                top: `\${y}%`,
                transform: `translate(-50%, -50%)`
              }}
            >
              {/* Geometric Lens */}
              <div 
                className={`relative w-48 h-48 border-[0.5px] flex items-center justify-center
                  \${isHostile 
                    ? 'border-rose-500/80 bg-rose-500/10 shadow-[0_0_40px_rgba(244,63,94,0.5)]' 
                    : 'border-[#00ff41]/30 bg-[#00ff41]/5 shadow-[0_0_20px_rgba(0,255,65,0.2)]'
                  } 
                  backdrop-blur-md rounded-full`}
              >
                {/* Inner Hexagon / Wireframe */}
                <div className={`absolute inset-2 border border-dashed rounded-full animate-[spin_3s_linear_infinite] \${isHostile ? 'border-rose-500/50' : 'border-[#00ff41]/30'}`} />
                <div className={`absolute inset-6 border border-dotted rounded-full animate-[spin_2s_linear_infinite_reverse] \${isHostile ? 'border-rose-400/50' : 'border-[#00ff41]/40'}`} />
                
                <div className={`text-[10px] font-mono font-bold tracking-widest text-center
                  \${isHostile ? 'text-rose-400' : 'text-[#00ff41]/80'}`}
                >
                  {isHostile ? (
                    <div className="flex flex-col items-center">
                      <span className="animate-pulse">HOSTILE</span>
                      <span className="text-[8px]">INTERFERENCE</span>
                      <span>{strike.p}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span>LENS</span>
                      <span className="text-[8px]">SYNC</span>
                      <span>{strike.p}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Background ambient pulse based on pressure */}
      <motion.div 
        className="absolute inset-0 mix-blend-screen pointer-events-none"
        animate={{
          backgroundColor: isHighPressure ? 'rgba(0, 255, 65, 0.02)' : 'rgba(0, 0, 0, 0)'
        }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
      />
    </div>
  );
}