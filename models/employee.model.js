// models/employee.model.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Employee = db.define('Employee', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Employee;
