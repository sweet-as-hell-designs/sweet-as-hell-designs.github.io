import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // In canvas mode, we build the standalone canvas (canvas.html)
  // In default/state-machine mode, we build the React app (index.html)
  const isCanvasMode = mode === 'canvas';
  
  return {
    plugins: [react()],
    // sweet-as-hell-designs.github.io is a user/org Pages site — served at root.
    base: '/',
    build: {
      outDir: isCanvasMode ? 'dist-canvas' : 'dist-state-machine',
      emptyOutDir: true,
      rollupOptions: isCanvasMode ? {
        // For canvas mode, build the standalone canvas
        input: {
          canvas: './canvas.html'
        }
      } : {
        // For state-machine mode, build the React app
        input: {
          main: './index.html'
        }
      }
    }
  };
})
