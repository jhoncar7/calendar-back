const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

// el response es para que aparesca el tipado, osea la ayuda

const crearUsuario = async (req, res = response) => {

    //const { name, email, password } = req.body;
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario._id, usuario.name);

        return res.status(201).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
}

const loginUsuario = async (req, res = response) => {

    console.log(response);

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o Password Incorrectos'
            });
        }
        // validar password
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o Password Incorrectos'
            });
        }

        const token = await generarJWT(usuario._id, usuario.name);

        return res.json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }


}

const revalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    //generar un nuevo token y retornalo en la peticion
    const token = await generarJWT(uid, name);


    return res.json({
        ok: true,
        msg: 'renew',
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
