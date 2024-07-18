import React from 'react';
import ReactDOM from 'react-dom/client';
import App1 from './App1'; // Adjust the path as needed
import './index.css'; // Adjust the path as needed

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App1 />
  </React.StrictMode>
);
