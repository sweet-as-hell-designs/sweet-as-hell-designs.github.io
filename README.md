# Sweet As Hell Designs — Sovereign Environment

A matrix-green, real-time trading dashboard built with **React + TypeScript + Vite**, deployed to GitHub Pages.

## What it does

| Component | Purpose |
|---|---|
| **SovereignHUD** | Connects to a WebSocket bridge and runs a 3 s delta-pulse observer. Emits market proposals when the entropy gate clears (`potential 2 > 1 × rngNoise`). Exposes `window.SovereignEnvironment` for open-air console inspection. Auto-reconnects with exponential backoff if the bridge goes down. |
| **CentrifugeVisualizer** | Canvas `requestAnimationFrame` animation — four counter-rotating rings that spin up when the mesh is active. Displays the last 5 strike-log entries in real time. |
| **EvolutionMetric** | HUD panel that safely handles unactualized backend payloads: if `evolutionLevel === 'TODO'` the panel fades to stealth opacity (`0.001`) instead of crashing the CSS parser. |

## Quick start

```sh
npm install
npm run dev          # http://localhost:5173
```

## Environment variables

Copy `.env.example` to `.env.local` and override as needed:

```
VITE_WS_URL=ws://localhost:9090   # WebSocket bridge URL
```

## Build

```sh
npm run build    # output → dist/
npm run preview  # preview the production build locally
```

## Deployment

Push to `main` — the [deploy workflow](.github/workflows/deploy.yml) builds the app and publishes the `dist/` folder to GitHub Pages automatically.

## Console API (open-air vault)

While the mesh is engaged, the full sovereign state is accessible in the browser console:

```js
window.SovereignEnvironment.state            // current state snapshot
window.SovereignEnvironment.observeDelta()   // manually trigger a delta pulse
window.SovereignEnvironment.forceInterference() // inject random entropy
window.SovereignEnvironment.calculateWeight()   // → opacity weight float
```

## Requirements

- Node.js >= 20
