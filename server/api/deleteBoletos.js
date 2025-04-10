const Boleto = require('../models/Boleto');
const connectDB = require('../config/db');

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === 'DELETE') {
    try {
      await Boleto.deleteMany({});
      res.status(200).json({ message: 'Todos los boletos han sido eliminados' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};