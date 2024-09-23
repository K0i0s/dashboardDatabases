import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Form from "../pages/Form";
import Datos from "../pages/Datos";
import About from "../pages/About";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoutes from "../components/ProtectedRoute";

const AppRouter = () => {
    return (
        <Routes>
            {/* Rutas publicas */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Rutas protegidas */}
            <Route path='/' element={
                <ProtectedRoutes>
                    <Home />
                </ProtectedRoutes>
            } />
            <Route path='/form' element={
                <ProtectedRoutes>
                    <Form />
                </ProtectedRoutes>
            } />
            <Route path='/data' element={
                <ProtectedRoutes>
                    <Datos />
                </ProtectedRoutes>
            } />
            <Route path='/about' element={
                <ProtectedRoutes>
                    <About />
                </ProtectedRoutes>
            } />
        </Routes>
    );
};

export default AppRouter;
