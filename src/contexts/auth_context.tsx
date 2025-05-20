// File: src/context/auth_context.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../pages/customer/model';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('user');
    if (storedUsername) {
      const userObj = JSON.parse(storedUsername);

      setUser(userObj);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('username', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
