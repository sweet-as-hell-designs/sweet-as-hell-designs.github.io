#!/usr/bin/env node
/**
 * Cosweet Multibuild Merge Script
 * Combines canvas and state-machine builds into a single deployment
 * Creates the triangulated architecture: Figma → GitHub → github.io
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');
const CANVAS_BUILD = path.join(__dirname, '..', 'dist-canvas');
const STATE_MACHINE_BUILD = path.join(__dirname, '..', 'dist-state-machine');

console.log('[CoSweetMerge] Starting multibuild merge...');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Copy canvas build (simple particle canvas) to /canvas
const canvasTarget = path.join(DIST_DIR, 'canvas');
if (fs.existsSync(CANVAS_BUILD)) {
  console.log('[CoSweetMerge] Copying canvas build...');
  copyRecursive(CANVAS_BUILD, canvasTarget);
  
  // Rename canvas.html to index.html in the canvas directory
  const canvasHtmlSrc = path.join(canvasTarget, 'canvas.html');
  const canvasHtmlDest = path.join(canvasTarget, 'index.html');
  if (fs.existsSync(canvasHtmlSrc)) {
    fs.renameSync(canvasHtmlSrc, canvasHtmlDest);
    console.log('[CoSweetMerge] Renamed canvas.html to index.html in /canvas');
  }
} else {
  console.warn('[CoSweetMerge] Canvas build not found, skipping...');
}

// Copy state-machine build (main app) to root
if (fs.existsSync(STATE_MACHINE_BUILD)) {
  console.log('[CoSweetMerge] Copying state-machine build to root...');
  copyRecursive(STATE_MACHINE_BUILD, DIST_DIR);
} else {
  console.warn('[CoSweetMerge] State-machine build not found, skipping...');
}

// Create navigation index
const navHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sweet as Hell Designs - Navigation</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #111;
      color: #FCF434;
      font-family: 'Courier New', monospace;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
    }
    .container {
      max-width: 600px;
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      text-shadow: 0 0 20px rgba(252, 244, 52, 0.5);
    }
    p {
      color: #9C59D1;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }
    .nav-grid {
      display: grid;
      gap: 1rem;
      margin-top: 2rem;
    }
    .nav-btn {
      background: #9C59D1;
      border: 2px solid #CF9FFF;
      color: #111;
      padding: 1.5rem;
      text-decoration: none;
      display: block;
      font-weight: bold;
      font-size: 1.1rem;
      transition: all 0.3s;
      border-radius: 8px;
    }
    .nav-btn:hover {
      background: #CF9FFF;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(156, 89, 209, 0.5);
    }
    .nav-btn small {
      display: block;
      font-size: 0.75rem;
      font-weight: normal;
      margin-top: 0.5rem;
      color: rgba(17, 17, 17, 0.7);
    }
    .badge {
      background: #FCF434;
      color: #111;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: bold;
      margin-left: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Sweet as Hell Designs</h1>
    <p>Zero-Gravity Hosting • Design State Machine • Antigravity Protocol</p>
    
    <div class="nav-grid">
      <a href="/" class="nav-btn">
        Design State Machine <span class="badge">PRIMARY</span>
        <small>Figma-synced state orchestrator with antigravity UI</small>
      </a>
      <a href="/canvas" class="nav-btn">
        Post-Binary Canvas
        <small>Interactive particle canvas with zero-gravity effects</small>
      </a>
    </div>
    
    <p style="margin-top: 3rem; font-size: 0.75rem; color: #666;">
      Triangulated API: Figma → GitHub → github.io
    </p>
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(DIST_DIR, 'nav.html'), navHtml);
console.log('[CoSweetMerge] Created navigation page at /nav.html');

console.log('[CoSweetMerge] ✅ Multibuild merge complete!');
console.log('[CoSweetMerge] Structure:');
console.log('[CoSweetMerge]   / → State Machine (design_machine_state)');
console.log('[CoSweetMerge]   /canvas → Post-Binary Canvas');
console.log('[CoSweetMerge]   /nav.html → Navigation Index');

/**
 * Recursive copy helper
 */
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  
  const stat = fs.statSync(src);
  
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}
