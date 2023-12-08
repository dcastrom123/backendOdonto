const { response } = require('express');
const { body } = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

// Crea un usuario nuevo   crear usuario, luego dentro crea email, luego valida clabve
// async para que funcione el await ya que el await solo funciona dentro de una funcion async

const crearUsuario = async (req, res = response) => {

    const { email, name, password } = req.body;
    try {

        //Verificar email
        //finOne va a buscar email sea igual al email que recibo como argumento

        const usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        // Crear usuario con el modelo
        const dbUser = new Usuario(req.body);


        //Hashear la password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        //Generar JWT
        const token = await generarJWT(dbUser.id, name);

        // Crear Usuario de base de datos
        await dbUser.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Pongase en contacto con admin'
        });
    }
}

// Login
const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;
    console.log(email, password);

    try {

        const dbUser = await Usuario.findOne({ email });

        if( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'correo no existe'
            });
        }

        // confirmar si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'password no valido'
            });
        }

        // Generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        //Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        })


            
    } catch (err) {
        console.log(error);

        return res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        });
    }
  
}

// Revalida token y genera un nuevo jwt cada vez que se envia la peticion
const revalidarToken = async(req, res = response) => {

  const {uid, name} = req;
  //Generar jwt
  const token = await generarJWT(uid, name);

    return res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}