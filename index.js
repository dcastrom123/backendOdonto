const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// console.log( process.env );

// Crear servidor de express
const app = express();

// Base de datos
dbConnection();
// Directorio publico
app.use(express.static('public'));

// Cors
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth') );


// Puerto
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
    //console.log("aqui llego")
});


