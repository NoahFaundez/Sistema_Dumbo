const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req, res = response) => {

    const { name, password } = req.body;

    try {

        // Verificar si el usuario existe
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({
                msg: 'El nombre o la contraseña son incorrectos'
            });
        }

        // Verficar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El nombre o la contraseña son incorrectos'
            });
        }

        // Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    login
}