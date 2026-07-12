/* src/context/AuthContext.jsx */

import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Значение по умолчанию защищает приложение от краха 
// до момента срабатывания асинхронной загрузки профиля.
const AuthContext = createContext({
  user: {
    id: null,
    name: 'Гость',
    role: 'employee'
  },
  changeRole: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Инициализируем сразу объектом, чтобы избежать лишних проверок на null внутри Provider
  const [user, setUser] = useState({
    id: null,
    name: 'Гость',
    role: 'employee'
  });

  // Загрузка реального пользователя (имитация запроса к серверу)
  useEffect(() => {
    // Вместо таймаута здесь обычно fetch('/api/profile')
    setTimeout(() => {
      setUser({
        id: 1,
        name: "Дмитрий",
        role: "employee",
      });
    }, 500); // Увеличена задержка для наглядности лоадера
  }, []);

  // Функция смены роли мемоизирована, чтобы Navbar не пересчитывался зря
  const changeRole = useCallback((newRole) => {
    setUser(prev => ({ ...prev, role: newRole }));
  }, []);

  return (
    <AuthContext.Provider value={{ user, changeRole }}>
      {children}
    </AuthContext.Provider>
  );
};