import pkg from 'pg';
const { Client } = pkg;
import express from 'express';
import bcrypt from 'bcryptjs';

const router = express.Router();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
});

client.connect();

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
  
      // Devolver información del usuario sin usar JWT
      const { password: _, ...userInfo } = user.rows[0]; // Excluir la contraseña del objeto devuelto
      res.json({ message: 'Inicio de sesión exitoso', user: userInfo });
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
  });

// Ruta protegida: Home (ahora sin verificación de token)
router.get('/home', (req, res) => {
  res.json({ message: 'Bienvenido a la página Home' });
});

// Ruta para enviar el formulario de datos
router.post('/form', async (req, res) => {
  const { nombre, last_name, mom_last_name } = req.body;
  try {
    await client.query(
      'INSERT INTO public.profiles (nombre, last_name, mom_last_name) VALUES ($1, $2, $3)',
      [nombre, last_name, mom_last_name]
    );
    res.status(201).json({ message: 'Formulario enviado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el formulario', error });
  }
});

// Ruta para obtener perfiles
router.get('/profiles', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM public.profiles');
      res.json(result.rows); // Devuelve todos los perfiles
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener perfiles', error });
    }
  });

// Ruta protegida: About (sin JWT ni middleware)
router.get('/about', (req, res) => {
  res.json({ message: 'Esta es la página About' });
});

export default router;
