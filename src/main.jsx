import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'lenis/dist/lenis.css';
import './enterprise.css';
import './theme.css';
import './pages.css';

// Pages are pre-rendered to HTML at build time (scripts/prerender.mjs) for search engines and
// AI crawlers; the client then renders fresh over it.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
