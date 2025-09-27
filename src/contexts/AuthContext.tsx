import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('adminUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - accept any email/password combination
    if (email && password) {
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0] || 'Admin User'
      };
      setUser(mockUser);
      localStorage.setItem('adminUser', JSON.stringify(mockUser));
      navigate('/admin');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};