import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('currentUser');
  
  if (!token || !currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;