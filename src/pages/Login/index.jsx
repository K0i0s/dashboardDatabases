import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/'); // Redirige a Home después del inicio de sesión
        } catch (error) {
        setError('Email o contraseña incorrectos');
        }
    };

    const styles={
        loginOutarea:{
            width:'100vw',
            height:'100vh',
            backgroundColor:'#415A80'
        },
        loginContainer:{
            display:'flex',
            height:'60%',
            width:'75%',
            marginLeft:'10%',
            marginRight:'10%',
            marginTop:'10%',
            backgroundColor:'#F2F2F2',
            borderRadius:'15px',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            padding:'20px'
        },
        inputs:{
            borderRadius:'5px',
            width:'20rem',
            margin:'10px',
            height:'32px',
            fontSize:'14px'
        },
        button:{
            width:'20.5rem',
            margin:'10px',
            height:'2rem',
            fontSize:'14px'
        }

    }

    return (
    <div style={styles.loginOutarea}>
        <form onSubmit={handleLogin} style={styles.loginContainer}>
            <h1>Iniciar Sesión</h1>
            {error && <p>{error}</p>}
            <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.inputs}
            />
            <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.inputs}
            />
            <button type="submit" style={styles.button}>Iniciar Sesión</button>
            <p>
            ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
        </form>
    </div>
  )
}

export default Login