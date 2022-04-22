/*
    Events Routers
    /api/events
*/
const { Router } = require('express');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento, } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const router = Router();

//aca aplica a todas las rutas que esten dentro de este router de validar token sin necesidad de colocarlo en cada una
router.use(validarJWT);

router.get('/', getEventos);

router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;