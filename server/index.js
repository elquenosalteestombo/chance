const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar modelo
const Boleto = require('./models/Boleto');

// Rutas
// Obtener todos los boletos
app.get('/api/boletos', async (req, res) => {
  try {
    const boletos = await Boleto.find();
    res.json(boletos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo boleto
app.post('/api/boletos', async (req, res) => {
  try {
    const boleto = new Boleto(req.body);
    await boleto.save();
    res.status(201).json(boleto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener boletos por sorteo
app.get('/api/boletos/sorteo/:numeroSorteo', async (req, res) => {
  try {
    const boletos = await Boleto.find({ numeroSorteo: req.params.numeroSorteo });
    res.json(boletos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar todos los boletos (para reiniciar)
app.delete('/api/boletos', async (req, res) => {    
  try {
    await Boleto.deleteMany({});
    res.json({ message: 'Todos los boletos han sido eliminados' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});