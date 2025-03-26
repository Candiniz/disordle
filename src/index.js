import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "./ThemeContext.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.js';
import Board1 from './Board1.js';
import Board2 from './Board2.js';
import Board4 from './Board4.js';
import reportWebVitals from './reportWebVitals.js';
import './globals.css';

// Configurando o roteamento
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <App />
        <Routes>
          <Route path="/" element={<Board1 />} />
          <Route path="/II" element={<Board2 />} />
          <Route path="/IV" element={<Board4 />} />
        </Routes>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
