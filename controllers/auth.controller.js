// controllers/auth.controller.js
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '8h'
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// ⚠️ Solo para propósitos de prueba (puedes eliminarlo después)
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ message: 'El usuario ya existe' });

    const user = await User.create({ username, password });

    res.status(201).json({ message: 'Usuario creado correctamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

module.exports = { login, register };
