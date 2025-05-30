const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const {
  createEmployee,
  getAllEmployees,
  searchEmployeesByName,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employee.controller');

// Proteger todas las rutas con el middleware JWT
router.use(verifyToken);

// Crear nuevo empleado
router.post('/', createEmployee);

// Obtener todos los empleados
router.get('/', getAllEmployees);

// Buscar por nombre (?name=Juan)
router.get('/search', searchEmployeesByName);

// Actualizar empleado por ID
router.put('/:id', updateEmployee);

// Eliminar empleado por ID
router.delete('/:id', deleteEmployee);

module.exports = router;
