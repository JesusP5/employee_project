// controllers/employee.controller.js
const Employee = require('../models/employee.model');

// Crear un nuevo empleado
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear empleado', error: err.message });
  }
};

// Obtener todos los empleados
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener empleados' });
  }
};

// Buscar por nombre
const searchEmployeesByName = async (req, res) => {
  const { name } = req.query;
  try {
    const results = await Employee.findAll({
      where: {
        nombre: {
          [require('sequelize').Op.like]: `%${name}%`
        }
      }
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error en búsqueda de empleados' });
  }
};

// Actualizar empleado
const updateEmployee = async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    const updatedEmployee = await Employee.findByPk(req.params.id);
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar empleado' });
  }
};

// Eliminar empleado
const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    res.json({ message: 'Empleado eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar empleado' });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  searchEmployeesByName,
  updateEmployee,
  deleteEmployee
};
