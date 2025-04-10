// models/Boleto.js
const mongoose = require('mongoose');

const boletoSchema = new mongoose.Schema({
  numeroBoleto: {
    type: Number,
    required: true,
    min: 1000,
    max: 9999
  },
  numeroSorteo: {
    type: Number,
    required: true,
    enum: [2255, 3748, 4567]
  },
  valorPremio: {
    type: Number,
    required: true,
    default: 150000000
  },
  fechaEmision: {
    type: Date,
    required: true,
    default: new Date('2025-06-12')
  },
  numeroSerie: {
    type: Number,
    required: true,
    enum: [1, 2, 3]
  },
  valorBillete: {
    type: Number,
    required: true,
    default: 10000
  }
});

module.exports = mongoose.model('Boleto', boletoSchema);