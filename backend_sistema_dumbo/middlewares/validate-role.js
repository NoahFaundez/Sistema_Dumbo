const { response } = require("express")


const isAdmin = ( req, res = response, next) => {

    if ( !req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { role, name } = req.user;

    if ( role !== 'ADMIN' ) {
        return res.status(401).json({
            msg: `${ name } no es administrador`
        });
    }

    next();
}

module.exports = {
    isAdmin
}