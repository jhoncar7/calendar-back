const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {

    //const eventos = await Evento.find({ user: req.uid }).sort({ start: 1 });
    const eventos = await Evento.find().populate('user', 'name email');
    return res.json({
        ok: true,
        eventos
    });
}

const crearEvento = async (req, res = response) => {


    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        return res.json({
            ok: true,
            evento: eventoGuardado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el admin',
        });
    }

    return res.json({
        ok: true,
        msg: 'crearEventos'
    });
}

const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    console.log(uid);

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe por este ID'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permisos para actualizar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, req.body, { new: true });
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        return res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hablar con el Admin',
        });
    }
}

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe por este ID'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permisos para actualizar este evento'
            });
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);
        return res.json({
            ok: true,
            msg: 'Evento Eliminado',
            evento: eventoEliminado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hablar con el Admin',
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}