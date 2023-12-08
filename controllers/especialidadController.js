const Especialidad = require('../models/especialidad');

//Lista de profesionales
const obtenerEspecialidades = async (req, res) => {
    try {
      //consulta a tu base de datos para obtener la lista de especialidades
      const especialidades = await Especialidad.find().lean();
      console.log("Devuelve Lista de especialidades Existentes");
  
      res.json(especialidades);
    } catch (error) {
      console.error('Error al obtener la lista de especialidades', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };

module.exports = {
    obtenerEspecialidades,
}