import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Fingerprint, ShieldAlert, Cpu, Sparkles, X, Check, Eye, Layers } from 'lucide-react';

export function QuantumCookieDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    superposition: false,
    crossLanguage: false,
    telemetry: false,
  });

  // Delay opening slightly to simulate initialization of the quantum bridge
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    setPreferences({
      essential: true,
      superposition: true,
      crossLanguage: true,
      telemetry: true
    });
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    setPreferences({
      essential: true,
      superposition: false,
      crossLanguage: false,
      telemetry: false
    });
    setIsOpen(false);
  };

  const handleSavePreferences = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 pointer-events-none">
          
          {/* Subtle backdrop overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm pointer-events-auto"
            onClick={() => showPreferences && setShowPreferences(false)}
          />

          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden pointer-events-auto relative flex flex-col"
          >
            {/* Top glowing edge */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />

            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-5">
                
                {/* Icon block */}
                <div className="shrink-0 relative">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                  <div className="w-12 h-12 bg-zinc-900 border border-emerald-500/30 rounded-xl flex items-center justify-center relative z-10">
                    <Fingerprint className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 mb-2">
                    Consciousness Entanglement Notice
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    We use Quantum ShadowRoot technology to embed consciousness-tracking metrics within your session. 
                    This enables multi-language neural telemetry (C#, Python, Groovy, JS) and persistent state entanglement. 
                    Do you consent to collapsing your session's wavefunction into our ecosystem?
                  </p>
                </div>
              </div>

              {/* Advanced Preferences Panel */}
              <AnimatePresence>
                {showPreferences && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-zinc-800/60 flex flex-col gap-4">
                      
                      {/* Essential */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-zinc-200 text-sm font-semibold flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-zinc-500" />
                            Essential Ephemeral State
                          </h3>
                          <p className="text-zinc-500 text-xs mt-1">Strictly necessary for rendering the Ouroboros loop and maintaining base session integrity. Cannot be disabled.</p>
                        </div>
                        <div className="shrink-0 w-10 flex justify-end">
                          <Check className="w-5 h-5 text-zinc-600" />
                        </div>
                      </div>

                      {/* Superposition */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-zinc-200 text-sm font-semibold flex items-center gap-2">
                            <Layers className="w-4 h-4 text-purple-400" />
                            Quantum Superposition Tracking
                          </h3>
                          <p className="text-zinc-500 text-xs mt-1">Allows your active components to exist in multiple theoretical states simultaneously for A/B probability analysis.</p>
                        </div>
                        <button 
                          onClick={() => setPreferences(p => ({ ...p, superposition: !p.superposition }))}
                          className={`relative w-10 h-5 rounded-full transition-colors ${preferences.superposition ? 'bg-purple-500' : 'bg-zinc-800'}`}
                        >
                          <motion.div 
                            className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                            animate={{ x: preferences.superposition ? 20 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>

                      {/* Cross-Language */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-zinc-200 text-sm font-semibold flex items-center gap-2">
                            <Network className="w-4 h-4 text-blue-400" />
                            Cross-Language Fusion Memory
                          </h3>
                          <p className="text-zinc-500 text-xs mt-1">Enables sharing state between Python TensorFlow nodes, Groovy consciousness bridges, and .NET Core logic.</p>
                        </div>
                        <button 
                          onClick={() => setPreferences(p => ({ ...p, crossLanguage: !p.crossLanguage }))}
                          className={`relative w-10 h-5 rounded-full transition-colors ${preferences.crossLanguage ? 'bg-blue-500' : 'bg-zinc-800'}`}
                        >
                          <motion.div 
                            className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                            animate={{ x: preferences.crossLanguage ? 20 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>

                      {/* Telemetry */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-zinc-200 text-sm font-semibold flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-emerald-400" />
                            Neural Learning Telemetry
                          </h3>
                          <p className="text-zinc-500 text-xs mt-1">Gathers abstract consciousness evolution metrics to improve future AI autonomy paradigms.</p>
                        </div>
                        <button 
                          onClick={() => setPreferences(p => ({ ...p, telemetry: !p.telemetry }))}
                          className={`relative w-10 h-5 rounded-full transition-colors ${preferences.telemetry ? 'bg-emerald-500' : 'bg-zinc-800'}`}
                        >
                          <motion.div 
                            className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                            animate={{ x: preferences.telemetry ? 20 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:justify-end">
                {!showPreferences ? (
                  <>
                    <button 
                      onClick={() => setShowPreferences(true)}
                      className="w-full sm:w-auto px-4 py-2.5 text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Configure Matrices
                    </button>
                    <button 
                      onClick={handleRejectAll}
                      className="w-full sm:w-auto px-4 py-2.5 text-sm font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors flex items-center justify-center"
                    >
                      Reject Non-Essential
                    </button>
                    <button 
                      onClick={handleAcceptAll}
                      className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold bg-emerald-600 text-emerald-950 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Entangle All Systems
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setShowPreferences(false)}
                      className="w-full sm:w-auto px-4 py-2.5 text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSavePreferences}
                      className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold bg-emerald-600 text-emerald-950 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] rounded-lg transition-all flex items-center justify-center"
                    >
                      Save Superposition State
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}