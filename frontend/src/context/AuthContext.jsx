import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // временно устанавливаем дефолтную роль
    setUser({
      id: 1,
      name: "Test User",
      role: "employee",
    });
  }, []);

  const changeRole = (newRole) => {
    setUser((prev) => ({ ...prev, role: newRole }));
  };

  return (
    <AuthContext.Provider value={{ user, changeRole }}>
      {children}
    </AuthContext.Provider>
  );
};
