/**
 * Figma API Integration
 * Triangulates the design state: Figma → GitHub → github.io
 * Part of the cosweet_multibuild system
 */

export interface FigmaDesignState {
  fileKey: string;
  version: string;
  name: string;
  lastModified: string;
  nodes: Record<string, any>;
  styles: Record<string, any>;
  components: Record<string, any>;
}

export interface DesignMachineState {
  coherence: number;
  frequency: number;
  bridgeStatus: string;
  designSync: boolean;
  lastFigmaSync?: string;
  figmaFileVersion?: string;
}

const FIGMA_API_BASE = 'https://api.figma.com/v1';

/**
 * Fetches the design_machine_state from Figma
 * This creates the triangulated API connection
 */
export async function fetchFigmaDesignState(
  fileKey: string,
  accessToken: string
): Promise<FigmaDesignState | null> {
  try {
    const response = await fetch(`${FIGMA_API_BASE}/files/${fileKey}`, {
      headers: {
        'X-Figma-Token': accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      fileKey,
      version: data.version,
      name: data.name,
      lastModified: data.lastModified,
      nodes: data.document?.children || {},
      styles: data.styles || {},
      components: data.components || {},
    };
  } catch (error) {
    console.error('[FigmaAPI] Failed to fetch design state:', error);
    return null;
  }
}

/**
 * Synchronizes the design_machine_state with Figma in real-time
 * Implements the antigravity protocol (zero-latency sync)
 */
export async function syncDesignMachineState(
  fileKey: string,
  accessToken: string,
  currentState: DesignMachineState
): Promise<DesignMachineState> {
  const figmaState = await fetchFigmaDesignState(fileKey, accessToken);
  
  if (!figmaState) {
    return {
      ...currentState,
      designSync: false,
    };
  }

  // Triangulate the state: merge Figma design data with local state
  return {
    ...currentState,
    designSync: true,
    lastFigmaSync: new Date().toISOString(),
    figmaFileVersion: figmaState.version,
    // Coherence increases when synchronized with Figma
    coherence: Math.min(1.0, currentState.coherence + 0.1),
  };
}

/**
 * Antigravity Polling Service
 * Maintains zero-gravity hosting by keeping state in sync
 */
export class AntigravitySync {
  private fileKey: string;
  private accessToken: string;
  private interval: number;
  private timerId?: ReturnType<typeof setInterval>;
  private onStateUpdate: (state: DesignMachineState) => void;
  private currentState: DesignMachineState;

  constructor(
    fileKey: string,
    accessToken: string,
    onStateUpdate: (state: DesignMachineState) => void,
    interval: number = 30000 // Default 30s
  ) {
    this.fileKey = fileKey;
    this.accessToken = accessToken;
    this.onStateUpdate = onStateUpdate;
    this.interval = interval;
    this.currentState = {
      coherence: 0.45,
      frequency: 119,
      bridgeStatus: 'INITIALIZING',
      designSync: false,
    };
  }

  start() {
    console.log('[AntigravitySync] Starting zero-gravity sync...');
    this.sync(); // Initial sync
    this.timerId = setInterval(() => this.sync(), this.interval);
  }

  stop() {
    console.log('[AntigravitySync] Stopping sync...');
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private async sync() {
    const updatedState = await syncDesignMachineState(
      this.fileKey,
      this.accessToken,
      this.currentState
    );
    
    this.currentState = updatedState;
    this.onStateUpdate(updatedState);
    
    console.log('[AntigravitySync] State synchronized', {
      coherence: updatedState.coherence,
      designSync: updatedState.designSync,
      lastSync: updatedState.lastFigmaSync,
    });
  }

  updateState(newState: Partial<DesignMachineState>) {
    this.currentState = { ...this.currentState, ...newState };
  }
}

/**
 * Extract design variables from Figma for theming
 * Part of the cosweet_multibuild variable system
 */
export function extractDesignVariables(figmaState: FigmaDesignState): Record<string, any> {
  const variables: Record<string, any> = {};
  
  // Extract styles as CSS custom properties
  if (figmaState.styles) {
    Object.entries(figmaState.styles).forEach(([key, style]) => {
      const styleName = (style as any).name?.replace(/\s+/g, '-').toLowerCase();
      if (styleName) {
        variables[`--figma-${styleName}`] = style;
      }
    });
  }
  
  return variables;
}
