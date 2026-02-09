import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Esto importa las directivas de Tailwind que pusiste en index.css

const container = document.getElementById('root');

if (!container) {
  throw new Error('No se encontró el elemento root. Verifica tu index.html.');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
