import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // sweet-as-hell-designs.github.io is a user/org Pages site — served at root.
  base: '/',
})
