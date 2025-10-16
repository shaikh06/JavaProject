import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireRole }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireRole && user.role !== requireRole) {
    return <Navigate to={requireRole === 'ROLE_ADMIN' ? '/admin/login' : '/login'} />;
  }

  return children;
};

export default ProtectedRoute;