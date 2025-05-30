// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth.controller');

// Endpoint para iniciar sesión
router.post('/login', login);

// Endpoint opcional para crear usuarios administradores (puedes eliminarlo luego de crear uno)
router.post('/register', register);

module.exports = router;
