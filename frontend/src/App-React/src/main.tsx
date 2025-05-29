// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Se importa aquí porque App ya no lo incluye
import './index.css';
import App from './App.tsx';

// Punto de entrada principal de la aplicación
// Se monta <App /> dentro de <BrowserRouter> para habilitar las rutas
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
