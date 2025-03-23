import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import Board1 from './Board1.js'
import Board2 from './Board2.js'
import Board4 from './Board4.js'
import reportWebVitals from './reportWebVitals.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Board1 />
  </React.StrictMode>
);

reportWebVitals();
