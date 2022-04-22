
/*
    Rutas de Usuario / Auth
    host + /api/auth
*/

//const express = require('express');

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post('/new',
    [ // Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(), // el nombre es obligatorio y que no este vacio
        check('email', 'El email es obligatorio').isEmail(), // el email debe ser un email
        check('password', 'La contraseña debe ser de min 6 caracteres').isLength({ min: 6 }), // la contraseña es obligatoria y que no este vacia
        validarCampos
    ],
    crearUsuario);

router.post('/',
    [ // Middlewares
        check('email', 'El email es obligatorio').isEmail(), // el email debe ser un email
        check('password', 'La contraseña debe ser de min 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
