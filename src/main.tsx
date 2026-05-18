import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Switched to Design State Machine (design_machine_state)
import App from './app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
