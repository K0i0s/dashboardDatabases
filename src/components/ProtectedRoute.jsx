// ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirige a la página de login si no hay token
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoutes;