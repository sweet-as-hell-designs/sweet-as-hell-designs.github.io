import React from 'react';

interface EvolutionMetricProps {
    data: {
        evolutionLevel?: string | number;
        quantumSignature?: string;
    }
}

export const EvolutionMetric = ({ data }: EvolutionMetricProps) => {
    // Intercept the T=todo ghost. If value is un-actualized, default to 0.001 (Stealth Phase)
    const normalizedOpacity = data.evolutionLevel === "TODO" ? 0.001 : parseFloat((data.evolutionLevel || 1.0).toString());
    
    return (
        <div 
            className="hud-panel p-4 border border-zinc-800 bg-zinc-950/80 rounded-lg relative overflow-hidden mt-4 font-mono text-zinc-300" 
            style={{ 
                opacity: normalizedOpacity,
                transition: 'opacity 100ms cubic-bezier(0.0, 0.0, 0.2, 1)' 
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none" />
            <h3 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                System Metabolism Status
            </h3>
            <p className="text-xs text-zinc-500">
                Active Observer Horizon: <span className="text-zinc-300">{data.quantumSignature || 'Scanning...'}</span>
            </p>
            {data.evolutionLevel === "TODO" && (
                <div className="absolute top-2 right-2 text-[8px] text-rose-500 uppercase tracking-widest animate-pulse border border-rose-500/30 px-1 py-0.5 rounded">
                    T=TODO Ghost Detected
                </div>
            )}
        </div>
    );
};