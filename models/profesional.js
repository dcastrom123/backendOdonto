const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const profesionalSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  especialidad: {
    type: String,
    required: true,
  },/*
  especialidades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Especialidad',
    },
  ],*/
  // Otros campos específicos del profesional
});

const Profesional = mongoose.model('Profesional', profesionalSchema);

module.exports = Profesional;
