import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
    console.log(user)
    console.log(children)
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
