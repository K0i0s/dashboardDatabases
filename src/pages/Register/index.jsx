import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Las contraseñas no son las mismas");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/register', { // URL de tu backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message); // Manejo del error según respuesta del backend
                return;
            }

            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            navigate('/login');
        } catch (error) {
            setError('Error al crear la cuenta. Inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h1>Registrarse</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder='Confirmar contraseña'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Crear cuenta</button>
            </form>
        </div>
    );
};

export default Register;
