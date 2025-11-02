// Импорт основной библиотеки React
import React from 'react';

// Импорт модуля для рендеринга React-приложения в DOM
import ReactDOM from 'react-dom/client';

// Импорт главного компонента приложения (App) из локального файла
import App from './App';

// Импорт глобальных стилей CSS для приложения
import './index.css';

// Импорт компонента BrowserRouter из библиотеки react-router-dom
// Нужен для реализации клиентского роутинга (навигации) в приложении
import { BrowserRouter } from "react-router-dom";

// Импорт AuthProvider — компонента контекста для управления аутентификацией
// Позволяет делиться данными авторизации между компонентами без прокидывания props
import { AuthProvider } from './context/AuthContext';

// Создание корневого элемента для рендеринга приложения
// Находим элемент с id='root' в HTML-документе и создаём для него React-корень
ReactDOM.createRoot(document.getElementById('root')).render(
  // Обертываем приложение в React.StrictMode для дополнительных проверок и предупреждений в разработке
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
