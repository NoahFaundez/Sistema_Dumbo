const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/UserController');
const { validateField } = require('../middlewares/validateFields');
const { validRole, emailExists, rutExists, idExists } = require('../helpers/dbValidators');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', [
    validateJWT
], userGet);

router.post('/', [
    validateJWT,
    check('rut', 'El rut o dni no es válido').isLength({ min:12 }),
    check('rut').custom(rutExists),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser mas de 6 letras').isLength({ min:6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExists),
    // check('role', 'No es un rol valido').isIn(['ADMIN', 'USER']),
    check('role').custom( validRole ),
    validateField
], userPost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idExists),
    validateField
], userPut);

router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idExists),
    validateField
], userDelete);

module.exports = router;