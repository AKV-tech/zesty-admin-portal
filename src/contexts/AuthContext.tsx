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
    // Safely check localStorage for existing session
    try {
      const savedUser = localStorage.getItem('adminUser');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        // Validate the parsed data has the expected structure
        if (parsedUser && typeof parsedUser === 'object' && parsedUser.id && parsedUser.email) {
          return parsedUser;
        }
      }
    } catch (error) {
      // If localStorage is corrupted or unavailable, clear it and continue
      console.warn('Failed to parse user data from localStorage:', error);
      localStorage.removeItem('adminUser');
    }
    return null;
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
      try {
        localStorage.setItem('adminUser', JSON.stringify(mockUser));
      } catch (error) {
        console.warn('Failed to save user data to localStorage:', error);
      }
      navigate('/admin');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('adminUser');
    } catch (error) {
      console.warn('Failed to remove user data from localStorage:', error);
    }
    navigate('/admin/login');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};