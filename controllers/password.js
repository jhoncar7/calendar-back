const { passwordRamdonCombinada } = require("../helpers/passRandom");

const passwordRamdon = async (req, res = response) => {

    try {
        const password = passwordRamdonCombinada();
        console.log(password);
        return res.json({
            ok: true,
            pass: password,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el admin',
        });
    }

    return res.json({
        ok: true,
        msg: 'Password generada'
    });
}

module.exports = {
    passwordRamdon
}