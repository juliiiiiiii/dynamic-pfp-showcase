import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

// Definimos qué datos y funciones tendrá nuestro contexto
interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  login: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;

        if(decodedToken.exp && decodedToken.exp < currentTime) {
          console.log('Sesion expirada. Cerrando sesion...');
          localStorage.removeItem('jwt_token');
          setToken(null);
        } else {
          setToken(storedToken);
        }
      } catch(error) {
        localStorage.removeItem('jwt_token');
        setToken(null);
      }
      
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('jwt_token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('jwt_token');
  };

  const isLoggedIn = !!token; 

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};