import 'dotenv/config'; // Cargar variables de entorno desde el archivo .env
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importar cors
import router from './src/routers/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:5173', // Permitir solo el origen del frontend
  methods: ['GET', 'POST'], // Métodos permitidos
}));

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Rutas de la API
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});