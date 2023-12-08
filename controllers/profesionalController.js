const Profesional = require('../models/Profesional'); // Asegúrate de importar el modelo de Profesional correctamente


//Lista de profesionales
const obtenerProfesionales = async (req, res) => {
    try {
      // consulta a tu base de datos para obtener la lista de profesionales
      const profesionales = await Profesional.find().lean();
      console.log("Devuelve Lista de profesionales Existentes");
  
      res.json(profesionales);
    } catch (error) {
      console.error('Error al obtener la lista de profesionales', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };

module.exports = {
    obtenerProfesionales,
}