import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import design system before everything else
import './styles/tokens.css'
import './styles/reset.css'
import './styles/typography.css'
import './styles/animations.css'
import './styles/motion.css'

import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('[Chronos] Root element #root not found in DOM')
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
