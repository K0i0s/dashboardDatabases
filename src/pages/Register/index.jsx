import React, { useState } from 'react'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../services/firebase'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword){
            setError("Las contraseñas no son las mismas")
            return
        }

        try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user

        await sendEmailVerification(user)

        alert('Se ha enviado un correo de verificacion. Por favor, revisa tu bandeja de entrada')

        navigate('/login'); // 
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                  setError('El correo electrónico ya está en uso');
                  break;
                case 'auth/invalid-email':
                  setError('El correo electrónico no es válido');
                  break;
                case 'auth/weak-password':
                  setError('La contraseña debe tener al menos 6 caracteres');
                  break;
                default:
                  setError('Error al crear la cuenta. Inténtalo de nuevo.');
              }
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
            <input type="password" 
            placeholder='Confirmar contraseña'
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            required
            />
            <button type="submit">Crear cuenta</button>
        </form>
        </div>
    );
}

export default Register