import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Daggers own design system (does not modify CHRONOS globals)
import './DaggersApp.css';

import { DaggersApp } from './DaggersApp';

const rootElement = document.getElementById('daggers-root');

if (!rootElement) {
  throw new Error('[Daggers] Root element #daggers-root not found in DOM');
}

createRoot(rootElement).render(
  <StrictMode>
    <DaggersApp />
  </StrictMode>,
);
