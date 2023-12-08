// Conexion a base de datos
/*
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/db_odonto')
    .then(() => {
        console.log("Conexion a la base de datos establecida con exito");
    })
    .catch(err => console.log(err));

*/
const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
const dbConnection = async() => {
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://localhost:27017/db_odonto');
        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar DB');
    }
}

//Exporto esta funcion para llamar desde el index
module.exports = {
    dbConnection
}