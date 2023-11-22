const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lastName:{
        type: String,
        required: [true, 'Los apellidos son obligatorios']
    },
    rut:{
        type: String,
        required: [true, 'El rut o dni es obligatorio'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    totalPoints:{
        type: Number,
        required: [true, 'Los puntos son obligatorios']
    },
    role:{
        type: String,
        required: true,
        emun: ['ADMIN', 'USER']
    },
});

userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    
    return user;
}

module.exports = model( 'Usuario', userSchema );