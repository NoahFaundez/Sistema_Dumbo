const Role = require('../models/role');
const User = require('../models/user');

const validRole = async(role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`El rol ${ role } no esta registrado en la BD`);
    }
}

const emailExists = async(email = '') => {
    // Verificar si el correo existe
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`El correo ${ email } ya esta registrado`);

    }
}

const rutExists = async(rut = '') => {
    // Verificar si el rut existe
    const existRut = await User.findOne({ rut });
    if (existRut) {
        throw new Error(`El rut ${ rut } ya esta registrado`);
    }
}

const idExists = async( id ) => {
    // Verificar si el id existe
    const existId = await User.findById(id);
    if ( !existId ) {
        throw new Error(`El ID ${ id } no existe`);
    }
}

module.exports = {
    validRole,
    emailExists,
    rutExists,
    idExists
}