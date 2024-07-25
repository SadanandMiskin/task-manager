import React, { createContext, useState, useEffect } from 'react';
import { login, register, googleLogin, googleRegister } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token and set user
      setUser(true);
    }
    setLoading(false);

  }, []);

  const loginUser = async (email, password) => {
    const data = await login(email, password);
    setUser(data.user);
    localStorage.setItem('token', data.token);
    window.location.href = "/"
  };

  const registerUser = async (firstName , lastName, email, password) => {
    const data = await register(firstName , lastName, email, password);
    setUser(data.user);
    localStorage.setItem('token', data.token);
    window.location.href = "/"
    // window.location.href = "/"
    // window.location.reload()
  };

  const googleLoginUser = () => {
    googleLogin();
  };

  const googleRegisterUser = () => {
    googleRegister();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        registerUser,
        googleLoginUser,
        googleRegisterUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
