const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Define CRUD routes for employees
router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
