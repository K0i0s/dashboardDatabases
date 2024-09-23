// routes.js
import pkg from 'pg';
const { Client } = pkg;
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './authMiddleware.js';

const router = express.Router();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
});

client.connect();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Registro de usuarios
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificar si el usuario ya existe
    const userExist = await client.query('SELECT * FROM public.users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Almacenar usuario en la base de datos
    await client.query(
      'INSERT INTO public.users (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

// Login de usuarios
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificar si el usuario existe
    const user = await client.query('SELECT * FROM public.users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
});

// Ruta protegida: Home
router.get('/home', authMiddleware, (req, res) => {
  res.json({ message: 'Bienvenido a la página Home' });
});

// Ruta protegida: Formulario de datos
router.post('/form', authMiddleware, async (req, res) => {
  const { nombre, last_name, mom_last_name } = req.body;
  try {
    await client.query(
      'INSERT INTO public.profiles (user_id, nombre, last_name, mom_last_name) VALUES ($1, $2, $3, $4)',
      [req.user.id, nombre, last_name, mom_last_name]
    );
    res.status(201).json({ message: 'Formulario enviado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el formulario', error });
  }
});

// Ruta protegida: About
router.get('/about', authMiddleware, (req, res) => {
  res.json({ message: 'Esta es la página About protegida' });
});

export default router;