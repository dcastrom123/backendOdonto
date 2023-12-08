const { response } = require('express');
const Cita = require('../models/Cita'); // Asegúrate de importar el modelo de Cita
const Usuario = require('../models/Usuario'); // Asegúrate de importar el modelo de Usuario

// Controlador para mostrar las citas disponibles
const mostrarCitasDisponibles = async (req, res = response) => {
  try {
    // Aquí puedes agregar la lógica para buscar citas disponibles
    const citasDisponibles = await Cita.find({/* Define tus condiciones de búsqueda */});
    return res.json({
      ok: true,
      citas: citasDisponibles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al obtener las citas disponibles',
    });
  }
};

// Controlador para reservar una cita
const reservarCita = async (req, res = response) => {
  const { fecha, hora, especialidad, profesional } = req.body;
  const uid = req.uid; // ID del usuario que está realizando la reserva

  try {
    // Verificar si el usuario existe
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado',
      });
    }

    // Aquí puedes agregar la lógica para verificar la disponibilidad y crear la cita
    // Por ejemplo, verifica si ya existe una cita en la misma fecha y hora

    // Crea la nueva cita
    const nuevaCita = new Cita({
      fecha,
      hora,
      especialidad,
      profesional,
      usuario: uid,
    });

    // Guarda la cita en la base de datos
    await nuevaCita.save();

    return res.json({
      ok: true,
      msg: 'Cita reservada con éxito',
      cita: nuevaCita,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al reservar la cita',
    });
  }
};

// Controlador para mostrar citas reservadas por un usuario
const citasDeUsuario = async (req, res = response) => {
  const uid = req.uid; // ID del usuario cuyas citas se mostrarán

  try {
    // Aquí puedes agregar la lógica para buscar las citas reservadas por el usuario
    const citasUsuario = await Cita.find({ usuario: uid });

    return res.json({
      ok: true,
      citas: citasUsuario,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al obtener las citas del usuario',
    });
  }
};

module.exports = {
  mostrarCitasDisponibles,
  reservarCita,
  citasDeUsuario,
};
