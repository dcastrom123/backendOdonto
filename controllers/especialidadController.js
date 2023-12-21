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

//Seleccione una especialidad para pasar al siguiente paso
const selecciorEspecialidad = async (req, res) => {
  try {
    // Obtener el nombre de la especialidad desde los parámetros de la solicitud
    const { nombreEspecialidad } = req.params;
    // Buscar la especialidad en la base de datos por su nombre
    // (Asegúrate de tener un modelo de Especialidad y ajusta este código según tu modelo)
    const especialidad = await Especialidad.findOne({ nombre: nombreEspecialidad });
    console.log("Busca la especialidad por nombre");
    // Si no se encuentra la especialidad, enviar un mensaje de error
    if (!especialidad) {
        return res.status(404).json({ mensaje: 'Especialidad no encontrada' });
    }
    res.json({especialidad: nombreEspecialidad});
} catch (error) {
    console.error('Error al obtener la especialidad seleccionada', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
}
};

module.exports = {
    obtenerEspecialidades,
    selecciorEspecialidad
}