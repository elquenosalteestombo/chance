const Boleto = require('../models/Boleto');
const connectDB = require('../config/db');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const boletos = await Boleto.find();
      res.status(200).json(boletos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const boleto = new Boleto(req.body);
      await boleto.save();
      res.status(201).json(boleto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};