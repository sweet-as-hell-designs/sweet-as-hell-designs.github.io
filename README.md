# Sweet As Hell Designs — Triangulated Design State Machine

A Figma-synced design state machine with **antigravity UI**, **zero-gravity hosting**, and **cosweet_multibuild** system. Built with **React + TypeScript + Vite**, deployed to GitHub Pages.

## 🔺 The Trinity (Triangulated API)

```
Figma (Design State) → GitHub (Version Control) → github.io (Zero-Gravity Hosting)
```

The **design_machine_state** synchronizes with Figma in real-time via the Antigravity Sync protocol, creating a triangulated architecture where design, code, and deployment are unified.

## 🌌 What it does

### Design State Machine (Primary - `/`)

The main application features a philosophical state machine that transitions through:
- **Zero** - Unrecorded Event (backdrop of possibilities)
- **One** - Unit of Potential (instinct weighing itself)
- **Collapsed** - Entropy chunks reality 
- **Synapse** - Carbon life meets circuitry
- **Flashpoint** - Critical unpredictable inflection
- **Post-Binary** - Expanded environment beyond zeros

**Key Features:**
- **Figma API Integration** - Real-time design state synchronization
- **Antigravity Components** - Zero-gravity UI effects and hover states
- **State Oracle** - Broadcast intent configuration
- **Laminar Bridge** - 9090 bridge monitoring (119 Hz pulse tracking)
- **Quantum Cookie Dialog** - Privacy & telemetry management
- **Environmental Controls** - Jupyter-style freedom sliders

### Post-Binary Canvas (`/canvas`)

Interactive particle canvas with zero-gravity physics:
- Matrix-green particle system
- Mouse-reactive antigravity effects
- Burst interactions on click
- Scan-line CRT aesthetic

### Navigation (`/nav.html`)

Central hub for navigating between the state machine and canvas experiences.

## 🚀 Quick start

```sh
npm install
npm run dev          # http://localhost:5173
```

## 🏗️ CoSweet Multibuild System

The **cosweet_multibuild** system builds multiple versions simultaneously:

```sh
npm run build:canvas         # Build standalone canvas
npm run build:state-machine  # Build React state machine
npm run build:cosweet        # Build both + merge
```

**Output Structure:**
```
dist/
├── index.html              # State Machine (primary)
├── nav.html                # Navigation hub
├── canvas/                 # Standalone canvas
│   └── index.html
└── assets/                 # React app bundles
```

## 🔧 Environment variables

Copy `.env.example` to `.env.local` and configure:

```env
# WebSocket bridge
VITE_WS_URL=ws://localhost:9090

# Optional Twilio webhook
VITE_TWILIO_SMS_WEBHOOK_URL=

# Figma API (for design_machine_state sync)
VITE_FIGMA_ACCESS_TOKEN=your-figma-token
VITE_FIGMA_FILE_KEY=your-file-key

# Antigravity sync interval (ms)
VITE_ANTIGRAVITY_SYNC_INTERVAL=30000
```

### Getting Figma Credentials

1. **Access Token**: https://www.figma.com/developers/api#access-tokens
2. **File Key**: From your Figma URL - `figma.com/file/{FILE_KEY}/...`

## 📦 Deployment

Push to `main` — the [deploy workflow](.github/workflows/deploy.yml) automatically:
1. Runs `npm run build:cosweet` (multibuild)
2. Publishes `dist/` to GitHub Pages

**Live URLs:**
- `sweetashelldesigns.github.io/` → Design State Machine
- `sweetashelldesigns.github.io/canvas/` → Post-Binary Canvas
- `sweetashelldesigns.github.io/nav.html` → Navigation

## 🎯 Console API (open-air vault)

The sovereign state is accessible in the browser console:

```js
window.SovereignHUD.state            // current state snapshot
window.SovereignHUD.observeDelta()   // manually trigger delta pulse
window.SovereignHUD.forceInterference() // inject entropy
window.SovereignHUD.calculateWeight()   // opacity weight
```

## 🏛️ Architecture

| Component | Purpose |
|---|---|
| **design_machine_state** | Core philosophical state orchestrator synced with Figma |
| **AntigravitySync** | Maintains zero-latency Figma→GitHub→github.io pipeline |
| **Antigravity Components** | Zero-gravity hover effects and particle fields |
| **LaminarBridge** | 9090 bridge monitor, pulse tracking (119 Hz), cascade detection |
| **StateOracle** | Broadcast intent configuration with custom/preset modes |
| **VantagePointLattice** | Floating view markers that respond to state transitions |
| **CoSweet Multibuild** | Parallel build system for canvas + state machine |

## 📋 Requirements

- Node.js >= 20
- Optional: Figma API credentials for design state sync
