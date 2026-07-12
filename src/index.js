/* src/index.js */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// Импортируем провайдер контекста
import { AuthProvider } from './context/AuthContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ОБОРАЧИВАЕМ APP В ПРОВАЙДЕР */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);