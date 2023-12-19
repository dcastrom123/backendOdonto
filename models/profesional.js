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
  especialidades: [{
    type: String,
    required: true,
  }],
});

const Profesional = mongoose.model('Profesional', profesionalSchema);

module.exports = Profesional;
