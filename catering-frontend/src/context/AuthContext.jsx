import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, login, adminLogin } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogin = async (credentials, isAdmin = false) => {
    try {
      const response = isAdmin ? await adminLogin(credentials) : await login(credentials);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      navigate(response.user.role === 'ROLE_ADMIN' ? '/admin/add-menu-item' : '/');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    console.log('User logged out, user state:', null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login: handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};