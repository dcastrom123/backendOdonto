const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { mostrarCitasDisponibles } = require('../controllers/citaController'); // Asegúrate de que el nombre del controlador y la ruta sean correctos
const { reservarCita } = require('../controllers/citaController');
const { citasDeUsuario } = require('../controllers/citaController');
const { obtenerProfesionales, obtenerEspprofesional } = require('../controllers/profesionalController');
const { obtenerEspecialidades } = require('../controllers/especialidadController');
 
const router = Router();

// Crear nuevo usuario middlewares check 
router.post('/new', [
    check('name', 'El nombre es obligatorio').notEmpty().isLength(2),
    check('email', 'El email es obligatorio').isEmail(), 
    check('password', 'Password obligatoria').isLength({min: 6}),
    validarCampos
], crearUsuario);

// Login de usuario
router.post('/',[
    check('email', 'El email es obligatorio').isEmail(), 
    check('password', 'Password obligatoria').isLength({min: 6}),
    validarCampos
], loginUsuario);

// Revalidar token
router.get('/renew', validarJWT ,revalidarToken);

//agendamiento 
// Ejemplo de rutas para citas
router.get('/citas/disponibles', mostrarCitasDisponibles);
router.post('/citas/reservar', reservarCita);
router.get('/citas/usuario', citasDeUsuario);

//Ruta para obtener lista de profesionales
router.get('/profesionales', obtenerProfesionales);

//Ruta para obtner lista de especialidades
router.get('/especialidades', obtenerEspecialidades);

//Ruta para obtener especialidades por profesional seleccionado
router.get('/profesionales/:id/especialidades', obtenerEspprofesional);

module.exports = router;