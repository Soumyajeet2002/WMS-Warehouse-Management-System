import React from 'react';
import api from '../services/api';

export type UserRole = 'ADMIN' | 'VENDOR';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  vendorId: string | null;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  });

  const [accessToken, setAccessToken] = React.useState<string | null>(
    () => localStorage.getItem('access_token'),
  );

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    const { accessToken, user } = response.data;

    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    setAccessToken(accessToken);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    setAccessToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    accessToken,
    isAuthenticated: Boolean(accessToken && user),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};