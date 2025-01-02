import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedAuth = localStorage.getItem("authenticated");

    if (savedUser && savedAuth === "true") {
      setUser(savedUser);
      setAuthenticated(true);
    }
  }, []);

  const login = (username) => {
    setAuthenticated(true);
    setUser(username);

    // Guardar en localStorage
    localStorage.setItem("user", username);
    localStorage.setItem("authenticated", "true");
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);

    // Limpiar localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
  };

  return (
    <AuthContext.Provider value={{ authenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
