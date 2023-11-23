const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const userGet = async(req = request, res = response) => {

    const { limit } = req.query;
    const users = await User.find()
        .limit(Number(limit));

    res.json({
        users
    });
}

const userPost = async(req, res = response) => {

    const { name, lastName, rut, email, password, totalPoints, role } = req.body;
    const user = new User({ name, lastName, rut, email, password, totalPoints, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    // Guardar en DB
    await user.save();

    res.json({
        user
    });
}

const userPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, email, ...data } = req.body;

    // Validar contra base de datos
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync( password, salt);
    }

    const user = await User.findByIdAndUpdate( id, data);

    res.json(user);
}

const userDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    const user = await User.findByIdAndDelete(id);

    res.json(user);
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
};

