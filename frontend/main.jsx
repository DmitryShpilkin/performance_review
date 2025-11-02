import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'; // <-- импорт провайдера

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* <-- оборачиваем */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
