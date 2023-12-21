const Profesional = require('../models/Profesional'); // Asegúrate de importar el modelo de Profesional correctamente


//Lista de profesionales------------------------------al momento de seleccionar en el front por profesional
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

  //Seleccione a un profesional para pasar al siguiente paso
  const seleccionarProfesional = async (req, res) => {
    try {
        // Obtener el id del profesional desde los parámetros de la solicitud
        const { id } = req.params;
        // Buscar el profesional en la base de datos por su id
        const profesional = await Profesional.findById(id);
        console.log("Busca al profesional por id");
        // Si no se encuentra el profesional, enviar un mensaje de error
        if (!profesional) {
            return res.status(404).json({ mensaje: 'Profesional no encontrado' });
        }
        res.json(profesional);
    } catch (error) {
        console.error('Error al obtener el profesional seleccionado', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };

  

  // Lista de especialidades por profesional seleccionado TRAE las especialidades del profesional seleccionado
  const obtenerEspprofesional = async (req, res) => {
    try {
    const { id } = req.params;
    const profesional = await Profesional.findById(id);
    //console.log("Busca al profesional por id")
    console.log(req.params)
    // Si no se encuentra el profesional, enviar un mensaje de error
    if (!profesional) {
      return res.status(404).json({ mensaje: 'Profesional no encontrado' });
    }
    // Obtener las especialidades del profesional
    const especialidades = profesional.especialidades;
    // Enviar las especialidades como respuesta
    res.json(especialidades);
  } catch (error) {
    console.error('Error al obtener las especialidades de un profesional', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
    obtenerProfesionales,
    seleccionarProfesional,
    obtenerEspprofesional
}