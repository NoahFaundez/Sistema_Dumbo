const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/AuthController');
const { validateField } = require('../middlewares/validateFields');

const router = Router();

router.post('/login', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateField
], login);





module.exports = router;
