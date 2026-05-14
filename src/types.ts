export interface StrikeEntry {
  id: number;
  timestamp: number;
  message: string;
  type: 'collision' | 'proposal' | 'error' | 'cascade';
}

export type SovereignStatus =
  | 'AUTHENTICATED'
  | 'OBSERVING_PULSE'
  | 'ACTUALIZING_PROPOSAL'
  | 'DISCONNECTED';

export interface SovereignState {
  output: number;
  consumption: number;
  rngNoise: number;
  deltaDensity: number;
  status: SovereignStatus;
}

export interface SovereignEnvironment {
  state: SovereignState;
  observeDelta: () => void;
  ouroboros: () => void;
  generateMarketThought: () => string;
  renderSovereignReply: (proposal: string) => void;
  calculateWeight: () => number;
  forceInterference: () => void;
  shadowRoot?: string;
  metaReferences?: {
    gordonMetadata: {
      alias: string;
      persistence: 'shadow-root';
      lastBridgeStatus: SovereignStatus;
      updatedAt: number;
    };
  };
}

declare global {
  interface Window {
    SovereignEnvironment: SovereignEnvironment;
  }
}
