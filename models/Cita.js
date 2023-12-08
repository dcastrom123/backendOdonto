const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  especialidad: {
    type: String,
    required: true,
  },
  profesional: {
    type: String,
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Haz referencia a tu modelo de Usuario
    required: true,
  },
});

const Cita = mongoose.model('Cita', citaSchema);

module.exports = Cita;
